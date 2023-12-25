import Nav from "@/components/Nav"
import { Outlet } from "react-router"

const PageWrap = () => {
    return <div className="w-full">
        <Nav />
        <Outlet />
    </div>
}

export default PageWrap