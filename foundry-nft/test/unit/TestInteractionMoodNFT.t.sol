// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test, console} from "@forge-std/src/Test.sol";
import {FlipMoodNFT} from "../../script/FlipMoodNFT.s.sol";
import {MintMoodNFT} from "../../script/MintMoodNFT.s.sol";
import {DeployMoodNFT} from "../../script/DeployMoodNFT.s.sol";
import {MoodNFT} from "../../src/MoodNFT.sol";

contract TestFlipMoodNFT is Test {
    FlipMoodNFT flipMoodNFT;
    MintMoodNFT mintMoodNFT;
    DeployMoodNFT deployMoodNFT;
    MoodNFT moodNFT;
    address private user = makeAddr("user");

    function setUp() public {
        deployMoodNFT = new DeployMoodNFT();
        moodNFT = deployMoodNFT.run();
        flipMoodNFT = new FlipMoodNFT();
        mintMoodNFT = new MintMoodNFT();
    }

    function testMintMoodNFT() public {
        mintMoodNFT.mintNftOnContract(address(moodNFT));
        console.log("Minted MoodNFT Token URI:", moodNFT.tokenURI(0));
    }

    function testFlipMoodNFT() public {
        // First mint an NFT to have a token to flip
        mintMoodNFT.mintNftOnContract(address(moodNFT));
        string memory tokenUriBeforeFlip = moodNFT.tokenURI(0);
        // Then flip the mood of token ID 0
        flipMoodNFT.flipMoodNftOnContract(address(moodNFT), 0);
        string memory tokenUriAfterFlip = moodNFT.tokenURI(0);
        assertFalse(
            keccak256(abi.encodePacked(tokenUriBeforeFlip)) ==
                keccak256(abi.encodePacked(tokenUriAfterFlip)),
            "Token URI should change after flipping mood"
        );
    }
}
