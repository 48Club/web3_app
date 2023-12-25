import bnb48Icon from '@/assets/bnb-48.png'


const Footer = () => {
    return <div className="w-full py-[40px] px-[24px] border-t-[4px] mb-[50px] border-[#FFC801] mt-[42px]">
        <div onClick={() => window.open('https://www.48.club')} className="text-[20px] font-[600]">
            <img className="w-[130px] h-[15px]" src={bnb48Icon} alt="" />
            <svg className="ml-[8px]" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.1118 8.4571V12.6853C13.1118 13.3975 12.5132 14 11.8059 14H1.30594C0.598556 14 0 13.3975 0 12.6853V2.11477C0 1.40263 0.598556 0.800049 1.30594 0.800049H5.50591C5.82836 0.800049 6.11252 1.08409 6.11252 1.40872C6.11252 1.73334 5.83038 2.01942 5.50591 2.01942H1.30594C1.24548 2.01942 1.21122 2.05391 1.21122 2.11477V12.6853C1.21122 12.7462 1.24548 12.7807 1.30594 12.7807H11.8059C11.8663 12.7807 11.9006 12.7462 11.9006 12.6853V8.4571C11.9006 8.13248 12.1827 7.84843 12.5052 7.84843C12.8276 7.84843 13.1118 8.13248 13.1118 8.4571Z" fill="white" />
                <path d="M13.1096 1.40872V5.28391C13.1096 5.60853 12.8275 5.89258 12.505 5.89258C12.1826 5.89258 11.9004 5.60853 11.9004 5.28391V2.87561L7.34779 7.45686C7.23896 7.56642 7.09184 7.62323 6.90643 7.62323C6.72102 7.62323 6.5739 7.56845 6.46507 7.45889C6.34818 7.34121 6.28369 7.18904 6.28369 7.03079C6.28369 6.87254 6.34818 6.72037 6.46507 6.60269L11.052 2.01942H8.65575C8.33329 2.01942 8.05114 1.73537 8.05114 1.40872C8.05114 1.08409 8.33329 0.800049 8.65575 0.800049H12.505C12.8275 0.800049 13.1096 1.08409 13.1096 1.40872Z" fill="white" />
            </svg>
        </div>
        <p className='mt-[44px] text-[12px] font-[400] leading-[18px] my-0'>
        48 Club® was founded in Sept. 2017 by a diverse and tight-knit group of investors with a common passion for BNB. We now have over 500 club members with various backgrounds hailing from all over the world. 48 Club® is run as a decentralized autonomous organization (DAO) and its main areas of operations and expertise are industry research, angel investment, product development, community development and management, and technical operations and maintenance.
        </p>
        <p className='text-[12px] font-[400] leading-[18px] my-0 mt-[18px]'>© 2022 48 Club®</p>
    </div>
}

export default Footer;