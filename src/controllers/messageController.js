const { ipcMain } = require("electron")

module.exports = function (db) {
  // Create a new message
  ipcMain.handle(
    "create-message",
    async (event, { chat_id, role, message }) => {
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO messages(chat_id, role, message) VALUES(?, ?, ?)`,
          [chat_id, role, message],
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

  // Get all messages for a specific chat
  ipcMain.handle("get-messages", async (event, chat_id) => {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM messages WHERE chat_id = ?",
        [chat_id],
        (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
        }
      )
    })
  })

  // Get a single message
  ipcMain.handle("get-message", async (event, message_id) => {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM messages WHERE id = ?",
        [message_id],
        (err, row) => {
          if (err) {
            reject(err)
          } else {
            resolve(row)
          }
        }
      )
    })
  })

  // Delete a message
  ipcMain.handle("delete-message", async (event, message_id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM messages WHERE id = ?`, message_id, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve({ deleted: this.changes })
        }
      })
    })
  })
}
