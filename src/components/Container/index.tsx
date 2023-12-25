import React from "react";

const Container:React.FC<{
    children?:React.ReactNode;
    className?: string;
    id?:string;
}> = ({ children, className, id }) => {
    return <div id={id} className={`max-w-[1220px] w-[91.733vw] md:px-[10px] mx-auto ${className ?? ''}`}>
        {children}
    </div>
}


export default Container;