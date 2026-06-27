import { Notice } from 'obsidian'
import { Plugin } from 'obsidian'
import { TFile } from 'obsidian'
import { meridiemRegex, frontmatterRegex } from './regex'


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


/**
 * get name of day from given Date
 * 
 * @param year {number}
 * @param month {number}
 * @param day {number}
 */
export function dayOfWeek(year: number, month: number, day: number) {
    const weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]    

    const weekDay = new Date(year, month-1, day).getDay()
    return weekDay
}

export function getMeridiemEnd(text: string): number | null {
    
    const match = text.match(meridiemRegex)

    if (!match) {
        console.log("no match")
        return null
    }

    const indices = match.indices[0]
    const matchIdx = indices[1]

    console.log(`getMeridiemEnd() -> ${matchIdx}`)
    return matchIdx
}

export function getFrontMatterText(text: string): string | null{
	console.log("getFrontMatterText()")
	const match = text.match(frontmatterRegex)
	const fmText = match[0]
	console.log(fmText)
	return fmText
}

/**
 * get note body text starting from idx
 * 
 * @param text 
 * @param idx 
 * @returns stripped text
 */
export function getBodyText(text: string, idx: number): string {
	console.log(`stripBodyHeader(text, ${idx})`)

	const stripped = text.slice(idx+2, -1)
	console.log(stripped)

	return stripped
}