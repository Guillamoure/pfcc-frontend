import React from 'react'
import { connect } from 'react-redux'

const Poisons = props => {
  const poisons = []
  const name = props.character.name

  if (name === 'Persephone'){
    const darkReaver = {
      id: 300,
      name: 'Dark Reaver Powder',
      price: '800 gp',
      type: 'ingested',
      save: 'Fort DC 18',
      onset: '10 minutes',
      frequency: '1/minute for 6 minutes',
      cure: '2 consecutive saves',
      effect: '1d3 Con damage and 1 Str damage',
      activatable: false,
      limit: '2'
    }
    poisons.push(darkReaver)
    const purpleWorm = {
      id: 301,
      name: 'Purple Worm Poison',
      price: '700 gp',
      type: 'injury',
      save: 'Fort DC 24',
      onset: '-',
      frequency: '1/round for 6 rounds',
      cure: '2 consecutive saves',
      effect: '1d3 Str damage',
      activatable: false,
      limit: '8'
    }
    poisons.push(purpleWorm)
    const insanityMist = {
      id: 302,
      name: 'Insanity Mist',
      price: '1500 gp',
      type: 'inhaled',
      save: 'Fort DC 15',
      onset: '-',
      frequency: '1/round for 6 rounds',
      cure: '1 save',
      effect: '1d3 Wis damage',
      activatable: false,
      limit: '1'
    }
    poisons.push(insanityMist)
    const wyvernPoison = {
      id: 303,
      name: 'Wyvern Poison',
      price: '3000 gp',
      type: 'injury',
      save: 'Fort DC 17',
      onset: '-',
      frequency: '1/round for 6 rounds',
      cure: '2 consecutive saves',
      effect: '1d4 Con damage',
      activatable: false,
      limit: '1'
    }
    poisons.push(wyvernPoison)
  }

  const renderClick = name => {
  }

  const renderPoisons = () => {
    return poisons.map((p, idx) => {
      return (
        <tr className={renderTableStyling(idx)} key={p.id*3-1}>
          <td>({p.limit})</td>
          <td><strong>{p.name}</strong></td>
          <td>{p.price}</td>
          <td>{p.type}</td>
          <td>{p.save}</td>
          <td>{p.effect}</td>
          <td>{p.onset}</td>
          <td>{p.frequency}</td>
          <td>{p.cure}</td>
        </tr>
      )
    })
  }

  const renderTableStyling = (index) => {
    return index%2 === 0 ? "even-row-poisons" : "odd-row"
  }

  return (
    <React.Fragment>
      {poisons.length ? <h5 className='underline-hover' onClick={() => props.editModal('poisons')}>Poisons</h5> : null}
      {poisons.length ? <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>Save</th>
            <th>Effect</th>
            <th>Onset</th>
            <th>Frequency</th>
            <th>Cure</th>
          </tr>
        </thead>
        <tbody>
          {renderPoisons()}
        </tbody>
      </table> : null}
    </React.Fragment>
  )
}

const mapStatetoProps = (state) => {
  return {
    character: state.character,
    character_info: state.character_info
  }
}

export default connect(mapStatetoProps)(Poisons)
