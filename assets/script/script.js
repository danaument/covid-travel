//build out history buttons
var state = "ca";
var date = "20201125";
var lat = "38.99";
var lon = "-75.51";
var stateInput;

var stateDatabank = {
    Alabama: { abbr: "AL", lat: "32.77", lon: "-86.83" },
    Alaska: { abbr: "AK", lat: "64.07", lon: "-152.28" },
    Arizona: { abbr: "AZ", lat: "34.27", lon: "-111.66" },
    Arkansas: { abbr: "AR", lat: "34.89", lon: "-92.44" },
    California: { abbr: "CA", lat: "37.18", lon: "-119.47" },
    Colorado: { abbr: "CO", lat: "38.99", lon: "-105.55" },
    Connencticut: { abbr: "CT", lat: "41.62", lon: "-105.55" },
    Delaware: { abbr: "DE", lat: "38.99", lon: "-75.51" },
    DC: { abbr: "DC", lat: "38.91", lon: "-77.01" },
    Florida: { abbr: "FL", lat: "28.68", lon: "-82.46" },
    Georgia: { abbr: "GA", lat: "32.66", lon: "-83.43" },
    Hawaii: { abbr: "HI", lat: "20.29", lon: "-156.37" },
    Idaho: { abbr: "ID", lat: "44.35", lon: "-114.61" },
    Illinois: { abbr: "IL", lat: "40.04", lon: "-89.19" },
    Indiana: { abbr: "IN", lat: "39.89", lon: "-86.28" },
    Iowa: { abbr: "IA", lat: "42.07", lon: "-93.49" },
    Kansas: { abbr: "KS", lat: "38.49", lon: "-98.38" },
    Kentucky: { abbr: "KY", lat: "37.53", lon: "-85.30" },
    Louisiana: { abbr: "LA", lat: "31.06", lon: "-91.99" },
    Maine: { abbr: "ME", lat: "45.36", lon: "-69.24" },
    Maryland: { abbr: "MD", lat: "39.05", lon: "-76.79" },
    Massachusetts: { abbr: "MA", lat: "42.25", lon: "-71.80" },
    Michigan: { abbr: "MI", lat: "44.34", lon: "-85.41" },
    Minnesota: { abbr: "MN", lat: "46.28", lon: "-94.30" },
    Mississippi: { abbr: "MS", lat: "32.73", lon: "-89.66" },
    Missouri: { abbr: "MO", lat: "38.35", lon: "-92.45" },
    Montana: { abbr: "MT", lat: "47.05", lon: "-109.63" },
    Nebraska: { abbr: "NE", lat: "41.53", lon: "-99.79" },
    Nevada: { abbr: "NV", lat: "39.32", lon: "-116.63" },
    New_Hampshire: { abbr: "NH", lat: "43.68", lon: "-71.58" },
    New_York: { abbr: "NY", lat: "42.95", lon: "-75.52" },
    North_Carolina: { abbr: "NC", lat: "35.55", lon: "-79.38" },
    North_Dakota: { abbr: "ND", lat: "47.45", lon: "-100.46" },
    Ohio: { abbr: "OH", lat: "40.28", lon: "-82.79" },
    Oklahoma: { abbr: "OK", lat: "35.58", lon: "-97.49" },
    Oregon: { abbr: "OR", lat: "43.93", lon: "-120.55" },
    Pennsylvania: { abbr: "PA", lat: "40.87", lon: "-77.79" },
    Rhode_Island: { abbr: "RI", lat: "41.67", lon: "-71.55" },
    South_Carolina: { abbr: "SC", lat: "33.91", lon: "-80.89" },
    South_Dakota: { abbr: "SD", lat: "44.44", lon: "-100.22" },
    Tennessee: { abbr: "TN", lat: "35.85", lon: "-86.35" },
    Texas: { abbr: "TX", lat: "31.47", lon: "-99.33" },
    Utah: { abbr: "UT", lat: "39.30", lon: "-111.67" },
    Vermont: { abbr: "VT", lat: "44.06", lon: "-72.66" },
    Virginia: { abbr: "VA", lat: "37.52", lon: "-78.85" },
    Washington: { abbr: "WA", lat: "47.38", lon: "-120.44" },
    West_Virginia: { abbr: "WV", lat: "38.64", lon: "-80.62" },
    Wisconsin: { abbr: "WI", lat: "44.62", lon: "-89.99" },
    Wyoming: { abbr: "WY", lat: "42.99", lon: "-107.55" },
    // : {abbr: "", lat: "", lon: ""},
    // https://en.wikipedia.org/wiki/List_of_geographic_centers_of_the_United_States#Updated_list_of_geographic_centers

}

var currentTrip = {
    location: "New-York",
    startDate: "20200202",
    endDate: "20200205"
};

var searchHistory = [{
    location: "Texas",
    startDate: "20201123",
    endDate: "20201125"
}];

var getCurrentTrip = function() {
    if (JSON.parse(localStorage.getItem("currentTrip"))) {
        currentTrip = JSON.parse(localStorage.getItem("currentTrip"));
    } else {
        console.log("local storage current city was empty")
    }
};
//set current trip
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
var renderTrip = function(currentTrip) {
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
    $(function() {
        $(".datepicker").datepicker();
    });

    //load saved data
    getCurrentTrip();

    //just testing
    var currentTrip = {
        location: "Texas",
        startDate: "20200802",
        endDate: "20200805",

    }
    getHistory();

    //build current page
    renderTrip(currentTrip);

    $('#searchForm').submit(function(event) {
            event.preventDefault();
            //swap any spaces " " with underscore in state names
            //format start and end dates from MM/DD/YYYY to YYYYMMDD
            var startDateInput = $('#startDateInput').val().replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3$1$2");
            var endDateInput = $('#endDateInput').val().replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3$1$2");;
            var stateInput = $('#stateSearch').val().replace(' ', '_');
            var historyButton = document.createElement("button");
            historyButton.innerHTML = stateInput
            document.getElementById('historyBox').appendChild(historyButton)
        })
        // stringify and parse current trip input
    let currentTripObject = JSON.stringify(currentTrip);

    localStorage.setItem("currentTripObject", currentTripObject);

    let currentTripParse = JSON.parse(localStorage.getItem("currentTripObject"));

    console.log(currentTripParse)

    //store to currentTrip
    //setcurrenttrip
    //pushcurrenttrip to history object
    //store history object


    // eventhandler for form submit

    // form submit button needs to insert data current trip to call for map and covid apis,
    // create a button in recent searches
    // button needs to input previous search criteria into current trip


})