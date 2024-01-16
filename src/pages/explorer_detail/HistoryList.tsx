import { Pagination, Radio, Spin, message } from "antd";
import { useEffect, useState } from "react";
import HoldersRow, { HoldersRowDataProps } from "./Rows/HoldersRow";
import TransfersRow, { TransfersRowDataProps } from "./Rows/TransfersRow";
import { useParams } from "react-router-dom";
import inscriptionsApi, { pageSize } from "@/utils/request";
import { decimalsToStr } from "@/utils";
import { ExplorerDataProps } from "@/utils/request.type";
import { getTabTypeStyleByTabType } from "../explorer/InscriptionsRecord";
import NoData from "@/components/NoData";
// import { useRequest } from "ahooks";


const HistoryList: React.FC<{
    detail: ExplorerDataProps
}> = ({ detail }) => {

    const [tabType, setTabType] = useState("1");

    const [holdersRecords, setHoldersRecords] = useState<HoldersRowDataProps[]>([])
    const [transferRecords, setTransferRecords] = useState<TransfersRowDataProps[]>([])

    const param = useParams()

    const [holdersPage, setHoldersPage] = useState(1)
    const [transferPage, setTransferPage] = useState(1)

    const [holdersTotal, setHoldersTotal] = useState(0)
    const [transferTotal, setTransferTotal] = useState(0)

    const [historyLoading, setHistoryLoading] = useState(false)

    const [oneData, setOneData] = useState<HoldersRowDataProps>({} as HoldersRowDataProps)

    const getHoldersList = (loading: boolean = true) => {
        loading && setHistoryLoading(true)
        inscriptionsApi.getInscriptionsHoldersList({
            tick_hash: param.id as string,
            page: holdersPage
        }).then(res => {
            setHistoryLoading(false)
            if (res.code === 0) {
                setHoldersTotal(res.data.count);
                const startRank = holdersPage === 1 ? 0 : ((holdersPage - 1) * pageSize);
                // console.log(res.data.list, 'res.data.list')
                const resData: HoldersRowDataProps[] = res.data.list.map((i, index: number) => {
                    const progress = +((decimalsToStr(i.balance, detail.decimals) / decimalsToStr(detail.minted, detail.decimals)) * 100).toFixed(2)
                    return {
                        ...i,
                        progress,
                        amount: decimalsToStr(+i.balance, detail.decimals),
                        rank: startRank + index + 1
                    }
                });
                if(resData[0] && holdersPage === 1) {
                    setOneData(resData[0])
                }
                setHoldersRecords(resData);
            } else {
                message.error({
                    content: "error"
                })
            }
        }).catch(() => setHistoryLoading(false))
    }

    // const { run } = useRequest(async (loading: boolean) => {
    //     if (tabType === "1") {
    //         getHoldersList(loading)
    //     } else {
    //         getTransferList(loading)
    //     }
    // }, requestTimeConfig);

    // useEffect(() => {
    //     if (param.id) {
    //         run(false)
    //     }
    // }, [param.id])

    useEffect(() => {
        if (param.id && tabType === "1" && detail.tick_hash) {
            getHoldersList()
        }
    }, [holdersPage, param.id, tabType, detail])

    const getTransferList = (loading: boolean = true) => {
        loading && setHistoryLoading(true)
        inscriptionsApi.getInscriptionsTransfersList({
            tick_hash: param.id as string,
            page: transferPage
        }).then(res => {
            setHistoryLoading(false)
            if (res.code === 0) {
                setTransferTotal(res.data.count);
                setTransferRecords(res.data.list.map((i) => ({
                    ...i,
                    amount: decimalsToStr(i.input_decode.amt, detail.decimals)
                })));
            }
            // console.log(res, 'transfer list')
        }).catch(() => setHistoryLoading(false))
    }

    useEffect(() => {
        if (param.id && tabType === "2") {
            getTransferList()
        }
    }, [transferPage, param.id, tabType])

    return <div className="mt-[32px] pb-[120px] rounded-t-[10px] relative overflow-hidden pt-[38px] px-[16px]">
        <div className="z-[1] absolute top-0 left-0 w-full bg-color-table"></div>
        <div className="relative z-[2]">
        <div className="flex items-center justify-between">
            <Radio.Group className="flex w-[214px]" value={tabType} onChange={(val) => {
                setHoldersPage(1)
                setTransferPage(1)
                setTabType(val.target.value)
            }}>
                <Radio.Button value="1" style={getTabTypeStyleByTabType(tabType, "1")} className=" leading-[40px] flex-1 h-[40px] text-center no-border">Holders</Radio.Button>
                <Radio.Button value="2" style={getTabTypeStyleByTabType(tabType, "2")} className="mx-[16px] leading-[40px] flex-1 text-center h-[40px] no-border">Transfers</Radio.Button>
            </Radio.Group>
            <svg
                onClick={(e: any) => {
                    e.target.classList.add("reload-animate")
                    if (tabType === "1") {
                        getHoldersList()
                    } else {
                        getTransferList()
                    }
                }} onAnimationEnd={(e: any) => {
                    e.target.classList.remove("reload-animate")
                }} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5 23.946C19.6439 25.2716 17.3698 25.8785 15.1 25.654C14.994 25.644 14.89 25.626 14.782 25.612C14.578 25.584 14.374 25.558 14.176 25.518C14.054 25.4933 13.9326 25.4653 13.812 25.434C13.6176 25.3911 13.4248 25.3411 13.234 25.284C13.144 25.256 13.054 25.224 12.962 25.192C12.6942 25.1027 12.4306 25.0013 12.172 24.888C11.9235 24.7796 11.6799 24.6602 11.442 24.53L11.41 24.514C10.3439 23.9201 9.3988 23.131 8.62403 22.188C8.58603 22.142 8.55003 22.09 8.51203 22.042C7.14912 20.3217 6.4083 18.1909 6.41003 15.996H8.63403C8.6633 15.9961 8.69202 15.9881 8.71706 15.9729C8.7421 15.9577 8.7625 15.936 8.77603 15.91C8.79008 15.8847 8.79677 15.8559 8.79536 15.8269C8.79394 15.7979 8.78448 15.7699 8.76803 15.746L5.03403 10.07C5.01958 10.0473 4.99964 10.0286 4.97604 10.0157C4.95244 10.0027 4.92595 9.99592 4.89903 9.99592C4.87211 9.99592 4.84563 10.0027 4.82203 10.0157C4.79843 10.0286 4.77848 10.0473 4.76403 10.07L1.02803 15.746C0.996033 15.792 0.990033 15.856 1.02003 15.91C1.05003 15.964 1.10403 15.996 1.16203 15.996H3.38603C3.38603 18.684 4.21403 21.174 5.61803 23.232C5.63603 23.262 5.64803 23.292 5.66603 23.32C5.81203 23.53 5.97403 23.726 6.13003 23.926C6.18803 24 6.24403 24.078 6.30403 24.152C6.53403 24.436 6.77803 24.698 7.03003 24.96L7.10003 25.032C8.20017 26.1494 9.50171 27.0485 10.936 27.682L11.168 27.786C11.434 27.898 11.71 27.996 11.984 28.09C12.114 28.134 12.242 28.18 12.374 28.22C12.616 28.292 12.862 28.352 13.11 28.4121C13.276 28.452 13.438 28.494 13.608 28.526C13.676 28.542 13.742 28.562 13.812 28.5721C14.046 28.614 14.28 28.6381 14.516 28.666L14.768 28.702C17.7715 29.0082 20.7835 28.2089 23.24 26.454C23.5691 26.2184 23.7925 25.8629 23.8621 25.4641C23.9317 25.0654 23.8419 24.6552 23.612 24.322C23.4994 24.1571 23.3549 24.0163 23.1872 23.9078C23.0194 23.7994 22.8317 23.7255 22.635 23.6905C22.4383 23.6554 22.2367 23.66 22.0418 23.7039C21.8469 23.7478 21.6627 23.8301 21.5 23.946ZM28.618 15.996C28.6201 13.4207 27.8457 10.9046 26.396 8.77605C26.374 8.74005 26.36 8.70405 26.34 8.67405C26.1642 8.42789 25.9801 8.18775 25.788 7.95405L25.722 7.86805C24.4622 6.31426 22.8476 5.08581 21.014 4.28605C20.9637 4.26353 20.9136 4.2402 20.864 4.21605C20.5721 4.09719 20.2766 3.98714 19.978 3.88605C19.864 3.85005 19.758 3.81005 19.646 3.77805C19.3845 3.69958 19.1204 3.6302 18.854 3.57005C18.708 3.53605 18.56 3.49805 18.41 3.46805C18.336 3.45405 18.268 3.43205 18.194 3.41805C17.994 3.38205 17.794 3.36805 17.594 3.34205C17.458 3.32405 17.32 3.30205 17.182 3.28805C16.8495 3.25847 16.5159 3.24179 16.182 3.23805C16.122 3.23805 16.062 3.22805 16 3.22805C13.4066 3.22364 10.8769 4.03144 8.76603 5.53805C8.43606 5.77345 8.21189 6.12918 8.14191 6.52844C8.07194 6.92769 8.16178 7.33845 8.39203 7.67205C8.50504 7.83663 8.64968 7.97707 8.81753 8.08517C8.98537 8.19327 9.17306 8.26688 9.36965 8.30169C9.56623 8.3365 9.76779 8.33182 9.96255 8.28793C10.1573 8.24404 10.3414 8.16181 10.504 8.04605C12.3642 6.721 14.6412 6.11428 16.914 6.33805L17.168 6.37405C17.398 6.40005 17.624 6.43405 17.846 6.47805C17.944 6.49605 18.042 6.52205 18.138 6.54405C18.356 6.59405 18.576 6.64805 18.788 6.71205L18.988 6.78205C19.232 6.86205 19.47 6.94805 19.706 7.04805L19.78 7.08205C21.19 7.69605 22.428 8.64205 23.394 9.82605L23.412 9.85005C24.8245 11.5874 25.5938 13.759 25.59 15.998H23.368C23.3388 15.9977 23.31 16.0054 23.2849 16.0203C23.2597 16.0352 23.2391 16.0567 23.2253 16.0825C23.2115 16.1082 23.205 16.1373 23.2065 16.1665C23.2081 16.1957 23.2176 16.2239 23.234 16.248L26.972 21.922C26.9866 21.9443 27.0064 21.9626 27.0298 21.9753C27.0532 21.988 27.0794 21.9946 27.106 21.9946C27.1326 21.9946 27.1588 21.988 27.1822 21.9753C27.2056 21.9626 27.2255 21.9443 27.24 21.922L30.974 16.248C31.0015 16.2478 31.0285 16.2404 31.0523 16.2266C31.0762 16.2128 31.096 16.1932 31.11 16.1695C31.124 16.1458 31.1317 16.1189 31.1323 16.0914C31.1329 16.0639 31.1263 16.0367 31.1133 16.0125C31.1003 15.9882 31.0813 15.9677 31.0581 15.953C31.0349 15.9382 31.0082 15.9297 30.9807 15.9283C30.9533 15.9268 30.9259 15.9325 30.9012 15.9447C30.8766 15.9569 30.8555 15.9753 30.84 15.998H28.618V15.996Z" fill="white" />
            </svg>
        </div>
        <Spin spinning={historyLoading} size="large">
            {
                tabType === "1"
                    ?
                    <div>
                        <div className="w-full">
                            <div className="w-[100%] mt-[40px]">
                                <div className="flex flex-row justify-between items-center mb-4">
                                    <div className="w-[20%] text-[#A9A9A9]">Rank</div>
                                    <div className="w-[30%] text-[#A9A9A9]">Address</div>
                                    <div className="w-[30%] text-[#A9A9A9]">Percentage</div>
                                    <div className="w-[20%] flex justify-end text-[#A9A9A9]">Amount</div>
                                </div>
                                {
                                    holdersRecords.length > 0 ? (
                                        <>
                                            {holdersRecords.map((i) => <HoldersRow oneData={oneData} key={i.address} data={i} />)}

                                        </>
                                    ) : <NoData />
                                }
                            </div>
                        </div>
                        <div className="justify-center flex mt-[32px]">
                            <Pagination onChange={setHoldersPage} current={holdersPage} pageSize={pageSize} showSizeChanger={false} className="table-pagination-btn" defaultCurrent={1} total={holdersTotal} />
                        </div>
                    </div>
                    :
                    <div>
                        <div className="w-full overflow-x-scroll overflow-y-hidden diy-scrollbar ">
                            <div className="w-[700px] mt-[40px]">
                                <div className="flex flex-row justify-between items-center mb-4">
                                    <div className="w-[60px] text-[#A9A9A9]">Method</div>
                                    <div className="w-[80px] text-[#A9A9A9]">Status</div>
                                    <div className="w-[80px] text-[#A9A9A9]">Amount</div>
                                    <div className="w-[100px] text-[#A9A9A9]">From</div>
                                    <div className="w-[100px] text-[#A9A9A9]">To</div>
                                    <div className="w-[180px] text-[#A9A9A9] flex justify-end">Date Time</div>
                                </div>
                                {
                                    transferRecords.length > 0 ?
                                        transferRecords.map((i) => {
                                            return <TransfersRow key={i.tx_hash} data={i} />
                                        })
                                        : <NoData />
                                }
                            </div>
                        </div>
                        <div className="justify-center flex mt-[32px]">
                            <Pagination onChange={setTransferPage} current={transferPage} showSizeChanger={false} pageSize={pageSize} className="table-pagination-btn" defaultCurrent={1} total={transferTotal} />
                        </div>
                    </div>
            }
        </Spin>
        </div>

    </div>
}

export default HistoryList;