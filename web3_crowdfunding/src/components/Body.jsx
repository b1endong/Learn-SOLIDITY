import {useAppKitProvider, useAppKitAccount} from "@reown/appkit/react";
import {BrowserProvider, Contract, formatEther, parseEther} from "ethers";
import {useEffect, useState} from "react";
import {ContractAddress, ContractAbi} from "../contract/ContractData";
import HistoryEvent from "./HistoryEvent";
import Loading from "./Loading";

export default function Body() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFund, setIsLoadingFund] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [owner, setOwner] = useState(null);
    const {walletProvider} = useAppKitProvider("eip155");
    const [balance, setBalance] = useState(null);
    const [funderLength, setFunderLength] = useState(null);
    const [amountFund, setAmountFund] = useState(0);
    const [txHash, setTxHash] = useState(null);
    const [formattedEvents, setFormattedEvents] = useState([]);
    const {address} = useAppKitAccount();
    function shortenAddress(address, chars = 4) {
        if (!address || address.length < chars * 2 + 2) return address;
        return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
    }

    const fetchContractData = async () => {
        setIsLoading(true);
        try {
            if (walletProvider) {
                const ethersProvider = new BrowserProvider(walletProvider);
                const crowdFundingContract = new Contract(
                    ContractAddress,
                    ContractAbi,
                    ethersProvider
                );
                const filterFund = crowdFundingContract.filters.Funded;
                const eventsFund = await crowdFundingContract.queryFilter(
                    filterFund,
                    -1000
                );
                console.log("Events:", eventsFund);

                // Hiển thị các sự kiện đã xảy ra
                const events = eventsFund.map((event) => ({
                    blockNumber: event.blockNumber,
                    txHash: event.transactionHash,
                    funder: event.args.funder,
                    amount: formatEther(event.args.amount),
                }));

                setFormattedEvents(events.reverse());
                console.log("Formatted Events:", formattedEvents);

                // Hiển thị Balance
                const contractBalance = await ethersProvider.getBalance(
                    ContractAddress
                );
                setBalance(formatEther(contractBalance));

                //Hiển thị danh sách funder
                const funderLength =
                    await crowdFundingContract.getFunderLength();
                setFunderLength(Number(funderLength));

                //Hiển thị i_owner
                const owner = await crowdFundingContract.i_owner();
                setOwner(owner.toLowerCase());
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleFund = async (amount) => {
        if (amount <= 0 || isNaN(amount)) {
            alert("Please enter a valid amount to fund.");
            return;
        }
        setIsLoadingFund(true);
        setIsSuccess(false);
        try {
            if (walletProvider) {
                const ethersProvider = new BrowserProvider(walletProvider);
                const signer = await ethersProvider.getSigner();
                const crowdFundingContract = new Contract(
                    ContractAddress,
                    ContractAbi,
                    signer
                );
                const tx = await crowdFundingContract.fund({
                    value: parseEther(String(amount)),
                });

                console.log("Transaction sent:", tx);
                setTxHash(tx.hash);
                await tx.wait();

                fetchContractData();
            }
        } catch (error) {
            alert("An error occurred while funding. Please try again.");
        } finally {
            setIsLoadingFund(false);
            setIsSuccess(true);
        }
    };

    const handleWithdraw = async (amount) => {
        setIsLoadingFund(true);
        try {
            if (walletProvider) {
                const ethersProvider = new BrowserProvider(walletProvider);
                const signer = await ethersProvider.getSigner();
                const crowdFundingContract = new Contract(
                    ContractAddress,
                    ContractAbi,
                    signer
                );
                const tx = await crowdFundingContract.withdraw();
                await tx.wait();

                fetchContractData();
            }
        } catch (error) {
            alert("An error occurred while withdrawing. Please try again.");
        } finally {
            setIsLoadingFund(false);
        }
    };

    useEffect(() => {
        fetchContractData();
    }, [walletProvider]);

    return (
        <>
            <main className="border-b-2 py-5">
                <div className="grid grid-cols-3 grid-rows-2 gap-4">
                    <div className="shadow-lg p-5 flex flex-col justify-center rounded-lg border-1 border-gray-100">
                        <h2 className="text-lg font-bold mb-3 ">
                            Total Amount Funding
                        </h2>
                        {isLoading && <Loading />}
                        {!isLoading && balance && (
                            <p>
                                <strong className="font-bold text-black text-2xl">
                                    {balance}
                                </strong>{" "}
                                ETH
                            </p>
                        )}
                    </div>

                    <div className="col-span-2 row-span-2 shadow-xl p-5 flex flex-col justify-center rounded-lg border-1 border-gray-100">
                        {isLoadingFund ? (
                            <>
                                <div className="flex items-center gap-10">
                                    <Loading className="h-15 w-15" />
                                    <p className="text-lg font-bold">
                                        Funding in progress...
                                    </p>
                                </div>
                                {txHash && (
                                    <div className="mt-4 text-lg flex gap-2">
                                        Transaction Hash:{" "}
                                        <a
                                            href={`https://sepolia.etherscan.io/tx/${txHash}`}
                                        >
                                            <p className="text-blue-500 hover:underline">
                                                {shortenAddress(txHash)}
                                            </p>
                                        </a>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="">
                                <h2 className="text-lg font-bold mb-3">
                                    Donate your ETH
                                </h2>
                                <input
                                    type="text"
                                    placeholder="Enter amount in ETH"
                                    className="border-2 border-gray-500 p-2 rounded-lg mr-3"
                                    onChange={(e) =>
                                        setAmountFund(Number(e.target.value))
                                    }
                                />
                                <button
                                    className="bg-gray-500 hover:bg-black text-white font-bold py-2 px-4 cursor-pointer rounded-xl transition-all"
                                    onClick={() => {
                                        handleFund(amountFund);
                                    }}
                                >
                                    Fund
                                </button>
                            </div>
                        )}
                        {isSuccess && (
                            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 mt-5">
                                <div className="flex-center-between">
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold">
                                            Funding successful!
                                        </p>
                                        <i class="fa-regular fa-face-smile-beam"></i>
                                    </div>
                                    <i
                                        class="fa-solid fa-xmark text-red-500 cursor-pointer hover:opacity-80"
                                        onClick={() => setIsSuccess(false)}
                                    ></i>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="shadow-xl p-5 flex flex-col justify-center rounded-lg border-1 border-gray-100">
                        <h2 className="text-lg font-bold mb-3">Funder</h2>
                        {isLoading && <Loading />}
                        {!isLoading && funderLength && (
                            <p className="text-black text-2xl font-bold">
                                {funderLength}
                            </p>
                        )}
                    </div>
                </div>
            </main>
            {funderLength > 0 && (
                <div className="mt-5">
                    <h1 className="text-xl font-bold mb-2 ">Lastest Funding</h1>
                    {formattedEvents.map((event) => (
                        <HistoryEvent key={event.blockNumber} {...event} />
                    ))}
                </div>
            )}

            {owner === address && (
                <button
                    onClick={handleWithdraw}
                    className="bg-black hover:opacity-80 w-full transition-all mb-5 text-white font-bold py-2 px-4 rounded"
                >
                    Withdraw Funds
                </button>
            )}
        </>
    );
}
