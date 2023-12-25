import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConfigProvider, ThemeConfig, App as AntdApp } from 'antd'
import { BNB, Config, DAppProvider } from '@usedapp/core'
import { Provider } from 'jotai'

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#FFC801",
    colorInfo: "#FFC801",
    colorSuccess: "#08c849",
    colorError: "#ef2b2b",
    colorWarning: "#e2b201",
    colorLink: "#1e1e1e",
    colorTextBase: "#ffffff",
    borderRadius: 4,
    wireframe: false,
    colorBgBase: "#000000",
  },
  components: {
    Button: {
      primaryColor: "#000",
    }
  }
}

const config: Config = {
  readOnlyChainId: BNB.chainId
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <DAppProvider config={config}>
      <ConfigProvider theme={theme}>
        <AntdApp>
          <App />
        </AntdApp>
      </ConfigProvider>
    </DAppProvider>
  </Provider>,
)
