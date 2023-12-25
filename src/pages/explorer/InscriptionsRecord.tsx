import Label from "@/components/Label";
import { Button, Input, Pagination, Radio, Spin, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import inscriptionsApi, { pageSize } from "@/utils/request";
import dayjs from "dayjs";
// import { useRequest } from "ahooks";
import { shorten, switchStyle } from "@/utils";
import { ExplorerDataProps } from "@/utils/request.type";
import bnb48 from '@/assets/images/avatar.svg'

import fansIcon from '@/assets/images/fans.png'
import Container from "@/components/Container";
import NoData from "@/components/NoData";

type TabTypeKey = "0" | "1" | "2";
type TabTypeItem = {
    key: TabTypeKey,
    label: string;
}

export const getTabTypeStyleByTabType = switchStyle({
    defaultStyle: {
        color: '#FFFFFF',
        background: '#000000CC',
        borderColor: '#F9F9F933'
    },
    selectedStyle: {
        color: '#1E1E1E',
        background: '#F9F9F9',
        borderColor: "#F9F9F9"
    }
});


const tabTypeList: TabTypeItem[] = [
    {
        label: "All",
        key: '0',
    },
    // {
    //     label: "New",
    //     key: 'new',
    // },
    {
        label: "In-progress",
        key: '1',
    },
    {
        label: "Completed",
        key: '2',
    },
]

export const effectData = {
    icon: fansIcon,
    lv: <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1937_1568)">
            <path d="M5.65876 12.1758C5.55669 12.249 5.43966 12.2986 5.31611 12.3211C5.19255 12.3436 5.06554 12.3384 4.94424 12.3059C4.82293 12.2734 4.71034 12.2144 4.61459 12.1331C4.51883 12.0518 4.44229 11.9504 4.39048 11.836C4.26594 11.5611 4.05843 11.3322 3.7971 11.1813C3.53576 11.0304 3.23373 10.9652 2.93344 10.9949C2.80848 11.0072 2.68234 10.9916 2.56412 10.9493C2.4459 10.9069 2.33854 10.8389 2.24976 10.7501C2.16099 10.6613 2.09301 10.554 2.05073 10.4357C2.00844 10.3175 1.99291 10.1914 2.00524 10.0664C2.03483 9.76607 1.96959 9.46402 1.81868 9.20269C1.66777 8.94135 1.43878 8.73385 1.16388 8.60936C1.04948 8.55755 0.947992 8.48101 0.866736 8.38525C0.785479 8.28949 0.726474 8.17691 0.693971 8.0556C0.661468 7.93429 0.656277 7.80729 0.678772 7.68373C0.701267 7.56018 0.750887 7.44315 0.824058 7.34108C0.999795 7.09583 1.0943 6.80169 1.0943 6.49998C1.0943 6.19827 0.999795 5.90413 0.824058 5.65888C0.750887 5.55681 0.701267 5.43978 0.678772 5.31623C0.656277 5.19267 0.661468 5.06567 0.693971 4.94436C0.726474 4.82305 0.785479 4.71046 0.866736 4.61471C0.947992 4.51895 1.04948 4.44241 1.16388 4.3906C1.43873 4.26606 1.66767 4.05855 1.81853 3.79722C1.96939 3.53588 2.03459 3.23386 2.00498 2.93356C1.99268 2.8086 2.00826 2.68247 2.05057 2.56425C2.09289 2.44603 2.16089 2.33866 2.2497 2.24989C2.3385 2.16111 2.44588 2.09313 2.56411 2.05085C2.68234 2.00857 2.80848 1.99303 2.93344 2.00536C3.23376 2.03495 3.53581 1.96971 3.79715 1.8188C4.05849 1.6679 4.26598 1.4389 4.39048 1.164C4.44229 1.0496 4.51883 0.948114 4.61459 0.866858C4.71034 0.785601 4.82293 0.726596 4.94424 0.694093C5.06554 0.66159 5.19255 0.656399 5.31611 0.678894C5.43966 0.701389 5.55669 0.751009 5.65876 0.82418C5.90401 0.999917 6.19814 1.09442 6.49986 1.09442C6.80157 1.09442 7.09571 0.999917 7.34096 0.82418C7.44303 0.751009 7.56005 0.701389 7.68361 0.678894C7.80716 0.656399 7.93417 0.66159 8.05548 0.694093C8.17679 0.726596 8.28937 0.785601 8.38513 0.866858C8.48089 0.948114 8.55743 1.0496 8.60924 1.164C8.73377 1.43886 8.94128 1.66779 9.20262 1.81865C9.46395 1.96951 9.76598 2.03471 10.0663 2.0051C10.1912 1.99281 10.3174 2.00838 10.4356 2.05069C10.5538 2.09301 10.6612 2.16102 10.75 2.24982C10.8387 2.33862 10.9067 2.446 10.949 2.56423C10.9913 2.68246 11.0068 2.8086 10.9945 2.93356C10.9649 3.23389 11.0301 3.53594 11.181 3.79727C11.3319 4.05861 11.5609 4.2661 11.8358 4.3906C11.9502 4.44241 12.0517 4.51895 12.133 4.61471C12.2142 4.71046 12.2732 4.82305 12.3057 4.94436C12.3382 5.06567 12.3434 5.19267 12.3209 5.31623C12.2984 5.43978 12.2488 5.55681 12.1757 5.65888C11.9999 5.90413 11.9054 6.19827 11.9054 6.49998C11.9054 6.80169 11.9999 7.09583 12.1757 7.34108C12.2488 7.44315 12.2984 7.56018 12.3209 7.68373C12.3434 7.80729 12.3382 7.93429 12.3057 8.0556C12.2732 8.17691 12.2142 8.28949 12.133 8.38525C12.0517 8.48101 11.9502 8.55755 11.8358 8.60936C11.561 8.7339 11.332 8.94141 11.1812 9.20274C11.0303 9.46408 10.9651 9.7661 10.9947 10.0664C11.007 10.1914 10.9915 10.3175 10.9491 10.4357C10.9068 10.5539 10.8388 10.6613 10.75 10.7501C10.6612 10.8388 10.5538 10.9068 10.4356 10.9491C10.3174 10.9914 10.1912 11.0069 10.0663 10.9946C9.76595 10.965 9.4639 11.0302 9.20256 11.1812C8.94123 11.3321 8.73373 11.5611 8.60924 11.836C8.55743 11.9504 8.48089 12.0518 8.38513 12.1331C8.28937 12.2144 8.17679 12.2734 8.05548 12.3059C7.93417 12.3384 7.80716 12.3436 7.68361 12.3211C7.56005 12.2986 7.44303 12.249 7.34096 12.1758C7.09571 12 6.80157 11.9055 6.49986 11.9055C6.19814 11.9055 5.90401 12 5.65876 12.1758Z" fill="url(#paint0_linear_1937_1568)" />
            <path d="M9.05814 4.7086C9.12881 4.63768 9.22404 4.59665 9.32412 4.59401C9.4242 4.59137 9.52146 4.62731 9.59577 4.6944C9.67008 4.76149 9.71574 4.85459 9.7233 4.95442C9.73086 5.05425 9.69974 5.15316 9.63638 5.23068L9.6096 5.26032L6.30032 8.5696C6.23207 8.63784 6.14095 8.67835 6.04456 8.68329C5.94818 8.68824 5.85338 8.65727 5.7785 8.59638L5.74886 8.5696L3.9104 6.7314C3.83939 6.66078 3.79827 6.56555 3.79555 6.46544C3.79284 6.36533 3.82874 6.26801 3.89582 6.19365C3.9629 6.11928 4.05601 6.07357 4.15587 6.06598C4.25573 6.0584 4.35468 6.08952 4.43222 6.1529L4.46186 6.17968L6.02446 7.74202L9.05814 4.70886V4.7086Z" fill="white" />
        </g>
        <defs>
            <linearGradient id="paint0_linear_1937_1568" x1="2.03098" y1="2.8437" x2="11.781" y2="10.1562" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1DA9F8" />
                <stop offset="0.626678" stopColor="#93D8FF" />
                <stop offset="1" stopColor="#6FCBFF" />
            </linearGradient>
            <clipPath id="clip0_1937_1568">
                <rect width="13" height="13" fill="white" />
            </clipPath>
        </defs>
    </svg>
}

const Row: React.FC<{
    data: ExplorerDataProps;
    tabType: string
}> = ({ data, tabType }) => {

    const nav = useNavigate()

    // const [openRecap, setOpenRecap] = useState(false)

    // const [form] = Form.useForm()

    // const _close = () => {
    //     setOpenRecap(false)
    //     form?.resetFields()
    // }

    // const ModalContent = (
    //     <div className="p-6 rounded-xl pb-[40px]">
    //         <div className="relative text-center text-[#1E1E1E] text-xl font-bold">
    //             Recap
    //             <img
    //                 src="/static/close.svg"
    //                 className="absolute top-0 right-0 transform -translate-y-1/2 cursor-pointer"
    //                 alt=""
    //                 onClick={_close}
    //             />
    //         </div>
    //         <div className="mt-[30px] md:mt-[50px]">
    //             <div className=" text-[#E2B201] text-[18px] font-[700] flex items-center leading-[20px]">
    //                 {data.tick} <div className="text-[14px] font-[400] ">({shorten(data.tick_hash)}) </div> <span className="ml-[8px] px-[6px]  h-[17px] leading-[17px] font-[400] bg-[rgba(217,217,217,.4)] text-[10px] rounded-full text-[#1E1E1E]">{tabType}</span>
    //             </div>
    //             <div className="w-full mt-[20px] md:mt-[50px]">
    //                 {/* <p>{data.progress}%</p> */}
    //                 <div className="w-full h-[12px] overflow-hidden rounded-full bg-[rgba(255,200,1,.2)]">
    //                     <div style={{ width: `${data.progress}%` }} className="h-full rounded-full bg-[#FFC801]"></div>
    //                 </div>
    //             </div>
    //             <div className="flex justify-end mt-[10px]">
    //                 9000/210000000({data.progress}%)
    //             </div>
    //             <Form form={form} layout="vertical" size="large" preserve={false}>
    //                 <Form.Item name="totalSupply" required label="Total Supply">
    //                     <Input
    //                         type='number'
    //                         className="h-12 border-none rounded bg-light-white"
    //                         placeholder='21000000'
    //                     />
    //                 </Form.Item>
    //                 <Form.Item className="w-ful mt-[50px] mb-0 flex justify-center">
    //                     <Button size="large" className="md:w-[200px] w-[98px] text-[14px] h-12 bg-gray rounded no-border" onClick={_close}>
    //                         Cancel
    //                     </Button>
    //                     <Button size="large" className="md:w-[200px] w-[98px] ml-[20px]" type="primary" htmlType="submit">
    //                         Recap
    //                     </Button>
    //                 </Form.Item>
    //             </Form>
    //         </div>
    //     </div>
    // )

    const progress = ((data.minted / data.max) * 100).toFixed(2)


    return (
        <div onClick={() => nav(`/explorer/detail/${data.tick_hash}`)} className="cursor-pointer py-4 flex flex-row justify-between items-center text-[14px]">
            <div className="w-[200px] flex items-center text-[#E2B201] text-[14px] font-[400] leading-[20px]">
                {
                    data.tick_hash === "0xd893ca77b3122cb6c480da7f8a12cb82e19542076f5895f21446258dc473a7c2" ?
                    <div className="w-[28px] h-[28px] rounded-full relative">
                        <img className="w-full h-full" src={effectData.icon} alt="" />
                        <div className="absolute bottom-0 w-[13px] h-[13px] right-0">
                            {effectData.lv}
                        </div>
                    </div>
                    :
                    <div className="w-[28px] h-[28px] rounded-full relative">
                        <img className="w-full h-full" src={bnb48} alt="" />
                    </div>
                }
                <div className="ml-[6px]">
                    <span className="font-[700]">{data.tick}</span> <span className="ml-[4px] px-[6px] h-[17px] leading-[17px] inline-block font-[400] bg-[#1E1E1E] text-[10px] rounded-full text-[#F9F9F9]">{tabType.toLocaleUpperCase()}</span>
                    <div className="text-[#A9A9A9] opacity-70 text-[12px] font-[400] "><Typography.Paragraph className="m-[0_!important] explorer-copy-color" copyable={{ text: data.tick_hash }}>{shorten(data.tick_hash)}</Typography.Paragraph> </div>
                </div>
            </div>
            <div className="w-[230px]">
                {data.block_at ? dayjs(data.block_at * 1000).format("YYYY-MM-DD HH:mm:ss") : "-"}
            </div>
            <div className="w-[240px]">
                <p>{progress}%</p>
                <div className="w-[104px] h-[8px] overflow-hidden rounded-full bg-[rgba(255,200,1,.2)]">
                    <div style={{ width: `${progress}%` }} className="h-full rounded-full bg-[#FFC801]"></div>
                </div>
            </div>
            <div className="w-[150px]">
                {data?.holders}
            </div>
            {/* <div className="w-[150px]">
                {}
            </div> */}
            {/* {
                myDeployed && <div onClick={e => e.stopPropagation()} className="w-[108px] flex justify-start">
                    <Button onClick={(e) => {
                        e.stopPropagation();
                        setOpenRecap(true)
                    }} type="primary" className="w-[98px] h-[28px]">Recap</Button>
                    <div className="md:hidden block">
                        <Modal
                            open={openRecap}
                            onCancel={_close}
                            footer={false}
                            closeIcon={null}
                            width={668}
                            className="rounded-xl"
                            destroyOnClose
                            centered
                        >
                            {ModalContent}
                        </Modal>
                    </div>
                    <div className="md:hidden block">
                        <Modal
                            open={openRecap}
                            onCancel={_close}
                            footer={false}
                            closeIcon={null}
                            width="91.733vw"
                            className="rounded-xl"
                            destroyOnClose
                            centered
                        >
                            {ModalContent}
                        </Modal>
                    </div>
                </div>
            } */}


        </div>
    )
}

const Inscriptions = () => {

    const [records, setRecord] = useState<ExplorerDataProps[]>([])

    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [tabType, setTabType] = useState("bnb-48");

    const [enterVal, setEnterVal] = useState('')

    // const { account } = useEthers()

    const [tableMenuKey, tableMenuKeyChange] = useState<TabTypeKey>('0')

    // const [myDeployed, setMyDeployed] = useState(false)

    const nav = useNavigate()

    const getInscriptionsData = async (loading: boolean) => {
        loading && setLoading(true)

        const _searchText = {
            tick_hash: '',
            tick: '',
        }
        // 如果选中my deployed
        // if (myDeployed) {
        //     _searchText.deployer = account as string;
        //     setEnterVal('');
        //     // 如果地址以0x开头,并且是66位,是tick_hash
        // } else 
        if (enterVal.startsWith("0x") && enterVal.length === 66) {
            _searchText.tick_hash = enterVal;
        } else {
            // 其他则是tick
            _searchText.tick = enterVal;
        }
        const param = {
            tick_hash: '', status: +tableMenuKey, page, protocol: tabType
        }
        inscriptionsApi.getInscriptionsList(enterVal ? {
            ...param,
            ..._searchText,
        } : param).then((res) => {
            setLoading(false)
            if (res.code === 0) {
                setTotal(res.data.count);
                setRecord(res.data.list);
            }
            // loading && (
            //     cancel(),
            //     run(false))
        }).catch(() => {
            setLoading(false)
        })
    }

    // const { run, cancel } = useRequest(getInscriptionsData, requestTimeConfig);

    useEffect(() => {
        setPage(1);
    }, [tableMenuKey, tabType])


    useEffect(() => {
        getInscriptionsData(true)
    }, [page, tableMenuKey, tabType])


    return <Container className="border-[#3F3F3F] border bg-[#000000CC] rounded-[4px] pt-[53px] mt-[30px]">
        <div className="px-[24px]">
            <div className="flex items-center justify-between">
                <Label
                    text="Inscriptions"
                    icon={
                        <svg
                            onClick={(e: any) => {
                                e.target.classList.add("reload-animate")
                                getInscriptionsData(true)
                            }} onAnimationEnd={(e: any) => {
                                e.target.classList.remove("reload-animate")
                            }}
                            className="ml-[12px] cursor-pointer" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.4689 19.4561C15.9608 20.5331 14.1131 21.0262 12.2689 20.8438C12.1827 20.8357 12.0982 20.8211 12.0105 20.8097C11.8447 20.7869 11.679 20.7658 11.5181 20.7333C11.4189 20.7132 11.3203 20.6905 11.2224 20.6651C11.0644 20.6302 10.9077 20.5895 10.7527 20.5432C10.6796 20.5204 10.6065 20.4944 10.5317 20.4684C10.3142 20.3959 10.1 20.3135 9.88987 20.2214C9.68794 20.1333 9.49004 20.0363 9.29674 19.9306L9.27074 19.9176C8.40448 19.435 7.63662 18.7939 7.00712 18.0277C6.97624 17.9903 6.94699 17.9481 6.91612 17.9091C5.80875 16.5113 5.20684 14.78 5.20824 12.9967H7.01524C7.03903 12.9967 7.06236 12.9902 7.0827 12.9779C7.10305 12.9656 7.11962 12.9479 7.13062 12.9268C7.14203 12.9062 7.14747 12.8828 7.14632 12.8593C7.14517 12.8357 7.13748 12.813 7.12412 12.7936L4.09024 8.18182C4.0785 8.16336 4.0623 8.14817 4.04312 8.13764C4.02395 8.12712 4.00243 8.1216 3.98056 8.1216C3.95868 8.1216 3.93716 8.12712 3.91799 8.13764C3.89882 8.14817 3.88261 8.16336 3.87087 8.18182L0.835368 12.7936C0.809368 12.8309 0.804493 12.8829 0.828868 12.9268C0.853243 12.9707 0.897118 12.9967 0.944243 12.9967H2.75124C2.75124 15.1807 3.42399 17.2038 4.56474 18.8759C4.57937 18.9003 4.58912 18.9247 4.60374 18.9474C4.72237 19.1181 4.85399 19.2773 4.98074 19.4398C5.02787 19.4999 5.07337 19.5633 5.12212 19.6234C5.30899 19.8542 5.50724 20.0671 5.71199 20.2799L5.76887 20.3384C6.66273 21.2463 7.72023 21.9768 8.88562 22.4916L9.07412 22.5761C9.29024 22.6671 9.51449 22.7467 9.73712 22.8231C9.84274 22.8588 9.94674 22.8962 10.054 22.9287C10.2506 22.9872 10.4505 23.0359 10.652 23.0847C10.7869 23.1172 10.9185 23.1513 11.0566 23.1773C11.1119 23.1903 11.1655 23.2066 11.2224 23.2147C11.4125 23.2488 11.6026 23.2683 11.7944 23.2911L11.9991 23.3203C14.4394 23.569 16.8867 22.9197 18.8826 21.4938C19.15 21.3023 19.3315 21.0135 19.388 20.6895C19.4446 20.3655 19.3716 20.0323 19.1849 19.7616C19.0933 19.6275 18.976 19.5131 18.8397 19.425C18.7033 19.3369 18.5508 19.2769 18.391 19.2484C18.2312 19.22 18.0674 19.2237 17.909 19.2593C17.7507 19.295 17.601 19.3619 17.4689 19.4561ZM23.2522 12.9967C23.2539 10.9042 22.6247 8.85989 21.4469 7.13045C21.429 7.1012 21.4176 7.07195 21.4014 7.04757C21.2585 6.84757 21.1089 6.65245 20.9529 6.46257L20.8992 6.3927C19.8756 5.13025 18.5637 4.13213 17.074 3.48232C17.0331 3.46403 16.9924 3.44507 16.9521 3.42545C16.7149 3.32887 16.4748 3.23946 16.2322 3.15732C16.1396 3.12807 16.0535 3.09557 15.9625 3.06957C15.75 3.00581 15.5354 2.94945 15.319 2.90057C15.2004 2.87295 15.0801 2.84207 14.9582 2.8177C14.8981 2.80632 14.8429 2.78845 14.7827 2.77707C14.6202 2.74782 14.4577 2.73645 14.2952 2.71532C14.1847 2.7007 14.0726 2.68282 13.9605 2.67145C13.6903 2.64741 13.4192 2.63386 13.148 2.63082C13.0992 2.63082 13.0505 2.6227 13.0001 2.6227C10.893 2.61912 8.8376 3.27545 7.12249 4.49957C6.85439 4.69084 6.67225 4.97987 6.6154 5.30426C6.55854 5.62866 6.63154 5.9624 6.81862 6.23345C6.91044 6.36717 7.02796 6.48128 7.16433 6.56911C7.30071 6.65694 7.4532 6.71674 7.61293 6.74503C7.77266 6.77331 7.93642 6.76952 8.09466 6.73385C8.2529 6.69819 8.40246 6.63138 8.53462 6.53732C10.046 5.46072 11.8961 4.96776 13.7427 5.14957L13.9491 5.17882C14.136 5.19995 14.3196 5.22757 14.5 5.26332C14.5796 5.27795 14.6592 5.29907 14.7372 5.31695C14.9144 5.35757 15.0931 5.40145 15.2654 5.45345L15.4279 5.51032C15.6261 5.57532 15.8195 5.6452 16.0112 5.72645L16.0714 5.75407C17.217 6.25295 18.2229 7.02157 19.0077 7.98357L19.0224 8.00307C20.17 9.41464 20.7951 11.1791 20.792 12.9983H18.9866C18.9629 12.9981 18.9395 13.0043 18.9191 13.0164C18.8986 13.0285 18.8819 13.046 18.8706 13.0669C18.8594 13.0878 18.8541 13.1114 18.8554 13.1352C18.8567 13.1589 18.8644 13.1818 18.8777 13.2014L21.9149 17.8116C21.9267 17.8297 21.9428 17.8446 21.9618 17.8548C21.9808 17.8651 22.0021 17.8705 22.0237 17.8705C22.0454 17.8705 22.0666 17.8651 22.0856 17.8548C22.1047 17.8446 22.1208 17.8297 22.1326 17.8116L25.1665 13.2014C25.1888 13.2012 25.2108 13.1952 25.2301 13.184C25.2495 13.1728 25.2656 13.1569 25.277 13.1376C25.2884 13.1184 25.2946 13.0965 25.2951 13.0742C25.2955 13.0518 25.2902 13.0297 25.2797 13.01C25.2691 12.9903 25.2537 12.9737 25.2348 12.9617C25.2159 12.9497 25.1943 12.9428 25.1719 12.9416C25.1496 12.9405 25.1274 12.9451 25.1073 12.955C25.0873 12.9649 25.0702 12.9798 25.0576 12.9983H23.2522V12.9967Z" fill="white" />
                        </svg>
                    } />
                <Button type="primary" onClick={() => nav("/explorer/mobile/deploy")} className="w-[96px] ml-[12px] text-[14px] font-[400] rounded-[4px] shadow-btn h-[40px] bg-yellow">Deploy</Button>

            </div>
            <div className="items-center justify-between flex my-[32px]">
                <Input
                    placeholder="Enter a tick / tick-hash"
                    className="flex-1 h-[40px] bg-[#000000CC] border border-[#FFC801]"
                    onChange={(val) => {
                        setEnterVal(val.target.value)
                    }}
                    value={enterVal}
                    suffix={
                        <svg onClick={() => getInscriptionsData(true)} className=" cursor-pointer" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M19.1891 18.012L19.192 18.0178C19.4504 18.3307 19.4762 18.8619 19.2465 19.2065L19.2379 19.2179L19.2293 19.2266C19.08 19.3787 18.8761 19.4534 18.6206 19.4534C18.3679 19.4534 18.1612 19.3759 18.0119 19.2266L13.9894 15.2069C12.4475 16.4156 10.6501 17.0531 8.77812 17.0531C7.67558 17.0531 6.60175 16.8348 5.58822 16.4013C4.60914 15.985 3.73055 15.3878 2.96968 14.6298C2.21168 13.8718 1.61447 12.9903 1.19815 12.0112C0.767469 10.9977 0.546387 9.92386 0.546387 8.82131C0.546387 7.71877 0.764598 6.64207 1.19815 5.62279C1.61447 4.63797 2.21168 3.75364 2.96968 2.9899C3.72768 2.22616 4.60914 1.62321 5.58535 1.20401C6.60175 0.767591 7.67558 0.546509 8.77812 0.546509C9.88066 0.546509 10.9545 0.76472 11.9709 1.19827C12.95 1.6146 13.8286 2.21181 14.5894 2.9698C15.3503 3.7278 15.9446 4.60926 16.361 5.58834C16.7916 6.60187 17.0127 7.6757 17.0127 8.77825C17.0127 10.7249 16.3581 12.5682 15.1694 13.9923L19.1891 18.012ZM2.2203 8.8213C2.2203 12.4361 5.16041 15.3791 8.77813 15.3791C12.393 15.3791 15.336 12.439 15.336 8.8213C15.336 5.20358 12.393 2.26347 8.77813 2.26347C5.16328 2.26347 2.2203 5.20645 2.2203 8.8213Z" fill="#A9A9A9" />
                        </svg>
                    }
                />
            </div>

            <div className=" pt-[10px]">
                <div className="h-[40px] w-full flex items-center justify-between">
                    <div className="flex items-center w-[457px]">
                        <Radio.Group value={tabType} onChange={(val) => setTabType(val.target.value)}>
                            <Radio.Button value="bnb-48" style={getTabTypeStyleByTabType(tabType, "bnb-48")} className=" leading-[40px] flex-1 h-[40px] text-center border">BNB-48</Radio.Button>
                            {/* <Radio.Button value="bnb-48s" style={getTabTypeStyleByTabType(tabType, "bnb-48s")} className=" leading-[40px] ml-[16px] flex-1 h-[40px] text-center border">BNB-48s</Radio.Button> */}
                        </Radio.Group>
                    </div>
                </div>
                <div className="mt-[30px] flex items-center justify-between">
                    <Tabs activeKey={tableMenuKey} onChange={(e) => tableMenuKeyChange(e as TabTypeKey)} items={tabTypeList} tabBarGutter={32} className="hide-tabs-bottom-line explorer-table-menu-type"></Tabs>
                    {/* <Checkbox checked={myDeployed} className="check-rouded-full hidden md:flex" onChange={(e) => setMyDeployed(e.target.checked)}>My Deployed</Checkbox> */}
                </div>
            </div>
        </div>
        <div className="h-[1px] w-full bg-[#FFFFFF] opacity-20 mb-[24px]"></div>
        {/* <Checkbox checked={myDeployed} className="check-rouded-full ml-[24px] flex mb-[24px] md:hidden" onChange={(e) => setMyDeployed(e.target.checked)}>My Deployed</Checkbox> */}
        <Spin spinning={loading} size="large">
            <div className="w-full overflow-x-scroll diy-scrollbar">
                <div className=" w-[770px] px-[24px] pb-[40px] rounded">
                    <div className="flex flex-row justify-between items-center mb-4">
                        <div className="w-[200px] text-[#A9A9A9]">Token</div>
                        <div className="w-[230px] text-[#A9A9A9]">Deploy Time</div>
                        <div className="w-[240px] text-[#A9A9A9]">Progress</div>
                        <div className="w-[150px] text-[#A9A9A9]">Holders</div>
                        {/* <div className="w-[150px] text-gray">Transactions</div> */}
                        {/* {
                                myDeployed && <div className="w-[108px]"></div>
                            } */}
                    </div>
                    {
                        records.length > 0 ? (
                            <>
                                {records.map((i) => {
                                    return <Row tabType={tabType} key={i.tick_hash} data={i} />
                                })}
                                <div key="pagination" className="justify-center md:flex hidden mt-[32px]">
                                    <Pagination pageSize={pageSize} current={page} onChange={setPage} showSizeChanger={false} className="table-pagination-btn" defaultCurrent={1} total={total} />
                                </div>
                            </>
                        ) : <NoData />
                    }
                </div>
            </div>
        </Spin>
        <div className="justify-center md:hidden flex mt-[32px] pb-[40px]">
            <Pagination showSizeChanger={false} pageSize={pageSize} current={page} onChange={setPage} className="table-pagination-btn" defaultCurrent={1} total={total} />
        </div>
        {/* </div> */}
    </Container>
}

export default Inscriptions;