import { useNavigate, useParams } from "react-router-dom";
import BatchTransfer from "./BatchTransfer";
import { SearchResultList, useInscriptionsBetchTransferState } from "@/store";
import Container from "@/components/Container";
import { decimalsToStr, shorten } from "@/utils";
import { Modal, Spin, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import inscriptionsApi from "@/utils/request";
import { useEthers } from "@usedapp/core";


let instance: ReturnType<typeof Modal.error> | undefined;

const AccountMobileBetch = () => {
    const nav = useNavigate()

    const { betchTransferState } = useInscriptionsBetchTransferState()

    const param = useParams()

    const { account } = useEthers()

    const [loaidng, setLoading] = useState(false)

    const [tickName, setTickName] = useState("")

    const [detail, setDetail] = useState<SearchResultList>({} as SearchResultList);

    const [hashVal] = useMemo(() => {
        if(param.hash) {
            return param.hash.split('-');
        } else {
            return []
        }
    }, [param.hash])

    const getTransfer = () => {
        const [hashVal, addressVal] = param.hash ? param.hash.split('-') : [];
        if(addressVal?.toLocaleLowerCase() !== account?.toLocaleLowerCase()) return;
        setLoading(true)
        inscriptionsApi.getUserBalances({
                address: account as string,
        }).then(res => {
            setLoading(false)
            if (res.code === 0) {
                const details = res.data.wallet.find(w => w.tick_hash === hashVal)
                if(details) {
                    setDetail({
                        ...details,
                        amount: decimalsToStr(details.balance, details.decimals)
                    })
                    setTickName(details.tick)
                } else {
                    if (instance === undefined) {
                        instance = Modal.error({
                            title: 'Error!',
                            content: "No data found",
                            okText: "Back",
                            wrapClassName: "alert-model-wrap",
                            onOk() {
                                instance = undefined;
                                nav('/account')
                            },
                        });
                    }
                }
            }
        })
    }

    useEffect(() => {
        if(account || param.hash) {
            getTransfer()
        }
    }, [account])


    return <Container className="mt-[82px]">
        <div className="flex items-center mt-[32px]">
            <svg onClick={() => nav(-1)} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.2" width="40" height="40" rx="16" fill="#F9F9F9" />
                <path d="M15.828 21L21.192 26.364L19.778 27.778L12 20L19.778 12.222L21.192 13.636L15.828 19L28 19L28 21L15.828 21Z" fill="white" />
            </svg>
            <h1 className="my-0 ml-[7px] text-[#FFC801]">{tickName}({shorten(detail.tick_hash || hashVal)})</h1>
            <Typography.Paragraph className="m-[0_!important] betch-copy " copyable={{
                text: betchTransferState.tick_hash, icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.9375 1.875H14.8125C15.1606 1.875 15.4944 2.01328 15.7406 2.25942C15.9867 2.50556 16.125 2.8394 16.125 3.1875V11.0625C16.125 11.4106 15.9867 11.7444 15.7406 11.9906C15.4944 12.2367 15.1606 12.375 14.8125 12.375H6.9375C6.5894 12.375 6.25556 12.2367 6.00942 11.9906C5.76328 11.7444 5.625 11.4106 5.625 11.0625V3.1875C5.625 2.8394 5.76328 2.50556 6.00942 2.25942C6.25556 2.01328 6.5894 1.875 6.9375 1.875ZM6.9375 3C6.88777 3 6.84008 3.01975 6.80492 3.05492C6.76975 3.09008 6.75 3.13777 6.75 3.1875V11.0625C6.75 11.0871 6.75485 11.1115 6.76427 11.1343C6.7737 11.157 6.78751 11.1777 6.80492 11.1951C6.82233 11.2125 6.843 11.2263 6.86575 11.2357C6.8885 11.2451 6.91288 11.25 6.9375 11.25H14.8125C14.8622 11.25 14.9099 11.2302 14.9451 11.1951C14.9802 11.1599 15 11.1122 15 11.0625V3.1875C15 3.13777 14.9802 3.09008 14.9451 3.05492C14.9099 3.01975 14.8622 3 14.8125 3H6.9375ZM11.25 13.5C11.25 13.3508 11.3093 13.2077 11.4148 13.1023C11.5202 12.9968 11.6633 12.9375 11.8125 12.9375C11.9617 12.9375 12.1048 12.9968 12.2102 13.1023C12.3157 13.2077 12.375 13.3508 12.375 13.5V14.8125C12.375 15.1606 12.2367 15.4944 11.9906 15.7406C11.7444 15.9867 11.4106 16.125 11.0625 16.125H3.1875C2.8394 16.125 2.50556 15.9867 2.25942 15.7406C2.01328 15.4944 1.875 15.1606 1.875 14.8125V6.9375C1.875 6.5894 2.01328 6.25556 2.25942 6.00942C2.50556 5.76328 2.8394 5.625 3.1875 5.625H4.5C4.64918 5.625 4.79226 5.68426 4.89775 5.78975C5.00324 5.89524 5.0625 6.03832 5.0625 6.1875C5.0625 6.33668 5.00324 6.47976 4.89775 6.58525C4.79226 6.69074 4.64918 6.75 4.5 6.75H3.1875C3.13777 6.75 3.09008 6.76975 3.05492 6.80492C3.01975 6.84008 3 6.88777 3 6.9375V14.8125C3 14.8622 3.01975 14.9099 3.05492 14.9451C3.09008 14.9802 3.13777 15 3.1875 15H11.0625C11.1122 15 11.1599 14.9802 11.1951 14.9451C11.2302 14.9099 11.25 14.8622 11.25 14.8125V13.5Z" fill="#A9A9A9" />
                </svg>
            }} />
            <span className="inline-block ml-[8px] w-[46px] h-[18px] font-[400] flex-center text-[10px] bg-[#1E1E1E] rounded-full">BNB-48</span>
        </div>
        <Spin spinning={loaidng}>
            <BatchTransfer setTickName={setTickName} getTransfer={getTransfer} setLoading={setLoading} detail={detail} />
        </Spin>
    </Container>
}

export default AccountMobileBetch;