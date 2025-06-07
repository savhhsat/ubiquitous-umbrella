import React , {useState} from "react";
import GameBoard from "./components/GameBoard";
import IntroScreen from "./components/IntroScreen";
import {shuffle, fetchImagesURLs, fetchImages} from "./utils/services.js";

function App() {
	const [intro, setIntro]=useState(true);
	return (
		<div className="app">
		{intro===true?<IntroScreen setIntro={setIntro}/>:<GameBoard shuffle={shuffle} fetchImagesURLs={fetchImagesURLs} fetchImages={fetchImages}/>}
		</div>
	);
}


export default App;
