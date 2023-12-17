const { app, BrowserWindow } = require("electron")
const path = require("path")
const url = require("url")
const { ipcMain } = require("electron")
const sqlite3 = require("sqlite3").verbose()

const setupDatabase = require("./database")
const setupChatIPC = require("./controllers/chatController")
const setupMessageIPC = require("./controllers/messageController")
const setupSystemPromptIPC = require("./controllers/systemPromptController")

let db = new sqlite3.Database("./db/chatmist.db")
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "dist/index.html"),
      protocol: "file:",
      slashes: true,
    })

  mainWindow.loadURL(startUrl)

  mainWindow.on("closed", function () {
    mainWindow = null
  })
}

app.on("ready", () => {
  setupDatabase()
  createWindow()
  setupChatIPC(db)
  setupMessageIPC(db)
  setupSystemPromptIPC(db)
})

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow()
  }
})
