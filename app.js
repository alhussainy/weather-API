//Global variables
const API_KEY ="e794f05a3528a6f27e9c3682fe458eda";
const baseURL ='https://api.openweathermap.org/data/2.5/weather?';
let errorMessageModal =null;

//wait for the DOM to be fully loaded to add event listener on submit button
window.addEventListener('load', () => {
    //add event listener to submit button
    document.getElementById('generate').addEventListener('click',updateThePage);
    //get error message modal
    errorMessageModal = document.querySelector('.error-modal');
  });

//Full process 
function updateThePage(){
    //validating user data
    const data = validRequiredData();
    //if data is not empty
    if(data){
        //first fetch data from openWeatherMap 
        fetchDataFromAPI(API_KEY,data.zipCode).then((resolve)=>{
            //check for got data
            if (typeof resolve !== 'undefined') {
                 updateUI(resolve.main.temp,data.feelings);
            //save data to our end point
           
        }
        }).catch(function(err) {
            console.log(err)
        });
    }
}

//validating user input data empty or not
function validRequiredData(){
    const zipCode = document.getElementById('zip').value;
    //TODO validate zip code with Regex
    if(zipCode.trim() === ""){
        updateUI(undefined,undefined);
        showErrorMessage("Error, incorrect zip code"); 
        return false;
    }
    const feelings = document.getElementById("feelings").value;
    if(feelings.trim() === ""){ 
        updateUI(undefined,undefined);
        showErrorMessage("please, Tell us how is your feelings");
        return false;
    }
    return {zipCode:zipCode.trim(),feelings:feelings.trim()};
}
//fetch data from openWeatherMap.com
const fetchDataFromAPI = async (APIKey="",zipCode="")=>{
    const fetchedData  = await fetch(`${baseURL}zip=${zipCode}&appid=${APIKey}&units=metric`)
    try{
        //wait for incoming data
        const res = await fetchedData.json();
        //throw exception if data is not found 404 error or any other error
        if(res.cod != 200){
            
            throw  new Error("not data found")
        }
        //return data if all are ok
        return res;
    }catch(err){
        updateUI(undefined,undefined);
        showErrorMessage("zip code is incorrect");
        console.log(err);
    }
};
//fetch data from our end point
 const fetchDataFromApp = async (url='')=>{
     //wait for incoming data
    const fetchedData = await fetch(url);
    try{
        const res = await fetchedData.json();
        return res;
    }catch(err){
        updateUI(undefined,undefined);
        console.log("Error, could not fetch data from App")
    }
 };
//save data on our end point
 const postDataToApp = async (url='',data={})=>{
     const res = await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
     });
    
 };
//update the UI entryHolder div
 const  updateUI = async (temp,content)=>{
    let d = new Date();
    let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
    let dataElement = document.getElementById('date');
    let tempElement =  document.getElementById('temp');
    let contentElement =document.getElementById('content');
     if(typeof temp == 'undefined' || typeof content == 'undefined'){
        dataElement.innerHTML ="";
        tempElement.innerHTML="";
        contentElement.innerHTML="";
     }else{
        dataElement.innerHTML = "Date : " +newDate;
        tempElement.innerHTML = "Temp : "+temp;
        contentElement.innerHTML ="Feelings : " +content;
     }
    await animateElementData(dataElement);
    await animateElementData(tempElement);
    await animateElementData(contentElement);
 }
 const animateElementData = async (elem)=>{
        elem.animate([
            { opacity: '0' },
            { opacity: '1' }
          ], {
            duration: 700,
            fill:'forwards'
          });
 }

 //inform user if there is any error because of input data
function showErrorMessage (message){
    if(errorMessageModal != null){
        errorMessageModal.firstElementChild.innerHTML = message;
        errorMessageModal.style.display='block';
        errorMessageModal.classList.toggle('fade');
        setTimeout(() => {
            errorMessageModal.classList.toggle('fade');
        }, 1000);
    }
 }