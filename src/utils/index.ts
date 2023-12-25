

export const shorten = (address: string | undefined, num: number=4) => {
    if(address === undefined) return '-';
    return `${address.substring(0, num)}...${address.substring(address.length - num, address.length)}`
}


export const decimalsToStr = (num: number, decimals: number) => {
    return num / Math.pow(10, decimals);
}


export const strToDecimals = (num: number, decimals: number) => {
    return num * Math.pow(10, decimals);
}

export const sleepAwait = (wait: number=5000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, wait);
    })
}

type switchStyleMethodsProps = {
    selectedStyle: React.CSSProperties;
    defaultStyle: React.CSSProperties;
}
export const switchStyle = ({ selectedStyle, defaultStyle }: switchStyleMethodsProps) => {
    return (currentKey: string, targetKey: string) => {
        const isSelected = currentKey === targetKey;
        return isSelected ? selectedStyle : defaultStyle
    }
}