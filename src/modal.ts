import {
  type App,
  type Editor,
  MarkdownView,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
} from 'obsidian'

export class SampleModal extends Modal {
  override onOpen() {
   
    const { titleEl } = this
    titleEl.setText('fuck')

    const { contentEl } = this
    contentEl.setText('Woah!')
  }

  override onClose() {
    const { contentEl } = this
    contentEl.empty()
  }
}