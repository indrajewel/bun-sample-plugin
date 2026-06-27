import { 
	App,
  Modal,
  Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	TAbstractFile,
	TFolder,
	TFile,
  Vault
} from 'obsidian'

import { SampleSettingTab } from './settings'
import { addMyRibbon } from './ribbon'
import { fmTemplater } from './frontmatter'
import { registerCommands } from './commands'
import { receipt } from './helper'

interface MyPluginSettings {
	mySetting: string
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'Default',
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings = DEFAULT_SETTINGS

  

	override async onload() {
    const {
      vault,
      workspace,
      metadataCache,
      fileManager,
    } = this.app

		await this.loadSettings()

		this.addSettingTab(new SampleSettingTab(this.app, this))
    addMyRibbon(this)
    registerCommands(this)

    receipt('Plugin Loaded Successfully')

	}

	override onunload() {
    receipt('Plugin Unloaded')
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		)
	}

	async saveSettings() {
		await this.saveData(this.settings)
	}
}