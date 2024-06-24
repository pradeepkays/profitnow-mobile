import moment from 'moment'

export const utcToLocal = (date: string, format = 'MM/DD/YYYY hh:mm A') => {
  return moment.utc(date).format(format)
}
