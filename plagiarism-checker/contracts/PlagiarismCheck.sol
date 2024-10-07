pragma solidity ^0.8.0;

contract PlagiarismCheck {
    
    struct Document {
        string hash; // Hash of the document
        address author; // Address of the document's author
        uint timestamp; // Timestamp of document upload
    }

    mapping(string => Document) public documents;
    
    event DocumentAdded(string hash, address author, uint timestamp);
    
    function addDocument(string memory _hash) public {
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
