import React from 'react'
import { useSelector } from 'react-redux'
import { patchFetch } from '../../utils/fetches'
import { replaceCharacterAction } from '../../utils/action_creator/character'

const CurrencyManager = props => {

  let { character } = useSelector(state => state)
  const [ modifiedCurrency, updateCurrency ] = React.useState({
    pp: 1,
    gp: 1,
    sp: 1,
    cp: 1
  })
  const [ disableButtons, toggleDisable ] = React.useState(false)

  const renderChange = (e) => {
    updateCurrency({...modifiedCurrency, [e.target.name]: parseInt(e.target.value) ?? ""})
  }

  const renderSubmit = (coin, btn) => {
    if (disableButtons){
      return
    }
    let value = btn === "plus" ? character[coin] + modifiedCurrency[coin] : character[coin] - modifiedCurrency[coin]
    let body = {[coin]: value}
    toggleDisable(true)
    patchFetch(`characters/${character.id}`, body)
      .then(data => {
        replaceCharacterAction(coin, value)
        updateCurrency({...modifiedCurrency, [coin]: 1})
        character[coin] = value
        toggleDisable(false)
      })
  }

  const renderCurrency = () => {
    let { pp, gp, sp, cp } = character
    return (
      <ul>
        <li>{pp || 0} pp <input type="number" name="pp" value={modifiedCurrency.pp} onChange={renderChange} step="1"/> <button onClick={() => renderSubmit("pp", "plus")}>+</button> <button onClick={() => renderSubmit("pp", "minus")}>-</button></li>
        <li>{gp || 0} gp <input type="number" name="gp" value={modifiedCurrency.gp} onChange={renderChange} step="1"/> <button onClick={() => renderSubmit("gp", "plus")}>+</button> <button onClick={() => renderSubmit("gp", "minus")}>-</button></li>
        <li>{sp || 0} sp <input type="number" name="sp" value={modifiedCurrency.sp} onChange={renderChange} step="1"/> <button onClick={() => renderSubmit("sp", "plus")}>+</button> <button onClick={() => renderSubmit("sp", "minus")}>-</button></li>
        <li>{cp || 0} cp <input type="number" name="cp" value={modifiedCurrency.cp} onChange={renderChange} step="1"/> <button onClick={() => renderSubmit("cp", "plus")}>+</button> <button onClick={() => renderSubmit("cp", "minus")}>-</button></li>
      </ul>
    )
  }

  let totalGP = (character.pp*10) + (character.gp) + (character.sp*0.1) + (character.cp*0.01)


  return (
    <section>
      <p><strong>Total Money</strong>: {totalGP.toFixed(2)} gp</p>
      {renderCurrency()}
    </section>
  )
}

export default CurrencyManager
