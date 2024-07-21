export const formatUkDate = (date: string) => {
const [year, month, day] = date.split("-")
const formattedDate = `${day}/${month}/${year}`
return formattedDate;
}