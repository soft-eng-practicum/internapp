/*
    Author(s): Robert Bryan

    Contains some utilities

*/

//var Site = require('../../app/models/site');

populateSelectYears('pastAndFutureYearSelect', 2000, new Date().getFullYear());
populateSelectYears('yearSelect', new Date().getFullYear());

populateSelectYears('adminYearSelect', 2010);

function populateSelectYears(target, min, max) {
      if (!target){
          return false;
      }
      else {
          var min = min || 2000,
              max = max || new Date().getFullYear() + 6;

          select = document.getElementsByClassName(target);



          for (var k = 0; k < select.length; k++) {
		  	    // var opt2 = document.createElement('option');
		  		// opt2.value = firstSelectValue;
		  		// opt2.innerHTML = firstSelectValue;
		  		// select[k].appendChild(opt2);
            for (var i = min; i<=max; i++){
                var opt = document.createElement('option');
                opt.value = i;
                opt.innerHTML = i;
                select[k].appendChild(opt);
            }
          }

      }
  }

function makeOptionSelected(target, name) {
	var select = document.getElementById(target);
	var options = select.getElementsByTagName('option');
	for (var index = 0; index < options.length; index++) {
		if (options[index].value.toLowerCase() == name.toLowerCase()) {
			options[index].selected = true;
		}
	}

}

function prettySection(section) {
	var prettySection = "";
	switch (section) {
		case 'Information Technology Internship (ITEC 4800)':
			prettySection = "ITEC";
			break;
		case 'Biology Internship (BIOL 4800)':
			prettySection = "BIO";
			break;
		default:
			break;
	}
	return prettySection;
}
