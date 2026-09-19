var studentsData=[
{name:"Salmaan Ahmed",marks:"38%",class:"3rd",address:"India"},
{name:"Riya Sharma",marks:"85%",class:"10th",address:"123, ABC Colony, Delhi"},
{name:"Rohan Patel",marks:"70%",class:"12th",address:"456, XYZ Street, Mumbai"},
{name:"Priya Singh",marks:"95%",class:"8th",address:"789, PQR Nagar, Bangalore"},
{name:"Ankit Gupta",marks:"60%",class:"9th",address:"101, LMN Road, Kolkata"},
{name:"Neha Verma",marks:"80%",class:"11th",address:"222, DEF Avenue, Chennai"},
{name:"Manoj Kumar",marks:"75%",class:"10th",address:"333, GHI Lane, Hyderabad"},
{name:"Pooja Mishra",marks:"88%",class:"12th",address:"444, STU Colony, Pune"},
{name:"Rajesh Singhania",marks:"92%",class:"9th",address:"555, VWX Street, Jaipur"},
{name:"Aarav Mehta",marks:"82%",class:"10th",address:"12, MG Road, Ahmedabad"},
{name:"Ananya Roy",marks:"89%",class:"11th",address:"45, Park Street, Kolkata"},
{name:"Vihaan Joshi",marks:"77%",class:"8th",address:"88, FC Road, Pune"},
{name:"Ishaan Nair",marks:"65%",class:"9th",address:"67, Marine Drive, Kochi"},
{name:"Sanya Malhotra",marks:"91%",class:"12th",address:"90, Connaught Place, Delhi"},
{name:"Kabir Das",marks:"54%",class:"7th",address:"23, Ring Road, Surat"},
{name:"Diya Kapoor",marks:"86%",class:"10th",address:"11, Mall Road, Shimla"},
{name:"Arjun Reddy",marks:"73%",class:"11th",address:"34, Jubilee Hills, Hyderabad"},
{name:"Meera Sen",marks:"94%",class:"12th",address:"56, Salt Lake, Kolkata"},
{name:"Devansh Saxena",marks:"68%",class:"9th",address:"78, Civil Lines, Lucknow"},
{name:"Tanvi Bhatt",marks:"83%",class:"10th",address:"99, Rajpur Road, Dehradun"}
];
var cardBox=document.getElementById("card-container");
var inputField=document.getElementById("user-input");
var searchBtn=document.getElementById("btn-search");
var titleHeading=document.getElementById("search-title");
function showCards(arr){
if(arr.length==0){
cardBox.innerHTML="<p>No student found</p>";
return;
}
var cardsHtml=arr.map(function(item){
return '<div class="card">'+
'<p>Student Name: <span>'+item.name+'</span></p>'+
'<p>Marks: <span>'+item.marks+'</span></p>'+
'<p>Class: <span>'+item.class+'</span></p>'+
'<p>Address: <span>'+item.address+'</span></p>'+
'</div>';
});
cardBox.innerHTML=cardsHtml.join("");
}
function searchStudent(){
var val=inputField.value.toLowerCase().trim();
if(val!=""){
titleHeading.innerText="Search Results for "+inputField.value+"...";
}else{
titleHeading.innerText="";
}
var filteredList=studentsData.filter(function(item){
return item.name.toLowerCase().indexOf(val)!=-1;
});
showCards(filteredList);
}
showCards(studentsData);
inputField.addEventListener("keyup",searchStudent);
searchBtn.addEventListener("click",searchStudent);