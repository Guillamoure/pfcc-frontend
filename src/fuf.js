// FREQUENTLY USED FUNCTIONS

export const mod = (score) => {
  return Math.floor( (score - 10) / 2 )
}

export const size = (string) => {
  switch(string){
    case 'Fine':
      return 8
    case 'Diminutive':
      return 4
    case 'Tiny':
      return 2
    case 'Small':
      return 1;
    case 'Large':
      return -1;
    case 'Huge':
      return -2
    case 'Gargantuan':
      return -4
    case 'Colossal':
      return -8
    default:
      return 0;
  }
}

export const pluser = (num) => {
  return num < 0 ? num : `+${num}`
}

export const actionClass = a => {
  switch(a){
    case 'Standard Action':
      return 'standard'
    case 'Swift Action':
      return 'swift'
    case 'Move Action':
      return 'move'
    case 'Full-Round Action':
      return 'full'
    case 'Immediate Action':
      return 'immediate'
    case 'Free Action':
      return 'free'
    default:
      return a
  }
}

export const th = (num) => {
  let suffix = 'th'
  switch(num){
    case 1:
      suffix ='st'
      break
    case 2:
      suffix = 'nd'
      break
    case 3:
      suffix = 'rd'
      break
    default:
      suffix = 'th'
      break
  }
  return num + suffix
}

export const consolidateDate = (date) => {
  const { weekday, month, day, age, year } = date
  return `${weekday}, ${month} ${th(day)}, ${th(age)} Age, ${year}`
}

export const truncatedDate = (date) => {
  const { month, day, year } = date
  let monthNum = 0
  switch(month){
    case 'Floreau Budding':
      monthNum = 1
      break
    case 'Floreau Equinox':
      monthNum = 2
      break
    case 'Floreau Blossom':
      monthNum = 3
      break
    case 'Harvest Flourish':
      monthNum = 4
      break
    case 'Harvest Solstice':
      monthNum = 5
      break
    case 'Harvest Scorch':
      monthNum = 6
      break
    case 'Autumn Cornucopia':
      monthNum = 7
      break
    case 'Autumn Equinox':
      monthNum = 8
      break
    case 'Autumn Festival':
      monthNum = 9
      break
    case 'Borealis Snowfall':
      monthNum = 10
      break
    case 'Borealis Solstice':
      monthNum = 11
      break
    case 'Borealis Renewal':
      monthNum = 12
      break
    case 'Lunalis':
      monthNum = 13
      break
    default:
      break
  }
  return `${monthNum}/${day}/${year}`
}
