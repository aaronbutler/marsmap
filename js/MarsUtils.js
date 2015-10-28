var Solendar = function(firstSol,firstDate) {
	this.firstSol = firstSol; //0 or 1 depending on how the rover clock started
	this.firstDate = firstDate;
};

Solendar.prototype.SolToDate = function(sol) {
	//console.log(this.firstSol + ': '+this.firstDate);
	var sols = sol - this.firstSol;
	var day = this.firstDate.getDate();
	var month = this.firstDate.getMonth();
	var year = this.firstDate.getFullYear();
	//console.log(day+' '+month+' '+year);
	
	var days = sols * (1.027492);

	var d = new Date();
	d.setFullYear(year,month,day+days);
	//console.log(this.sol + ': '+d);
	return d;
};

Solendar.prototype.DateToSol = function(date) {

	var days = (date - this.firstDate)/86400000;
	var sols = days * (.9732439);

	return sols + this.firstSol;
};

Solendar.prototype.Solth = function(solnum) {
	if(solnum%100 > 10 && solnum%100 < 20) {
		return solnum + 'th';
	}
	var tens = solnum % 10;
	switch(tens) {
		case 1:
			return solnum+'st';
		case 2:
			return solnum+'nd';
		case 3:
			return solnum+'rd';
		default:
			return solnum+'th';
	}
};





