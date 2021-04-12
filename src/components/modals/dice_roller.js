import React from 'react'

import { useSelector } from 'react-redux'

import d2 from '../../dice/d2.png'
import { ReactComponent as D3 } from '../../dice/d3.svg'
import { ReactComponent as D4 } from '../../dice/d4.svg'
import { ReactComponent as D6 } from '../../dice/d6.svg'
import { ReactComponent as D8 } from '../../dice/d8.svg'
import { ReactComponent as D10 } from '../../dice/d10.svg'
import { ReactComponent as D12 } from '../../dice/d12.svg'
import { ReactComponent as D20 } from '../../dice/d20.svg'
import { ReactComponent as RollingDiceCup } from '../../dice/rolling-dice-cup.svg'

const DiceRoller = props => {

	const [diceToRoll, setDice] = React.useState({})
	const [diceResults, setResults] = React.useState([])
	const [baseModifier, setBaseModifier] = React.useState(0)
	const [tempModifier, setTempModifier] = React.useState(0)

	const { borderColor, textColor, background1 } = useSelector(state => state.settings)

	React.useEffect(() => {
		if (props.diceObj){
			const { rollName, modifier, die, count } = props.diceObj

			setDice({rollName, [die]: count})
			setBaseModifier(modifier)
		}
	}, [props.diceObj])

	const chooseDice = () => {
		return (
			<section style={{display: "flex", flexDirection: "column-reverse", marginBottom: "auto"}}>
				<div onClick={() => renderAddDice(100)}><D10 style={{height: "4vh", width: "4vh"}}/><D10 style={{height: "4vh", width: "4vh"}}/></div>
				<img src={d2} style={{height: "5vh", width: "5vh"}} onClick={() => renderAddDice(2)}/>
				<D3 style={{height: "5vh", width: "5vh"}} onClick={() => renderAddDice(3)}/>
				<D4 style={{height: "5vh", width: "5vh"}} onClick={() => renderAddDice(4)}/>
				<D6 style={{height: "5vh", width: "5vh"}} onClick={() => renderAddDice(6)}/>
				<D8 style={{height: "5vh", width: "5vh"}} onClick={() => renderAddDice(8)}/>
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
		let totalString = ""
		let nums = [20, 12, 10, 8, 6, 4, 3, 2, 100]
		nums.forEach(n => {
			if (diceToRoll[n]){
				if (totalString !== ""){totalString += "+"}
				totalString += `${diceToRoll[n]}d${n}`
				for (let i = 0; i < diceToRoll[n]; i++){
					let rollResult = Math.ceil(Math.random() * n)
					if (diceToRoll[n] == 1 && n === 20){
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
			totalString += parseInt(baseModifier) >= 0 ? `+${baseModifier}` : baseModifier
		}
		if (tempModifier){
			total.push(parseInt(tempModifier))
			totalString += parseInt(tempModifier) >= 0 ? `+${tempModifier}` : tempModifier
		}
		let resultsDupe = [...diceResults, {name: diceToRoll.rollName || "Custom Roll", totalString, total}]
		while (resultsDupe.length > 6){
			resultsDupe.shift()
		}
		setResults(resultsDupe)
	}

	const theCage = () => {
		if (!Object.keys(diceToRoll).length){return null}
		let diceString = []
		let diceElements = [];
		[20, 12, 10, 8, 6, 4, 3, 2, 100].forEach(n => {
			if (diceToRoll[n]){
				if (n === 2){
					diceString.push(`${diceToRoll[n]}d2`)
					for (let i = 0; i < diceToRoll[n]; i++){diceElements.push(<img src={d2} style={{height: "5vh", width: "5vh"}} onClick={() => renderSubtractDice(2)}/>)}
				}
				if (n === 3){
					diceString.push(`${diceToRoll[n]}d3`)
					for (let i = 0; i < diceToRoll[n]; i++){diceElements.push(<D3 style={{height: "5vh", width: "5vh"}} onClick={() => renderSubtractDice(3)}/>)}
				}
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
		if (baseModifier){diceString += parseInt(baseModifier) >= 0 ? `+${baseModifier}` : baseModifier}
		if (tempModifier){diceString += parseInt(tempModifier) >= 0 ? `+${tempModifier}` : tempModifier}
		return (
			<article>
				<section style={{border: `2px dashed #${borderColor}`, margin: "1%", color: `#${textColor}`, display: "flex", minHeight: "20vh", flexWrap: "wrap"}}>
					{diceElements}
				</section>
				<section style={{display: "grid", gridTemplateRows: "1fr 2fr"}}>
					<div style={{padding: "4px", display: "flex", justifyContent: "space-between"}}>
						<label>Base Mod <input type="number" value={baseModifier} onChange={e => setBaseModifier(e.target.value)} style={{width: "5vh"}}/></label>
						<label>Temp Mod <input type="number" value={tempModifier} onChange={e => setTempModifier(e.target.value)} style={{width: "5vh"}}/></label>
						<button onClick={clearDice}>Clear</button>
					</div>
					<button onClick={roll} style={{borderRadius: "1em", display: "flex", justifyContent: "space-around", width: "100%", alignItems: "center"}}>
						<RollingDiceCup style={{height: "10vh", width: "10vh"}}/>
						<p style={{fontSize: "20px", wordBreak: "break-word"}}>Roll {diceToRoll.rollName ? `${diceToRoll.rollName} (${diceString})` : diceString}</p>
					</button>
				</section>
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
				let remainder = d.total.slice(1).map(d => parseInt(d) >= 0 ? "+" + d : d).join("")
				// if (remainder.length > 0){remainder = "+" + remainder}
				joinEquation = <span>{critical}{remainder}</span>

				joinTotal += parseInt(critical.props.children)
				joinTotal += d.total.slice(1).reduce((agg, el) => (agg + el), 0)

			} else {
				joinEquation = d.total.map((d, i) => parseInt(d) >= 0 && i !== 0 ? "+" + d : d).join("")
				joinTotal = d.total.reduce((agg, el) => agg + el)
			}
			return (
				<li style={{borderTop: `1px solid #${borderColor}`, margin: "1%", wordBreak: "break-word"}}>
					<div><strong>{joinEquation} = <span style={{fontSize: "1.25em", textShadow: `1px 1px #${background1}, 1px -1px #${background1}, -1px 1px #${background1}, -1px -1px #${background1}`}}>{joinTotal}</span></strong></div>
					<div>{d.name} - {d.totalString}</div>
				</li>
			)
		})
		return (
			<div style={{marginTop: "auto"}}>
				<ul style={{color: `#${textColor}`, display: "flex", flexDirection: "column", fontSize: "1.1em", marginTop: "auto"}}>
					{resultElements}
				</ul>
			</div>
		)
	}

	return (
		<aside style={{display: "grid", gridTemplateColumns: "15% 42% 43%"}}>
			{chooseDice()}
			{theCage()}
			{results()}
		</aside>
	)
}

export default DiceRoller
