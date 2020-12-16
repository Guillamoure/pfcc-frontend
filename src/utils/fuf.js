import React from 'react'
import store from '../store'
import _ from 'lodash'
import { modalAction } from './action_creator/popups'


// FREQUENTLY USED FUNCTIONS

export const locateAbility = (source) => {
	const { character } = store.getState()
	return character[source.source].find(ability => ability.id === source.sourceId)
}

export const locateFeatureThroughAbility = (ability, featureId) => {
	return ability.features.find(f => f.id === featureId)
}

export const locateFeatureFromSource = source => {
	return locateFeatureThroughAbility(locateAbility(source), source.featureId)
}

export const featureNameFromSource = source => {
	let ability = locateAbility(source)
	let feature = locateFeatureThroughAbility(ability, source.featureId)
	return feature.name || ability.name
}

export const locateFeatureAndAbilityFromSource = source => {
	let ability = locateAbility(source)
	let feature = locateFeatureThroughAbility(ability, source.featureId)
	return {feature, ability}
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

export const renderTH = (num) => {
	switch (parseInt(num)){
		case 1:
			return "1st"
		case 2:
			return "2nd"
		case 3:
			return "3rd"
		default:
			return `${num}th`
	}
}

export const classLevel = (klassId) => {
	let classes = store.getState().character_info.classes
	let klass = classes.find(cl => cl.id === klassId)
	return klass?.level ?? null
}

export const renderDamage = damage => {
	return `${damage.num_of_dice}d${damage.damage_dice}`
}

export const abbreviateDamageType = damageType => {
	if (!damageType){return null}
	if (damageType === "positive" || damageType === "negative"){
		return _.capitalize(damageType.substring(0,3))
	} else {
		return _.capitalize(damageType[0])
	}
}

export const injectSpellIntoDescription = (description, spells, onClickFunction, functionOptions) => {
	let domDescArray = [description]
	spells.forEach(sp => {
		let name = sp.name.toLowerCase()
		for (let i = 0; i < domDescArray.length; i++){
			if (typeof domDescArray[i] === "string" && domDescArray[i].includes(name)){
				let splitDesc = domDescArray[i].split(name)
				let onClick = () => onClickFunction(sp)
				splitDesc.splice(1, 0, <em key={i*3+1} className="underline-hover" onClick={onClick}>{name}</em>)
				domDescArray[i] = splitDesc
				domDescArray = domDescArray.flat()
			}
		// let descArray = description.split(name)
		// 	domDescArray.push(descArray[i])
		// 	if (i + 1 < descArray.length){
		// 		domDescArray.push(" ")
		// 		domDescArray.push(<em key={i*3+1} className="underline-hover" onClick={onClick}>{name}</em>)
		// 		domDescArray.push(" ")
		// 	}
		}
	})
	return <span>{domDescArray}</span>
}

export const mod = (score) => {
  return Math.floor( (score - 10) / 2 )
}

export const pluser = (num) => {
  return num < 0 ? num : `+${num}`
}

export const descriptionParser = description => {
	let desc = []

	let tables = []
	if (description.includes("<table>")){
		// if <table>
		let tempArr = description.split("<table>")

		for (let i = 0; i < tempArr.length; i++){
			// break the description into an array where strings are space with symbols
			if (!tempArr[i].includes ("</table>")){
				desc.push(tempArr[i])
			} else {
				let tableArr = tempArr[i].split("</table>")

				let table = parseTable(tableArr[0])

				tables.push(table)
				// like {{0}} ?
				// that signify an index of an array with the table to be inserted later
				desc.push(`{{${tables.length - 1}}}`)
				desc.push(tableArr[1])
			}
			// if no <table>
		}


		// let i = description.indexOf("<table>")
		// let tableString = description.substr(i, description.length-1)
		// description = description.replace(tableString, "")
		// table = parseTable(tableString)
	} else {
		// put description into array with one length
		desc.push(description)
	}

	let descSplitParagraphs =  []

	// then, iterate
	desc.forEach(d => {
		// if a table placeholder is present, skip it
		if (d.includes("{{") && d.includes("}}")){
			descSplitParagraphs.push(d)
		} else {
			// take string, split by \n\n
			let arr = d.split("\n\n")
			// then remap the array of strings into a new array
			descSplitParagraphs = [...descSplitParagraphs, ...arr]
		}
	})

	descSplitParagraphs = descSplitParagraphs.map(dsp => {
		if (dsp.includes("{{") && dsp.includes("}}")){
			// replace table symbol
			let i = dsp.replace("{{", "")
			i = i.replace("}}", "")
			i = parseInt(i)
			return tables[i]
		} else {
			return <p key={_.random(1, 2000000)}>{parseInlineSemantics(dsp)}</p>
		}
	})
	// you should have an array of <p> and table symbols

	// serve with parsely and flakey salt

	// desc = description.split("\n\n")
	// desc = desc.map(para => <p key={_.random(1, 2000000)}>{para}</p>)


	return descSplitParagraphs
}

const parseTable = text => {
	let innerTable = text.slice(7, -8)
	innerTable.trim()
	innerTable = innerTable.split("</tr>")

	let rows = innerTable.map(r => {
		r = r.trim()
		let i = r.indexOf("<tr>")
		r = r.substr(i+4, r.length-1)

		if (r.startsWith(">")){r = r.substring(1)}

		let cellContainer = r.includes("<th>") ? "<th>" : "<td>"
		let cells = r.split(cellContainer)

		cells = cells.map(c => {
			c = c.trim()
			if (c === ""){return null}
			let content = c.substr(0, c.length-5)
			return cellContainer === "<th>" ? <th>{content}</th> : <td>{content}</td>
		})
		return <tr>{cells}</tr>
	})

	return <table className="generic-table">{rows}</table>
}

const parseInlineSemantics = (text) => {
	let arr = [text]
	let underline = arr.find(t => {
		if (typeof t === "string"){
			return t.includes("<underline>")
		} else {return false}
	})

	if (underline){
		arr = arr.map(t => {
			if (!t.includes("<underline>")){return t}
			else {
				let tempArr = []
				let front = t.split("<underline>")
				let back = front[1].split("</underline>")
				tempArr.push(front[0])
				tempArr.push(<span className="underline">{back[0]}</span>)
				tempArr.push(back[1])
				return tempArr
			}
		})
	}

	return arr
}
