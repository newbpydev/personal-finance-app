export const formatDate = (dateString: string, locale: string = 'en-UK') => {
  const date = new Date(dateString)
  const options = { day: '2-digit', month: 'short', year: 'numeric' }
  return new Intl.DateTimeFormat(locale, options).format(date)
}

export const getDay = (dateString: string, locale: string = 'en-UK') => {
  const date = new Date(dateString)
  const options = { day: '2-digit' }
  return new Intl.DateTimeFormat(locale, options).format(date)
}
