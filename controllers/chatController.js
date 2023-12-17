const { ipcMain } = require("electron")

module.exports = function (db) {
  // Create a new chat
  ipcMain.handle(
    "create-chat",
    async (event, { system_prompt_id, model_name }) => {
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO chats(system_prompt_id, model_name) VALUES(?, ?)`,
          [system_prompt_id, model_name],
          function (err) {
            if (err) {
              reject(err)
            } else {
              resolve(this.lastID)
            }
          }
        )
      })
    }
  )

  // Get all chats
  ipcMain.handle("get-chats", async (event, arg) => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM chats", [], (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  })

  // Get a single chat
  ipcMain.handle("get-chat", async (event, chat_id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM chats WHERE id = ?", [chat_id], (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row)
        }
      })
    })
  })

  // Delete a chat
  ipcMain.handle("delete-chat", async (event, chat_id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM chats WHERE id = ?`, chat_id, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve({ deleted: this.changes })
        }
      })
    })
  })
}
