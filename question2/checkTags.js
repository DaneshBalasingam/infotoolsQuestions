/**
	 * Function to check if tags are  nested
	 *
	 * 	function takes 1 params. 
	 *
	 * @param  inputText
	 * @return result message
*/

function checkTags(inputText) {

	/********
		Extract tags from text and place as in array of tag objects
	*******/

	
	tagPattern = /<\/?[^/>]+(>|$)/g;

	//tagPattern = /<\/?[^/>\\]+(>|$)/g;

	var result = inputText.match(tagPattern);

	var tags = new Array();

	for(item in result){
		
		
		if (result[item].slice(1, 2) != "<" ){
			var tag = new Object();
		
			if(result[item].slice(1, 2) == "/"){
				tag.openClose = "close";

				var strippedTag = result[item].substring(2,result[item].length-1);
				var split = strippedTag.split(" ");

				tag.name = split[0];
			}else {
				tag.openClose = "open";
				var strippedTag = result[item].substring(1,result[item].length-1);
				var split = strippedTag.split(" ");

				tag.name = split[0];
			}
			tag.isNested = false;
			
			tags.push(tag);
		}

	}
	
	/*****
		Checks if extra tags are present
	****/
	for(i=0; i < tags.length; i++){

		var currTagName = tags[i].name;
		var closeTagCount = 0;
		var openTagCount = 0;

		for(j=0; j < tags.length; j++){
			if(currTagName == tags[j].name && tags[j].openClose == "open")
				openTagCount++;
			if(currTagName == tags[j].name && tags[j].openClose == "close")
				closeTagCount++;
		}

		if(openTagCount > closeTagCount) {
			return "Expected </" + tags[i].name + "> found #";
		}

		if(openTagCount < closeTagCount) {
			return "Expected # found </" + tags[i].name + ">";
		}

	}

	/****
		checks if tags are nested properly
	****/

	for(i=0; i < tags.length; i++){

		if(tags[i].openClose == "open") {
			
			for( j=1; i+j < tags.length; j=j+2){
				
				if(tags[i+j].name == tags[i].name && tags[i+j].openClose == "close"){
					tags[i].isNested = true;
					tags[i+j].isNested = true;
					break;
				}
			}
		}
	}


	for(i=tags.length-1; i >= 0; i--) {
		if(!tags[i].isNested) {
			return "Expected </" + tags[i].name + "> found </" + tags[i-1].name + ">";
		}
	}


	return "Correctly tagged paragraph";

}







