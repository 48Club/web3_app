import Container from "@/components/Container";
import { Row, Col } from "antd";
import acidIcon from '@/assets/images/acid.svg'


const Marketplace = () => {

    return <Container className="pt-[165px]">
        <div className="w-full absolute h-[410px] top-[155px] left-0 md:mt-[-14px]">
            <div className="w-[100vw] h-full absolute bg-line-market left-[50%] translate-x-[-50%]"></div>
        </div>
        <h1 className="font-Rowdies my-0 text-[24px] md:text-[44px] w-[200px] mx-auto md:w-full leading-[25px] text-[#FFC801] text-center">Third Party Marketplace</h1>
        <p className="mt-[14px] md:mt-[40px] md:w-full w-[240px] mx-auto text-center text-[12px] md:text-[14px] leading-[14px] text-[#FFC801]">All marketplaces are developed by third-party partners.</p>
        <div className="w-full mt-[50px]">
            <Row gutter={[24, 24]}>
                <Col span={24} md={{ span: 8 }}>
                    <div onClick={() => window.open("https://evms.app")} className="w-full border-[2px] border-transparent transition-colors cursor-pointer flex items-center px-[14px] py-[24px] bg-[#000000CC] party-item h-[100px]">
                        <img className="w-[42px] h-[42px]" src={acidIcon} alt="" />
                        <div className="ml-[12px]">
                            <div className="flex items-center">
                                <h1 className="my-0 text-[14px] text-[#FFC801] font-[700] leading-[20px] mr-[5px]">EVMs</h1>
                                <svg onClick={(e) => {
                                    e.stopPropagation()
                                    window.open("https://twitter.com/Acidmarket2024")
                                }} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_2517_9847)">
                                        <path d="M17.0994 6.59827H19.2713L14.5263 12.0215L20.1084 19.4013H15.7377L12.3143 14.9255L8.39727 19.4013H6.22403L11.2993 13.6005L5.94434 6.59827H10.4261L13.5204 10.6893L17.0994 6.59827ZM16.3371 18.1013H17.5406L9.77211 7.82998H8.48065L16.3371 18.1013Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2517_9847">
                                            <rect width="15.7576" height="15.7576" fill="white" transform="translate(5.12109 5.12097)" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <svg onClick={(e) => {
                                    e.stopPropagation();
                                    window.open("https://t.me/acidmarket")
                                }} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.42958 7.42859C8.90562 5.95157 10.911 5.12097 13.0001 5.12097C15.0892 5.12097 17.0946 5.95157 18.5707 7.42859C20.0479 8.90562 20.8789 10.911 20.8789 12.9998C20.8789 15.0885 20.0479 17.0939 18.5707 18.5709C17.0946 20.048 15.0892 20.8785 13.0001 20.8785C10.911 20.8785 8.90562 20.048 7.42958 18.5709C5.9523 17.0939 5.12134 15.0885 5.12134 12.9998C5.12134 10.911 5.9523 8.90562 7.42958 7.42859ZM13.2911 11.0704C12.5317 11.3973 11.013 12.074 8.73499 13.1002C8.36508 13.2524 8.17094 13.4012 8.15385 13.5467C8.12379 13.7924 8.42133 13.8893 8.82562 14.021C8.88108 14.0391 8.93855 14.0578 8.99746 14.0776C9.39667 14.2117 9.93379 14.3687 10.2121 14.3748C10.4661 14.3805 10.7481 14.2726 11.0594 14.0511C13.1885 12.5654 14.286 11.8144 14.3556 11.7982C14.4044 11.7868 14.4716 11.7725 14.5168 11.8145C14.5632 11.8564 14.5583 11.936 14.5534 11.9573C14.5246 12.0871 13.3602 13.2067 12.7543 13.7894C12.5638 13.9725 12.4285 14.1026 12.4011 14.1322C12.3398 14.1981 12.2773 14.2604 12.2172 14.3203C11.8467 14.6897 11.5687 14.9668 12.2326 15.4192C12.5545 15.6385 12.8115 15.8195 13.0683 16.0004C13.3442 16.1947 13.6199 16.389 13.976 16.6305C14.0675 16.6926 14.1549 16.757 14.24 16.8198C14.5636 17.0584 14.8543 17.2727 15.2139 17.2385C15.4226 17.2187 15.6387 17.0156 15.7474 16.4101C16.0062 14.9789 16.5153 11.8781 16.6325 10.6004C16.6435 10.4885 16.63 10.3452 16.6203 10.2823C16.6093 10.2194 16.5873 10.1298 16.5092 10.0635C16.4152 9.98483 16.2711 9.96829 16.2064 9.96943C15.9122 9.97486 15.4617 10.137 13.2911 11.0704Z" fill="white" />
                                </svg>

                            </div>
                            <p className="my-0 mt-[4px] w-[210px] text-[#A9A9A9] text-[12px] font-[400] leading-[12px]">An Inscriptions Exchange based on multichain programable indexers.</p>
                        </div>
                        <svg className="ml-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.97069 0.648278L11.8755 7.55312C11.9992 7.67678 12.0667 7.83605 12.0667 8.00095C12.0667 8.16584 11.9992 8.32511 11.8755 8.4469L5.03065 15.3517C4.90885 15.4735 4.72522 15.5429 4.52286 15.5429C4.34298 15.5429 4.20994 15.4867 4.0769 15.3517C3.82207 15.0969 3.82207 14.7128 4.0769 14.458L10.5358 8.00095L4.0769 1.54207C3.82207 1.28723 3.82207 0.90311 4.0769 0.648278C4.33173 0.393445 4.71585 0.393445 4.97069 0.648278Z" fill="white" />
                        </svg>
                    </div>
                </Col>
                <Col span={24} md={{ span: 8 }}>
                    <div className="w-full flex items-center px-[14px] py-[24px] bg-[#000000CC] party-item h-[100px]">
                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.25708 22.0001C1.25708 10.5663 10.5661 1.2572 21.9999 1.2572C33.4337 1.2572 42.7428 10.5663 42.7428 22.0001C42.7428 33.4339 33.4337 42.7429 21.9999 42.7429C10.5661 42.7429 1.25708 33.4339 1.25708 22.0001ZM19.977 22C19.977 23.1156 20.8843 24.0229 21.9999 24.0229C23.1155 24.0229 24.0228 23.1156 24.0228 22C24.0228 20.8844 23.1155 19.9771 21.9999 19.9771C20.8843 19.9771 19.977 20.8844 19.977 22ZM32.1191 22.0047C32.1191 23.1203 31.2118 24.0276 30.0962 24.0276C28.9806 24.0276 28.0733 23.1203 28.0733 22.0047V22C28.0733 20.8844 28.9806 19.9771 30.0962 19.9771C31.2118 19.9771 32.1191 20.8844 32.1191 22.0047ZM13.9037 24.0229C15.0239 24.0229 15.9266 23.1156 15.9266 22C15.9266 20.8844 15.0193 19.9771 13.9037 19.9771C12.7881 19.9771 11.8808 20.8844 11.8808 22C11.8808 23.1156 12.7881 24.0229 13.9037 24.0229Z" fill="white" />
                        </svg>

                        <div className="ml-[12px]">
                            <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                                <h1 className="my-0 text-[14px] text-[#FFC801] font-[700] leading-[20px] mr-[5px]">More</h1>
                            </div>
                            <p className="my-0 mt-[4px] w-[210px] text-[#A9A9A9] text-[12px] font-[400] leading-[12px]">Coming Soon......</p>
                        </div>
                        <svg className="ml-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.97044 0.648278L11.8753 7.55312C11.999 7.67678 12.0664 7.83605 12.0664 8.00095C12.0664 8.16584 11.999 8.32511 11.8753 8.4469L5.0304 15.3517C4.90861 15.4735 4.72498 15.5429 4.52261 15.5429C4.34273 15.5429 4.20969 15.4867 4.07666 15.3517C3.82182 15.0969 3.82182 14.7128 4.07666 14.458L10.5355 8.00095L4.07666 1.54207C3.82182 1.28723 3.82182 0.90311 4.07666 0.648278C4.33149 0.393445 4.71561 0.393445 4.97044 0.648278Z" fill="#1E1E1E" />
                        </svg>
                    </div>
                </Col>
            </Row>
        </div>
    </Container>
}

export default Marketplace;