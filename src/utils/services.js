 

export const shuffle =(cards) =>{
	let newCards=[...cards];
	for(let i=cards.length-1;i>=1;i--){
		const index=Math.floor(Math.random()*(i+1));
		const tempCard= newCards[i]
		newCards[i]=newCards[index];
		newCards[index]=tempCard;
	}
	return newCards;
}


export const fetchImagesURLs=()=>{
	const urls=[];
	for (let i=0;i<8;i++){
		const seed=Math.floor(Math.random()*10000);
		urls.push(`https://picsum.photos/75/75?random=${seed}`);
	 }
	return urls;
}

export const fetchImages=async (urls)=>{
	const images= Array.from({length:8});
	const promises=urls.map((value, index)=>new Promise((resolve, reject)=> {
		images[index]=new Image();
		images[index].src=value;
		images[index].onload=()=>resolve(true);
		images[index].onerror=()=>reject(false);
	}));
	try {
		await Promise.all(promises);
		return images;}
	catch{
		window.alert("Failed to preload assets. Refresh.");
		return [];
	}
}


