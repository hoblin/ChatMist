// Usage example:
// import MistralClient from '@mistralai/mistralai';

// const apiKey = process.env.MISTRAL_API_KEY;

// const client = new MistralClient(apiKey);

// const chatStreamResponse = await client.chatStream({
//   model: 'mistral-tiny',
//   messages: [{role: 'user', content: 'What is the best French cheese?'}],
// });

// console.log('Chat Stream:');
// for await (const chunk of chatStreamResponse) {
//   if (chunk.choices[0].delta.content !== undefined) {
//     const streamText = chunk.choices[0].delta.content;
//     process.stdout.write(streamText);
//   }
// }

import MistralClient from "@mistralai/mistralai"
import React, { useState, useEffect } from "react"
import { ipcRenderer } from "electron"
import { Input, Button, Typography, Card, Empty } from "antd"

const Chat = () => {
  const [state, setState] = useState({
    model: null,
    messages: [],
  })

  useEffect(() => {
    const storedModel = ipcRenderer.invoke("get-model")
    if (storedModel && storedModel !== state.model) {
      setState((state) => ({ ...state, model: storedModel }))
    }
  }, [])
}

export default Chat
