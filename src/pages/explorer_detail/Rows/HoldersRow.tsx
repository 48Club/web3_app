import { HoldersDataProps } from "@/utils/request.type";
import { shorten } from "@/utils"

export type HoldersRowDataProps = HoldersDataProps & { progress: number, rank: number, amount: number }

const HoldersRow: React.FC<{
    data: HoldersRowDataProps;
    oneData: HoldersRowDataProps
}> = ({ data, oneData }) => {

    const _progress = isNaN(data.progress) ? 0 : data.progress;

    const show_progress = oneData.amount !== undefined ? (data.amount / oneData.amount) * 100 : _progress;

    return (
        <div onClick={() => window.open(`${window.location.origin}/#/account?address=${data.address}`)} className="cursor-pointer flex flex-row h-[60px] justify-between items-center border-b border-[rgba(234,234,234,.1)] text-[14px]">
            <div className="w-[20%] text-[14px] font-[400] leading-[20px]">
                {data.rank}
            </div>
            <div className="w-[30%] flex items-center">
                <div className="flex items-center py-[20px] cursor-pointer" onClick={(e) => {
                    e.stopPropagation()
                    window.open(`https://bscscan.com/address/${data.address}`)
                }}>
                    <span className=" text-[12px] underline mr-[8px]">{shorten(data.address, 3)}</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2387 7.24898V10.8732C11.2387 11.4836 10.7256 12.0001 10.1193 12.0001H1.11938C0.513048 12.0001 0 11.4836 0 10.8732V1.8127C0 1.20229 0.513048 0.685791 1.11938 0.685791H4.71935C4.99574 0.685791 5.23931 0.929259 5.23931 1.20751C5.23931 1.48576 4.99747 1.73096 4.71935 1.73096H1.11938C1.06755 1.73096 1.03819 1.76053 1.03819 1.8127V10.8732C1.03819 10.9253 1.06755 10.9549 1.11938 10.9549H10.1193C10.1711 10.9549 10.2005 10.9253 10.2005 10.8732V7.24898C10.2005 6.97073 10.4423 6.72726 10.7187 6.72726C10.9951 6.72726 11.2387 6.97073 11.2387 7.24898Z" fill="white" />
                        <path d="M11.237 1.20751V4.5291C11.237 4.80735 10.9952 5.05082 10.7188 5.05082C10.4424 5.05082 10.2006 4.80735 10.2006 4.5291V2.46484L6.29832 6.39163C6.20503 6.48554 6.07893 6.53423 5.92001 6.53423C5.76108 6.53423 5.63498 6.48728 5.5417 6.39337C5.44151 6.2925 5.38623 6.16207 5.38623 6.02643C5.38623 5.89078 5.44151 5.76035 5.5417 5.65949L9.47334 1.73096H7.41942C7.14303 1.73096 6.90119 1.48749 6.90119 1.20751C6.90119 0.929259 7.14303 0.685791 7.41942 0.685791H10.7188C10.9952 0.685791 11.237 0.929259 11.237 1.20751Z" fill="white" />
                    </svg>
                </div>
            </div>
            <div className="w-[30%] text-[12px]">
                <p className="my-0">{_progress}%</p>
                <div className="w-[60px] h-[4px] overflow-hidden rounded-full bg-[rgba(255,200,1,.2)]">
                    <div style={{ width: `${show_progress}%` }} className="h-full rounded-full bg-[#FFC801]"></div>
                </div>
            </div>
            <div className="w-[20%] flex justify-end">
                {data.amount}
            </div>
        </div>
    )
}

export default HoldersRow