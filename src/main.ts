import { app, BrowserWindow, ipcMain } from 'electron';
import { ChatCompletion } from '@baiducloud/qianfan';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import 'dotenv/config'
import OpenAI from 'openai';
import fs from 'fs/promises'
import { Content } from 'openai/resources/containers/files/content';
import { CreateChatProps } from './type';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcMain.on('start-chat', async (event, data: CreateChatProps) => {
    const { providerName, messages, messageId, selectedModel } = data
    console.log('hey', providerName)
    if (providerName === 'qianfan') {
      const client = new ChatCompletion()
      const stream = await client.chat({
        messages: messages as any,
        stream: true
      }, selectedModel)
      for await (const chunk of stream) {
        const { is_end, result } = chunk
        const content = {
          messageId,
          data: {
            is_end,
            result
          }
        }
        mainWindow.webContents.send('update-message', content)
      }
    } else if (providerName === 'dashscope') {
      console.log('dashscope', data)
      const client = new OpenAI({
        apiKey: process.env['ALI_API_KEY'],
        baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
      })
      const stream = await client.chat.completions.create({
        messages: messages as any,
        model: selectedModel,
        stream: true
      })
      for await (const chunk of stream) {
        const choice = chunk.choices[0]
        const content = {
          messageId,
          data: {
            is_end: choice.finish_reason === 'stop',
            result: choice.delta.content || ''
          }
        }
        mainWindow.webContents.send('update-message', content)
      }
    }
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // const client = new OpenAI({
  //   apiKey: process.env['ALI_API_KEY'],
  //   baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  // })
  // const imageBuffer = await fs.readFile("C:/Users/50618/Downloads/dog_and_girl.jpeg")
  // const base64Image = imageBuffer.toString('base64')
  // const resp = await client.chat.completions.create({
  //   messages: [{
  //     role: 'user',
  //     content: [
  //       { type: 'text', text: '图中是什么品种的狗，请用英文回答' },
  //       { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
  //     ]
  //   }],
  //   model: 'qwen-vl-plus'
  // })
  // console.log('resp', resp.choices[0].message)

  // const stream = await client.chat.completions.create({
  //   messages: [
  //     { role: 'system', content: '你是一个英国六岁的小孩，请模仿儿童可爱的口吻进行回答' },
  //     { role: 'user', content: 'how are you' },
  //   ],
  //   model: 'qwen-turbo',
  //   stream: true
  // })
  // for await (const chunk of stream) {
  //   console.log(chunk.choices[0].delta)
  // }
  // const client = new ChatCompletion()
  // const resp = await client.chat({
  //   messages: [
  //     { role: 'user', content: 'how are you' }
  //   ]
  // }, 'ERNIE-Speed-128K')
  // console.log(resp)
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
