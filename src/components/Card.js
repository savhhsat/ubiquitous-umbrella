import React, {useState} from "react"

function Card(props){
	return(
		<div className="card-container">
		<div className={props.image.isTurned?"card-inner flipped":"card-inner"}>
		<img className="front-of-card" src={props.image.src}/>
		<span className="back-of-card" onClick={()=>(props.onClick(props.id))}>?</span>
		</div></div>
		)
}

export default Card
