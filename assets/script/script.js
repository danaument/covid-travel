//build out history buttons
var state = "ca";
var date = "20201125";


var currentTrip = {
    location: "ny", 
    startDate: "20200202",
    endDate: "20200205"
};

var searchHistory = [
    {
        location: "tx",
        startDate: "20201123",
        endDate: "20201125"
    }
];

var getCurrentTrip = function() {
    if (JSON.parse(localStorage.getItem("currentTrip"))) {
        currentTrip = JSON.parse(localStorage.getItem("currentTrip"));
    } else {
        console.log("local storage current city was empty")
    }
};

var storeCurrentTrip = function() {
    localStorage.setItem("currentTrip", JSON.stringify(currentTrip));
};

var getHistory = function() {
    if (JSON.parse(localStorage.getItem("searchHistory"))) {
        searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    } else {
        console.log("local storage search history was empty")
    }
};

var setHistory = function() {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
};

//render selected trip 
var renderTrip = function (currentTrip) {
    //location map

    //first column



    
    var date = currentTrip.endDate

    //api call for covid data
    $.ajax({
        url: `https://api.covidtracking.com/v1/states/${currentTrip.location}/${date}.json`,
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

var renderButtons = function() {
    for (i = 0; i < searchHistory.length; i++) {
        var newButton = $('<div>')
        newButton.html(`
        <button class="button is-fullwidth" id="historyButton${i}">${searchHistory[i].location}</button>`)
    }
}


$(document).ready(function() {
    //datepicker
    $( function() {
        $( ".datepicker" ).datepicker();
    } );

    //load saved data
    getCurrentTrip();

    //just testing
    currentTrip = {
        location: "ny", 
        startDate: "20200802",
        endDate: "20200805"
    };
    getHistory();

    //build current page
    renderTrip(currentTrip);

    $('#searchForm').submit(function(event) {
        event.preventDefault();
        

    })


//eventhandler for form submit


})
