// ribbon.ts

import {
	Notice,
} from 'obsidian'

import MyPlugin from './main'
import { receipt } from './helper'
import { testWrapper } from './helper'
import { testRegex } from './header'

export function addMyRibbon(plugin: MyPlugin) {
	const ribbon1 = plugin.addRibbonIcon(
		'folder-search',         // icon
		'Scan journal entries',  // tooltip text

		() => {
			const files = plugin.app.vault.getMarkdownFiles()

			for (const file of files) {
				if (file.path.startsWith('Journal Entries/')) {
					console.log(file.path)
				}
			}

			new Notice('Scanned journal entries')
		}
	)

    const ribbon2 = plugin.addRibbonIcon(
		'file-search-corner',
		'regex test',
		() => {
			testWrapper(plugin, (file) => testRegex(plugin, file) )
		}
	)


/*
    const parseHeaderRibbon = plugin.addRibbonIcon(plugin: MyPlugin) {
        'file-text',
        'Parse Header',
        () => {

        }
    }

	ribbonIconEl.addClass('my-plugin-ribbon-class')
 */
}