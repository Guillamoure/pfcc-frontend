import React from 'react'

class SpellsForm extends React.Component {

  state = {
    spells: {
      0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    }
  }

  renderSpellsForm = () => {
    return (
      <table>
        <thead >
          <tr >
            <th>Level</th>
            <th>0</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
          </tr>
        </thead>
        <tbody >
          {this.renderSpellsRow()}
        </tbody>
      </table>
    )
  }

  renderSpellsRow = () => {
    let level = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    return level.map(num => {
      return (
        <tr>
          <td>{num}</td>
          <td><input type="number" style={{maxWidth: "2.5em"}} value={this.state.spells[0][num-1]} onChange={(e) => this.renderSpellChange(e, 0, num)}/></td>
          <td><input type="number" style={{maxWidth: "2.5em"}} value={this.state.spells[1][num-1]} onChange={(e) => this.renderSpellChange(e, 1, num)}/></td>
          <td><input type="number" style={{maxWidth: "2.5em"}} value={this.state.spells[2][num-1]} onChange={(e) => this.renderSpellChange(e, 2, num)}/></td>
          <td><input type="number" style={{maxWidth: "2.5em"}} value={this.state.spells[3][num-1]} onChange={(e) => this.renderSpellChange(e, 3, num)}/></td>
          <td><input type="number" style={{maxWidth: "2.5em"}} value={this.state.spells[4][num-1]} onChange={(e) => this.renderSpellChange(e, 4, num)}/></td>
          <td><input type="number" style={{maxWidth: "2.5em"}} value={this.state.spells[5][num-1]} onChange={(e) => this.renderSpellChange(e, 5, num)}/></td>
          <td><input type="number" style={{maxWidth: "2.5em"}} value={this.state.spells[6][num-1]} onChange={(e) => this.renderSpellChange(e, 6, num)}/></td>
          <td><input type="number" style={{maxWidth: "2.5em"}} value={this.state.spells[7][num-1]} onChange={(e) => this.renderSpellChange(e, 7, num)}/></td>
          <td><input type="number" style={{maxWidth: "2.5em"}} value={this.state.spells[8][num-1]} onChange={(e) => this.renderSpellChange(e, 8, num)}/></td>
          <td><input type="number" style={{maxWidth: "2.5em"}} value={this.state.spells[9][num-1]} onChange={(e) => this.renderSpellChange(e, 9, num)}/></td>
        </tr>
      )
    })
  }

  renderSpellChange = (e, spell, klass) => {
    const obj = {...this.state.spells}
    obj[spell][klass -1] = e.target.value
    this.setState({spells: obj})
  }

  render() {
    console.log("class changing spells per day", this.state.spells)
    return (
      <div>
      {this.renderSpellsForm()}
      <button onClick={() => this.props.submitSpellsPerDay(this.state.spells)}>Submit Spells per Day</button>
      </div>
    )
  }

}

export default SpellsForm
