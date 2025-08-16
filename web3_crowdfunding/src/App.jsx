import {createAppKit} from "@reown/appkit/react";
import {EthersAdapter} from "@reown/appkit-adapter-ethers";
import {arbitrum, mainnet, sepolia} from "@reown/appkit/networks";

import Header from "./components/Header";
import Body from "./components/Body";

const projectId = "72404a238daa32ae2ccbebec83f33446";

const networks = [arbitrum, mainnet, sepolia];

const metadata = {
    name: "Crowdfunding Dapp",
    description: "A decentralized crowdfunding application",
    url: "https://mywebsite.com", // origin must match your domain & subdomain
    icons: ["https://avatars.mywebsite.com/"],
};

createAppKit({
    adapters: [new EthersAdapter()],
    networks,
    metadata,
    projectId,
    features: {
        analytics: true, // Optional - defaults to your Cloud configuration
    },
});

function App() {
    return (
        <div className="container mx-auto">
            <Header />
            <Body />
        </div>
    );
}

export default App;
