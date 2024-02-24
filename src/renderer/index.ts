import { renderMarkdown } from './markdown';
import Elements from './elements';

window.api.onFileOpen((content: string) => {
  Elements.MarkdownView.value = content;
  Elements.ShowFileButton.disabled = false;
  Elements.OpenInDefaultApplicationButton.disabled = false;
  renderMarkdown(content);
});

Elements.MarkdownView.addEventListener('input', async () => {
  const markdown = Elements.MarkdownView.value;
  renderMarkdown(markdown);
  const hasChanges = await window.api.checkForUnsavedChanges(markdown) ;
  Elements.SaveMarkdownButton.disabled = !hasChanges;
});

Elements.OpenFileButton.addEventListener('click', () => {
  window.api.showOpenDialog();
});

Elements.ExportHtmlButton.addEventListener('click', () => {
  window.api.showExportHtmlDialog(Elements.RenderedView.innerHTML);
});

Elements.SaveMarkdownButton.addEventListener('click', () => {
  window.api.saveFile(Elements.MarkdownView.value, '');
  Elements.SaveMarkdownButton.disabled = true;
});

Elements.ShowFileButton.addEventListener('click', () => {
  window.api.showInFolder();
});

Elements.OpenInDefaultApplicationButton.addEventListener('click', () => {
  window.api.openInDefaultApplication();
});
