import React from "react"
import ReactDOM from "react-dom"
import { ConfigProvider } from "antd"
import theme from "./theme"

import "../assets/js/fontawesome"
import "../assets/js/duotone"
import "../assets/js/conflict-detection"

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
