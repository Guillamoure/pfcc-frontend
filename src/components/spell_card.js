import React from 'react'

const SpellCard = props => {
  const { spell } = props

  const truncate = (string) => {
    return string.substring(0, 3)
  }

  const renderAction = (action) => {
    switch(action){
      case "Standard Action":
        return "standard"
      case "Ten Minutes" || "One Hour" || "Eight Hours" || "One Minute":
        return "long"
      default:
        return "none"
    }
  }

  console.log(spell)
  return (
    <div className='spell-card' onClick={() => props.renderEdit(spell.id)}>
      <span><strong>{spell.name}</strong></span>
      <span>{truncate(spell.magic_school.name)}</span>
      <span className={renderAction(spell.action.name)} style={{textAlign: 'center'}}>{spell.action.name}</span>
    </div>
  )
}

export default SpellCard
