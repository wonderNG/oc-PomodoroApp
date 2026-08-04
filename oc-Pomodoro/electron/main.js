import { app, BrowserWindow, Menu, Notification, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";

Menu.setApplicationMenu(null); 

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = !app.isPackaged;


// Set App User Model ID so Windows Toast Notifications display correctly during dev
if (process.platform === "win32") {
  app.setAppUserModelId(app.getName() || "Pomodoro App");
}

let win;
let snoozeTimeout = null;

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 480,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"), // Load preload script
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}
app.setName('ocPomodoro-Tango');
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});