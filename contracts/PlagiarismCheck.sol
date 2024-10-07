// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PlagiarismCheck is Ownable {
    struct Document {
        string hash;
        address author;
        uint timestamp;
    }

    mapping(string => Document) public documents;
    event DocumentAdded(string hash, address author, uint timestamp);

    function addDocument(string memory _hash) public onlyOwner {
        require(documents[_hash].author == address(0), "Document already exists");
        documents[_hash] = Document(_hash, msg.sender, block.timestamp);
        emit DocumentAdded(_hash, msg.sender, block.timestamp);
    }

    function checkPlagiarism(string memory _hash) public view returns (bool) {
        return documents[_hash].author != address(0);
    }

    function getDocumentDetails(string memory _hash) public view returns (address, uint) {
        require(documents[_hash].author != address(0), "Document does not exist");
        return (documents[_hash].author, documents[_hash].timestamp);
    }
}
