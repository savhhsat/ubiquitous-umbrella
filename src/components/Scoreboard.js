import React, {useState,useEffect} from "react";

function Scoreboard({readScoresFromBin, quit}){
	const [scores, setScores]=useState([])
	useEffect(()=>{
		const loadScores= async () =>{
			const tempScores=await readScoresFromBin("68442d7f8561e97a5020a4fe");
			tempScores.sort((a,b)=>(a.time===b.time?a.cliCkcount-b.clickCount:a.time-b.time))
			setScores(tempScores);
			};
		loadScores();
		},[]);
	return(
		<div className="scoreboard">
		{scores.length>3?scores.slice(0,3).map((value,index)=><p>{`Time ${value.time}s, ${value.clickCount} clicks`}</p>):scores.map((value,index)=><p>{`Time ${value.time}s, ${value.clickCount} clicks`}</p>)}<button onClick={quit}>Return to home</button>
		</div>
		)
}

export default Scoreboard
