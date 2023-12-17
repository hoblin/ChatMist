import React from "react"
import { Layout } from "antd"

// Defines the layout of the application with
const AppLayout = () => {
  return (
    <Layout>
      <Layout.Sider className="sider">
        <i class="fa-duotone fa-key"></i>
        Sider
      </Layout.Sider>
      <Layout>
        <Layout.Content className="content">Content</Layout.Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
