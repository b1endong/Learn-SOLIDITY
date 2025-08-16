// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "lib/forge-std/src/Test.sol";
import {console} from "lib/forge-std/src/console.sol";
import {BasicNFT} from "../src/NFT.sol";
import {DeployNFT} from "../script/DeployNFT.s.sol";

contract TestNFT is Test {
    BasicNFT public basicNft;
    DeployNFT public deployer;
    string constant public KHUMNUM = "ipfs://bafybeib4xmxrs6ngdeh7mslxumgx75zgugriw7ofstqikow6xfsbtm4k4a";
    address public user = makeAddr("user");

    function setUp() public {
        deployer = new DeployNFT();
        basicNft = deployer.run();
    }

    function test_SetUp() public view {
        //String = array of bytes => cant compare => hash 
        //encodeString => bytes32
        //hash => keccak256
        string memory expectName = "KhumNum";
        string memory expectSymbol = "KNFT";

        assert(keccak256(abi.encodePacked(expectName)) == keccak256(abi.encodePacked(basicNft.name())));
        assert(keccak256(abi.encodePacked(expectSymbol)) == keccak256(abi.encodePacked(basicNft.symbol())));
    }

    function test_MintNFT() public {
        vm.prank(user);
        basicNft.mintNFT(KHUMNUM);

        assertEq(basicNft.ownerOf(0), user);
        assertEq(basicNft.tokenURI(0), KHUMNUM);
        assertEq(basicNft.balanceOf(user), 1);
    }
}