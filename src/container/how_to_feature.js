import React from 'react'

import Name from '../components/how-to-feature/name'
import Action from '../components/how-to-feature/action'
import AoO from '../components/how-to-feature/attack_of_opportunity'
import Usage from '../components/how-to-feature/usage'
import UsageOptions from '../components/how-to-feature/usage_options'
import UsageSpellOptions from '../components/how-to-feature/usage_spell_options'
import SkillBonuses from '../components/how-to-feature/skill_bonuses'
import StatBonuses from '../components/how-to-feature/stat_bonuses'
import Container from '../components/how-to-feature/container'
import Languages from '../components/how-to-feature/languages'
import Movement from '../components/how-to-feature/movement'
import Loading from '../components/how-to-feature/loading'
import RenderRuby from '../components/how-to-feature/render_ruby'

class HowToFeature extends React.Component{

  state = {
    currentQ: "name",
    name: "",
    action: "",
    attack_of_opportunity: false,
    usage: {
      complete: false,
      destroy_after_use: "false",
      limit: 0,
      limit_frequency: "",
      unit: "",
      adjustable: "false",
      toggleable: "false",
      wieldable: "false"
    },
    usage_options: {
      complete: false,
      options: []
    },
    usage_spell_options: {
      complete: false,
      spell_options: []
    },
    skill_bonuses: {
      complete: false,
      bonuses: []
    },
    stat_bonuses: {
      complete: false,
      bonuses: []
    },
    container: {
      complete: false,
      weight: 0,
      volume_cubic_feet: 0,
    },
    languages: {
      complete: false,
      options: []
    },
    movement: {
      complete: false,
      movement: "",
      feet: 0,
      bonus: false,
      penalty: false
    },
    loading: {
      complete: false,
      capactiy: 0,
      must_reload_after_use: false
    },
    quizOrder: [
      "name",
      "action",
      "attack_of_opportunity",
      "usage",
      "usage_options",
      "usage_spell_options",
      "skill_bonuses",
      "stat_bonuses",
      "container",
      "languages",
      "movement",
      "loading",
      "complete"
    ]
  }

  renderChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({[e.target.name]: e.target.value})
  }

  renderNestedChange = (stateKey, objKey, objValue) => {
    let duplicate = {...this.state[stateKey]}
    duplicate[objKey] = objValue
    this.setState({[stateKey]: duplicate})
  }

  nextQuestion = (currentQ) => {
    let index = this.state.quizOrder.findIndex(qo => qo === currentQ)
    this.setState({currentQ: this.state.quizOrder[index+1]})
  }

  hopToQ = q => {
    this.setState({currentQ: q})
  }

  renderNameQ = () => {
    return (
      <p>
        What is the name of your feature?
        <input type="text" name="name" value={this.state.name} onChange={this.renderChange}/>
        <button onClick={() => this.nextQuestion("name")}>Next</button>
      </p>
    )
  }

  distributeQuiz = () => {
    switch(this.state.currentQ){
      case "name":
        return <Name renderChange={this.renderChange} name={this.state.name} nextQuestion={this.nextQuestion}/>
      case "action":
        return <Action renderChange={this.renderChange} action={this.state.action} nextQuestion={this.nextQuestion}/>
      case "attack_of_opportunity":
        return <AoO renderChange={this.renderChange} attack_of_opportunity={this.state.attack_of_opportunity} nextQuestion={this.nextQuestion}/>
      case "usage":
        return <Usage renderNestedChange={this.renderNestedChange} usage={this.state.usage} nextQuestion={this.nextQuestion}/>
      case "usage_options":
        return <UsageOptions renderNestedChange={this.renderNestedChange} usage_options={this.state.usage_options} nextQuestion={this.nextQuestion}/>
      case "usage_spell_options":
        return <UsageSpellOptions renderNestedChange={this.renderNestedChange} usage_spell_options={this.state.usage_spell_options} nextQuestion={this.nextQuestion}/>
      case "skill_bonuses":
        return <SkillBonuses renderNestedChange={this.renderNestedChange} skill_bonuses={this.state.skill_bonuses} nextQuestion={this.nextQuestion}/>
      case "stat_bonuses":
        return <StatBonuses renderNestedChange={this.renderNestedChange} stat_bonuses={this.state.stat_bonuses} nextQuestion={this.nextQuestion}/>
      case "container":
        return <Container renderNestedChange={this.renderNestedChange} container={this.state.container} nextQuestion={this.nextQuestion}/>
      case "languages":
        return <Languages renderNestedChange={this.renderNestedChange} languages={this.state.languages} nextQuestion={this.nextQuestion}/>
      case "movement":
        return <Movement renderNestedChange={this.renderNestedChange} movement={this.state.movement} nextQuestion={this.nextQuestion}/>
      case "loading":
        return <Loading renderNestedChange={this.renderNestedChange} loading={this.state.loading} nextQuestion={this.nextQuestion}/>
      case "complete":
        return <RenderRuby state={this.state}/>
      default:
        break
    }
  }

  listOfAttributes = () => {
    let questions = [...this.state.quizOrder]
    let style = {
      listStyleType: "none",
      position: "fixed",
      bottom: "0",
      border: "1px solid black",
      padding: "0",
      margin: "0",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      backgroundColor: "rgba(235, 235, 235, 0.95)"
    }
    let questionElements = questions.map((q, i) => {
      let status = "_"
      status = !!this.state[q] && typeof(this.state[q]) !== "object" ? "X" : status
      status = typeof(this.state[q]) === "object" && this.state[q].complete ? "X" : status
      status = this.state.currentQ === q ? "..." : status
      return <li key={i * 3 - 1} style={{padding: "0.2em"}} onClick={() => this.hopToQ(q)}>{status} {q}</li>
    })
    return (
      <ul style={style}>
        {questionElements}
      </ul>
    )
  }

  render() {
    return (
      <section style={{padding: "1%", minHeight: "70vh", marginBottom: "30vh"}}>
        {this.distributeQuiz()}
        {this.listOfAttributes()}
      </section>
    )
  }
}

export default HowToFeature
