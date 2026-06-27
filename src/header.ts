import { Plugin } from "obsidian"
import { TFile } from "obsidian"
import {titlePattern, weekdayPattern, monthPattern} from './constants.ts'
import type { FullHeaderValues, MeridiemValues } from "./types.ts"

export const flexibleHeaderRegex = new RegExp(
	[
		"^(?:\\r?\\n)?",                    // optional blank line at start
		`(?<title>${titlePattern})`,        // title
		"\\r?\\n",

		// optional weekday: "Saturday, "
		`(?:(?<weekday>${weekdayPattern}),\\s+)?`,

		`(?<month>${monthPattern})`,        // month
		"\\s+",
		"(?<day>\\d{1,2})",                // day
		",\\s+",
		"(?<year>\\d{4})",                 // year
		"\\r?\\n",

		"(?<time>\\d{1,2}:\\d{2}\\s?(?:AM|PM))",
		"(?:\\r?\\n){1,2}",
	].join(""),
	"d"
)

const meridiemRegex = /^(?:\r?\n)?(?<match>AM|PM)(?:\r?\n){1,2}/d



// REGEX PROCESSING FUNCTIONS
function withoutFrontmatter(text: string): string {
	// Matches YAML frontmatter only if it starts at very beginning of file
	const frontmatterRegex = /^---\r?\n[\s\S]*?\r?\n---\r?\n/

	return text.replace(frontmatterRegex, "")
}

export async function testRegex(plugin: Plugin, file: TFile) {
	console.log('testregex')
	const text = await plugin.app.vault.read(file)

	

}

export function parseHeader(text: string): FullHeaderValues | MeridiemValues | null {
	const bodyText = withoutFrontmatter(text)
	console.log(bodyText)

	const fullMatch = bodyText.match(flexibleHeaderRegex)

	if (!fullMatch) {
		console.log("parseHeader() -> fullMatch failed")
	}

	if (fullMatch?.groups) {
		const { title, weekday, month, day, year, time } = fullMatch.groups

		if (!title || !month || !day || !year || !time) {
			console.log("parseHeader() -> fullMatch missing group")
			return null
		}

		const fullIndices = fullMatch.indices?.[0]

		if (!fullIndices) {
			console.log("parseHeader() -> no fullIndices")
			return null
		}

		const [startIdx, endIdx] = fullIndices

		return {
			title,
			weekday,
			month,
			day,
			year,
			time,
			startIdx,
			endIdx,
		}
	}

	const meridiemMatch = bodyText.match(meridiemRegex)

	if (meridiemMatch?.groups) {
		const { match } = meridiemMatch.groups

		if (!match) {
			console.log("parseHeader() -> meridiem missing group")
			return null
		}

		const meridiemIndices = meridiemMatch.indices?.[0]

		if (!meridiemIndices) {
			console.log("parseHeader() -> no meridiemIndices")
			return null
		}

		const [startIdx, endIdx] = meridiemIndices

		return {
			match,
			startIdx,
			endIdx,
		}
	}

	console.log("parseHeader() -> null")
	return null
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