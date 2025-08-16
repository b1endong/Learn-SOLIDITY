// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC721} from "@openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract BasicNFT is ERC721{
    uint256 private s_tokenCounter;
    mapping(uint256 => string) private s_tokenIdToURI;
    constructor() ERC721("KhumNum", "KNFT") {
        s_tokenCounter = 0;
    }

    function mintNFT(string memory tokenURI) public {
        s_tokenIdToURI[s_tokenCounter] = tokenURI;
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter++;
    } 

    function tokenURI(uint256 tokenId) public view override returns (string memory){
        return s_tokenIdToURI[tokenId];
    }
}