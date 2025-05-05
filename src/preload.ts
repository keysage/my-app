// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// 导入 Electron 的 contextBridge 和 ipcRenderer 模块
import { contextBridge, ipcRenderer } from 'electron';
import { CreateChatProps, OnUpdatedCallback } from './types';
contextBridge.exposeInMainWorld('electronAPI', {
    //发送主进程
    startChat: (data: CreateChatProps) => ipcRenderer.send('start-chat', data),
    // callback接收对应的参数
    onUpdateMessage: (callback: OnUpdatedCallback) => ipcRenderer.on('update-message', (_event, data) => callback(data))
})

