import React, { useState, useEffect } from "react"
import { Select } from "antd"
import { ipcRenderer } from "electron"

const ModelSelector = ({ models }) => {
  const [model, setModel] = useState(null)

  useEffect(() => {
    if (model) return

    const storedModel = ipcRenderer.invoke("get-model")
    setModel(
      storedModel ||
        // if "mistral-medium" present in models, use it as default
        models.includes("mistral-medium")
        ? "mistral-medium"
        : models[0] || null
    )
  }, [models])

  const handleSelect = (value) => {
    ipcRenderer.invoke("set-model", value)
    setModel(value)
  }

  const options = models.map((model) => ({
    value: model,
    label: model,
  }))

  return (
    <Select
      placeholder="Select model"
      options={options}
      value={model}
      onChange={handleSelect}
    />
  )
}

export default ModelSelector
