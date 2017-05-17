//Listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//Save Bookmark
function saveBookmark(e){
  //Get form values
  var bugName = document.getElementById('bugName').value;
  var bugDesc = document.getElementById('bugDesc').value;

    if(!bugName || !bugDesc){
        alert('Please fill in the form');
        return false;
    }
    
    
  var bookmark = {
    name: bugName,
    url: bugDesc
  };

  //Local Storage 
    if(localStorage.getItem('logs') === null){
        //Init array
        var logs = [];
        
        logs.push(bookmark);
        //Set to localStorage
        localStorage.setItem('logs', JSON.stringify(logs));
    }
    else{
        //Get logs from localstorage
        var logs = JSON.parse(localStorage.getItem('logs'));
        
        //add bookmark to array
        logs.push(bookmark);
        //re set back to localstorage
        localStorage.setItem('logs', JSON.stringify(logs));
        
    }
    
    //re-fetch
    fetchlogs();
    //prevent form from submitting
    e.preventDefault();
}

//Delete Bookmark
function deleteBookmark(url){
    //Get logs from localstorage
    var logs = JSON.parse(localStorage.getItem('logs'));
    
    //Loop through logs
    for(var i = 0; i < logs.length; i++){
        if(logs[i].url == url){
            //Remove from array
            logs.splice(i, 1);
        }
    }
    //Set to localStorage
    localStorage.setItem('logs', JSON.stringify(logs));
    
    //re-fetch
    fetchlogs();
}



//Fetch logs
function fetchlogs(){
    //Get logs from localstorage
    var logs = JSON.parse(localStorage.getItem('logs'));
    
    //Get output id
    var logsResults = document.getElementById('logsResults');
    
    //Build output
    logsResults.innerHTML = '';
    
    for(var i = 0; i < logs.length; i++){
        var name = logs[i].name;
        var url = logs[i].url;
        
        logsResults.innerHTML +=   '<div class = "well">' + 
                                        '<h3>' +name+
                                        '<a class = "btn btn-default" target = "_blank" href = "'+url+'">Visit</a>' + 
                                        '<a class = "btn btn-danger" href = "#" onclick = "deleteBookmark(\''+url+'\')">Delete</a>' + 
                                        '</h3></div>';
    }
}














