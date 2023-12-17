// database.js

function setupDatabase(db) {
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
}

module.exports = setupDatabase
