// database.js
const sqlite3 = require("sqlite3").verbose()

function setupDatabase() {
  let db = new sqlite3.Database("./db/chatmist.db", (err) => {
    if (err) {
      console.error(err.message)
    }
    console.log("Connected to the chatmist database.")
  })

  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS system_prompts(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      prompt TEXT NOT NULL
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS chats(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      system_prompt_id INTEGER,
      model_name TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(system_prompt_id) REFERENCES system_prompts(id)
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS messages(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_id INTEGER,
      role TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(chat_id) REFERENCES chats(id)
    )`)
  })

  db.close((err) => {
    if (err) {
      console.error(err.message)
    }
    console.log("Close the database connection.")
  })
}

module.exports = setupDatabase
