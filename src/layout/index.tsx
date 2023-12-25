import Header from "@/components/Header"
import { Outlet } from "react-router"
import Footer from "@/components/Footer"

const RootLayout = () => {
    return <div className="w-full">
        <Header />
        <Outlet />
        <Footer />
    </div>
}

export default RootLayout