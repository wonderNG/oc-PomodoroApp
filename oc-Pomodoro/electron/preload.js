const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  showTimerNotification: (data) => ipcRenderer.send("show-timer-notification", data),
  onStartFromNotification: (callback) => ipcRenderer.on("start-timer-from-notification", () => callback()),
});