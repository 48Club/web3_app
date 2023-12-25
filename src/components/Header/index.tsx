import { Button, Dropdown } from "antd";
import Container from "../Container";

import minLogoIcon from '@/assets/logo.png'
import bnb48Icon from '@/assets/bnb-48.png'

import bnbIcon from '@/assets/images/bnb-icon.svg'
import bnbIcon48 from '@/assets/images/bnb-48.svg'


import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTabKey } from "@/store";
import { useEthers } from "@usedapp/core";
import { shorten } from "@/utils";
import { CopyOutlined } from "@ant-design/icons";
import { switchChain } from "@/constants/chain";
import { useLocation } from "react-router-dom";
import useIsChainId from "@/hooks/useChainId";
import Copy from "../Copy";

const openLink = (key: string) => {
    switch (key) {
        case "Telegram":
            window.open("https://t.me/iansfansclub")
            break;
        case "API":
            window.open("https://github.com/48Club/bnb-48-ins-indexer/blob/main/docs/api.md")
            break;
        case "Twitter":
            window.open("https://twitter.com/48ClubIan")
            break;
        case "Documents":
            window.open("https://github.com/48Club/bnb-48-inscription")
            break;

        default:
            break;
    }
}

const Header = () => {

    const {
        // tabKey,
        setTabKey
    } = useTabKey()

    const nav = useNavigate()

    const { activateBrowserWallet, deactivate, account } = useEthers()

    const local = useLocation()

    const { isTrueChainId } = useIsChainId()

    // const config = useConfig();

    // console.log(library, 'library')

    const [showBSCInfo, setShowBSCInfo] = useState(false)

    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        console.log(local, 'local.pathname')
        if(local.pathname === "/explorer" || local.pathname === '/') {
            setTabKey('explorer')
        }

        if(local.pathname === "/account") {
            setTabKey('account')
        }

        if(local.pathname === "/coming-soon") {
            setTabKey('coming-soon')
        }
        
    }, [local.pathname])

    return <>
        <div className="w-full fixed top-0 h-[60px] bg-[#1B1B1B] z-[99]">
            <Container className="flex justify-between items-center h-full">
                <img onClick={() => nav('/')} className="w-[34px] h-[34px] cursor-pointer" src={minLogoIcon} alt="" />
                <div className="flex items-center">
                    <div className=" flex items-center justify-center cursor-pointer w-[80px] h-[32px] rounded-[4px] bg-yellow">
                        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">
                            <rect y="0.5" width="22" height="22" fill="url(#pattern0)" />
                            <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlinkHref="#image0_2401_2227" transform="scale(0.015625)" />
                                </pattern>
                                <image id="image0_2401_2227" width="64" height="64" xlinkHref="data:image/png;base64,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" />
                            </defs>
                        </svg>
                        {/*  onClick={() => setShowBSCInfo(!showBSCInfo)} */}
                        <div onClick={() => isTrueChainId === false && switchChain('Default')} className="ml-[4px] text-[#1B1B1B]">
                            <h1 className="text-[14px] leading-[20px] font-[400] my-0">BSC</h1>
                            {/* <p className="text-[10px] opacity-50 font-[400] leading-[7px] my-0">1Gwei</p> */}
                        </div>
                        {/* <svg className="ml-[4px]" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5949 3.63643L5.27938 7.95196C5.20209 8.02925 5.10254 8.07141 4.99948 8.07141C4.89643 8.07141 4.79688 8.02925 4.72076 7.95196L0.405236 3.67391C0.329114 3.59779 0.285784 3.48302 0.285784 3.35654C0.285784 3.24411 0.320916 3.16096 0.405236 3.07782C0.564507 2.91855 0.804584 2.91855 0.963854 3.07782L4.99948 7.11462L9.03629 3.07782C9.19556 2.91855 9.43563 2.91855 9.5949 3.07782C9.75417 3.23709 9.75417 3.47716 9.5949 3.63643Z" fill="#1B1B1B" />
                        </svg> */}
                    </div>
                    {
                        account ?
                            <Dropdown trigger={["click"]} dropdownRender={() => {
                                return <div className="w-[120px] bg-[#000] h-[96px]">
                                    <div onClick={deactivate} className="w-full h-[40px] flex items-center px-[12px] cursor-pointer text-[14px] font-[400] text-[#FFFFFF]">
                                        <svg className="mr-[5px]" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_2361_7717)">
                                                <path d="M7.32812 12.0312H2.24219C2.16967 12.0312 2.10012 12.0024 2.04884 11.9512C1.99756 11.8999 1.96875 11.8303 1.96875 11.7578V2.24219C1.96875 2.16967 1.99756 2.10012 2.04884 2.04884C2.10012 1.99756 2.16967 1.96875 2.24219 1.96875H7.32812C7.47317 1.96875 7.61227 1.91113 7.71482 1.80857C7.81738 1.70602 7.875 1.56692 7.875 1.42188C7.875 1.27683 7.81738 1.13773 7.71482 1.03518C7.61227 0.932617 7.47317 0.875 7.32812 0.875H1.42188C1.27683 0.875 1.13773 0.932617 1.03518 1.03518C0.932617 1.13773 0.875 1.27683 0.875 1.42188V12.5781C0.875 12.7232 0.932617 12.8623 1.03518 12.9648C1.13773 13.0674 1.27683 13.125 1.42188 13.125H7.32812C7.47317 13.125 7.61227 13.0674 7.71482 12.9648C7.81738 12.8623 7.875 12.7232 7.875 12.5781C7.875 12.4331 7.81738 12.294 7.71482 12.1914C7.61227 12.0889 7.47317 12.0312 7.32812 12.0312Z" fill="#EAEAEA" />
                                                <path d="M13.122 6.94543L13.1212 6.93887C13.1212 6.93354 13.1201 6.9282 13.1193 6.92301C13.1193 6.92123 13.1193 6.91945 13.1186 6.91768C13.1185 6.91663 13.1185 6.91558 13.1186 6.91453C13.1009 6.79989 13.047 6.69389 12.9649 6.61197L10.8868 4.53494C10.836 4.48416 10.7757 4.44387 10.7094 4.41639C10.643 4.3889 10.5719 4.37476 10.5001 4.37476C10.4282 4.37476 10.3571 4.3889 10.2908 4.41639C10.2244 4.44387 10.1641 4.48416 10.1134 4.53494C10.0626 4.58572 10.0223 4.64601 9.9948 4.71236C9.96732 4.77872 9.95317 4.84983 9.95317 4.92165C9.95317 4.99347 9.96732 5.06459 9.9948 5.13094C10.0223 5.19729 10.0626 5.25758 10.1134 5.30836L11.2588 6.45324H4.04688C3.90183 6.45324 3.76273 6.51086 3.66018 6.61342C3.55762 6.71598 3.5 6.85508 3.5 7.00012C3.5 7.14516 3.55762 7.28426 3.66018 7.38682C3.76273 7.48938 3.90183 7.54699 4.04688 7.54699H11.2567L10.1083 8.6916C10.0575 8.74238 10.0172 8.80267 9.98975 8.86902C9.96226 8.93538 9.94811 9.00649 9.94811 9.07831C9.94811 9.15013 9.96226 9.22125 9.98975 9.2876C10.0172 9.35395 10.0575 9.41424 10.1083 9.46502C10.2109 9.56754 10.3499 9.62514 10.4949 9.62514C10.64 9.62514 10.779 9.56754 10.8816 9.46502L12.9648 7.38854C13.0223 7.33107 13.0663 7.26145 13.0936 7.18479C13.1208 7.10812 13.1305 7.02634 13.122 6.94543Z" fill="#EAEAEA" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2361_7717">
                                                    <rect width="14" height="14" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        Logout
                                    </div>
                                    <Copy className="w-full h-[40px] flex items-center px-[12px] cursor-pointer text-[14px] font-[400] text-[#FFFFFF]" text={account}>
                                        <CopyOutlined size={14} className="mr-[5px]" />
                                        Copy
                                    </Copy>
                                </div>
                            }} placement="bottomLeft" arrow>
                                <Button className=" text-[#1B1B1B] justify-center px-0 flex items-center bg-[#FFFFFF] w-[76px] h-[32px] ml-[12px]">
                                    {shorten(account, 3)}
                                </Button>
                            </Dropdown>
                            :
                            <Button onClick={activateBrowserWallet} type="primary" className="bg-[#FFFFFF] text-[#1E1E1E] flex justify-center w-[76px] h-[32px] ml-[12px]">
                                Connect
                            </Button>
                    }

                    {
                        showMenu ?
                            <div onClick={() => setShowMenu(false)} className="flex justify-end items-center w-[24px] h-[60px] ml-[16px]">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_304_8038)">
                                        <path d="M5.16587 3.6094L5.21629 3.6557L11.445 9.8849L17.4446 3.88532C17.6121 3.71623 17.8388 3.61889 18.0767 3.61389C18.3146 3.6089 18.5452 3.69663 18.7196 3.85855C18.894 4.02047 18.9986 4.24387 19.0113 4.48152C19.024 4.71917 18.9437 4.95243 18.7875 5.13199L18.7417 5.1824L12.7412 11.1811L18.7412 17.1807C18.9105 17.348 19.008 17.5747 19.0132 17.8127C19.0183 18.0507 18.9306 18.2814 18.7687 18.4559C18.6068 18.6304 18.3834 18.7351 18.1457 18.7478C17.908 18.7605 17.6746 18.6803 17.495 18.524L17.4446 18.4773L11.445 12.4777L5.21629 18.7074C5.04858 18.8751 4.82237 18.9713 4.5852 18.9758C4.34803 18.9802 4.11837 18.8925 3.94449 18.7312C3.77061 18.5698 3.66606 18.3474 3.65279 18.1105C3.63953 17.8737 3.7186 17.6409 3.87337 17.4612L3.91967 17.4107L10.1489 11.1811L3.92012 4.95232C3.75355 4.7844 3.65832 4.55859 3.65436 4.3221C3.6504 4.08561 3.738 3.85674 3.89886 3.68333C4.05972 3.50993 4.28138 3.40541 4.51751 3.39163C4.75363 3.37786 4.98594 3.45588 5.16587 3.6094Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_304_8038">
                                            <rect width="22" height="22" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            :
                            <div onClick={() => setShowMenu(true)} className="ml-[16px] w-[24px] flex-center h-[60px]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" fill="white" />
                                </svg>
                            </div>
                    }
                </div>
            </Container >
        </div>
        <div onClick={() => setShowBSCInfo(false)} style={{transform: showBSCInfo ? "translateY(0px)" : 'translateY(-120px)'}} className="w-full transition-transform fixed top-[60px] left-0 bg-[#1B1B1B] z-[98] h-[120px]">
            <div onClick={() => switchChain('1Ggei')} className="w-full h-[40px] cursor-pointer flex justify-center items-center">
                <img className="w-[22px] h-[22px]" src={bnbIcon48} alt="" />
                <span className="text-[14px] font-[400] leading-[20px] mx-[4px]">BSC</span>
                <span className="text-[#1B1B1B] bg-[#FFC801] px-[14px] rounded-full">1Gwei</span>
                <span className="text-[#1B1B1B] ml-[4px] bg-[#FFC801] px-[14px] rounded-full">Private</span>
            </div>
            <div onClick={() => switchChain('3Ggei')} className="w-full h-[40px] cursor-pointer flex justify-center items-center">
                <img className="w-[22px] h-[22px]" src={bnbIcon48} alt="" />
                <span className="text-[14px] font-[400] leading-[20px] mx-[4px]">BSC</span>
                <span className="text-[#1B1B1B] bg-[#FFC801] px-[14px] rounded-full">3Gwei</span>
                <span className="text-[#1B1B1B] ml-[4px] bg-[#FFC801] px-[14px] rounded-full">Private</span>
            </div>
            <div onClick={() => switchChain('Default')} className="w-full h-[40px] cursor-pointer flex justify-center items-center">
                <img className="w-[22px] h-[22px]" src={bnbIcon} alt="" />
                <span className="text-[14px] font-[400] leading-[20px] mx-[4px]">BSC</span>
                <span className="text-[#1B1B1B] bg-[#FFC801] px-[14px] rounded-full">3Gwei</span>
                <span className="text-[#1B1B1B] ml-[4px] bg-[#FFC801] px-[14px] rounded-full">Public</span>
            </div>
        </div>
        <div style={{ transform: showMenu ? "translateX(0)" : 'translateX(200vw)' }} className="w-full h-full transition-transform fixed top-[60px] left-0 z-[98] menu-mobile-bg">
            <div onClick={() => setShowMenu(false)} className="px-[5.333vw] text-white">
                <h1 onClick={() => setTabKey("explorer")} className="text-[20px] font-[600] my-[6vw]">Explorer</h1>
                <i className="block w-full h-[1px] bg-white opacity-10"></i>
                <h1 onClick={() => setTabKey("account")} className="text-[20px] font-[600] my-[6vw]">Account</h1>
                <i className="block w-full h-[1px] bg-white opacity-10"></i>
                <h1 onClick={() => nav("/coming-soon")} className="text-[20px] font-[600] my-[6vw] flex items-center">Launch Pad <span className="text-[#A9A9A9] ml-[8px] text-[12px] font-[400]">(Coming Soon)</span> </h1>
                <i className="block w-full h-[1px] bg-white opacity-10"></i>
                {/* <h1 onClick={() => setTabKey("bridge")} className="text-[20px] flex items-center font-[600] my-[8vw]">
                    Bridge
                    <svg className="ml-[8px]" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2387 7.24898V10.8732C11.2387 11.4836 10.7256 12.0001 10.1193 12.0001H1.11938C0.513048 12.0001 0 11.4836 0 10.8732V1.8127C0 1.20229 0.513048 0.685791 1.11938 0.685791H4.71935C4.99574 0.685791 5.23931 0.929259 5.23931 1.20751C5.23931 1.48576 4.99747 1.73096 4.71935 1.73096H1.11938C1.06755 1.73096 1.03819 1.76053 1.03819 1.8127V10.8732C1.03819 10.9253 1.06755 10.9549 1.11938 10.9549H10.1193C10.1711 10.9549 10.2005 10.9253 10.2005 10.8732V7.24898C10.2005 6.97073 10.4423 6.72726 10.7187 6.72726C10.9951 6.72726 11.2387 6.97073 11.2387 7.24898Z" fill="#B6F2BF" />
                        <path d="M11.237 1.20751V4.5291C11.237 4.80735 10.9952 5.05082 10.7188 5.05082C10.4424 5.05082 10.2006 4.80735 10.2006 4.5291V2.46484L6.29832 6.39163C6.20503 6.48554 6.07893 6.53423 5.92001 6.53423C5.76108 6.53423 5.63498 6.48728 5.5417 6.39337C5.44151 6.2925 5.38623 6.16207 5.38623 6.02643C5.38623 5.89078 5.44151 5.76035 5.5417 5.65949L9.47334 1.73096H7.41942C7.14303 1.73096 6.90119 1.48749 6.90119 1.20751C6.90119 0.929259 7.14303 0.685791 7.41942 0.685791H10.7188C10.9952 0.685791 11.237 0.929259 11.237 1.20751Z" fill="#B6F2BF" />
                    </svg>
                </h1>
                <i className="inline-block w-full h-[1px] bg-white opacity-10"></i> */}
                <h1 className="text-[20px] font-[600] mt-[8vw] leading-[9.6vw]">More</h1>
                <p onClick={() => openLink('Telegram')} className="mt-[6.4vw] text-[12px] flex items-center font-[400]">
                    {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.92969 2.92891C4.80312 1.05422 7.34844 0 10 0C12.6516 0 15.1969 1.05422 17.0703 2.92891C18.9453 4.80359 20 7.34891 20 10C20 12.6511 18.9453 15.1964 17.0703 17.0711C15.1969 18.9458 12.6516 20 10 20C7.34844 20 4.80312 18.9458 2.92969 17.0711C1.05469 15.1964 0 12.6511 0 10C0 7.34891 1.05469 4.80359 2.92969 2.92891ZM10.3416 7.73274C9.44921 8.11691 7.66443 8.91211 4.98722 10.1182C4.5525 10.297 4.32434 10.4719 4.30426 10.6429C4.26893 10.9316 4.61861 11.0455 5.09374 11.2003C5.15891 11.2215 5.22645 11.2435 5.29568 11.2668C5.76483 11.4244 6.39607 11.6089 6.72319 11.6161C7.02161 11.6228 7.35303 11.4959 7.71888 11.2357C10.2211 9.48962 11.5109 8.60703 11.5927 8.58804C11.65 8.57468 11.729 8.55777 11.7821 8.60718C11.8366 8.65644 11.8308 8.74993 11.8251 8.775C11.7913 8.92752 10.4228 10.2434 9.71079 10.9281C9.48693 11.1433 9.32794 11.2962 9.29568 11.3309C9.22361 11.4084 9.15015 11.4816 9.07954 11.552C8.64413 11.9861 8.31748 12.3118 9.09771 12.8434C9.47602 13.1011 9.77798 13.3139 10.0798 13.5265C10.404 13.7549 10.7281 13.9832 11.1465 14.267C11.254 14.3399 11.3568 14.4157 11.4568 14.4894C11.8371 14.7698 12.1787 15.0217 12.6013 14.9815C12.8466 14.9582 13.1006 14.7196 13.2283 14.008C13.5325 12.326 14.1307 8.68196 14.2685 7.18031C14.2814 7.04884 14.2656 6.88042 14.2541 6.80652C14.2412 6.73263 14.2154 6.62728 14.1235 6.54937C14.0131 6.45693 13.8438 6.43749 13.7677 6.43883C13.422 6.44521 12.8926 6.63573 10.3416 7.73274Z" fill="white" />
                    </svg> */}
                    <span>Telegram</span>
                </p>
                <p onClick={() => openLink('API')} className="mt-[6.4vw] flex items-center text-[12px] font-[400]">
                    {/* <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 1.894C19.2642 2.2153 18.4733 2.43235 17.6434 2.53001C18.4905 2.03014 19.1412 1.23857 19.4475 0.295317C18.6545 0.758292 17.7765 1.09435 16.8418 1.27548C16.0935 0.490434 15.0269 0 13.8468 0C11.5808 0 9.74354 1.80845 9.74354 4.03909C9.74354 4.35569 9.77977 4.664 9.84983 4.95963C6.43958 4.79119 3.41617 3.18306 1.39237 0.739289C1.03917 1.33584 0.836769 2.02965 0.836769 2.76992C0.836769 4.1713 1.56116 5.40761 2.66217 6.1319C1.98957 6.11097 1.35688 5.92923 0.803667 5.62669C0.803196 5.64355 0.803196 5.66054 0.803196 5.67754C0.803196 7.63447 2.2176 9.26696 4.09471 9.63831C3.75041 9.73059 3.38791 9.77989 3.0137 9.77989C2.74931 9.77989 2.49231 9.75461 2.24171 9.70756C2.7639 11.3121 4.27921 12.48 6.07481 12.5124C4.6705 13.5959 2.9013 14.2417 0.978805 14.2417C0.647605 14.2417 0.320999 14.2224 0 14.1852C1.8159 15.3313 3.97271 16 6.28991 16C13.8373 16 17.9645 9.8452 17.9645 4.50738C17.9645 4.33226 17.9606 4.15811 17.9526 3.98477C18.7543 3.41538 19.4498 2.70406 20 1.894Z" fill="white" />
                    </svg> */}
                    <span>API</span>
                </p>
                <p onClick={() => openLink('Twitter')} className="mt-[6.4vw] flex items-center text-[12px] font-[400]">
                    {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.47499 0 0 4.58819 0 10.2529C0 14.7899 2.8625 18.6219 6.8375 19.9804C7.33748 20.07 7.52504 19.7625 7.52504 19.4933C7.52504 19.2499 7.51244 18.4425 7.51244 17.5838C5 18.0579 4.35 16.9558 4.15 16.3791C4.0375 16.0843 3.55 15.1744 3.12501 14.9308C2.77499 14.7386 2.27499 14.2644 3.1125 14.2515C3.9 14.2388 4.4625 14.9949 4.65 15.3025C5.55 16.8533 6.9875 16.4175 7.56252 16.1484C7.65007 15.4819 7.91244 15.0333 8.2 14.777C5.97499 14.5207 3.65 13.6364 3.65 9.71465C3.65 8.59969 4.0375 7.67688 4.67501 6.95918C4.57499 6.70285 4.22499 5.65192 4.77499 4.24214C4.77499 4.24214 5.6125 3.973 7.52504 5.29308C8.32504 5.06238 9.17496 4.94703 10.025 4.94703C10.875 4.94703 11.725 5.06238 12.525 5.29308C14.4375 3.96019 15.275 4.24214 15.275 4.24214C15.825 5.65192 15.475 6.70285 15.375 6.95918C16.0124 7.67688 16.4 8.5868 16.4 9.71465C16.4 13.6492 14.0625 14.5207 11.8375 14.777C12.2 15.0975 12.5124 15.7126 12.5124 16.6738C12.5124 18.0452 12.5 19.1474 12.5 19.4933C12.5 19.7625 12.6876 20.0829 13.1876 19.9804C17.1375 18.6219 20 14.777 20 10.2529C20 4.58819 15.525 0 10 0Z" fill="white" />
                    </svg> */}
                    <span>Twitter</span>
                </p>
                <p onClick={() => openLink('Documents')} className="mt-[6.4vw] flex items-center text-[12px] font-[400]">
                    {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.47499 0 0 4.58819 0 10.2529C0 14.7899 2.8625 18.6219 6.8375 19.9804C7.33748 20.07 7.52504 19.7625 7.52504 19.4933C7.52504 19.2499 7.51244 18.4425 7.51244 17.5838C5 18.0579 4.35 16.9558 4.15 16.3791C4.0375 16.0843 3.55 15.1744 3.12501 14.9308C2.77499 14.7386 2.27499 14.2644 3.1125 14.2515C3.9 14.2388 4.4625 14.9949 4.65 15.3025C5.55 16.8533 6.9875 16.4175 7.56252 16.1484C7.65007 15.4819 7.91244 15.0333 8.2 14.777C5.97499 14.5207 3.65 13.6364 3.65 9.71465C3.65 8.59969 4.0375 7.67688 4.67501 6.95918C4.57499 6.70285 4.22499 5.65192 4.77499 4.24214C4.77499 4.24214 5.6125 3.973 7.52504 5.29308C8.32504 5.06238 9.17496 4.94703 10.025 4.94703C10.875 4.94703 11.725 5.06238 12.525 5.29308C14.4375 3.96019 15.275 4.24214 15.275 4.24214C15.825 5.65192 15.475 6.70285 15.375 6.95918C16.0124 7.67688 16.4 8.5868 16.4 9.71465C16.4 13.6492 14.0625 14.5207 11.8375 14.777C12.2 15.0975 12.5124 15.7126 12.5124 16.6738C12.5124 18.0452 12.5 19.1474 12.5 19.4933C12.5 19.7625 12.6876 20.0829 13.1876 19.9804C17.1375 18.6219 20 14.777 20 10.2529C20 4.58819 15.525 0 10 0Z" fill="white" />
                    </svg> */}
                    <span>Documents</span>
                </p>
                <i className="block w-full h-[1px] bg-white opacity-10 mt-[6vw]"></i>
                <div onClick={() => window.open('https://www.48.club')} className="text-[20px] font-[600] my-[8vw]">
                    <img className="w-[130px] h-[15px]" src={bnb48Icon} alt="" />
                    <svg className="ml-[8px]" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.1118 8.4571V12.6853C13.1118 13.3975 12.5132 14 11.8059 14H1.30594C0.598556 14 0 13.3975 0 12.6853V2.11477C0 1.40263 0.598556 0.800049 1.30594 0.800049H5.50591C5.82836 0.800049 6.11252 1.08409 6.11252 1.40872C6.11252 1.73334 5.83038 2.01942 5.50591 2.01942H1.30594C1.24548 2.01942 1.21122 2.05391 1.21122 2.11477V12.6853C1.21122 12.7462 1.24548 12.7807 1.30594 12.7807H11.8059C11.8663 12.7807 11.9006 12.7462 11.9006 12.6853V8.4571C11.9006 8.13248 12.1827 7.84843 12.5052 7.84843C12.8276 7.84843 13.1118 8.13248 13.1118 8.4571Z" fill="white" />
                        <path d="M13.1096 1.40872V5.28391C13.1096 5.60853 12.8275 5.89258 12.505 5.89258C12.1826 5.89258 11.9004 5.60853 11.9004 5.28391V2.87561L7.34779 7.45686C7.23896 7.56642 7.09184 7.62323 6.90643 7.62323C6.72102 7.62323 6.5739 7.56845 6.46507 7.45889C6.34818 7.34121 6.28369 7.18904 6.28369 7.03079C6.28369 6.87254 6.34818 6.72037 6.46507 6.60269L11.052 2.01942H8.65575C8.33329 2.01942 8.05114 1.73537 8.05114 1.40872C8.05114 1.08409 8.33329 0.800049 8.65575 0.800049H12.505C12.8275 0.800049 13.1096 1.08409 13.1096 1.40872Z" fill="white" />
                    </svg>

                </div>
            </div>
        </div>
    </>
}

export default Header;