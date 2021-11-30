

export function restUrlToObject(pathname){
  /* function only takes the pathname of url */
  let endpoint = pathname.substr(1);
  let array = endpoint.split("/"); 
  let obj = {};
  
  for(let i = 0; i < array.length; i+=1){

  	if( i === 0 || i % 2 === 0){
  		obj[array[i]] = undefined;
  	}else{
  		obj[array[i-1]] = array[i]
  	}
  }
 return obj
}



const REST = {

	getClientName:function(){
		const pathname = window.location.pathname;
		let path = restUrlToObject(pathname);
		console.log(path);
		return path["client-name"];

	},

	getClientID:function(){
		const pathname = window.location.pathname;
		let path = restUrlToObject(pathname);
		console.log(path);
		return path["client"];
	}
}




export default REST