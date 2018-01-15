import * as moment from 'moment'

export function formatDate (date) {
  return moment(date).format('HH:mm DD.MM.YYYY')
}
