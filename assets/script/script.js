//build out history buttons
var state = "ca";
var date = "20201125";
var lat = "38.99";
var lon = "-75.51";

var stateDatabank = {
    Alabama: {abbr: "AL", lat: "32.77", lon: "-86.83"}, 
    Alaska: {abbr: "AK", lat: "64.07", lon: "-152.28"},
    Arizona: {abbr: "AZ", lat: "34.27", lon: "-111.66"},
    Arkansas: {abbr: "AR", lat: "34.89", lon: "-92.44"},
    California: {abbr: "CA", lat: "37.18", lon: "-119.47"},
    Colorado: {abbr: "CO", lat: "38.99", lon: "-105.55"},
    Connencticut: {abbr: "CT", lat: "41.62", lon: "-105.55"},
    Delaware: {abbr: "DE", lat: "38.99", lon: "-75.51"},
    DC: {abbr: "DC", lat: "38.91", lon: "-77.01"},
    // : {abbr: "", lat: "", lon: ""},
    // https://en.wikipedia.org/wiki/List_of_geographic_centers_of_the_United_States#Updated_list_of_geographic_centers
    
    Texas: {abbr: "TX", lat: "31.47", lon: "-99.33"}
}

var currentTrip = {
    location: "New-York", 
    startDate: "20200202",
    endDate: "20200205"
};

var searchHistory = [
    {
        location: "Texas",
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
    var lon = stateDatabank[currentTrip.location].lon
    var lat = stateDatabank[currentTrip.location].lat
    
    $("#map").html(`
    
<div id='map' style='width: 200px; height: 200px;'></div>
<script>
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuYXVtZW50IiwiYSI6ImNraHZlZWZ2YjBleWUycm1seTRxdWFrYzMifQ.74UeYMXPCW7WTYqt1fH2yA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [${lon}, ${lat}], // starting position [lng, lat]
    zoom: 6 // starting zoom
});
</script>
    `)
    //first column

    var styledLocation = currentTrip.location.toUpperCase()
    var styledStart = moment(currentTrip.startDate, "YYYYMMDD").format("dddd, MMMM Do, YYYY")
    var styledEnd = moment(currentTrip.endDate, "YYYYMMDD").format("dddd, MMMM Do, YYYY")

    var todayMinusFive = moment().subtract(5, 'days')
    var isTripOld = moment(currentTrip.endDate, "YYYYMMDD").isBefore(todayMinusFive);
    console.log(isTripOld);

    var hasTripStarted = moment(currentTrip.startDate, "YYYYMMDD").isSameOrBefore(moment());
    console.log(hasTripStarted);

    //possibly add stuff to show how long until/how long past trip from present day

    $("#selected-trip").html(`
    <h5>Travel to ${styledLocation}</h5>
    <h5>${styledStart} to ${styledEnd}</h5>

    `)
    if (isTripOld) {
        var date = currentTrip.endDate
        //api call for covid data
        $.ajax({
            url: `https://api.covidtracking.com/v1/states/${stateDatabank[currentTrip.location].abbr}/${date}.json`,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var deaths = response.death;
            var cases = response.positive;
            var increase = response.positiveIncrease;
            var hospitalizations = response.hospitalizedCurrently;
            var newHosp = response.hospitalizedIncrease;
            var deathIncr = response.deathIncrease;
            var covidTestDiv = $('<div>');
            covidTestDiv.html(`
            <p>${cases} total cases</p>
            <p>${increase} new cases</p>
            <p>${hospitalizations} currently hospitalized</p>
            <p>${newHosp} new hospitalizations</p>
            <p>${deathIncr} new deaths</p>
            <p>${deaths} people have died to date</p>

            `)
            $('#covid-data').append(covidTestDiv);

            var fiveDayData = $('<div>');
            fiveDayData.html(`
            
            `)
            for (i = 0; i < 4; i++) {

            }
        }).catch(function() {
            alert("Your ajax call failed.")
        })
    } else if (!isTripOld && hasTripStarted) {
        var date = moment().format("YYYYMMDD");
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
    } else {
        var date = currentTrip.startDate;
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
    }
    
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
        location: "Alabama", 
        startDate: "20200802",
        endDate: "20200805"
    };
    getHistory();

    //build current page
    renderTrip(currentTrip);

    $('#searchForm').submit(function(event) {
        event.preventDefault();
        var stateInput = $('#stateSearch').val();
        var startDateInput = $('#startDateInput').val();
        var endDateInput = $('#endDateInput').val();
        
        //format start and end dates from MM/DD/YYYY to YYYYMMDD

        //store to currentTrip
        //setcurrenttrip
        //pushcurrenttrip to history object
        //store history object

        //swap any spaces " " with hyphens in state names


        console.log(startDateInput);
        console.log(endDateInput);
        alert(stateInput, startDateInput, endDateInput);

    })


//eventhandler for form submit


})
