
/*
    Getting a list of all the vehicles
    Using handlebars to render the data to
    the vehicles template

*/
const vehicles = axios.get("/api/vehicles").then((result) => {
    let templatePlaceHolder = document.querySelector(".vehicles");
    let template = document.querySelector(".vehicles-template").innerHTML;
    let compiledTemplate = Handlebars.compile(template);
    let vehicles = result.data.data;
    templatePlaceHolder.innerHTML = compiledTemplate({ vehicles });
});


/*
    The function for adding a new car
    Grab the data from the form
    put it into an object
    make an API call and submit the data
    to be added
*/
function submitForm() {
    const description = document.getElementById("description").value;
    const regNumber = document.getElementById("reg-num").value;
    const errorElem = document.querySelector(".error")

    const formData = {
        description: description,
        regNumber: regNumber,
    };

    if(description && regNumber){
        axios.post("/api/vehicle", formData).then(() => {
        
        });
    }else{
        errorElem.style.display = "block"
        setTimeout(()=>{
            errorElem.style.display = "none"
        },4000)
    }
   
}


/*
  Function for REFUELING a vehicle
  Grab the data about the refueling
  from the form
  put it into an object
  make an API call and submit the data
  to be added 
 */
function submitRefillForm() {
    const liters = document.getElementById("liters").value;
    const amount = document.getElementById("amount").value;
    const distance = document.getElementById("distance").value;
    const params = new URLSearchParams(window.location.search);

    const idValue = params.get("id");

    const formData = {
        vehicleId: idValue,
        liters,
        amount,
        distance,
        filledUp: true,
    };

    axios.post("api/refuel", formData).then(() => {
        alert("Successfully re-filled");
    });
}


/*
    The function for getting the Vehicle
    that has been selected for a refill
    make an API call to get the data and
    then send it via handlebars to the
    template
*/
function getRefuelVehicle() {
    const params = new URLSearchParams(window.location.search);

    const idValue = params.get("id");
    if(idValue){
        axios.get(`/api/vehicle?id=${idValue}`).then((result) => {
            let templatePlaceHolder = document.querySelector(".refuel-vehicle");
            let template = document.querySelector(".refuel-vehicle-template").innerHTML;
            let compiledTemplate = Handlebars.compile(template);
            let refuel_vehicle = result.data.data;
            console.log("*********+++++++ ", refuel_vehicle)
            templatePlaceHolder.innerHTML = compiledTemplate({ refuel_vehicle });
        });
    }else{
        console.log("ID empty")
    }
}

getRefuelVehicle()