import React, {useState, useEffect} from "react";
import {shuffle, fetchScoresFromBin, writeScoreToBin} from "../utils/services.js";
import Card from "./Card.js";
import Timer from "./Timer.js";
import Counter from "./Counter.js";
import Scoreboard from "./Scoreboard.js";

function GameBoard(props){

	const [images, setImages] =useState([]);
	const [state, setState]= useState("home");
	const [cards, setCards]=useState([]);
	const [firstFlippedCard, setFirstFlippedCard]=useState(null);
	const [clickCount, setClickCount]=useState(0);
	const [time, setTime]=useState(0);
	const [scoreBoardDisplayed, setScoreBoardDisplayed]=useState(false);
	const handleStart =async ()=>{
		setState("loading");
		const preloadedImages= await props.fetchImages(props.fetchImagesURLs());
		setImages(preloadedImages);
		const car=[];
		for (let i=0; i<16;i++){
			car.push({id:i, pair:Math.floor(i/2), src:preloadedImages[Math.floor(i/2)].src, isTurned:false, isFound:false});
		}

		setCards(shuffle(car));
		setState("playing");
	};
	const handleClick=(index)=>{
		const tempCards=[...cards];
		tempCards[index].isTurned=true;
		setCards(tempCards);
		setClickCount(clickCount+1);
		if (firstFlippedCard===null){
			setFirstFlippedCard(cards[index]);
		}else if(cards[index].pair===firstFlippedCard.pair){
			tempCards[index].isFound=true;
			tempCards.find((element)=>element.id===firstFlippedCard.id).isFound=true;
			setCards(tempCards);
			setFirstFlippedCard(null);
			if(cards.findIndex((element)=>element.isFound===false)===-1){
				setImages([]);
				setCards([]);
				writeScoreToBin("68442d7f8561e97a5020a4fe", {"clickCount":`${clickCount}`,"time":`${time}`});
				setTime(0);
				setClickCount(0);
				setState("You won! Play again?");
		}}else{
			setTimeout(()=>{
				tempCards[index].isTurned=false;
				tempCards.find((element)=>element.id===firstFlippedCard.id).isTurned=false;
				setFirstFlippedCard(null);
				setCards(tempCards)},800);
		}


	}
	const displayScores=()=>{
		setScoreBoardDisplayed(true);
	}

	return(
		<div className="game-board">
		{state!=="playing"?(scoreBoardDisplayed?<Scoreboard readScoresFromBin={fetchScoresFromBin} quit={()=>{setScoreBoardDisplayed(false)}}/>:<><div className="button-container"><button id="start-button" onClick={handleStart}>{state==="home"?"Start":state}</button></div><div className="button-container"><button id="scoreboard-button" onClick={displayScores}>Scoreboard</button></div></>):(<>{cards.map((value,index)=><Card key={value.id} onClick={handleClick} id={index} image={value}/>)}
			<Timer time={time}  setTime={setTime}/><Counter clickCount={clickCount} setClickCount={setClickCount}/></>)}
		</div>
		)
}

export default GameBoard;


