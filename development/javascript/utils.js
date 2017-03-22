/*
    Author(s): Robert Bryan

    Contains some utilities

*/

populateSelectYears('pastAndFutureYearSelect', 2000, new Date().getFullYear());
populateSelectYears('yearSelect', new Date().getFullYear());

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

 

