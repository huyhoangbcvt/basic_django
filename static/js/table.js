//
// function for checking all checkboxes
//
function checkAll(cAll, form){
  var cbs = form.elements;
  if (cbs == undefined) return ; // if no rows, return
  if (typeof cbs.length == "undefined") {  // if 1 row, browser treats as non-array
    if (cAll.checked && !cbs.checked) cbs.checked = true;
    if (!cAll.checked && cbs.checked) cbs.checked = false;
    return;
  }

  for (var i=0; i < cbs.length;i++) {
    if (!cAll.checked && cbs[i].checked) cbs[i].checked = false;
    if (cAll.checked && !cbs[i].checked) cbs[i].checked = true;
  } 
}

function toggle_it(itemID){
      // Toggle visibility between none and inline
      if ((document.getElementById(itemID).style.display == 'none'))
      {
        document.getElementById(itemID).style.display = 'inline';
      } else {
        document.getElementById(itemID).style.display = 'none';
      }
}

function enableBackup(){
	document.getElementById("hour").disabled="true";
}

function enableField()
{
	alert('come here');
	document.form.hour.disabled='true';
	alert(document.getElementById('hour'));
}

