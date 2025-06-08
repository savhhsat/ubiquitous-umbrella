import React, {useState,useEffect} from "react"

function Timer({time,setTime}){
	useEffect(()=>{
		const id = setTimeout(()=>{
			setTime(time+1)
		},1000);
		return ()=> {clearTimeout(id)}},[time]);
	return(
			<p className="timer">{`${time} seconds elapsed`}</p>
		)
}

export default Timer
