// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "lib/forge-std/src/Script.sol";
import {BasicNFT} from "src/NFT.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";


contract MintNFTOnContract is Script {
    string public constant KHUMNUM = "ipfs://bafybeib4xmxrs6ngdeh7mslxumgx75zgugriw7ofstqikow6xfsbtm4k4a";

    function run() external{
        address mostRecentlyDeploy = DevOpsTools.get_most_recent_deployment("BasicNFT", block.chainid);
        mintNftOnContract(mostRecentlyDeploy);
    }

    function mintNftOnContract (address recentDeploy) public {
        vm.startBroadcast();
        BasicNFT(recentDeploy).mintNFT(KHUMNUM);
        vm.stopBroadcast();
    }

}