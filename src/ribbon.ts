// ribbon.ts

import {
	Notice,
} from 'obsidian'

import type MyPlugin from './main'

export function addMyRibbon(plugin: MyPlugin) {
	const ribbonIconEl = plugin.addRibbonIcon(
		'folder-search',
		'Scan journal entries',
		() => {
			const files = plugin.app.vault.getMarkdownFiles()

			for (const file of files) {
				if (file.path.startsWith('Journal Entries/')) {
					console.log(file.path)
				}
			}

			new Notice('Scanned journal entries')
		},
	)

	ribbonIconEl.addClass('my-plugin-ribbon-class')
}