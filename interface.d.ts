//定义缺失类型文件
// 將preload作为api的类型文件
import { CreateChatProps,OnUpdatedCallback } from "./src/types";
//electron apI上面的内容
export interface IElectronAPI{
    //单向通道发送给主进程，主进程接收后在进行处理，不需要返回值(异步无需返回值)
    startChat:(data:CreateChatProps) => void;
    //双向通道，主进程发送给渲染进程，渲染进程接收后进行处理，需要返回值
    onUpdateMessage:(callback:OnUpdatedCallback)=>any; 
}
//添加到window对象中,添加扩展内容
declare global{
    interface Window{
        electronAPI:IElectronAPI
    }
}