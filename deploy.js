const ethers = require("ethers");
const fs = require("fs")



async function main(){

    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
    const wallet = new ethers.Wallet("0x6d2eebef68336ea835d2e78b89f412c57288abd3187dd703ba2fdd32ff7675c2",provider);
    const abi= fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi","utf8");
    const binaryCode=fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin","utf8");
    // const contractFactory = new ethers.ContractFactory(abi,binaryCode,wallet);
    // console.log("deploying wait....");
    // const contract = await contractFactory.deploy({gasPrice:1000000000000});
    // console.log("deployed",contract);


    console.log("deploy only transaction data");
    const nonce = await wallet.getNonce();;
    const tx = {
        nonce:nonce,
        gasPrice: 200000000000,
        gasLimit : 1000000000,
        to : null,
        value : 0,
        data:"0x6d2eebef68336ea835d2e78b89f412c57288abd3187dd703ba2fdd32ff7675c2",
        chainId:1337
    };
   
    const sendTxResponse = await wallet.sendTransaction(tx);
    await sendTxResponse.wait(1);
    console.log(sendTxResponse);
}

main().then(()=>process.exit(0)).catch((erro=>{
    console.error(erro);
    process.exit(1);
}))