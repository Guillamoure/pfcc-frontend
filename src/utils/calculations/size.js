
export const sizeMod = (string) => {
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

export const specialSizeMod = (string) => {
  switch(string){
    case 'Fine':
      return -8
    case 'Diminutive':
      return -4
    case 'Tiny':
      return -2
    case 'Small':
      return -1;
    case 'Large':
      return 1;
    case 'Huge':
      return 2
    case 'Gargantuan':
      return 4
    case 'Colossal':
      return 8
    default:
      return 0;
  }
}

export const flySizeMod = (string) => {
  switch(string){
    case 'Fine':
      return 8
    case 'Diminutive':
      return 6
    case 'Tiny':
      return 4
    case 'Small':
      return 2;
    case 'Large':
      return -2;
    case 'Huge':
      return -4
    case 'Gargantuan':
      return -6
    case 'Colossal':
      return -8
    default:
      return 0;
  }
}

export const stealthSizeMod = (string) => {
  switch(string){
    case 'Fine':
      return 16
    case 'Diminutive':
      return 12
    case 'Tiny':
      return 8
    case 'Small':
      return 4;
    case 'Large':
      return -4;
    case 'Huge':
      return -8
    case 'Gargantuan':
      return -12
    case 'Colossal':
      return -16
    default:
      return 0;
  }
}

export const sizeSpaceReach = (string) => {
  switch(string){
    case 'Fine':
      return ["1/2 ft.", "0 ft."]
    case 'Diminutive':
      return ["1 ft.", "0 ft."]
    case 'Tiny':
      return ["2 1/2 ft.", "0 ft."]
    case 'Small':
      return ["5 ft.", "5 ft."]
    case 'Large':
      return ["10 ft.", "10 ft."];
    case 'Huge':
      return ["15 ft.", "15 ft."]
    case 'Gargantuan':
      return ["20 ft.", "20 ft."]
    case 'Colossal':
      return ["30 ft.", "30 ft."]
    default:
      return ["5 ft.", "5 ft."];
  }
}

export const sizeStepsFromMedium = (size) => {
	let sizes = ["Fine", "Diminutive", "Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan", "Colossal"]
	let mediumIndex = 4
	let incomingSizeIndex = sizes.indexOf(size)
	return incomingSizeIndex - mediumIndex
}

export const sizeDamage = (size, damage) => {
	let sizeAdjustment = sizeStepsFromMedium(size)
	let diceSteps = ["1", "1d2", "1d3", "1d4", "1d6", "1d8", "2d6", "2d8", "4d6"]
	let currentDamageIndex = diceSteps.indexOf(damage)
	let newIndex = currentDamageIndex + sizeAdjustment
	if (newIndex < 0){newIndex = 0}
	if (newIndex > diceSteps.length - 1){newIndex = diceSteps.length - 1}
	return diceSteps[newIndex]
}
