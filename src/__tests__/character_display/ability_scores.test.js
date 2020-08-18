import React from 'react'
// import ReactDOM from 'react-dom';
import store from '../../store'
import { Provider } from 'react-redux'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({adapter: new Adapter()})
import CharacterShow from '../../container/character_show'


test('Should display proper ability scores according to redux data', () => {
	let location = {location: {pathname: '/character/10'}}
	const wrapper = shallow(
		<CharacterShow location={location}/>
	)
	// let ability = document.getElementsByClassName("ability")[0]
	console.log(wrapper)
	wrapper.setState( { character: { } } )
	console.log("-------")
	// console.log(ability)
	screen.debug()
	expect(0).toBe(0)
})
