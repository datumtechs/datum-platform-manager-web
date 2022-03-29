interface Network { 
    chainName:string;
    chainId:number;
    rpcUrl:string;
    symbol:string;
    blockExplorerUrl:string;
}

const config :Network= {
    chainName: 'PlatON开发网',
    chainId: 210309,
    rpcUrl: 'https://10.1.1.51:6789',
    symbol: 'LAT',
    blockExplorerUrl: 'https://uatscan.platon.network:1443/'
}

export default config