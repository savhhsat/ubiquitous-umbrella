import React, {useState,useEffect} from "react"

function Timer(){
	const [time,setTime]=useState(0);
	useEffect(()=>{
		setTimeout(()=>{
			setTime(time+1)
		},1000)},[time]);
	return(
			<p className="timer">{`${time} seconds elapsed`}</p>
		)
}

export default Timer
