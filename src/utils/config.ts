/* eslint-disable sonarjs/no-commented-code */
import {
  type AppKitNetwork,
  arbitrum,
  mainnet,
  bscTestnet,
  bsc,
} from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { cookieStorage, createStorage, http } from "@wagmi/core";
import { injected } from "wagmi/connectors";

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_WALLET_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Sepolia RPC URL
export const MAINNET_RPC_URL = "https://ethereum-rpc.publicnode.com";
export const ARBITRUM_RPC_URL =
  "https://go.getblock.io/2120e985bbf4402f8dfd2311683260c8";
export const BSC_TESTNET_RPC_URL = "https://bsc-testnet-rpc.publicnode.com";
export const BSC_RPC_URL = "https://bsc-dataseed.bnbchain.org";

// Custom Sepolia configuration with your RPC
export const customArbitrum = {
  ...arbitrum,
  rpcUrls: {
    default: {
      http: [ARBITRUM_RPC_URL],
    },
    public: {
      http: [ARBITRUM_RPC_URL],
    },
  },
};

export const customMainnet = {
  ...mainnet,
  rpcUrls: {
    default: {
      http: [MAINNET_RPC_URL],
    },
    public: {
      http: [MAINNET_RPC_URL],
    },
  },
};

export const customBscTestnet = {
  ...bscTestnet,
  rpcUrls: {
    default: {
      http: [BSC_TESTNET_RPC_URL],
    },
    public: {
      http: [BSC_TESTNET_RPC_URL],
    },
  },
};

export const customBsc = {
  ...bsc,
  rpcUrls: {
    default: {
      http: [BSC_RPC_URL],
    },
    public: {
      http: [BSC_RPC_URL],
    },
  },
};

// Only Arbitrum network
// export const networks: AppKitNetwork[] = [customBsc];
export const networks: AppKitNetwork[] = [mainnet, customBsc];

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  connectors: [injected()],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
  transports: {
    [customBsc.id]: http(BSC_RPC_URL),
    [mainnet.id]: http(MAINNET_RPC_URL),
  },
});

export const config = wagmiAdapter.wagmiConfig;
