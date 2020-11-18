export default (price, prefix = 'Rp ') => {
  const number_string = price ? price.toString() : '0'
  const split = number_string.split(',')
  const rest = split[0].length % 3
  let currency = split[0].substr(0, rest)
  const thousand = split[0].substr(rest).match(/\d{3}/gi)

  if (thousand) {
    const separator = rest ? '.' : ''
    currency += separator + thousand.join('.')
  }

  currency = split[1] ? currency + ',' + split[1] : currency
  return !prefix ? currency : currency ? prefix + currency : ''
}
