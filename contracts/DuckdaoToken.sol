// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ERC20.sol";  // Assuming ERC20.sol is in the same directory

contract DuckdaoToken is ERC20 {
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH =
        0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
    mapping(address => uint256) public nonces;

    constructor(uint256 _supply) ERC20("DuckDAO Token", "DD") {
        uint256 chainId;
        assembly {
            chainId := chainid()
        }
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("DuckDAO Token")),
                keccak256(bytes("1")),
                chainId,
                address(this)
            )
        );

        _mint(msg.sender, _supply * 1e18);  // Mint initial supply to contract deployer
    }

    /**
     * @dev Allows token approval via EIP-2612 permit, enabling gasless approvals.
     * @param owner The address of the token owner.
     * @param spender The address of the spender who will be allowed to spend the tokens.
     * @param value The amount of tokens to be approved.
     * @param deadline The deadline timestamp after which the permit is invalid.
     * @param v, r, s The components of the signature for permit authorization.
     */
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public {
        require(deadline >= block.timestamp, "Duckdao Permit: EXPIRED");
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        PERMIT_TYPEHASH,
                        owner,
                        spender,
                        value,
                        nonces[owner]++,
                        deadline
                    )
                )
            )
        );
        address recoveredAddress = ecrecover(digest, v, r, s);
        require(
            recoveredAddress != address(0) && recoveredAddress == owner,
            "Duckdao Permit: INVALID_SIGNATURE"
        );
        _approve(owner, spender, value);  // Approve the spender to spend the tokens
    }
}
