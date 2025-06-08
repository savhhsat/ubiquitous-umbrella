export const fetchScoresFromBin= async (binid)=>{
	const endpoint =`https://api.jsonbin.io/v3/b/${binid}/latest`;
	const response = await fetch(endpoint,{
		method:"GET",
		headers:{
			"content-type":"application/json",
			"X-Access-Key":"$2a$10$A0sCrlzehY7U7uNUblAWPOqR3zmLs2q9svKQN0mGeVXEVutMT6pge"
		}});
	if(!response.ok){
		const t=await response.text();
		throw new Error(`Couldn't read from JSON ${response.status} 
			${t}`);
	}
	const {record} = await response.json();
	return record;
}
export const writeScoreToBin= async (binid, score)=>{
	const endpoint =`https://api.jsonbin.io/v3/b/${binid}`;
	const record = await fetchScoresFromBin(binid);
	const scores= Array.isArray(record)? record : [];
	scores.push({...score, date: new Date().toISOString()});
	const response = await fetch(endpoint,{
		method:"PUT",
		headers:{
			"content-type":"application/json",
			"X-Master-Key":"$2a$10$YMCJRn77y/RFt3ivUtM3Ieuqz8dg.XZ54ff/N8PgfSbI0yuGK4k0m"
		},
		body:JSON.stringify(scores)});
	if(!response.ok){
		throw new Error(`Writing to jsonbin failed:${response.status}`);
	}

}

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


