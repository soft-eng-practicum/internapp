/*
    Author(s): Robert Bryan

    Contains some utilities

*/

//var Site = require('../../app/models/site');

populateSelectYears('pastAndFutureYearSelect', 2000, new Date().getFullYear());
populateSelectYears('yearSelect', new Date().getFullYear());

populateSites('siteSelect');

function populateSelectYears(target, min, max) {
      if (!target){
          return false;
      }
      else {
          var min = min || 2000,
              max = max || new Date().getFullYear() + 6;

          select = document.getElementsByClassName(target);

          for (var k = 0; k < select.length; k++) {
            for (var i = min; i<=max; i++){
                var opt = document.createElement('option');
                opt.value = i;
                opt.innerHTML = i;
                select[k].appendChild(opt);
            }
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

 

