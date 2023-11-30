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
    console.log(formData)

    axios.post("/api/vehicle", formData).then(()=>{
        alert("Successfully added")
    })

}
