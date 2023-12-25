import { SearchResultList, useInscriptionsBetchTransferState, useInscriptionsSearchState } from "@/store";
import { shorten } from "@/utils";
import { Input, Radio, Spin, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTabTypeStyleByTabType } from "../explorer/InscriptionsRecord";
import Container from "@/components/Container";
import NoData from "@/components/NoData";
import bnb48 from '@/assets/images/avatar.svg'

const Row: React.FC<{
    data: SearchResultList;
    click: () => void;
    active: boolean;
}> = ({ data, click }) => {

    const nav = useNavigate()

    const { searchText } = useInscriptionsSearchState()

    const ItemNode = (<>
        <div className="flex-1 flex items-center text-[12px] text-[#E2B201] font-[400] leading-[24px]">
            {
                data.tick_hash === "0xd893ca77b3122cb6c480da7f8a12cb82e19542076f5895f21446258dc473a7c2" ?
                    <div className="w-[28px] h-[28px] rounded-full relative">
                        {/* <img className="w-full h-full" src={effectData.icon} alt="" />
                        <div className="absolute bottom-0 w-[13px] h-[13px] right-0">
                            {effectData.lv}
                        </div> */}
                    </div>
                    :
                    <div className="w-[28px] h-[28px] rounded-full relative">
                        <img className="w-full h-full" src={bnb48} alt="" />
                    </div>
            }
            <div className="ml-[8px] flex-1 leading-[20px]">
                <p className="flex items-center my-0 font-[700]">{data.tick}<span className="ml-[4px] h-[17px] w-[46px] flex-center leading-[17px] font-[400] bg-[rgba(217,217,217,.4)] text-[10px] rounded-full text-[#F9F9F9]">BNB-48</span></p>
                <div className="text-[10px] leading-[12px] text-[#A9A9A9]">
                    <Typography.Paragraph className="m-[0_!important] explorer-copy-color text-[10px]" copyable={{ text: data.tick_hash }}>{shorten(data.tick_hash)}</Typography.Paragraph>
                </div>
            </div>
        </div>
        {/* <div className="flex justify-center">
            {data.decimals || '-'}
        </div> */}
        <div className="flex justify-center">
            {data.amount || '-'}
        </div>
    </>)

    return (
        <div onClick={() => {
            click();
            nav(`/account/betch/${data.tick_hash}-${searchText}`)
        }} className="cursor-pointer border transition-all border-transparent rounded-[4px] h-[56px] flex flex-row justify-between items-center text-[14px] md:text-[16px]">
            {ItemNode}
        </div>
    )
}

const SelectedToken = ({ onSearch }: any) => {

    const { setSelectedToken, betchTransferState } = useInscriptionsBetchTransferState()

    const { result, loading, setSearchTextHash, searchTextHash } = useInscriptionsSearchState()

    const [tabType, setTabType] = useState("bnb-48");

    const resultList = useMemo(() => {
        return result
    }, [tabType, result])

    useEffect(() => {
        if (result[0]?.tick_hash) {
            setSelectedToken(result[0])
        }
    }, [])

    return <Container className=" border-[#3F3F3F] border bg-[#000000CC] rounded-[4px] pt-[32px] pb-[32px] min-h-[600px] px-[24px]">
        <div className="diy-scrollbar">
            <Radio.Group className="h-[50px]" value={tabType} onChange={(val) => setTabType(val.target.value)}>
                <Radio.Button value="bnb-48" style={getTabTypeStyleByTabType(tabType, 'bnb-48')} className=" leading-[40px] flex-1 h-[40px] text-center no-border">BNB-48</Radio.Button>
            </Radio.Group>
        </div>
        <div className="items-center justify-between flex my-[32px]">
            <Input.Search
                placeholder="Enter a tick-hash"
                className="w-full rounded-[4px] h-[48px] border border-yellows border-[#FFC801]"
                onChange={(val) => {
                    setSearchTextHash(val.target.value)
                }}
                addonBefore={false}
                enterButton={false}
                value={searchTextHash}
                onSearch={() => onSearch()}
                allowClear={{
                    clearIcon: <svg className=" translate-y-[2px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="20" height="20" rx="11" fill="black" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.685547 11.9998C0.685547 5.76466 5.76215 0.685547 11.9998 0.685547C18.2375 0.685547 23.3141 5.76717 23.3141 12.0023C23.3141 18.2375 18.2375 23.3166 11.9998 23.3166C5.76215 23.3166 0.685547 18.235 0.685547 11.9998ZM8.13711 15.6992C8.30298 15.8651 8.52414 15.9204 8.7453 15.9204C8.96646 15.9204 9.18761 15.8651 9.35348 15.6992L11.9999 13.0503L14.6487 15.6992C14.8146 15.8651 15.0358 15.9204 15.2569 15.9204C15.4781 15.9204 15.6992 15.8651 15.8651 15.6992C16.1968 15.3675 16.1968 14.8724 15.8651 14.5407L13.1031 11.9471L15.752 9.29819C16.0837 8.96645 16.0837 8.41355 15.752 8.08181C15.4203 7.75007 14.9252 7.75007 14.5934 8.08181L11.9446 10.7307L9.29568 8.08181C8.96394 7.75007 8.46885 7.75007 8.13711 8.08181C7.80537 8.41355 7.80537 8.90864 8.13711 9.24038L10.786 11.8893L8.13711 14.5407C7.80537 14.8724 7.80537 15.3675 8.13711 15.6992Z" fill="#E9E9E9" />
                    </svg>
                }}
                suffix={
                    <div onClick={() => onSearch()} className="h-full flex items-center">
                        <svg className=" cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M23.0271 21.6144L23.0306 21.6213C23.3407 21.9968 23.3717 22.6342 23.0961 23.0477L23.0857 23.0615L23.0754 23.0718C22.8962 23.2544 22.6516 23.344 22.3449 23.344C22.0417 23.344 21.7937 23.251 21.6145 23.0718L16.7874 18.2482C14.9372 19.6987 12.7804 20.4636 10.534 20.4636C9.21092 20.4636 7.92232 20.2018 6.70608 19.6815C5.53119 19.1819 4.47688 18.4653 3.56384 17.5557C2.65424 16.6461 1.93759 15.5883 1.438 14.4134C0.921183 13.1972 0.655884 11.9086 0.655884 10.5855C0.655884 9.26248 0.917737 7.97044 1.438 6.7473C1.93759 5.56552 2.65424 4.50432 3.56384 3.58783C4.47343 2.67135 5.53119 1.9478 6.70264 1.44477C7.92232 0.921061 9.21092 0.655762 10.534 0.655762C11.857 0.655762 13.1456 0.917615 14.3653 1.43788C15.5402 1.93747 16.5945 2.65412 17.5075 3.56372C18.4206 4.47331 19.1338 5.53106 19.6334 6.70596C20.1502 7.9222 20.4155 9.2108 20.4155 10.5338C20.4155 12.8699 19.6299 15.0818 18.2035 16.7908L23.0271 21.6144ZM2.66458 10.5855C2.66458 14.9233 6.19271 18.4549 10.534 18.4549C14.8718 18.4549 18.4034 14.9268 18.4034 10.5855C18.4034 6.24425 14.8718 2.71612 10.534 2.71612C6.19616 2.71612 2.66458 6.2477 2.66458 10.5855Z" fill="#FFC801" />
                        </svg>
                    </div>
                }
            />
        </div>
        <div className="flex flex-row mt-[32px] justify-between items-center leading-[24px] mb-[12px] text-[16px] font-[400]">
            <div className="flex-1 text-[#A9A9A9]">Token</div>
            <div className="flex-1 text-[#A9A9A9] justify-end flex">Balance</div>
        </div>
        <Spin spinning={loading} size="large">
            {
                resultList.length > 0 ?
                    resultList.map((i) => {
                        return <Row active={betchTransferState.tick_hash === i.tick_hash} click={() => setSelectedToken(i)} key={i.tick_hash} data={i} />
                    })
                    : <NoData />
            }
        </Spin>
    </Container>
}

export default SelectedToken;