import { Spin, App as AntdApp, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Miner from "../explorer/Miner";
import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { DEPLOY_MINERS } from "@/constants/inscriptions";
import * as utils from "web3-utils";
import { useEthers, useSendTransaction } from "@usedapp/core";
import { decimalsToStr } from "@/utils";
import { ExplorerDataProps } from "@/utils/request.type";
import Container from "@/components/Container";
import Label from "@/components/Label";
import useIsChainId from "@/hooks/useChainId";

const ExplorerDetailHeader: React.FC<{
    detail: ExplorerDataProps;
    onReload: () => void;
    loading: boolean
}> = ({ detail, loading, onReload }) => {

    const nav = useNavigate()

    const { account } = useEthers()

    const { sendTransaction, state } = useSendTransaction()

    const { message, modal } = AntdApp.useApp()

    const param = useParams()

    const { isTrueChainId } = useIsChainId()

    const miners = useMemo(() => {
        if (detail?.miners) {
            const _minersStr = detail.miners.split(',');
            const _miners = DEPLOY_MINERS.filter(miner => _minersStr.includes(miner.address));
            return _miners;
        } else {
            return []
        }
    }, [detail])

    const openLink = (link: string) => {
        window.open(link, "_blank")
    }

    const mint = () => {
        if (account === undefined) {
            modal.info({
                title: "",
                content: "Please Connect the Wallet First",
                wrapClassName: "alert-model-wrap",
                centered: true
            })
            return;
        }
        if (isTrueChainId === false) {
            modal.info({
                title: "",
                content: "Wrong Network",
                wrapClassName: "alert-model-wrap",
                centered: true
            })
            return;
        }

        const str = `data:,{
            "p":"${detail.protocol}",
            "op":"mint",
            "tick-hash":"${param.id}",
            "amt":"${detail.lim}"
        }`

        sendTransaction({
            to: account,
            value: utils.toWei(0, 'ether'),
            data: utils.stringToHex(str.replace(/\s*/g, '')),
        })
    }

    useEffect(() => {
        if (state.status === "Success") {
            message.success("Success")
        }
    }, [state.status])

    const parseData = useMemo(() => {
        if (detail) {
            const getNumberByData = (data: number) => {
                return decimalsToStr(data, detail.decimals).toFixed(2)
            }
            const maxSupply = getNumberByData(detail.max)
            const minted = getNumberByData(detail.minted);
            const lim = getNumberByData(detail.lim);
            const progress = ((detail.minted / detail.max) * 100).toFixed(2);
            return {
                lim: isNaN(lim as any) ? '-' : lim,
                maxSupply: isNaN(maxSupply as any) ? '-' : maxSupply,
                progress: isNaN(progress as any) ? '-' : progress,
                minted: isNaN(minted as any) ? '-' : minted,
                hasOver: +minted >= +maxSupply
            }
        } else {
            return {
                lim: 0,
                maxSupply: 0,
                progress: 0,
                minted: 0,
                hasOver: true
            };
        }
    }, [detail])

    return <>

        <Spin spinning={loading}>
            <Container className="pb-0">
                <div className="flex items-center">
                    <svg onClick={() => nav('/')} className=" mr-[12px] cursor-pointer" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.2" width="40" height="40" rx="16" fill="#F9F9F9" />
                        <path d="M15.828 21L21.192 26.364L19.778 27.778L12 20L19.778 12.222L21.192 13.636L15.828 19L28 19L28 21L15.828 21Z" fill="white" />
                    </svg>
                    <Label text="Inscriptions" />
                </div>
                <div className="mt-[60px] flex items-center">
                    <div className="flex items-center">
                        <h1 className="text-[28px] font-[700] leading-[24px] text-[#FFFFFF]">{detail.tick}</h1>
                        <span className="ml-[8px] text-[10px] leading-[12px] px-[6px] py-[4px] text-[#FFFFFF] bg-[rgba(217,217,217,0.4)] rounded-full">{detail.protocol}</span>
                    </div>
                    <svg
                        onClick={(e: any) => {
                            e.target.classList.add("reload-animate")
                            onReload()
                        }} onAnimationEnd={(e: any) => {
                            e.target.classList.remove("reload-animate")
                        }}
                        className=" cursor-pointer ml-[12px]" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.4689 19.4561C15.9608 20.5331 14.1131 21.0262 12.2689 20.8438C12.1827 20.8357 12.0982 20.8211 12.0105 20.8097C11.8447 20.7869 11.679 20.7658 11.5181 20.7333C11.4189 20.7132 11.3203 20.6905 11.2224 20.6651C11.0644 20.6302 10.9077 20.5895 10.7527 20.5432C10.6796 20.5204 10.6065 20.4944 10.5317 20.4684C10.3142 20.3959 10.1 20.3135 9.88987 20.2214C9.68794 20.1333 9.49004 20.0363 9.29674 19.9306L9.27074 19.9176C8.40448 19.435 7.63662 18.7939 7.00712 18.0277C6.97624 17.9903 6.94699 17.9481 6.91612 17.9091C5.80875 16.5113 5.20684 14.78 5.20824 12.9967H7.01524C7.03903 12.9967 7.06236 12.9902 7.0827 12.9779C7.10305 12.9656 7.11962 12.9479 7.13062 12.9268C7.14203 12.9062 7.14747 12.8828 7.14632 12.8593C7.14517 12.8357 7.13748 12.813 7.12412 12.7936L4.09024 8.18182C4.0785 8.16336 4.0623 8.14817 4.04312 8.13764C4.02395 8.12712 4.00243 8.1216 3.98056 8.1216C3.95868 8.1216 3.93716 8.12712 3.91799 8.13764C3.89882 8.14817 3.88261 8.16336 3.87087 8.18182L0.835368 12.7936C0.809368 12.8309 0.804493 12.8829 0.828868 12.9268C0.853243 12.9707 0.897118 12.9967 0.944243 12.9967H2.75124C2.75124 15.1807 3.42399 17.2038 4.56474 18.8759C4.57937 18.9003 4.58912 18.9247 4.60374 18.9474C4.72237 19.1181 4.85399 19.2773 4.98074 19.4398C5.02787 19.4999 5.07337 19.5633 5.12212 19.6234C5.30899 19.8542 5.50724 20.0671 5.71199 20.2799L5.76887 20.3384C6.66273 21.2463 7.72023 21.9768 8.88562 22.4916L9.07412 22.5761C9.29024 22.6671 9.51449 22.7467 9.73712 22.8231C9.84274 22.8588 9.94674 22.8962 10.054 22.9287C10.2506 22.9872 10.4505 23.0359 10.652 23.0847C10.7869 23.1172 10.9185 23.1513 11.0566 23.1773C11.1119 23.1903 11.1655 23.2066 11.2224 23.2147C11.4125 23.2488 11.6026 23.2683 11.7944 23.2911L11.9991 23.3203C14.4394 23.569 16.8867 22.9197 18.8826 21.4938C19.15 21.3023 19.3315 21.0135 19.388 20.6895C19.4446 20.3655 19.3716 20.0323 19.1849 19.7616C19.0933 19.6275 18.976 19.5131 18.8397 19.425C18.7033 19.3369 18.5508 19.2769 18.391 19.2484C18.2312 19.22 18.0674 19.2237 17.909 19.2593C17.7507 19.295 17.601 19.3619 17.4689 19.4561ZM23.2522 12.9967C23.2539 10.9042 22.6247 8.85989 21.4469 7.13045C21.429 7.1012 21.4176 7.07195 21.4014 7.04757C21.2585 6.84757 21.1089 6.65245 20.9529 6.46257L20.8992 6.3927C19.8756 5.13025 18.5637 4.13213 17.074 3.48232C17.0331 3.46403 16.9924 3.44507 16.9521 3.42545C16.7149 3.32887 16.4748 3.23946 16.2322 3.15732C16.1396 3.12807 16.0535 3.09557 15.9625 3.06957C15.75 3.00581 15.5354 2.94945 15.319 2.90057C15.2004 2.87295 15.0801 2.84207 14.9582 2.8177C14.8981 2.80632 14.8429 2.78845 14.7827 2.77707C14.6202 2.74782 14.4577 2.73645 14.2952 2.71532C14.1847 2.7007 14.0726 2.68282 13.9605 2.67145C13.6903 2.64741 13.4192 2.63386 13.148 2.63082C13.0992 2.63082 13.0505 2.6227 13.0001 2.6227C10.893 2.61912 8.8376 3.27545 7.12249 4.49957C6.85439 4.69084 6.67225 4.97987 6.6154 5.30426C6.55854 5.62866 6.63154 5.9624 6.81862 6.23345C6.91044 6.36717 7.02796 6.48128 7.16433 6.56911C7.30071 6.65694 7.4532 6.71674 7.61293 6.74503C7.77266 6.77331 7.93642 6.76952 8.09466 6.73385C8.2529 6.69819 8.40246 6.63138 8.53462 6.53732C10.046 5.46072 11.8961 4.96776 13.7427 5.14957L13.9491 5.17882C14.136 5.19995 14.3196 5.22757 14.5 5.26332C14.5796 5.27795 14.6592 5.29907 14.7372 5.31695C14.9144 5.35757 15.0931 5.40145 15.2654 5.45345L15.4279 5.51032C15.6261 5.57532 15.8195 5.6452 16.0112 5.72645L16.0714 5.75407C17.217 6.25295 18.2229 7.02157 19.0077 7.98357L19.0224 8.00307C20.17 9.41464 20.7951 11.1791 20.792 12.9983H18.9866C18.9629 12.9981 18.9395 13.0043 18.9191 13.0164C18.8986 13.0285 18.8819 13.046 18.8706 13.0669C18.8594 13.0878 18.8541 13.1114 18.8554 13.1352C18.8567 13.1589 18.8644 13.1818 18.8777 13.2014L21.9149 17.8116C21.9267 17.8297 21.9428 17.8446 21.9618 17.8548C21.9808 17.8651 22.0021 17.8705 22.0237 17.8705C22.0454 17.8705 22.0666 17.8651 22.0856 17.8548C22.1047 17.8446 22.1208 17.8297 22.1326 17.8116L25.1665 13.2014C25.1888 13.2012 25.2108 13.1952 25.2301 13.184C25.2495 13.1728 25.2656 13.1569 25.277 13.1376C25.2884 13.1184 25.2946 13.0965 25.2951 13.0742C25.2955 13.0518 25.2902 13.0297 25.2797 13.01C25.2691 12.9903 25.2537 12.9737 25.2348 12.9617C25.2159 12.9497 25.1943 12.9428 25.1719 12.9416C25.1496 12.9405 25.1274 12.9451 25.1073 12.955C25.0873 12.9649 25.0702 12.9798 25.0576 12.9983H23.2522V12.9967Z" fill="white" />
                    </svg>
                </div>
                <div className="mt-[26px] w-full mb-[24px] flex items-center">
                    <div className="flex-1 h-[12px] md:h-[9px] overflow-hidden rounded-full bg-[rgba(255,200,1,.2)]">
                        <div style={{ width: `${parseData.progress}%` }} className="h-full rounded-full bg-[#FFC801]"></div>
                    </div>
                    <span className="ml-[12px] text-[16px] font-[400] leading-[24px] text-[#FFFFFF]">{parseData.progress}%</span>
                </div>
                <div className="w-full">
                    {/* <div className="h-[104px] w-full flex items-center justify-between border px-[32px] border-transparent border-b-[#EAEAEA]">
                <h1 className="text-[24px] md:text-[20px] font-[700] leading-[104px]">Overview</h1>
                <Button disabled={parseData.hasOver} loading={state.status === "Mining" || state.status === "PendingSignature"} onClick={mint} type="primary" className="md:w-[152px]  disabled:hover:h-[40px] disabled:h-[40px] w-[96px] h-[40px] bg-yellow">Mint</Button>
            </div> */}
                    <div className="h-full mt-[24px] text-[14px] font-[400]">
                        <p className="w-full flex flex-col md:flex-row md:items-center justify-between">
                            <span className=" leading-[20px] text-[#A9A9A9]">Tick-hash</span>
                            <span onClick={() => openLink(`https://bscscan.com/tx/${param.id}`)} className=" flex items-center leading-[20px] text-[#FFFFFF] cursor-pointer underline">
                                <span className="flex-1 break-all">{param.id}</span>
                                <svg className="ml-[8px] cursor-pointer" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.858 10.8733V16.3096C16.858 17.2252 16.0885 18 15.179 18H1.67907C0.769572 18 0 17.2252 0 16.3096V2.71892C0 1.80331 0.769572 1.02856 1.67907 1.02856H7.07902C7.49361 1.02856 7.85896 1.39377 7.85896 1.81114C7.85896 2.22851 7.4962 2.59632 7.07902 2.59632H1.67907C1.60133 2.59632 1.55728 2.64067 1.55728 2.71892V16.3096C1.55728 16.3879 1.60133 16.4322 1.67907 16.4322H15.179C15.2567 16.4322 15.3007 16.3879 15.3007 16.3096V10.8733C15.3007 10.456 15.6635 10.0908 16.0781 10.0908C16.4927 10.0908 16.858 10.456 16.858 10.8733Z" fill="white" />
                                    <path d="M16.8553 1.81114V6.79353C16.8553 7.2109 16.4926 7.5761 16.078 7.5761C15.6634 7.5761 15.3006 7.2109 15.3006 6.79353V3.69714L9.44723 9.58732C9.30731 9.72818 9.11815 9.80122 8.87977 9.80122C8.64138 9.80122 8.45223 9.73079 8.31231 9.58993C8.16202 9.43863 8.0791 9.24299 8.0791 9.03952C8.0791 8.83605 8.16202 8.6404 8.31231 8.48911L14.2098 2.59632H11.1289C10.7143 2.59632 10.3515 2.23112 10.3515 1.81114C10.3515 1.39377 10.7143 1.02856 11.1289 1.02856H16.078C16.4926 1.02856 16.8553 1.39377 16.8553 1.81114Z" fill="white" />
                                </svg>
                            </span>
                        </p>

                        <p className="w-full flex flex-col md:flex-row justify-between mt-[24px]">
                            <span className=" leading-[20px] text-[#A9A9A9]">Limit per Mint</span>
                            <span className=" leading-[20px] text-[#FFFFFF]">{parseData.lim}</span>
                        </p>
                        <p className="w-full flex flex-col md:flex-row justify-between mt-[24px]">
                            <span className=" leading-[20px] text-[#A9A9A9]">Max Supply</span>
                            <span className=" leading-[20px] text-[#FFFFFF]">{parseData.maxSupply}</span>
                        </p>
                        <p className="w-full flex flex-col md:flex-row justify-between mt-[24px]">
                            <span className=" leading-[20px] text-[#A9A9A9]">Minted</span>
                            <span className=" leading-[20px] text-[#FFFFFF]">{parseData.minted}</span>
                        </p>
                        <p className="w-full flex flex-col md:flex-row justify-between mt-[24px]">
                            <span className=" leading-[20px] text-[#A9A9A9]">Decimals</span>
                            <span className=" leading-[20px] text-[#FFFFFF]">{detail.decimals}</span>
                        </p>
                        <div className="w-full flex flex-col md:flex-row md:items-start justify-between mt-[24px]">
                            <span className=" leading-[20px] text-[#A9A9A9]">Miners</span>
                            <div className="flex-1 md:ml-[50px] -mr-[12px] mt-[6px] md:mt-0 flex-wrap md:justify-end flex items-center leading-[20px] text-[#FFFFFF]">
                                {
                                    miners?.map(miner => {
                                        return <Miner key={miner.address} className="mb-[12px]" miner={miner} />
                                    })
                                }
                            </div>
                        </div>
                        <p className="w-full flex flex-col md:flex-row justify-between mt-[24px]">
                            <span className=" leading-[20px] text-[#A9A9A9]">Deploy By</span>
                            <span onClick={() => openLink(`https://bscscan.com/address/${detail.deploy_by}`)} className=" flex items-center leading-[20px] text-[#FFFFFF] cursor-pointer underline">
                                <span className="flex-1 break-all">
                                    {detail.deploy_by}
                                </span>
                                <svg className="ml-[8px] cursor-pointer" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.858 10.8733V16.3096C16.858 17.2252 16.0885 18 15.179 18H1.67907C0.769572 18 0 17.2252 0 16.3096V2.71892C0 1.80331 0.769572 1.02856 1.67907 1.02856H7.07902C7.49361 1.02856 7.85896 1.39377 7.85896 1.81114C7.85896 2.22851 7.4962 2.59632 7.07902 2.59632H1.67907C1.60133 2.59632 1.55728 2.64067 1.55728 2.71892V16.3096C1.55728 16.3879 1.60133 16.4322 1.67907 16.4322H15.179C15.2567 16.4322 15.3007 16.3879 15.3007 16.3096V10.8733C15.3007 10.456 15.6635 10.0908 16.0781 10.0908C16.4927 10.0908 16.858 10.456 16.858 10.8733Z" fill="white" />
                                    <path d="M16.8553 1.81114V6.79353C16.8553 7.2109 16.4926 7.5761 16.078 7.5761C15.6634 7.5761 15.3006 7.2109 15.3006 6.79353V3.69714L9.44723 9.58732C9.30731 9.72818 9.11815 9.80122 8.87977 9.80122C8.64138 9.80122 8.45223 9.73079 8.31231 9.58993C8.16202 9.43863 8.0791 9.24299 8.0791 9.03952C8.0791 8.83605 8.16202 8.6404 8.31231 8.48911L14.2098 2.59632H11.1289C10.7143 2.59632 10.3515 2.23112 10.3515 1.81114C10.3515 1.39377 10.7143 1.02856 11.1289 1.02856H16.078C16.4926 1.02856 16.8553 1.39377 16.8553 1.81114Z" fill="white" />
                                </svg>
                            </span>
                        </p>
                        <p className="w-full flex flex-col md:flex-row justify-between mt-[24px]">
                            <span className=" leading-[20px] text-[#A9A9A9]">Deploy Time</span>
                            <span className=" leading-[20px] text-[#FFFFFF]">{detail.block_at ? dayjs(detail.block_at * 1000).format("YYYY-MM-DD HH:mm:ss") : '-'}</span>
                        </p>
                        <p className="w-full flex flex-col md:flex-row justify-between mt-[24px]">
                            <span className=" leading-[20px] text-[#A9A9A9]">Holders</span>
                            <span className=" leading-[20px] text-[#FFFFFF]">{detail?.holders}</span>
                        </p>
                        {/* <p className="w-full flex flex-col md:flex-row justify-between mt-[24px]">
                    <span className=" leading-[20px] text-[#A9A9A9]">Total Transactions</span>
                    <span className=" leading-[20px] text-[#FFFFFF]">{detail.transactions}</span>
                </p> */}
                    </div>
                </div>
            </Container>
        </Spin>
        {
            parseData.hasOver === false && <div onClick={mint} className=" fixed bottom-0 left-0 w-full h-[75px] z-[90] pt-[12px] px-[16px] bg-[#1B1B1B99]">
                <Button loading={state.status === "Mining" || state.status === "PendingSignature"} className="w-full h-[40px] disabled:bg-[#eee] disabled:text-[#000] bg-[#FFC801]">Mint</Button>
            </div>
        }
    </>
}

export default ExplorerDetailHeader;