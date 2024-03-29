import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld('api', {
    onFileOpen: (callback: (content: string) => void) => {
        ipcRenderer.on('file-opened', (_, content: string) => callback(content));
    },

    showOpenDialog: () => {
        ipcRenderer.send('show-open-dialog');
    },

    showExportHtmlDialog: (html: string) => {
        ipcRenderer.send('show-export-html-dialog', html);
    },

    saveFile: async (content: string, filePath: string) => {
        ipcRenderer.send('save-file', content, filePath);
    },

    checkForUnsavedChanges: async (content: string) => {
        const response = await ipcRenderer.invoke('has-changes', content);
        console.log(response);
        return response;
    },

    showInFolder: () => {
        ipcRenderer.send('show-in-folder');
    },

    openInDefaultApplication: () => {
        ipcRenderer.send('open-in-default-application');
    }

});