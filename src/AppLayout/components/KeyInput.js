import React, { useState, useRef, useEffect } from "react"
import axios from "axios"
import { Input, Button, Space, Modal, Tooltip, Typography, Select } from "antd"
import { ipcRenderer } from "electron"

import ModelSelector from "./ModelSelector"

const defaultModel = "mistral-medium"

const KeyInput = () => {
  const inputRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [apiKey, setApiKey] = useState(null)
  const [error, setError] = useState(null)
  const [models, setModels] = useState([])
  // TODO: Handle one global state object.
  //       Change key icon color and animation based on
  //       key presence, validity, and API availability.

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSave()
    }
  }

  const handleSave = () => {
    const newKey = inputRef.current.input.value
    ipcRenderer.invoke("set-api-key", newKey)
    if (error) setError(null)
    setIsModalOpen(false)
    setApiKey(newKey)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleModelsLoad = (res) => {
    setModels(res.data.data.map((model) => model.id))
    console.log(res)
  }

  const handleModelsLoadError = (err) => {
    ipcRenderer.invoke("unset-api-key")
    setApiKey(null)
    setError(err)

    console.error(err)
    showModal()
  }

  useEffect(() => {
    ipcRenderer.invoke("get-api-key").then(setApiKey)
  }, [])

  // Load models list from https://api.mistral.ai/v1/models when key is set
  useEffect(() => {
    if (!apiKey) return

    axios
      .get("https://api.mistral.ai/v1/models", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((res) => {
        handleModelsLoad(res)
      })
      .catch((err) => {
        handleModelsLoadError(err)
      })
  }, [apiKey])

  return (
    <>
      <Space.Compact>
        <Tooltip title="Set API key">
          <Button onClick={showModal}>
            <i className="fa-duotone fa-key" />
          </Button>
        </Tooltip>
        <ModelSelector models={models} />
        <Tooltip title="Create new chat">
          <Button>
            <i className="fa-duotone fa-plus" />
          </Button>
        </Tooltip>
      </Space.Compact>
      <Modal
        title="API Key"
        open={isModalOpen}
        onOk={handleSave}
        onCancel={handleCancel}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              type="primary"
              onClick={handleSave}
              icon={<i className="fa-duotone fa-save" />}
            >
              Save
            </Button>
          </>
        )}
      >
        <Input.Password
          size="large"
          placeholder="Your Mistral API key"
          ref={inputRef}
          defaultValue={apiKey}
          addonBefore={<i className="fa-duotone fa-key" />}
          onKeyDown={handleKeyDown}
          allowClear
          status={error ? "error" : null}
        />
        {error ? (
          <Typography.Text type="danger">
            <i className="fa-duotone fa-exclamation-circle" /> {error.message}
          </Typography.Text>
        ) : null}
      </Modal>
    </>
  )
}

export default KeyInput
