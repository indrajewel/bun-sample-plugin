import { Weekday, Month } from "./types"

export const titlePattern = "[^\\r\\n]+"
export const weekdayPattern = Object.values(Weekday).join("|")
export const monthPattern = Object.values(Month).join("|")
export const daynumPatttern = "\\d{2}"

export const monthdayPattern = `(?<month>${monthPattern}) (?<daynum>\\d{2})`

export const yearPattern = "\\d{4}"

export const frontmatterRegex = /^---\r?\n[\s\S]*?\r?\n---\r?\n/

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

export const meridiemRegex = /(AM|PM)$/dm