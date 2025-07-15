import { CreateChatProps } from "./src/type"
export interface IElectronAPI {
    startChat: (data: CreateChatProps) => void;
}
declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}