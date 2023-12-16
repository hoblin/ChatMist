import React from "react"
import ReactDOM from "react-dom"
import { ConfigProvider } from "antd"
import theme from "./theme"

import "./index.css"

import AppLayout from "./AppLayout"

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AppLayout />
    </ConfigProvider>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))