const { ipcMain } = require("electron")

module.exports = function (db) {
  // Create a new system prompt
  ipcMain.handle("create-prompt", async (event, { prompt }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO system_prompts(prompt) VALUES(?)`,
        [prompt],
        function (err) {
          if (err) {
            reject(err)
          } else {
            resolve(this.lastID)
          }
        }
      )
    })
  })

  // Get all system prompts
  ipcMain.handle("get-prompts", async (event, arg) => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM system_prompts", [], (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  })

  // Get a single system prompt
  ipcMain.handle("get-prompt", async (event, prompt_id) => {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM system_prompts WHERE id = ?",
        [prompt_id],
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

  // Update a system prompt
  ipcMain.handle("update-prompt", async (event, { id, prompt }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE system_prompts SET prompt = ? WHERE id = ?`,
        [prompt, id],
        function (err) {
          if (err) {
            reject(err)
          } else {
            resolve({ updated: this.changes })
          }
        }
      )
    })
  })

  // Delete a system prompt
  ipcMain.handle("delete-prompt", async (event, prompt_id) => {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM system_prompts WHERE id = ?`,
        prompt_id,
        function (err) {
          if (err) {
            reject(err)
          } else {
            resolve({ deleted: this.changes })
          }
        }
      )
    })
  })
}
