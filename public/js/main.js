const vehicles = axios.get("/api/vehicles").then((result) => {
    let templatePlaceHolder = document.querySelector(".vehicles");
    let template = document.querySelector(".vehicles-template").innerHTML;
    let compiledTemplate = Handlebars.compile(template);
    let vehicles = result.data.data
    templatePlaceHolder.innerHTML = compiledTemplate({ vehicles });
});


function submitForm() {
    const description = document.getElementById('description').value;
    const regNumber = document.getElementById('reg-num').value;

    const formData = {
        description: description,
        regNumber: regNumber
    };
   
    axios.post("/api/vehicle", formData).then(()=>{
        alert("Successfully added")
    })
}

function submitRefillForm() {
    const liters = document.getElementById('liters').value;
    const amount = document.getElementById('amount').value;
    const distance = document.getElementById('distance').value;
    const params = new URLSearchParams(window.location.search);

    const idValue = params.get('id');
    

    
    const formData = {
        vehicleId: idValue,
        liters,
        amount,
        distance,
        filledUp: true
    };
    console.log(formData)

    axios.post("api/refuel", formData).then(()=>{
        alert("Successfully re-filled")
    })
}

