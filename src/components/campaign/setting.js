import React from 'react'

const Setting = props => {

  const [nameField, toggleName] = React.useState(false)
  const [settingField, toggleSetting] = React.useState(false)
  const [themeField, toggleTheme] = React.useState(false)

  const nameEl = React.useRef(null);
  const settingEl = React.useRef(null);
  const themeEl = React.useRef(null);

  React.useEffect(() => {
    if (nameField){
      nameEl.current.focus()
    }
  }, [nameField, settingField, themeField])


  return (
    <section id="new-campaign-form-setting" className="standard-container-bubble">
      <p style={{textAlign: 'left'}}>
        <label htmlFor="new-campaign-name" onClick={() => toggleName(true)}><strong style={{fontSize: '1.2rem', fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif", color: nameField && "grey"}}>Campaign Name</strong></label>: <strong>{props.name}</strong>
        {nameField && <input type="text" ref={nameEl} id="new-campaign-name" name="new-campaign-name" value={props.name} style={{position: 'absolute', top: '-25px'}} onChange={(e) => props.setName(e.target.value)} onBlur={(() => toggleName(false))}/>}
      </p>
      <p style={{textAlign: 'left'}}>
        <label htmlFor="new-campaign-setting" onClick={() => toggleSetting(true)}><strong style={{fontSize: '1.2rem', fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif", color: settingField && "grey"}}>Setting</strong></label>: <strong>{props.setting}</strong>
        {settingField && <input type="text" ref={settingEl} id="new-campaign-setting" name="new-campaign-setting" value={props.setting} style={{position: 'absolute', top: '-25px'}} onChange={(e) => props.setSetting(e.target.value)} onBlur={(() => toggleSetting(false))}/>}
      </p>
      <p style={{textAlign: 'left'}}>
        <label htmlFor="new-campaign-theme" onClick={() => toggleTheme(true)}><strong style={{fontSize: '1.2rem', fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif", color: themeField && "grey"}}>Theme</strong></label>: <strong style={{fontWeight: "bold"}}>{props.theme}</strong>
        {themeField && <input type="text" ref={themeEl} id="new-campaign-theme" name="new-campaign-theme" value={props.theme} style={{position: 'absolute', top: '-25px'}} onChange={(e) => props.setTheme(e.target.value)} onBlur={(() => toggleTheme(false))}/>}
      </p>
    </section>
  )
}

export default Setting
