import { Weekday, Month } from "./types"

export const titlePattern = "[^\\r\\n]+"
export const weekdayPattern = Object.values(Weekday).join("|")
export const monthPattern = Object.values(Month).join("|")
export const daynumPatttern = "\\d{2}"

export const monthdayPattern = `(?<month>${monthPattern}) (?<daynum>\\d{2})`

export const yearPattern = "\\d{4}"