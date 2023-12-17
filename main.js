const { app, BrowserWindow } = require("electron")
const path = require("path")
const url = require("url")
const { ipcMain } = require("electron")
const sqlite3 = require("sqlite3").verbose()

const setupDatabase = require("./database")
const setupChatIPC = require("./controllers/chatController.js")
const setupMessageIPC = require("./controllers/messageController")
const setupSystemPromptIPC = require("./controllers/systemPromptController")

const dbPath = path.join(app.getAppPath(), "db/chatmist.db")

let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message)
  }
  console.log("Connected to the chatmist database.")
})

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
      pathname: path.join(__dirname, "chatmist/index.html"),
      protocol: "file:",
      slashes: true,
    })

  mainWindow.loadURL(startUrl)

  mainWindow.on("closed", function () {
    mainWindow = null
  })
}

app.on("ready", () => {
  setupDatabase(db)
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
