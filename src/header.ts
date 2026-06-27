import { Plugin } from "obsidian"
import { TFile } from "obsidian"
import {
	titlePattern, weekdayPattern, monthPattern, 
	flexibleHeaderRegex, meridiemRegex, frontmatterRegex
} from './regex.ts'
import type { FullHeaderValues, MeridiemValues } from "./types.ts"
import { getMeridiemEnd, getFrontMatterText, getBodyText } from './helper.ts'


// REGEX PROCESSING FUNCTIONS //

function stripFrontMatter(text: string): string {
	// Matches YAML frontmatter only if it starts at very beginning of file
	console.log("stripFrontMatter()")
	return text.replace(frontmatterRegex, "")
}

export async function testRegex(plugin: Plugin, file: TFile) {
	console.log('testregex')
	const text = await plugin.app.vault.read(file)
	const fmText = getFrontMatterText(text)

	const idx = getMeridiemEnd(text)

	const bodyText = getBodyText(text, idx)
}

export function headerToString(values: FullHeaderValues | MeridiemValues): string | undefined {
	if ('title' in values) {
		return [
			values.title,
			`${values.weekday}, ${values.month} ${values.day}, ${values.year}`,
			values.time,
		].join("\n")
	}

	if ('match' in values) {
		return [
			values.match,
			values.startIdx,
			values.endIdx
		].join("\n")
	}

}