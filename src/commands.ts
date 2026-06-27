import { Notice, TFile } from "obsidian";
import type MyPlugin from "./main";
import { fmTemplater } from "./frontmatter";
import { receipt } from "./helper";
import { parseHeader } from "./header";
import { headerToString } from "./header";
import { testWrapper } from "./helper";

export function registerCommands(plugin: MyPlugin) {

    plugin.addCommand({
        id: 'fm-format',
        name: 'Format current file YAML frontmatter',
        callback: async () => {
            
            const file = plugin.app.workspace.getActiveFile()

			if (!(file instanceof TFile)) {
				new Notice('No active markdown file')
				return
			}

            await plugin.app.fileManager.processFrontMatter(
	            file, 
	            fmTemplater
            )

            receipt('Frontmatter Formatted')
        }
    })

    plugin.addCommand({
        id: 'parse-header',
        name: 'Parse Note Header',
        callback: async () => {

            
        }
    })
}