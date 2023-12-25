import { useTabKey } from "@/store";
import { switchStyle } from "@/utils";

const getTitleStyleByTabKey = switchStyle({
    selectedStyle: {
        fontSize: 20,
        opacity: 1
    },
    defaultStyle: {
        fontSize: 14,
        opacity: 0.5
    }
})

const getLineStyleByTabKey = switchStyle({
    selectedStyle: {
        opacity: 1
    },
    defaultStyle: {
        opacity: 0
    }
})

const Nav = () => {

    const { tabKey, setTabKey } = useTabKey()

    return <div className="w-full h-[60px] bg-[#1B1B1B] pb-[10px] fixed z-[97] top-[58px] left-0">
        <div className="h-[15px]"></div>
        <div className="flex h-[34px] pl-[16px]">
            <div onClick={() => setTabKey("explorer")} className="relative h-full">
                <h1 style={getTitleStyleByTabKey(tabKey, "explorer")} className="text-[#FFFFFF] transition-all text-[20px] z-10 relative font-[400] leading-[20px] my-0">Explorer</h1>
                <svg style={getLineStyleByTabKey(tabKey, "explorer")} className=" absolute transition-opacity bottom-0 z-[9]" width="73" height="22" viewBox="0 0 73 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="18" width="73" height="4" fill="#FFC801" />
                    <mask id="mask0_2401_2959" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="73" height="18">
                        <rect width="73" height="18" transform="matrix(1 0 0 -1 0 18)" fill="#FFC801" />
                    </mask>
                    <g mask="url(#mask0_2401_2959)">
                        <g filter="url(#filter0_f_2401_2959)">
                            <ellipse cx="38.5" cy="27.5" rx="27.5" ry="5.5" fill="#FFC801" />
                        </g>
                    </g>
                    <defs>
                        <filter id="filter0_f_2401_2959" x="-7" y="4" width="91" height="47" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="9" result="effect1_foregroundBlur_2401_2959" />
                        </filter>
                    </defs>
                </svg>
            </div>
            <div onClick={() => setTabKey("account")} className="ml-[18px] relative h-full">
                <h1 style={getTitleStyleByTabKey(tabKey, "account")} className="text-[#FFFFFF] transition-all text-[20px] z-10 relative font-[400] leading-[20px] my-0">Account</h1>
                <svg style={getLineStyleByTabKey(tabKey, "account")} className=" absolute transition-opacity bottom-0 z-[9]" width="73" height="22" viewBox="0 0 73 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="18" width="73" height="4" fill="#FFC801" />
                    <mask id="mask0_2401_2959" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="73" height="18">
                        <rect width="73" height="18" transform="matrix(1 0 0 -1 0 18)" fill="#FFC801" />
                    </mask>
                    <g mask="url(#mask0_2401_2959)">
                        <g filter="url(#filter0_f_2401_2959)">
                            <ellipse cx="38.5" cy="27.5" rx="27.5" ry="5.5" fill="#FFC801" />
                        </g>
                    </g>
                    <defs>
                        <filter id="filter0_f_2401_2959" x="-7" y="4" width="91" height="47" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="9" result="effect1_foregroundBlur_2401_2959" />
                        </filter>
                    </defs>
                </svg>
            </div>
            <div onClick={() => setTabKey('coming-soon')} className="ml-[18px] relative h-full">
                <h1 style={getTitleStyleByTabKey(tabKey, "coming-soon")} className="text-[#FFFFFF] transition-all text-[20px] z-10 relative font-[400] leading-[20px] my-0">Launch Pad</h1>
                <svg style={getLineStyleByTabKey(tabKey, "coming-soon")} className=" absolute transition-opacity bottom-0 z-[9]" width="106" height="22" viewBox="0 0 106 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="18" width="106" height="4" fill="#FFC801"/>
<mask id="mask0_2439_15098" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="106" height="18">
<rect width="106" height="18" transform="matrix(1 0 0 -1 0 18)" fill="#FFC801"/>
</mask>
<g mask="url(#mask0_2439_15098)">
<g filter="url(#filter0_f_2439_15098)">
<ellipse cx="55.9041" cy="27.5" rx="39.9315" ry="5.5" fill="#FFC801"/>
</g>
</g>
<defs>
<filter id="filter0_f_2439_15098" x="-2.0274" y="4" width="115.863" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="9" result="effect1_foregroundBlur_2439_15098"/>
</filter>
</defs>
</svg>
{/* 
                <svg style={getLineStyleByTabKey(tabKey, "coming-soon")} className=" absolute transition-opacity bottom-0 z-[9]" width="73" height="22" viewBox="0 0 73 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="18" width="73" height="4" fill="#FFC801" />
                    <mask id="mask0_2401_2959" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="73" height="18">
                        <rect width="73" height="18" transform="matrix(1 0 0 -1 0 18)" fill="#FFC801" />
                    </mask>
                    <g mask="url(#mask0_2401_2959)">
                        <g filter="url(#filter0_f_2401_2959)">
                            <ellipse cx="38.5" cy="27.5" rx="27.5" ry="5.5" fill="#FFC801" />
                        </g>
                    </g>
                    <defs>
                        <filter id="filter0_f_2401_2959" x="-7" y="4" width="91" height="47" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="9" result="effect1_foregroundBlur_2401_2959" />
                        </filter>
                    </defs>
                </svg> */}
            </div>
        </div>
       
    </div>
}

export default Nav;