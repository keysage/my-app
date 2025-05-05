import { app,session, BrowserWindow, ipcMain } from 'electron';
import { ChatCompletion } from '@baiducloud/qianfan'
import path from 'path';
import 'dotenv/config'
import { CreateChatProps } from './types';
import OpenAI from 'openai'
// 上传需要导入的模块
import fs from 'fs'
import fetch from 'node-fetch'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// 加载 Vue DevTools
async function loadVueDevTools() {
  try {
    const vueDevtoolsPath = path.join(
      __dirname, 
      '..', // 根据项目结构调整路径（可能需要回退到项目根目录）
      'node_modules',
      'vue-devtools',
      'dist'
    );
    await session.defaultSession.loadExtension(vueDevtoolsPath);
    console.log('Vue DevTools loaded');
  } catch (err) {
    console.error('Failed to load Vue DevTools:', err);
  }
}

const createWindow = async () => {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // 应保持为 false
      contextIsolation: true, // 应保持为 true
      // 如果需要加载 Vue DevTools，请取消注释以下代码
      // devTools: true
    },
  });

  ipcMain.on('start-chat', async (event, data: CreateChatProps) => {
      // console.log('start-chart', data);
      const { providerName, messages, messageId, selectedModel } = data
      if (providerName === 'qianfan') {
        const client = new ChatCompletion()
        const stream = await client.chat({
          messages:messages as any,
          stream: true,
        }, selectedModel)
        for await (const chunk of stream as AsyncIterableIterator<any>) {
          const { is_end, result } = chunk
          const content = {
            messageId, //修改的哪个message
            data: {
              is_end,
              result,
            }
          }
          //发送消息给渲染进程
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
  mainWindow.webContents.openDevTools();
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