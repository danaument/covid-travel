//build out history buttons
var state = "ca";

//render selected trip
var renderTrip = function () {
    //api call for covid data
    $.ajax({
        url: `https://api.covidtracking.com/v1/states/${state}/current.json`,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var deaths = response.death;
        var covidTestDiv = $('<div>');
        covidTestDiv.html(`
        <p>${deaths} deaths were reported.</p>

        `)
        $('#covid-data').append(covidTestDiv);
    }).catch(function() {
        alert("Your ajax call failed.")
    })
    //api call for map
    
};

$(document).ready(function() {
    

    renderTrip();

    


//eventhandler for form submit


})
















