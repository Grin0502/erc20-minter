"use client"

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { formatUnits } from "viem";

import Erc20ABI from "@/abi/erc20.json";
import { validateAddress } from "@/config/functions";

export default function Home() {
  const { writeContract } = useWriteContract();
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const [contractAddress, setContractAddress] = useState("");

  const valid = validateAddress(contractAddress);
  const { data: balanceData } = useReadContract({
    address: `0x${contractAddress.substring(2)}`,
    abi: Erc20ABI,
    functionName: "balanceOf",
    args: [address!],
    query: { enabled: !!address && !!valid},
  });
  const balance = balanceData === undefined ? balanceData : parseInt(formatUnits(balanceData as bigint, 0));

  const handleMint = async () => {
    writeContract({
      abi: Erc20ABI,
      address: `0x${contractAddress.substring(2)}`,
      functionName: 'mint',
      args: [],
    })
  }

  return (
    <div className="m-[10px] flex flex-col gap-[20px]">
      <input className="border-black border-[1px] rounded-2xl p-[10px]" type="text" value={contractAddress} onChange={(e:any) => setContractAddress(e.target.value)}/>
      <div>Balance: {balance}</div>
      <div className="flex flex-row gap-[20px]">
        <div 
          onClick={() => open()}
          className="p-[10px] border-[3px] rounded-2xl border-black bg-white hover:bg-[#f6f6f6f0] active:bg-[#d6d6d6c0] cursor-pointer select-none">
          {isConnected && address
            ? `${address.slice(0, 6)}...${address.slice(-4)}`
            : "CONNECT WALLET"}
        </div>
        <div 
          onClick={handleMint}
          className="p-[10px] border-[3px] rounded-2xl border-black bg-white hover:bg-[#f6f6f6f0] active:bg-[#d6d6d6c0] cursor-pointer select-none">
          Mint
        </div>
      </div>
    </div>
  );
}
