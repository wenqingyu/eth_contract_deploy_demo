# ETH Contract Deploy Tutorial
## How to deploy a smart contract that uses Chainlink using Hardhat?

## Purpose
This is a quick tutorial to demostate how easily to deploy a Chainlink interative smart contract onto Ethereum by using Hardhat.

`**Hardhat** is a development environment to compile, deploy, test, and debug your Ethereum software. Hardhat Tutorial.` (https://hardhat.org/getting-started/)


## Prerequisite
In this tutorial, we assume you have the basic knowledge of:
- How to build a Ethereum smart contract (https://docs.chain.link/docs/example-walkthrough)
- How to integrate Chainlink into smart contract (https://docs.chain.link/docs/getting-started)


You can use current sample code for a trail:

```
git clone https://github.com/wenqingyu/eth_contract_deploy_demo.git

cd eth_contract_deploy_demo
```

Now you are ready to start!

## Steps to deploy smart contract with Hardhat


### # Setup hardhat

Installing hardhat in local will make your environment reproducible, this way you will avoid future version conflicts.

First, to create a new npm project in a new folder, if you don't have any (skip this step if you already have it)

``` npm init ```

Install harhat in local

``` npm install --save-dev hardhat```


### # Quick start with Hardhat
Then to create a Hardhat

```npx hardhat ```

Then you will have something as follow
```
$ npx hardhat
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

Welcome to Hardhat v2.0.0

? What do you want to do? …
❯ Create a sample project
  Create an empty hardhat.config.js
  Quit

  ```

Let's create a sample project for now, and we will go through steps of compile, test and deploy.

and it will confirm with you about project root, adding .gitignore, improvement agreement, etc, just press enter to select default option for now.

```
√ Hardhat project root: ·/<Your project root> 
√ Do you want to add a .gitignore? (Y/n) · y
√ Help us improve Hardhat with anonymous crash reports & basic usage data? (Y/n) · true
```

The Sample project will use hardhat-waffle and harthat-ethers, which make Hardhat compatible with tests built with Waffle.

```
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
```

now, to test if your hardhat is successfully installed, run

### # Running tasks

```
npx hardhat
```
now you will get something like this, and you will see what you can do with Hardhat

```
Hardhat version 2.0.3

Usage: hardhat [GLOBAL OPTIONS] <TASK> [TASK OPTIONS]

GLOBAL OPTIONS:

  --config              A Hardhat config file.
  --emoji               Use emoji in messages.
  --help                Shows this message, or a task's help if its name is provided
  --max-memory          The maximum amount of memory that Hardhat can use.
  --network             The network to connect to.
  --show-stack-traces   Show stack traces.
  --tsconfig            Reserved hardhat argument -- Has no effect.
  --verbose             Enables Hardhat verbose logging
  --version             Shows hardhat's version.


AVAILABLE TASKS:

  accounts      Prints the list of accounts
  check         Check whatever you need
  clean         Clears the cache and deletes all artifacts
  compile       Compiles the entire project, building all artifacts
  console       Opens a hardhat console
  flatten       Flattens and prints contracts and their dependencies
  help          Prints this message
  node          Starts a JSON-RPC server on top of Hardhat Network
  run           Runs a user-defined script after compiling the project
  test          Runs mocha tests

To get help for a specific task run: npx hardhat help [task]
```

### # Install Chainlink package


```
npm install @chainlink/contracts --save
```

### # Compile Chainlink ETH/USD price feed smart contract
Now, we will try to deploy a smart contract to provide ETH/USD price feed from Chainlink. You can find sample smart contract code here (https://docs.chain.link/docs/get-the-latest-price).

Let's create a new contact in ````./contracts/````folder, called ```PriceFeed.sol```, and copy&paste sample code that you find in Chainlink doc link above.


Compile contracts by running: 

```
npx hardhat compile
```

> Notice: You might see some Warnings in the lines, but we will ignore it for now, as the purpose of this tutorial is walk you through a deployment process. 

If you want to go through testing process with ether.js with Waffle and Web3.js with Truffle, please these two link for details:

ether.js & Waffles: https://hardhat.org/guides/waffle-testing.html

Web3.js & Truffle: https://hardhat.org/guides/truffle-testing.html

### # Deploying you contract

we recommend deploying smart contracts using scripts. We can deploy the PriceFeed contract  with the deploy script ```./scripts/pf-deploy-script.js```

Let's create a new file in ```./scripts```folder called ```./pf-deploy-script.js```

Copy&paste following deploy script into ```./pf-deploy-script.js```

```
// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const PriceFeed = await hre.ethers.getContractFactory("PriceConsumerV3");
  const pf = await PriceFeed.deploy();

  await pf.deployed();

  console.log("Chainlink Price Feed deployed to:", pf.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Now, we are ready to deploy PriceFeed contract into testnet by running: 

```
npx hardhat run --network testnet scripts/pf-deploy-script.js

Chainlink Price Feed deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```


### # Conclusion
Congratulation! You just successfully deployed a Chainlink Price Feed (ETH/USDC) smart contract into Ethereum (testnet). Hope this simple walkthrough help you get familiar with:

* Basic understganding of Hardhat 
* Conceptually familiar with testing, compiling and deploying a smart contract)
* More important, how smooth to create a  cool DAPP with Chainlink, and make it up and running.


Any suggestion / recommendation / further contribution feel free to contact yuwenqingisu@gmail.com.
