import { SearchResultList, useInscriptionsBetchTransferState } from "@/store";
import { Button, Input, InputNumber, Radio, Space, Tooltip, App as AntdApp } from "antd";
import { useEffect, useMemo, useState } from "react";
import { InfoCircleOutlined } from '@ant-design/icons'
import { useInscriptionsSearchState } from "@/store";
import { useEthers, useSendTransaction } from "@usedapp/core";
import * as utils from "web3-utils";
import { decimalsToStr, strToDecimals } from "@/utils";
import { getTabTypeStyleByTabType } from "../explorer/InscriptionsRecord";
import inscriptionsApi from "@/utils/request";
import TransfersRow, { TransfersRowDataProps } from "../explorer_detail/Rows/TransfersRow";
import { useParams } from "react-router-dom";
import NoData from "@/components/NoData";
import useIsChainId from "@/hooks/useChainId";


const BatchTransfer: React.FC<{
    detail: SearchResultList,
    setLoading: (loading: boolean) => void;
    getTransfer: () => void;
    setTickName: (t:string) => void;
}> = ({ detail, setLoading, getTransfer, setTickName }) => {

    const { betchTransferState } = useInscriptionsBetchTransferState()

    const [addressStrList, setAddressStrList] = useState<string>('')

    const [enterAddress, setAddress] = useState('')
    const [amount, setAmount] = useState('')

    const { sendTransaction, state } = useSendTransaction()

    const [tabType, setTabType] = useState("1");

    const { message, modal } = AntdApp.useApp()

    const { searchText } = useInscriptionsSearchState()

    const { account } = useEthers()

    const param = useParams()

    const { isTrueChainId } = useIsChainId()

    const [hashVal, addressVal] = useMemo(() => {
        if(param.hash) {
            return param.hash.split('-');
        } else {
            return []
        }
    }, [param.hash])

    useEffect(() => {
        if(addressVal === account) {
            setTabType("1")
        } else {
            setTabType("2")
        }
    }, [addressVal, account])

    // const currentTick = useMemo(() => {
    //     if (result) {
    //         return result.find(res => res.tick_hash === betchTransferState?.tick_hash);
    //     } else {
    //         return {} as SearchResultList;
    //     }
    // }, [result, betchTransferState])

    const addressListValue = useMemo(() => {
        if (addressStrList) {
            const addressStrs = addressStrList.split('\n');
            const _addressList = addressStrs.map(add => {
                const [address, amount] = add.replace(/\s*/g, '').split(',');
                return {
                    address,
                    amount
                }
            })

            return _addressList;
        }
        return []
    }, [addressStrList])

    useEffect(() => {
        if (enterAddress && amount) {
            setAddressStrList(`${enterAddress},${amount}`)
        } else {
            setAddressStrList('')
        }
    }, [enterAddress, amount])

    const betchTransfer = () => {
        console.log(betchTransferState, detail, 'betchTransferState')
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

        if (detail === undefined || detail?.amount === undefined) {
            message.error("Please select a token")
            return;
        }

        if (detail?.amount - +amount < 0 || +amount <= 0) {
            message.error("Invalid Balance")
            return;
        }

        const str = `data:,
        {
          "p":"bnb-48",
          "op":"transfer",
          "tick-hash":"${detail.tick_hash}",
          "to":"${enterAddress}",
          "amt":"${strToDecimals(+amount, detail.decimals)}"
        }`
        console.log(str.replace(/\s*/g, ''), 'str')
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

    const chooseMyWallet = searchText?.toUpperCase() === account?.toUpperCase();

    const hasOkMoney = detail?.amount ? (detail?.amount - +amount >= 0) : false;

    const hasOkMoney2 = detail?.amount && amount !== '' ? (detail?.amount - +amount >= 0) : false;

    // const [transferPage, setTransferPage] = useState(1)

    // const [transferTotal, setTransferTotal] = useState(0)
    const [transferRecords, setTransferRecords] = useState<TransfersRowDataProps[]>([])

    const getTransferList = () => {
        setLoading(true)
        inscriptionsApi.getUserBalances({
            tick_hash: [hashVal],
            address: addressVal
        }).then(res => {
            setLoading(false)
            if (res.code === 0) {
                const hasDatas = res.data.wallet.filter(i => (i.changes && i.changes.length > 0));
                const newData: any = [];
                hasDatas.forEach(data => {
                    if(data.tick_hash === hashVal) {
                        setTickName(data.tick)
                    }
                    data.changes.forEach(i => {
                        const item = {
                            ...data,
                            ...i,
                            amount: decimalsToStr(i.input_decode.amt, data.decimals)
                        }
                        newData.push(item);
                    })
                })
                setTransferRecords(newData)
            }
            // console.log(res, 'transfer list')
        }).catch(() => setLoading(false))
    }

    useEffect(() => {
        if (param.hash && tabType === "2" && addressVal) {
            getTransferList()
        }
    }, [param.hash, tabType, addressVal])

    useEffect(() => {
        if (tabType === '1' && account) {
            getTransfer()
        }
    }, [tabType])

    return <div className="w-full mt-[24px] px-[24px] border border-[#3F3F3F] bg-[#000000CC] rounded-[4px] py-[32px]">
        <Radio.Group className="flex w-[214px]" value={tabType} onChange={(val) => setTabType(val.target.value)}>
            {
                addressVal?.toLocaleLowerCase() === account?.toLocaleLowerCase() && <Radio.Button value="1" style={getTabTypeStyleByTabType(tabType, "1")} className="mr-[16px]  leading-[40px] flex-1 h-[40px] text-center no-border">Transfer</Radio.Button>
            }
            <Radio.Button value="2" style={getTabTypeStyleByTabType(tabType, "2")} className="leading-[40px] flex-1 text-center h-[40px] no-border">History</Radio.Button>
        </Radio.Group>
        {
            tabType === '1' ?
                <>
                    <h1 className="mt-[32px] text-[24px] leading-[28px]">Recipient and Amount</h1>
                    {/* <p className="text-[12px] font-[400] leading-[24px] mt-[4px] text-[#A9A9A9]">Enter one address and amount on each line, separated with commas.</p> */}
                    <p className="text-[12px] font-[400] leading-[24px] mt-[12px] text-[#A9A9A9]">Enter the address and amount in the blank.</p>
                    <p>Address</p>
                    <Input value={enterAddress} className="h-[48px] bg-[#3B3B3B]" onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
                    <p>Amount</p>
                    <InputNumber controls={false} className="w-full input-full-height h-[48px] bg-[#3B3B3B]" min={(detail?.decimals ? decimalsToStr(1, detail?.decimals) : 0).toString()} value={amount} onChange={(val) => val && setAmount(val)} placeholder="Enter amount" />
                    {/* <Input.TextArea value={addressStrList} onChange={(e) => setAddressStrList(e.target.value)} className="px-[24px] py-[6px] text-[14px] font-[400] leading-[20px] bg-[#F9F9F9] rounded-[4px] no-border mt-[24px] md:mt-[12px]" rows={8} placeholder={`0x2b1F577230F4D72B3818895688b66abD9701B4dC,141421\n0x2b1F577230F4D72B3818895688b66abD9701B4dC,141421\n0x2b1F577230F4D72B3818895688b66abD9701B4dC,141421`}></Input.TextArea> */}
                    <h1 className="text-[24px] font-[700] leading-[28px] mt-[54px] text-[#FFFFFF]">Confirm</h1>
                    <div className="mt-[24px] flex text-[14px] font-[400] leading-[20px] text-[#A9A9A9] justify-between">
                        <span>Address</span>
                        <span>Amount</span>
                    </div>
                    <div className="h-[1px] w-full bg-[#FFFFFF] mt-[12px] opacity-20"></div>
                    <div className="overflow-y-scroll py-[12px] text-[12px] font-[400] h-[56px]">
                        {
                            addressListValue.map(add => {

                                let isNotAddress = false;
                                try {
                                    utils.toChecksumAddress(add.address);
                                    isNotAddress = false;
                                } catch (error) {
                                    isNotAddress = true;
                                }
                                const hasAddress = addressListValue.filter(i => i.address === add.address).length > 1;

                                const isError = isNotAddress || hasAddress;

                                return <div key={add.address} style={{ color: isNotAddress ? "#EF2B2B" : hasAddress ? '#ffc801' : undefined }} className="flex md:h-[26px] items-center justify-between md:my-0 my-[8px]">
                                    <Space className="md:w-full w-[205px] break-all">
                                        {add.address}
                                        {
                                            isError && <Tooltip trigger={["hover"]} placement="topLeft" title={isNotAddress ? "Invalid address" : hasAddress ? "Detected the same address as others!" : undefined}>
                                                <InfoCircleOutlined className=" cursor-pointer" />
                                            </Tooltip>
                                        }

                                    </Space>
                                    <span>{add.amount}</span>
                                </div>
                            })
                        }
                    </div>
                    <div className="h-[1px] w-full bg-[#FFFFFF] mt-[12px] opacity-20"></div>
                    <div className="mt-[24px] text-[12px]">
                        <p className="flex justify-between leading-[18px]">
                            <span>Total</span>
                            <span>{amount || '-'}</span>
                        </p>
                        <p className="flex justify-between mt-[12px] leading-[18px]">
                            <span>Your balance</span>
                            <span>{detail?.amount || '-'}</span>
                        </p>
                        <p style={{ color: hasOkMoney ? 'green' : '#EF2B2B' }} className="flex justify-between mt-[12px] leading-[18px]">
                            <span>Remaining</span>
                            <span>{detail?.amount ? (detail?.amount - +amount) : '-'}</span>
                        </p>
                    </div>
                    <Button loading={state.status === "Mining" || state.status === "PendingSignature"} onClick={betchTransfer} disabled={chooseMyWallet === false || !hasOkMoney2} type="primary" className="mt-[24px] h-[48px] disabled:hover:h-[48px] disabled:h-[48px] no-border bg-yellow disabled:border-none disabled:bg-[#E9E9E9] disabled:text-[#1E1E1E]" block>{chooseMyWallet ? (hasOkMoney2 ? "Batch Transfer" : "Invalid Balance") : 'Not Your Wallet'}</Button>
                </>
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
                    {/* <div className="justify-center flex mt-[32px]">
                        <Pagination onChange={setTransferPage} current={transferPage} showSizeChanger={false} pageSize={pageSize} className="table-pagination-btn" defaultCurrent={1} total={transferTotal} />
                    </div> */}
                </div>
        }

    </div>
}

export default BatchTransfer;
