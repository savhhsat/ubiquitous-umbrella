import React, {useState} from "react"

function Counter(props){
	return(
			<p className="click-counter">{`${props.clickCount} clicks`}</p>
		)
}

export default Counter
