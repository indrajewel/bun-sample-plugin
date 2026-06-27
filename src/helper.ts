import { Notice } from 'obsidian'
import { Plugin } from 'obsidian'
import { TFile } from 'obsidian'

export function receipt(message: string) {
    new Notice(message)
    console.log(message)
}

/**
 * wraps declared function for modularity
 * grabs active open file and passes to callback
 * exit early if no file
 * 
 * @param plugin
 * @param callback - function with resolved TFile
 * @return void
 */
export function testWrapper(plugin: Plugin, callback: (file: TFile) => void) {
    const file = plugin.app.workspace.getActiveFile()

    if (!(file instanceof TFile)) {
        receipt('No active markdown file')
        return
    }

    console.log(file.path)

    callback(file)
}