import React from 'react'
import { connect } from 'react-redux'

const MagicItems = props => {
  const magicItems = []
  const name = props.character.name

  if (name === 'Persephone'){
    const tricks = {
      id: 1000,
      name: "Bag of Tricks (Grey)",
      description: <span>This small sack appears empty. Anyone reaching into the bag feels a small, fuzzy ball. If the ball is removed and tossed up to 20 feet away, it turns into an animal. The animal serves the character who drew it from the bag for 10 minutes (or until slain or ordered back into the bag), at which point it disappears. It can follow any of the commands described in the Handle Animal skill. <table><thead><tr><th>d%</th><th>Animal</th></tr></thead><tbody><tr><td>01-30</td><td>Bat</td></tr><tr><td>31-60</td><td>Rat</td></tr><tr><td>61-75</td><td>Cat</td></tr><tr><td>76-90</td><td>Weasel</td></tr><tr><td>91-100</td><td>Riding Dog</td></tr></tbody></table> <span>Animals produced are always random, and only one may exist at a time. Up to 10 Animals can be drawn from the bag each week, but no more than two per day.</span></span>,
      aura: "faint conjuration",
      price: "3400 gp",
      weight: 0,
      expendable: false
    }
    magicItems.push(tricks)
    const grasping = {
      id: 1001,
      name: "Rod of Grasping Hexes",
      description: 'This rod is crafted from a gnarled branch covered in sharp thorns. Three times per day when a wielder of this rod uses a hex (but not an advanced hex or grand hex), she can use this rod’s power to double the range of the hex, so long as the hex has a range measured in feet.',
      aura: "strong (no school)",
      price: "11000 gp",
      weight: 5,
      expendable: true,
      limit: 3,
      action: 'free'
    }
    magicItems.push(grasping)
  }

  const renderClick = (name, limit) => {
    if (name === "Rod of Grasping Hexes"){
      if (limit){
        // if limits exist in redux
        let limits = props.character_info.hardcode.limits
        let ableToCast = false
        if (limits){
          // see if there is this specific one
          ableToCast = props.character_info.hardcode.limits.find(l => l.name === name && limit > l.cast)
        }
        // if it is found, send a dispatch, or if limits doesn't exist in redux
        if (!limits || ableToCast){
          props.dispatch({type: 'LIMIT CASTING', name})
        }
      }
    }
  }

  const renderMagicItems = () => {
    return magicItems.map((mi, idx) => {
      let limit = props.character_info.hardcode.limits
      if (limit && mi.limit){
        // see if there is this specific one
        limit = mi.limit - (limit.find(l => l.name === mi.name).cast)
      } else {
        limit = mi.limit
      }
      return (
        <tr className={renderTableStyling(idx)} key={mi.id*3-1}>
          <td>{mi.expendable ? <button className={mi.action ? mi.action : 'free'} onClick={() => renderClick(mi.name, mi.limit)}>Use</button> : null}</td>
          <td><strong>{mi.name}</strong>{mi.limit ? `(${limit}/${mi.limit})` : null}</td>
          <td>{mi.weight} lb{(mi.weight > 1 || mi.weight === 0) ? "s" : null}</td>
          <td>{mi.price}</td>
          <td>{mi.description}</td>
        </tr>
      )
    })
  }

  const renderTableStyling = (index) => {
    return index%2 === 0 ? "even-row-magic" : "odd-row"
  }

  return (
    <React.Fragment>
      {renderMagicItems()}
    </React.Fragment>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(MagicItems)
