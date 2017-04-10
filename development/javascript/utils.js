/*
    Author(s): Robert Bryan

    Contains some utilities

*/

//var Site = require('../../app/models/site');

populateSelectYears('pastAndFutureYearSelect', 2000, new Date().getFullYear());
populateSelectYears('yearSelect', new Date().getFullYear());

populateSelectYears('adminYearSelect', 2010);

populateSites('siteSelect');

function populateSelectYears(target, firstSelectValue, min, max) {
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
	console.log(select);
	var options = select.getElementsByTagName('option');
	console.log(options);
	for (var index = 0; index < options.length; index++) {
		if (options[index].value.toLowerCase() == name.toLowerCase()) {
			options[index].selected = true;
		}
	}

}


  
function getSites(target)
{
	if (!target)
		return false;
	else
	{
		Site.find(function (err, sites)
		{
			if (err)
				console.error(err);
			
			var listOfSiteNames = [];
			
			sites.foreach(function(site)
			{
				listOfSiteNames.push(site.sitename);
			});
			
			for (var i = 0; i < listOfSiteNames.length; i++)
			{
				var opt = document.createElement('option');
				opt.value = listOfSiteNames[i];
				opt.innerHTML = listOfSiteNames[i];
				target.appendChild(opt);
			}
		});
	}
}

function test()
{
	console.log("here");	
}

function successSnack() 
{
	var x = document.getElementById("snackbarSuccess");
	x.className = "show";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

function failSnack() 
{
	var x = document.getElementById("snackbarFailure");
	x.className = "show";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}
