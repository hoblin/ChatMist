const { ipcMain } = require("electron")
const Store = require("electron-store")

const store = new Store()

module.exports = function () {
  // Set API key
  ipcMain.handle("set-api-key", async (event, apiKey) => {
    store.set("apiKey", apiKey)
    return true
  })

  // Get API key
  ipcMain.handle("get-api-key", async (event) => {
    return store.get("apiKey")
  })

  // Unset API key
  ipcMain.handle("unset-api-key", async (event) => {
    store.delete("apiKey")
    return true
  })

  // Set selected model
  ipcMain.handle("set-model", async (event, model) => {
    store.set("model", model)
    return true
  })

  // Get selected model
  ipcMain.handle("get-model", async (event) => {
    return store.get("model")
  })
}
