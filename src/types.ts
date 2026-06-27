// ENUMS
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

// INTERFACES
export interface FullHeaderValues {
    title: string,
    weekday?: string,
    month: string,
    day: string,
    year: string,
    time: string,
    startIdx: number,
    endIdx: number
}

export interface MeridiemValues {
    match: string
    startIdx: number
    endIdx: number
}

// FRONTMATTER
export interface BaseFrontMatter {
    created: string
    updated: string
}

export interface TrueFrontMatter extends BaseFrontMatter {
    aliases: string[] | null
    tags: string[] | null
}

export interface OneNoteFrontMatter extends BaseFrontMatter {
    title: string | null
}