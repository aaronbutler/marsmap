self.onmessage = function(e) {

var locationTag = {
	open: '<location>',
	close: '</location>'
};

var parseXMLLocationStr = function(xString) {
	var startLocIndex, endLocIndex, currentLocTag;
	var allSols = [];
	var currentLoc;
	do {
		startLocIndex = xString.indexOf(locationTag.open) + locationTag.open.length;
		endLocIndex = xString.indexOf(locationTag.close);
		currentLocTag = xString.substr(startLocIndex, endLocIndex-startLocIndex);

		currentLoc = genericTagsToJson(currentLocTag);
		
		buildSols(allSols,currentLoc);

		xString = xString.substring(endLocIndex + locationTag.close.length);
	} while (xString.indexOf(locationTag.open) !== -1);

	return {sols: allSols};
	
};

var buildSols = function(allSols,loc) {
	var firstSol = parseInt(loc['startSol']);
	var lastSol = parseInt(loc['endSol']);

	var currentSol;

	for(var i=firstSol;i<=lastSol;i++) {
		if(allSols.length > 0) {
			if(allSols.length > i) {

				currentSol = allSols[i];
			}
			else {

				currentSol = {};
				currentSol.locations = [];
				allSols.push(currentSol);
			}
		}
		else {

			currentSol = {};
			currentSol.locations = [];
			allSols.push(currentSol);
		}
		currentSol.locations.push(loc);
	}
	
	
}
var genericTagsToJson = function(xString) {

	var genericTag = {
		left: '<',
		right: '>',
		leftClose: '</'
	}
	var json = {};
	var startIndex,endIndex,currentTag;
	var startLeft,startRight,endLeft,endRight;
	var currentTagStart, currentTagEnd;
	var currentSlice = xString;
	var currentContent;
	var i = 0;
	do {
		startLeft = currentSlice.indexOf(genericTag.left);
		startRight = currentSlice.indexOf(genericTag.right);
		
		currentTagStart = currentSlice.substr(startLeft+1,startRight-startLeft-1);
		currentTagEnd = genericTag.leftClose+currentTagStart+genericTag.right;
		endLeft = currentSlice.indexOf(currentTagEnd);
		endRight = endLeft+currentTagEnd.length;

		currentContent = currentSlice.substring(startRight+1,endLeft);

		json[currentTagStart] = currentContent;

		currentSlice = currentSlice.substring(endRight);
		i++;

	} while ((currentSlice.indexOf(genericTag.left) !== -1) && (i<40))

	return json;
}


var xhttp = new XMLHttpRequest();
var ab;
xhttp.responseType = 'text';

xhttp.onreadystatechange = function() {

	if (xhttp.readyState == 4 && xhttp.status == 200) {
	   ab = xhttp.responseText;

		var obj = parseXMLLocationStr(ab);

		self.postMessage(obj);

	}
}
xhttp.open("GET", "../../kml/locations.xml", true);
//xhttp.open("GET","http://mars.jpl.nasa.gov/msl-raw-images/locations.xml",true);
xhttp.send();
}
