import { switchChain } from "@/constants/chain";
import { useInscriptionsIsTrueChainStore } from "@/store";
import { BSC, useEthers } from "@usedapp/core";
import { useEffect } from "react";


const useIsChainId = () => {

    const {isTrueChian, setIsTrueChain, setChainId, chainId} = useInscriptionsIsTrueChainStore()

    const { account } = useEthers()
    
    const chainChange = (chainId: any) => {
        setChainId(Number(chainId))
        console.log(Number(chainId), BSC.chainId)
        setIsTrueChain(Number(chainId) === BSC.chainId)
    }

    useEffect(() => {
        if(window?.ethereum && account) {
            if(Number(window.ethereum.networkVersion) !== BSC.chainId) {
                switchChain("Default")
            }
            chainChange(Number(window.ethereum.networkVersion))
            window?.ethereum.on('chainChanged', chainChange);
        }
        return () => {
            if(window?.ethereum) {
                window?.ethereum.removeListener('chainChanged', chainChange);
            }
        }
    }, [account])

    return {
        chainId,
        isTrueChainId: isTrueChian,
        chainChange
    };
}

export default useIsChainId;