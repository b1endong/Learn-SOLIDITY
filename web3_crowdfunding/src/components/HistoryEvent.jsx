export default function HistoryEvent({blockNumber, txHash, funder, amount}) {
    return (
        <div className="hover:shadow-lg">
            <div className="bg-white shadow-md rounded-lg p-4 mb-4 mt-5">
                <p className="text-gray-700">
                    <strong>Block Number:</strong> {blockNumber}
                </p>
                <p className="text-gray-700">
                    <strong>Transaction Hash:</strong> {txHash}
                </p>
                <p className="text-gray-700">
                    <strong>Funder:</strong> {funder}
                </p>
                <p className="text-gray-700">
                    <strong>Amount Funded:</strong> {amount}{" "}
                    <strong>ETH</strong>
                </p>
            </div>
        </div>
    );
}
