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
