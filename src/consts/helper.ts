export const getDateFromUnixTime = (unixTime: string): string => {
  const date = new Date(+unixTime * 1000)
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear().toString().substr(2, 2)} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
