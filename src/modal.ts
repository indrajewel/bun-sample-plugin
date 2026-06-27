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

import { receipt } from './helper'

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

export class Modal2 extends Modal {
  override onOpen() {
    const {titleEl} = this
    titleEl.setText('test')

    const {contentEl} = this
    contentEl
    new Setting(contentEl)

  }


  override onClose() {
    const { contentEl } = this
    contentEl.empty()
    receipt("closed modal")
  }

}