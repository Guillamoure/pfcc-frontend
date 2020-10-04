import React from 'react'
import FeatDescription from '../feat_description'

const Feat = props => {
	return (
		<article style={{textAlign: "left"}}>
			<FeatDescription feat={props.feat} />
		</article>
	)
}

export default Feat
