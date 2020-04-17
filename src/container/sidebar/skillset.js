import React from 'react'

const Skillset = props => {

  let {name, skills} = props.content

  let [containerHeight, setContainerHeight] = React.useState(0)

  const skillEl = skillObj => {
    let abbrev = skillObj.ability_score.slice(0, 3)
    return (<span key={skillObj.id * 3 - 1} style={{border: '1px solid #0f52ba', padding: "0.5rem"}}>{skillObj.name}</span>)
  }

  let sortedSkills = skills.sort((a, b) => a.name.localeCompare(b.name))

  if (props.sidebarContainer.current && !containerHeight){
    console.log(props.sidebarContainer.current)
    setContainerHeight(props.sidebarContainer.current.offsetHeight * 0.9)
  }

  return (
    <section style={{padding: '2%'}}>
      <h4>{name}</h4>
      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: "10px"}}>
        {skills.map(skillEl)}
      </div>
    </section>
  )
}

export default (Skillset)
