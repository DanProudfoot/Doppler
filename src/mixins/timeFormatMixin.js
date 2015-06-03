module.exports = {
	convertToHumanTime(time){
		var Cminutes = Math.floor(time / 60);
		var Cseconds = Math.floor(time % 60);
		if (Cseconds < 10){
				Cseconds = "0" + Cseconds;
			}
		return(Cminutes + ":" + Cseconds);
	}	
}



