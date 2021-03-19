import React from 'react'

import { useSelector } from 'react-redux'

import { ReactComponent as D4 } from '../../dice/d4.svg'
import { ReactComponent as D6 } from '../../dice/d6.svg'
import { ReactComponent as D8 } from '../../dice/d8.svg'
import { ReactComponent as D10 } from '../../dice/d10.svg'
import { ReactComponent as D12 } from '../../dice/d12.svg'
import { ReactComponent as D20 } from '../../dice/d20.svg'

const DiceRoller = props => {

	const [diceToRoll, setDice] = React.useState({})
	const [diceResults, setResults] = React.useState([])
	const [baseModifier, setBaseModifier] = React.useState(0)
	const [tempModifier, setTempModifier] = React.useState(0)

	const { borderColor, textColor } = useSelector(state => state.settings)

	React.useEffect(() => {

	}, [props.diceObj])

	const chooseDice = () => {
		return (
			<section style={{display: "flex", flexDirection: "column-reverse", marginBottom: "auto"}}>
				<D4 style={{height: "5vh", width: "5vh"}} onClick={() => renderAddDice(4)}/>
				<D6 style={{height: "5vh", width: "5vh"}} onClick={() => renderAddDice(6)}/>
				<D8 style={{height: "5vh", width: "5vh"}} onClick={() => renderAddDice(8)}/>
				<div onClick={() => renderAddDice(100)}><D10 style={{height: "4vh", width: "4vh"}}/><D10 style={{height: "4vh", width: "4vh"}}/></div>
				<D10 style={{height: "5vh", width: "5vh"}} onClick={() => renderAddDice(10)}/>
				<D12 style={{height: "5vh", width: "5vh"}} onClick={() => renderAddDice(12)}/>
				<D20 style={{height: "5vh", width: "5vh"}} onClick={() => renderAddDice(20)}/>
			</section>
		)
	}

	const renderAddDice = (d) => {
		let objDupe = {...diceToRoll}
		if (objDupe[d]){
			objDupe[d]++
		} else {
			objDupe[d] = 1
		}
		setDice(objDupe)
	}

	const renderSubtractDice = (d) => {
		let objDupe = {...diceToRoll}
		if (objDupe[d] === 1){
			delete objDupe[d]
		} else {
			objDupe[d]--
		}
		setDice(objDupe)
	}

	const clearDice = () => {
		setDice({})
		setBaseModifier(0)
		setTempModifier(0)
	}

	const roll = () => {
		let total = []
		let totalString = []
		let nums = [4, 6, 8, 100, 10, 12, 20]
		nums.forEach(n => {
			if (diceToRoll[n]){
				totalString.push(`${diceToRoll[n]}d${n}`)
				for (let i = 0; i < diceToRoll[n]; i++){
					let rollResult = Math.ceil(Math.random() * n)
					if (Object.keys(diceToRoll).length === 1 && diceToRoll[n] == 1 && n === 20){
						if (rollResult === 20){
							rollResult = <span style={{color: "gold", textShadow: "1px 1px #000, 1px -1px #000, -1px 1px #000, -1px -1px #000"}}>20</span>
						} else if (rollResult === 1){
							rollResult = <span style={{color: "red", textShadow: "1px 1px #fff, 1px -1px #fff, -1px 1px #fff, -1px -1px #fff"}}>1</span>

						}
					}
					total.push(rollResult)
				}
			}
		})
		if (baseModifier){
			total.push(parseInt(baseModifier))
			totalString.push(baseModifier)
		}
		if (tempModifier){
			total.push(parseInt(tempModifier))
			totalString.push(tempModifier)
		}
		let resultsDupe = [...diceResults, {name: "custom roll", totalString, total}]
		while (resultsDupe.length > 7){
			resultsDupe.shift()
		}
		setResults(resultsDupe)
	}

	const theCage = () => {
		if (!Object.keys(diceToRoll).length){return null}
		let diceString = []
		let diceElements = [];
		[4, 6, 8, 100, 10, 12, 20].forEach(n => {
			if (diceToRoll[n]){
				if (n === 4){
					diceString.push(`${diceToRoll[n]}d4`)
					for (let i = 0; i < diceToRoll[n]; i++){diceElements.push(<D4 style={{height: "5vh", width: "5vh"}} onClick={() => renderSubtractDice(4)}/>)}
				}
				if (n === 6){
					diceString.push(`${diceToRoll[n]}d6`)
					for (let i = 0; i < diceToRoll[n]; i++){diceElements.push(<D6 style={{height: "5vh", width: "5vh"}} onClick={() => renderSubtractDice(6)}/>)}
				}
				if (n === 8){
					diceString.push(`${diceToRoll[n]}d8`)
					for (let i = 0; i < diceToRoll[n]; i++){diceElements.push(<D8 style={{height: "5vh", width: "5vh"}} onClick={() => renderSubtractDice(8)}/>)}
				}
				if (n === 100){
					diceString.push(`${diceToRoll[n]}d100`)
					for (let i = 0; i < diceToRoll[n]; i++){diceElements.push(<div onClick={() => renderSubtractDice(100)}><D10 style={{height: "4vh", width: "4vh"}}/><D10 style={{height: "4vh", width: "4vh"}}/></div>)}
				}
				if (n === 10){
					diceString.push(`${diceToRoll[n]}d10`)
					for (let i = 0; i < diceToRoll[n]; i++){diceElements.push(<D10 style={{height: "5vh", width: "5vh"}} onClick={() => renderSubtractDice(10)}/>)}
				}
				if (n === 12){
					diceString.push(`${diceToRoll[n]}d12`)
					for (let i = 0; i < diceToRoll[n]; i++){diceElements.push(<D12 style={{height: "5vh", width: "5vh"}} onClick={() => renderSubtractDice(12)}/>)}
				}
				if (n === 20){
					diceString.push(`${diceToRoll[n]}d20`)
					for (let i = 0; i < diceToRoll[n]; i++){diceElements.push(<D20 style={{height: "5vh", width: "5vh"}} onClick={() => renderSubtractDice(20)}/>)}
				}

			}
		})
		diceString = diceString.join("+")
		if (baseModifier){diceString += `+${baseModifier}`}
		if (tempModifier){diceString += `+${tempModifier}`}
		return (
			<article>
				<section style={{border: `2px dashed #${borderColor}`, margin: "1%", color: `#${textColor}`, display: "flex"}}>
					{diceElements}
				</section>
				<label>Base Mod<input type="number" value={baseModifier} onChange={e => setBaseModifier(e.target.value)}/></label>
				<label>Temp Mod<input type="number" value={tempModifier} onChange={e => setTempModifier(e.target.value)}/></label>
				<button onClick={roll}>Roll {diceString}</button> <button onClick={clearDice}>X</button>
			</article>
		)
	}

	const results = () => {
		// if (diceResults.length === 0){return null}
		let resultElements = diceResults.map(d => {
			let joinEquation = ""
			let joinTotal = 0
			if (typeof d.total[0] !== "number"){
				let critical = d.total[0]
				let remainder = d.total.slice(1).join("+")
				if (remainder.length > 0){remainder = "+" + remainder}
				joinEquation = <span>{critical}{remainder}</span>

				joinTotal += parseInt(critical.props.children)
				joinTotal += d.total.slice(1).reduce((agg, el) => (agg + el), 0)

			} else {
				joinEquation = d.total.join("+")
				joinTotal = d.total.reduce((agg, el) => agg + el)
			}
			return (
				<li style={{borderTop: `1px solid #${borderColor}`, margin: "1%"}}>
					<div><strong>{joinEquation} = <span style={{fontSize: "1.2em"}}>{joinTotal}</span></strong></div>
					<div>{d.name} - {d.totalString.join("+")}</div>
				</li>
			)
		})
		return (
			<ul style={{color: `#${textColor}`, display: "flex", flexDirection: "column", fontSize: "1.2em", marginTop: "auto"}}>
				{resultElements}
			</ul>
		)
	}

	return (
		<aside style={{display: "grid", gridTemplateColumns: "10% 45% 45%"}}>
			{chooseDice()}
			{theCage()}
			{results()}
		</aside>
	)
}

export default DiceRoller
