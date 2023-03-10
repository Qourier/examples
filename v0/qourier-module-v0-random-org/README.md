# Random Org

A request to get a random number in a smart contract (random.org).

# Use by Qouriers

```
RANDOM_ORG_KEY="API key"

RANDOM_ORG_KEY=$RANDOM_ORG_KEY qourier
```

# Use by Developers

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@qourier/contracts/Hub.sol";

contract RandomOrg {
    address public hub;
    uint256 public price;

    uint256 private id;
    uint256 private result;

    constructor(address hub_, uint256 price_) {
        hub = hub_;
        price = price_;
    }

    function createTask() public payable {
        Hub(hub).createTask0{ value: price }(bytes32("random-org"));
    }

    function completeTask(uint256 id_, bytes memory result_) external {
        require(msg.sender == hub, "Only Qourier can change the state.");
        id = id_;
        result = bytesToUint(result_);
    }

    function getTask() public view returns(uint256, uint256) {
        return (id, result);
    }

    function bytesToUint(bytes memory b) public pure returns (uint256) {
        uint256 res = 0;
        for (uint256 i = 0; i < b.length; i++) {
            uint256 c = uint256(uint8(b[i]));
            if (c >= 48 && c <= 57) {
                res = res * 10 + (c - 48);
            }
        }
        return res;
    }
}
```
