// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {MoodNFT} from "../src/MoodNFT.sol";
import {Script} from "@forge-std/src/Script.sol";
import {DevOpsTools} from "@foundry-devops/src/DevOpsTools.sol";

contract MintMoodNFT is Script {
    function run() external {
        address mostRecentlyDeploy = DevOpsTools.get_most_recent_deployment(
            "MoodNFT",
            block.chainid
        );
        mintNftOnContract(mostRecentlyDeploy);
    }

    function mintNftOnContract(address recentDeploy) public {
        vm.startBroadcast();
        MoodNFT(recentDeploy).mintNFT();
        vm.stopBroadcast();
    }
}
