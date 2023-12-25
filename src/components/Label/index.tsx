import React from 'react'

const Label:React.FC<{
  text: string;
  icon?: React.ReactNode
}> = ({ text, icon }) => {
  return (
    <div className="flex flex-row items-center">
      <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18.1304" cy="18.1304" r="15.8641" stroke="url(#paint0_linear_2401_2897)" strokeWidth="4.53261" />
        <defs>
          <linearGradient id="paint0_linear_2401_2897" x1="0" y1="18.1304" x2="33.6168" y2="18.1304" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFC801" />
            <stop offset="1" stopColor="#FFC801" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-bold text-[24px] leading-6 ml-[-24px]" style={{ color: '#FFFFFF' }}>{text}</span>
      {icon}
    </div>
  )
}

export default Label
