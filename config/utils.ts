// lib/wagmi-config.ts (or wherever you're configuring wagmi)
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { Chain } from 'wagmi/chains';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error('Project ID is not defined');

// ✅ Define your Sonic Testnet chain
const sonicTestnet: Chain = {
  id: 57054,
  name: 'Sonic Blaze Testnet',
  nativeCurrency: {
    name: 'Sonic',
    symbol: 'S',
    decimals: 5,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.blaze.soniclabs.com'], // Replace with actual Sonic RPC if needed
    },
    public: {
      http: ['https://rpc.blaze.soniclabs.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Sonic Explorer',
      url: 'https://blaze.soniclabs.com',
    },
  },
  testnet: true,
};

// 🔧 Your current metadata
const metadata = {
  name: 'Web3Modal Example',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// ✅ Use Sonic instead of Sepolia (or keep both if needed)
export const config = defaultWagmiConfig({
  chains: [sonicTestnet], // or: [sonicTestnet, sepolia] if you want both
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
