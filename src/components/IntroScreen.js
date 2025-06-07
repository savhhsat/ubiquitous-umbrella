import React, {useState,useEffect} from "react"

function IntroScreen(props){
	const [counter,setCounter]=useState(0);
	const [letters,setLetters]=useState(Array(6).fill("card-inner"));
	useEffect(()=>{
		const intervalId= setInterval(()=>{
			const tempLetters=[...letters];
			tempLetters[counter]="card-inner flipped";
			setLetters(tempLetters);
			if(counter>=5){
				clearInterval(intervalId);
				setTimeout(()=>{props.setIntro(false)},1000);

			}else{
				setCounter(counter+1);
			}},300)},[counter]);



	return(
		<div className="column-grid">
		<div className="horizontal-grid">
		{"MEMORY".split('').map((value,index)=><div className="card-container" index={index}><div className={letters[index]} index={index}><span className="back-of-card">?</span><span className="front-of-card intro-letters">{value}</span></div></div>)}
		</div>
		</div>
		)
}

export default IntroScreen
