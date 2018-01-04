$(document).ready(function() {
  populateInfo();
  getUsers();
  ifClosed();
  getInfo();
  removeOffline();
 });

var channels = '0';
var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","brunofin","comster404"];

function populateInfo(){
 /*You may need to put this in another for loop to make a new <tr> for each row */
 let string = '';
 for(var p=0; p < streamers.length;p++){
    string += "<tr>";
    string += "<td style='vertical-align:middle;'>"; 
    string += "<a id=" + "'" + "logo" + p + "'" +  " " + ">" + "</a>";
    string += "</td>";
    string += "<td style='vertical-align:middle;'>";
    string += "<a id=" + "'" + "row" + p + "'" + "class='row'" + ">" + "</a>";
    string += "</td>";
    string += "<td style='vertical-align:middle; padding-bottom:30px;'>";
    string += "<a id=" + "'" + "row" + p + "'" + "class='row'" + ">" + "</a>" + "<a id='r" + p + "'" + " " + "class='row'" + ">" + "</a>";
    string += "</td>";
    string += "</tr>";
   console.log(string);
 $("#populateThis").append(string);
  string = '';  
 }  //console.log(document.getElementById("populateThis").innerHTML);
} 

function getUsers(){
for(var i=0; i < streamers.length;i++){
  /*only returns ones that get success, otherwise will not go to function*/
  /*json will never return objects in order*/
  /*JS is asyncronous*/
  /*let let's it be block scoped */
  let rowString = "row" + i;
  let iHold = i;
 $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + streamers[i] +"?callback=?",   
 function(data) {
   let channel = "<a href='https://www.twitch.tv/" + streamers[iHold] +"'target='_blank'>" + streamers[iHold] + "</a>" + "<br>";
   document.getElementById(rowString).innerHTML = channel;
   if(data.stream == null){
   $("#row" + iHold).append("Streaming");
   }
   if(data.stream != null){
    $("#row" + iHold).append("Offline");
   }
  });
 }
}

function ifClosed(){
 for(var j=0; j < streamers.length;j++){
  let rowString2 = "row" + j;
  let iHold2 = j;
 $.getJSON('https://wind-bow.gomix.me/twitch-api/users/' + streamers[j] +"?callback=?",   
 function(data2) {
   if(data2.error == "Not Found" || data2.error =="Unprocessable Entity"){
    document.getElementById(rowString2).innerHTML = "This account has been closed or does not exist";
   }
   });
  }
 }

function getInfo(){
 for(var k=0; k < streamers.length;k++){
  let rowString2 = "row" + k;
  let iHold2 = k;
 $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + streamers[k] +"?callback=?",   
 function(data2) {
   if(data2.status != 422 && data2.logo != "undefined" && data2.logo != null){
       $("#logo" + iHold2).html("<img src='" + data2.logo + "'" + "class='logo'" + "/>");
     $("#r" + iHold2).append("" + data2.status);
    }
   });
  }
  
}
