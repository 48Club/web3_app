import { useNavigate } from "react-router-dom"
import ExplorerHeader from "./ExplorerHeader"
import InscriptionsRecord from "./InscriptionsRecord"
import { useTabKey } from "@/store"

const Explorer = () => {

    const nav = useNavigate()

    const {
        setTabKey
    } = useTabKey()
    
    const onSearch = () => {
        setTabKey('account')
        nav('/account')
    }

    return <div className="w-full mt-[127px]">
        <ExplorerHeader onSearch={onSearch} />
        <InscriptionsRecord />
    </div>
}

export default Explorer