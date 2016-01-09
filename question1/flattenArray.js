/**
	 * Function to flatten array
	 *
	 * 	function takes 2 params. 
	 *	First param inputArray is array to be converted
	 *  Second param flatArray is variable to hold flattened array
	 *
	 * @param  inputArray, flatArray
	 * @return void
*/

function flattenArray(inputArray, flatArray) {

	var i;//declared on function call to prevent closure scope issues on each recursion

	for( i=0; i < inputArray.length; i++ ) {
		
		if(inputArray[i] instanceof Array){
			flattenArray(inputArray[i],flatArray);
		}
		else {			
			flatArray.push(inputArray[i]);
		}
		
	}

}


