interface Network { 
    chainName:string;
    chainId:number;
    rpcUrl:string;
    symbol:string;
    blockExplorerUrl:string;
}

const config :Network= {
    chainName: 'PlatON开发网',
    chainId: 2203181,
    rpcUrl: 'https://devnetopenapi.platon.network/rpc',
    symbol: 'LAT',
    blockExplorerUrl: 'https://uatscan.platon.network:1443/'
}

export default config