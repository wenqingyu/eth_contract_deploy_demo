require("@nomiclabs/hardhat-waffle");
const Web3 = require("web3");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("priceFeed", "Prints latest price feed", async () => {

  // Change this to use your own infura ID
  // const web3 = new Web3("https://kovan.infura.io/v3/34ed41c4cf28406885f032930d670036");
  const web3 = new Web3("http://127.0.0.1:8545/");

  console.log("Start calling Chainlink ETH/USDC")
  // AggregatorV3Interface ABI
  const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
  // Price Feed Address
  const addr = "0x9326BFA02ADD2366b30bacB125260Af641031331";

  // Set up contract instance
  const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);

  //Make call to latestRoundData()
  priceFeed.methods.latestRoundData().call()
      .then((roundData) => {
          // Do something with roundData
          console.log("Latest Round Data", roundData)
      });


});



// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
};

