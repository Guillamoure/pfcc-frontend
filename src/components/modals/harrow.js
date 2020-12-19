import React from 'react'

const HarrowDeck = () => {

	const [ playedCards, setPlayedCards ] = React.useState([])
	const [ visibleCard, setVisibleCard ] = React.useState({})
	const harrowDeck = [
		{name: "The Winged Serpent", img_url: "https://i.imgur.com/bOYXoxq.png", alignment: "LG", symbol: ["Wisdom", "Star"], traditional: "Knowing when to strike", misaligned: "Failing to sieze the moment"},
		{name: "The Avalanche", img_url: "https://i.imgur.com/Zpou16q.png", alignment: "LE", symbol: ["Dexterity", "Key"], traditional: "Unrelenting disaster", misaligned: "Disaster can be averted"},
		{name: "The Unicorn", img_url: "https://i.imgur.com/RQPKsmn.png", alignment: "CG", symbol: ["Charisma", "Crown"], traditional: "What you seek is yours", misaligned: "Friends are untrustworthy"},
		{name: "The Wanderer", img_url: "https://i.imgur.com/KKAkoki.png", alignment: "NG", symbol: ["Intelligence", "Book"], traditional: "Finding worth in cast-offs", misaligned: "Inability to see value"},
		{name: "The Waxworks", img_url: "https://i.imgur.com/Gvt8Txi.png", alignment: "CE", symbol: ["Constitution", "Shield"], traditional: "Helplessness and entropy", misaligned: "Abundance of energy"},
		{name: "The Bear", img_url: "https://i.imgur.com/pgqXLKC.png", alignment: "N", symbol: ["Strength", "Hammer"], traditional: "Brute force reigns", misaligned: "Never misaligned"},
		{name: "The Beating", img_url: "https://i.imgur.com/nkRWkAz.png", alignment: "NE", symbol: ["Strength", "Hammer"], traditional: "Attack from all sides", misaligned: "Hidden Strength"},
		{name: "The Betrayal", img_url: "https://i.imgur.com/wDQqoQ7.png", alignment: "NE", symbol: ["Charisma", "Crown"], traditional: "Selfishness leads to ruin", misaligned: "Noble self-sacrifice"},
		{name: "The Big Sky", img_url: "https://i.imgur.com/fiELYn8.png", alignment: "CG", symbol: ["Strength", "Hammer"], traditional: "Freedom from bondage", misaligned: "New shackles replace the old"},
		{name: "the Brass Dwarf", img_url: "https://i.imgur.com/LLRsqY7.png", alignment: "LN", symbol: ["Constitution", "Shield"], traditional: "Invulnerability to peril", misaligned: "Never misaligned"},
		{name: "The Carnival", img_url: "https://i.imgur.com/bySnncn.png", alignment: "CN", symbol: ["Wisdom", "Star"], traditional: "Illusions and false dreams", misaligned: "Never misaligned"},
		{name: "The Courtesan", img_url: "https://i.imgur.com/d1xtvtT.png", alignment: "CN", symbol: ["Charisma", "Crown"], traditional: "Political intrigue", misaligned: "Never misaligned"},
		{name: "The Cricket", img_url: "https://i.imgur.com/vUchyiC.png", alignment: "NG", symbol: ["Dexterity", "Key"], traditional: "Speed and quick passage", misaligned: "The journey goes poorly"},
		{name: "The Crows", img_url: "https://i.imgur.com/o4myQCy.png", alignment: "NE", symbol: ["Dexterity", "Key"], traditional: "Taking of loved ones or items", misaligned: "Thievery can be stopped"},
		{name: "The Cyclone", img_url: "https://i.imgur.com/uRMFDaP.png", alignment: "CE", symbol: ["Strength", "Hammer"], traditional: "Tumultuous, evil plots", misaligned: "Renewal after a trial"},
		{name: "The Dance", img_url: "https://i.imgur.com/HBIXbNe.png", alignment: "LG", symbol: ["Dexterity", "Key"], traditional: "Staying in harmony", misaligned: "Lockstep is perilous"},
		{name: "The Demon's Lantern", img_url: "https://i.imgur.com/6k12CcK.png", alignment: "CE", symbol: ["Dexterity", "Key"], traditional: "An impossible situation", misaligned: "A guide lights the way out"},
		{name: "The Desert", img_url: "https://i.imgur.com/mT7MS8O.png", alignment: "CG", symbol: ["Constitution", "Shield"], traditional: "Traversing a bleak passage", misaligned: "A passage with little hope"},
		{name: "The Eclipse", img_url: "https://i.imgur.com/zaDqEn4.png", alignment: "LE", symbol: ["Wisdom", "Star"], traditional: "Self-doubt", misaligned: "Unheralded abilities"},
		{name: "The Empty Throne", img_url: "https://i.imgur.com/WKYUil9.png", alignment: "LG", symbol: ["Charisma", "Crown"], traditional: "Loss brings good fortune", misaligned: "Loss brings bad tidings"},
		{name: "The Fiend", img_url: "https://i.imgur.com/MyqKyDN.png", alignment: "LE", symbol: ["Strength", "Hammer"], traditional: "Many losses in a calamity", misaligned: "Salvation from a calamity"},
		{name: "The Foreign Trader", img_url: "https://i.imgur.com/vwtsxfq.png", alignment: "N", symbol: ["Intelligence", "Book"], traditional: "An informitive pact", misaligned: "Never misaligned"},
		{name: "The Forge", img_url: "https://i.imgur.com/SPhzWtD.png", alignment: "LN", symbol: ["Strength", "Hammer"], traditional: "Strength through diversity", misaligned: "Never misaligned"},
		{name: "The Hidden Truth", img_url: "https://i.imgur.com/35T4bCl.png", alignment: "LG", symbol: ["Intelligence", "Book"], traditional: "Seeing past the obvious", misaligned: "A dangerous secret"},
		{name: "The Idiot", img_url: "https://i.imgur.com/ZUObUcr.png", alignment: "NE", symbol: ["Intelligence", "Book"], traditional: "Grave foolishness and greed", misaligned: "Clever feigning or idiocy"},
		{name: "The Inquisitor", img_url: "https://i.imgur.com/dbhicSo.png", alignment: "LN", symbol: ["Intelligence", "Book"], traditional: "Immutable reality", misaligned: "Never misaligned"},
		{name: "The Joke", img_url: "https://i.imgur.com/SsfIZGg.png", alignment: "CG", symbol: ["Intelligence", "Book"], traditional: "Danger overcome by artifice", misaligned: "The joke is on you"},
		{name: "The Juggler", img_url: "https://i.imgur.com/T5vCqsY.png", alignment: "CG", symbol: ["Dexterity", "Key"], traditional: "Fate is on your side", misaligned: "Fate is not on your side"},
		{name: "The Keep", img_url: "https://i.imgur.com/wrNg7cI.png", alignment: "NG", symbol: ["Strength", "Hammer"], traditional: "Unshakable to threat", misaligned: "Temptation is stronger"},
		{name: "The Liar", img_url: "https://i.imgur.com/15lSLv7.png", alignment: "CE", symbol: ["Charisma", "Crown"], traditional: "Love at its most trecherous", misaligned: "A new relationship begins"},
		{name: "The Locksmith", img_url: "https://i.imgur.com/51WdWag.png", alignment: "LN", symbol: ["Dexterity", "Key"], traditional: "Keys to a new destiny", misaligned: "Never misaligned"},
		{name: "The Lost", img_url: "https://i.imgur.com/jNMMfS3.png", alignment: "CE", symbol: ["Wisdom", "Star"], traditional: "Loss of identity", misaligned: "Clarity of mind"},
		{name: "The Marriage", img_url: "https://i.imgur.com/Xe2b5W2.png", alignment: "LN", symbol: ["Charisma", "Crown"], traditional: "Union of persons or ideas", misaligned: "Never misaligned"},
		{name: "The Midwife", img_url: "https://i.imgur.com/MCsKDcs.png", alignment: "NG", symbol: ["Wisdom", "Star"], traditional: "New life or new information", misaligned: "Dangerous new arrivals"},
		{name: "The Mountain Man", img_url: "https://i.imgur.com/8w1ldsa.png", alignment: "CN", symbol: ["Constitution", "Shield"], traditional: "An external physical power", misaligned: "Never misaligned"},
		{name: "The Mute Hag", img_url: "https://i.imgur.com/QrRreDj.png", alignment: "CE", symbol: ["Wisdom", "Star"], traditional: "Blood pacts and dark secrets", misaligned: "Unwavering loyalty"},
		{name: "The Owl", img_url: "https://i.imgur.com/UOSPBm2.png", alignment: "N", symbol: ["Wisdom", "Star"], traditional: "Wisdom of the natural order", misaligned: "Never misaligned"},
		{name: "The Paladin", img_url: "https://i.imgur.com/TyNH8KM.png", alignment: "LG", symbol: ["Strength", "Hammer"], traditional: "Standing fast under adversity", misaligned: "Standing fast is foolish"},
		{name: "The Peacock", img_url: "https://i.imgur.com/pQeLlRF.png", alignment: "N", symbol: ["Dexterity", "Key"], traditional: "Suddern personal shift", misaligned: "Never misaligned"},
		{name: "The Publican", img_url: "https://i.imgur.com/gxbKvtL.png", alignment: "CG", symbol: ["Wisdom", "Star"], traditional: "Fellowship and camaraderie", misaligned: "Refuge cannot be found"},
		{name: "The Queen Mother", img_url: "https://i.imgur.com/B4DKI0j.png", alignment: "LN", symbol: ["Wisdom", "Star"], traditional: "Knowledge through fealty", misaligned: "Never misaligned"},
		{name: "The Rabbit Prince", img_url: "https://i.imgur.com/Tez2pyu.png", alignment: "CN", symbol: ["Dexterity", "Key"], traditional: "Capriciousness of combat", misaligned: "Never misaligned"},
		{name: "The Rakshasa", img_url: "https://i.imgur.com/yyyloyW.png", alignment: "LE", symbol: ["Intelligence", "Book"], traditional: "Dominance and mind control", misaligned: "Enslavement is shaken off"},
		{name: "The Sickness", img_url: "https://i.imgur.com/35CCsz8.png", alignment: "NE", symbol: ["Constitution", "Shield"], traditional: "Disease of body or soul", misaligned: "Great health in an epidemic"},
		{name: "The Snakebite", img_url: "https://i.imgur.com/BLBd18X.png", alignment: "CE", symbol: ["Intelligence", "Book"], traditional: "Poisonous powers or ideas", misaligned: "Mental leap or discovery"},
		{name: "The Survivor", img_url: "https://i.imgur.com/HkZbwZe.png", alignment: "NG", symbol: ["Constitution", "Shield"], traditional: "Rebirth through ordeal", misaligned: "Tragic news or profound loss"},
		{name: "The Tangled Briar", img_url: "https://i.imgur.com/wpeUgbc.png", alignment: "LE", symbol: ["Constitution", "Shield"], traditional: "Ancient triumphs return", misaligned: "Old evils endanger present"},
		{name: "The Teamster", img_url: "https://i.imgur.com/jLfpDYp.png", alignment: "N", symbol: ["Constitution", "Shield"], traditional: "Driving eternal pressure", misaligned: "Never misaligned"},
		{name: "The Theater", img_url: "https://i.imgur.com/AuO9j8u.png", alignment: "NG", symbol: ["Charisma", "Crown"], traditional: "Prophecy is true", misaligned: "Prophecy is unreliable"},
		{name: "The Trumpet", img_url: "https://i.imgur.com/2cBF2j7.png", alignment: "LG", symbol: ["Constitution", "Shield"], traditional: "Declaration of power", misaligned: "Power for power's sake"},
		{name: "The Twin", img_url: "https://i.imgur.com/1mputKc.png", alignment: "N", symbol: ["Charisma", "Crown"], traditional: "Duality of purpose", misaligned: "Never misaligned"},
		{name: "The Tyrant", img_url: "https://i.imgur.com/UtQYP41.png", alignment: "LE", symbol: ["Charisma", "Crown"], traditional: "Paternal influence brings pain", misaligned: "A dark influence is overruled"},
		{name: "The Uprising", img_url: "https://i.imgur.com/0QYTakI.png", alignment: "CN", symbol: ["Strength", "Hammer"], traditional: "Overwhelming groundswell", misaligned: "Never misaligned"},
		{name: "The Vision", img_url: "https://i.imgur.com/Zts2LoM.png", alignment: "CN", symbol: ["Intelligence", "Book"], traditional: "Arcane knowledge", misaligned: "Never misaligned"}
	]

	const style = {
		display: "grid",
		gridTemplateColumns: "30% 70%",
		gridTemplateAreas: " 'buttons card' 'cards cards'"
	}

	const displayCard = () => {
		let { name, img_url, alignment, symbol, traditional, misaligned } = visibleCard
		return (
			<aside style={{gridArea: "card", display: "flex"}}>
				<img src={img_url} alt={name} height="60%"/>
				<ul>
					<li><h4>{name}</h4></li>
					<li>Alignment: <strong>{alignment}</strong></li>
					<li>Ability Score: <strong>{symbol[0]}</strong></li>
					<li>Suit: <strong>{symbol[1]}</strong></li>
					<br/>
					<li>Traditional: {traditional}</li>
					<li>Misaligned: {misaligned}</li>
				</ul>
			</aside>
		)
	}

	const drawCard = () => {
		let card = selectRandomCard()
		setVisibleCard(card)
	}

	const selectRandomCard = () => {
		let n = Math.floor(Math.random() * harrowDeck.length)
		return harrowDeck[n]
	}

	// <button>Play a Card</button>
	return (
		<section style={style}>
			<aside style={{gridArea: "buttons", display: "flex", flexDirection: "column"}}>
				<button onClick={drawCard}>Draw Random Card</button>
			</aside>
			{visibleCard.name && displayCard()}
			<aside style={{gridArea: "cards"}}>
			</aside>
		</section>
	)

}

export default HarrowDeck
