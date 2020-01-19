import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import localhost from '../localhost'
import { th } from '../fuf'

import UserItemAdjustment from './user_item_adjustment'

const MagicItemSummary = props => {

  const { item } = props
  const { known } = props.cmi

  const renderDescription = (desc) => {
    let descArray = desc.split("\n\n")
    let spellArray = item.features.map(f => {
      return f.spells.map(sp => {
        return _.lowerCase(sp.name)
      })
    })
    spellArray = _.flatten(spellArray)
    return descArray.map((para, idx) => {
      let paraDupe = para
      if (spellArray.length){

        let array = ''

        spellArray.forEach(s => {

          if (array.length > 1){
            array = array.map((ar, idx) => {
              if (!spellArray.includes(ar)){

                ar = ar.split(s)

                if (ar.length > 1){
                  ar.splice(1, 0, s)
                }
                return ar

              } else {
                return ar
              }
            })
            array = _.flatten(array)
          } else {

            array = para.split(s)

            if (array.length > 1){
              array.splice(1, 0, s)
            }
          }

        })

        paraDupe = array.map(ar => {
          if (spellArray.includes(ar)){
            let spell
            item.features.forEach(f => {
              f.spells.forEach(sp => {
                if (_.lowerCase(sp.name) === ar){
                  spell = sp
                }
              })
            })
            return <em className='underline-hover' onClick={() => props.editModal('spell', null, spell.id)}>{ar}</em>
          } else {
            return <React.Fragment>{ar}</React.Fragment>
          }
        })

      }
      return <p key={idx*3+1}>{paraDupe}</p>
    })
  }


  const renderMI = () => {
    return (
      <React.Fragment>
        <h3 style={{display: 'inline-block'}}>{item.name}</h3>
        <UserItemAdjustment cmi={props.cmi} item={props.item} exitModal={props.exitModal} editModal={props.editModal}/>
        <div><strong>Price</strong> {item.price_in_gp} gp; <strong>Slot</strong> {item.slot}; <strong>CL</strong> {th(item.caster_level)}; <strong>Weight</strong> {item.weight} lb; <strong>Aura</strong> {item.aura}</div>
        <br/>
        <div style={{marginBottom: '1%', paddingBottom: '.8%', borderBottom: 'double'}}></div>
        {renderDescription(item.description)}
      </React.Fragment>
    )
  }

  const renderFalseDesc = () => {
    return (
      <React.Fragment>
        <h3>{props.cmi.false_desc}</h3>
        <UserItemAdjustment cmi={props.cmi} item={props.item} exitModal={props.exitModal} editModal={props.editModal}/>
      </React.Fragment>
    )
  }

  return (
    <div>
      {known ? renderMI() : renderFalseDesc()}
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(MagicItemSummary)
