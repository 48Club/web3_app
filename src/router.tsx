import { createHashRouter } from "react-router-dom";

import ExplorerDetail from "@/pages/explorer_detail";
import Explorer from "@/pages/explorer";
import Account from "@/pages/account";
// import Marketplace from "@/pages/marketplace";
import { Deploy } from "@/pages/explorer/Deploy";
import AccountMobileBetch from "@/pages/account/AccountMobileBetch";
import RootLayout from "./layout";
import PageWrap from "./layout/page_wrap";
import ComingSoon from "./pages/coming_soon";
import Recap from "./pages/account/Recap";
import Marketplace from "./pages/marketplace";

const routes = createHashRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <PageWrap />,
                children: [
                    {
                        index: true,
                        element: <Explorer />,
                    },
                    {
                        path: "/explorer",
                        element: <Explorer />
                    },
                    {
                        path: "/account",
                        element: <Account />
                    },
                    {
                        path: "/coming-soon",
                        element: <ComingSoon />
                    },
                    {
                        path: "/marketplace",
                        element: <Marketplace />
                    },
                ]
            },
            {
                path: "/explorer/mobile/deploy",
                element: <Deploy />
            },
            {
                path: '/explorer/detail/:id',
                element: <ExplorerDetail />
            },
            {
                path: "/account/betch/:hash",
                element: <AccountMobileBetch />
            },
            {
                path: "/account/recap/:hash",
                element: <Recap />
            },
        ]
    }
])


export default routes;