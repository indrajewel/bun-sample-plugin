export enum Weekday {
	Monday = "Monday",
	Tuesday = "Tuesday",
	Wednesday = "Wednesday",
	Thursday = "Thursday",
	Friday = "Friday",
	Saturday = "Saturday",
	Sunday = "Sunday",
}

export enum Month {
	January = "January",
	February = "February",
	March = "March",
	April = "April",
	May = "May",
	June = "June",
	July = "July",
	August = "August",
	September = "September",
	October = "October",
	November = "November",
	December = "December",
}

const titlePattern = "[^\\n]+"
const weekdayPattern = Object.values(Weekday).join("|")
const monthPattern = Object.values(Month).join("|")

const ampmOnlyHeaderRegex = /^(?<ampm>AM|PM)(?:\r?\n){1,2}/i


export const fullHeaderRegex = new RegExp(  
	[  
		"^",                              // anchor
		`(?<title>${titlePattern})`,      // title
		"\\n",                            // \n
		`(?<weekday>${weekdayPattern})`,  // weekday
		",\\s+",                          // whitespace
		`(?<month>${monthPattern})`,      // month
		"\\s+",                           // whitespace
		"(?<day>\\d{1,2})",               // daynum
		",\\s+",                          // whitespace
		"(?<year>\\d{4})",                // \n
		"\\n",                            // newline
		"(?<time>\\d{1,2}:\\d{2}\\s?(?:AM|PM))",  
		"(?:\\r?\\n){1,2}",  
	].join("")  
)

export type FullHeaderValues = {
	title: string
	weekday: string
	month: string
	day: string
	year: string
	time: string
}

export function parseHeader(text: string): FullHeaderValues | null {
	const fullMatch = text.match(fullHeaderRegex)

	if (!fullMatch?.groups) {
		console.log("parseHeader() = null")
		return null
	}

	const {
		title,
		weekday,
		month,
		day,
		year,
		time,
	} = fullMatch.groups

	if (!title || !weekday || !month || !day || !year || !time) {
		console.log("parseHeader() missing groups")
		return null
	}

	return {
		title,
		weekday,
		month,
		day,
		year,
		time,
	}
}

export function headerToString(values: FullHeaderValues): string {  
	return [  
		values.title,  
		`${values.weekday}, ${values.month} ${values.day}, ${values.year}`,  
		values.time,  
	].join("\n")  
}