import { AccountTokenProps } from "@/constants/inscriptions";
import { AccountBalanceDataProps } from "@/utils/request.type";
import { atom, useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export type SearchResultList = AccountTokenProps &
  AccountBalanceLocalDataProps & { amount?: number };

const inscriptionsSearchText = atom<string>("");
const inscriptionsSearchTextHash = atom<string>("");

const inscriptionsSearchLoading = atom(false);
const inscriptonssSearchResult = atom<SearchResultList[]>([] as SearchResultList[]);

export const useInscriptionsSearchState = () => {
  const [searchText, setSearchText] = useAtom(inscriptionsSearchText);
  const [searchTextHash, setSearchTextHash] = useAtom(inscriptionsSearchTextHash);
  const [loading, setLoading] = useAtom(inscriptionsSearchLoading);
  const [result, setResult] = useAtom(inscriptonssSearchResult);

  return {
    setLoading,
    loading,
    setSearchText: (val: string) => {
      console.log(val)
      setSearchText(val)
    },
    setSearchTextHash,
    searchTextHash,
    searchText,
    setResult,
    result,
  };
};

export type AccountBalanceLocalDataProps = AccountBalanceDataProps & {
  type?: string;
};

const inscriptionsBetchTransferState = atom<SearchResultList>(
  {} as SearchResultList
);

export const useInscriptionsBetchTransferState = () => {
  const [betchTransferState, setBetchTransferState] = useAtom(
    inscriptionsBetchTransferState
  );

  const setSelectedToken = (token: SearchResultList) => {
    setBetchTransferState(token);
  };

  return {
    betchTransferState,
    setSelectedToken,
  };
};

const inscriptionsIsTrueChain = atom<boolean>(false);

const inscriptionsChainId = atom<number>(-1);

export const useInscriptionsIsTrueChainStore = () => {
  const [isTrueChian, setIsTrueChain] = useAtom(inscriptionsIsTrueChain);
  const [chainId, setChainId] = useAtom(inscriptionsChainId);

  return {
    isTrueChian,
    setIsTrueChain,
    chainId,
    setChainId,
  };
};

const tabKeyAtom = atom("");

export const useTabKey = () => {
  const [tabKey, setTabKey] = useAtom(tabKeyAtom);
  const [, setSearchText] = useAtom(inscriptionsSearchText);
  const nav = useNavigate();

  const setTabKeyChange = (key: string) => {
    if (key === "Documents") {
      window.open("https://github.com/48Club/FRC-20-inscription", "_blank");
      return;
    }
    if (key === "bridge") {
      window.open("https://www.zkamoeba.com/en/bridge/");
      return;
    }
    if (key === "more" || key === "bridge") {
      return;
    }
    setTabKey(key);
    if (key !== "account") {
      setSearchText("");
    }
    nav(`/${key}`);
  };

  return {
    setTabKey: setTabKeyChange,
    tabKey,
  };
};



export type InscriptonsEffectDataProps = {
  border: string,
  lv: string,
  tick_hash: string
}

const inscriptionsEffectData = atom<InscriptonsEffectDataProps[]>([] as InscriptonsEffectDataProps[]);

export const useInscriptionsEffectData = () => {
  const [effectData, setEffectData] = useAtom(inscriptionsEffectData);

  return {
    effectData,
    setEffectData
  }
}