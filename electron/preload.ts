import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  showNotification: (title: string, body: string) =>
    ipcRenderer.invoke('show-notification', title, body),
  setAlwaysOnTop: (flag: boolean) =>
    ipcRenderer.invoke('set-always-on-top', flag),
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
})

declare global {
  interface Window {
    electronAPI: {
      showNotification: (title: string, body: string) => Promise<boolean>
      setAlwaysOnTop: (flag: boolean) => Promise<boolean>
      getAppVersion: () => Promise<string>
    }
  }
}
