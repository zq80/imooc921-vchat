import { CreateChatProps, OnUpdatedCallback } from "./src/type"
export interface IElectronAPI {
    startChat: (data: CreateChatProps) => void;
    onUpdateMessage: (callback: OnUpdatedCallback) => any;
}
declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}