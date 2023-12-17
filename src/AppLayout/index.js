import React, { useState } from "react"
import { Layout, Space } from "antd"
import { Resizable } from "re-resizable"

import KeyInput from "./components/KeyInput"

// Defines the layout of the application with
const AppLayout = () => {
  return (
    <Layout>
      <Resizable
        defaultSize={{
          width: "265px",
          height: "100vh",
        }}
        minWidth="20vw"
        maxWidth="50vw"
        enable={{ right: true }}
      >
        <Layout.Sider className="sider" width="inherit">
          <Space direction="vertical">
            <KeyInput />
          </Space>
        </Layout.Sider>
      </Resizable>
      <Layout>
        <Layout.Content className="content">Content</Layout.Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
