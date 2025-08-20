// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {MoodNFT} from "../src/MoodNFT.sol";
import {Script} from "@forge-std/src/Script.sol";
import {DevOpsTools} from "@foundry-devops/src/DevOpsTools.sol";

contract FlipMoodNFT is Script {
    function run() external {
        address mostRecentlyDeploy = DevOpsTools.get_most_recent_deployment(
            "MoodNFT",
            block.chainid
        );
        flipMoodNftOnContract(mostRecentlyDeploy, 0);
    }

    function flipMoodNftOnContract(
        address recentDeploy,
        uint256 tokenId
    ) public {
        vm.startBroadcast();
        MoodNFT(recentDeploy).flipMood(tokenId);
        vm.stopBroadcast();
    }
}
