export const formatDate = (dateString: string, locale: string = 'en-UK') => {
  const date = new Date(dateString)
  const options = { day: '2-digit', month: 'short', year: 'numeric' }
  return new Intl.DateTimeFormat(locale, options).format(date)
}

export const getDay = (dateString: string, locale: string = 'en-UK') => {
  const date = new Date(dateString)
  const options = { day: 'numeric' }
  const res = Number(new Intl.DateTimeFormat(locale, options).format(date))

  switch (res) {
    case 1:
    case 21:
    case 31 :
      return `${res}st`
    case 2:
    case 22:
      return `${res}nd`
    case 3:
    case 23:
      return `${res}rd`
    default:
      return `${res}th`
  }

  // return new Intl.DateTimeFormat(locale, options).format(date)
}
