// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "lib/forge-std/src/Script.sol";
import {BasicNFT} from "src/NFT.sol";

contract DeployNFT is Script {
    function run() external returns (BasicNFT nft) {
        vm.startBroadcast();
        nft = new BasicNFT();
        vm.stopBroadcast();
    }
}