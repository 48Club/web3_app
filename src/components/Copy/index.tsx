
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Copy: React.FC<{
    text: string;
    children: React.ReactNode | string;
    className?: string;
}> = ({ text, children, className }) => {

    return <div className={className}>
        <CopyToClipboard text={text}>
            <div>{children}</div>
        </CopyToClipboard>
    </div>
}

export default Copy;