import { getWeatherAPI } from "../../../../../travel-planner imp/src/client/js/api";

//>>>>>>>>>>>>>Geonames API<<<<<<<<<<<<<<//
const coordinatesAPI = async(city,country='')=>{

    const geonameURL = `http://api.geonames.org/searchJSON?q=${city}&country=${country}&maxRows=10&username=jihadtarek`
    const res = await fetch('https://cors-anywhere.herokuapp.com/' + geonameURL);
    try{
        const data = await res.json();
        if(data.totalResultsCount == 0) {
            return { error: "The "+ city +" can't be found" };
        }
        return data;

    }
    catch(error){
        console.log(error);
        
    }
}

//>>>>>>>>>>>>>Weather API<<<<<<<<<<<<<<//

const weatherAPI = async (lat,lng )=>{
    const APIKEY = '843ec24c64a64247b124dde2c3138298';
    const forecastURL=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${APIKEY}`
    const res = await fetch('https://cors-anywhere.herokuapp.com/' + forecastURL)

    try{
        const data = await res.json()
        return data;
    }catch(error){
        console.log(error)
    }
}

//>>>>>>>>>>>>>Weather API<<<<<<<<<<<<<<//
const PixaIMG = async (keyword)=>{
    // (/\s/g) to replace all white space characters  with +
    keyword = keyword.replace(/\s/g, '+');
    const APIKEY ='17325397-88f8642b1a8921c4371ea3632'
    const pixaURL = `https://pixabay.com/api/?key=${APIKEY}&q=${keyword}&image_type=photo&pretty=true`
    const res = await fetch(pixaURL)
    try{
        const data = await res.json()
        return data
    }catch(error){
        console.log(error)
    }

}
/*>>>>>>>>>>>>>>>>>>>>>*************************<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/*>>>>>>>>>>>>>>>>>>>>>****Get DATA from API****<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/*>>>>>>>>>>>>>>>>>>>>>*************************<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
const getDataAPI = async (userData)=>{
    let trip={}

    trip.error='';

    //get  Current Location
    await coordinatesAPI(userData.location)
    .then(resLocation=>{
        if(resLocation.error){
            trip.error=resLocation.error;
        }
        else{
            trip.location = {
                city:resLocation.geonames[0].toponymName,
                lat: resLocation.geonames[0].lat,
                lng: resLocation.geonames[0].lng
            }
        }
    })

    //get the destination

    await coordinatesAPI(userData.destination)
    .then(resDestinaton =>{
        if(resDestinaton.error){
            trip.error = resDestinaton.error;
        }else{

            //add the destination info to the object

           let dataDestination = trip.destination = {
                city: resDestinaton.geonames[0].toponymName,
                country: resDestinaton.geonames[0].countryName,
                lat: resDestinaton.geonames[0].lat,
                lng: resDestinaton.geonames[0].lng
            };
           // console.log(dataDestination)
        }
    })

    //get weather from

    if(trip.error == ''){
        await weatherAPI(trip.destination.lat,trip.destination.lng)
        .then(resweather =>{

           let weather = trip.resweather = {
                mix_temp : resweather.data[0].max_temp,
                min_temp : resweather.data[0].min_temp,
                datetime : resweather.data[0].datetime,
                timezone : resweather.timezone
            }
            console.log(weather)
        });
    }

    //get image of destination

    await PixaIMG(trip.destination.city)
    .then(resCityimag =>{
       if(resCityimag.totalHits > 0){
           trip.image = resCityimag.hits[0].largeImageURL
           console.log( trip.image)
       }
       else{
           PixaIMG(trip.destination.country)
           .then(resCountryImage => {
               if(resCountryImage.totalHits > 0){
                   trip.image = resCountryImage.hits[0].largeImageURL
               }else{
                   trip.image = false
               }
               console.log( trip.image)

            })
       }
    })

    return trip;

}

//SAVE NEWTRIP

const saveNewtrip = (newTripHolder) =>{
    //check if the LocalStorage is supported by User's Browser
    if(window.localStorage !== undefined){
        let arrTPcapstone = [];
        // getitem tp_capstone from localstorage and retun it in json form 
        if (localStorage.getItem('tp_capstone')){
            //return the newtripHolder in array too
            arrTPcapstone = [...JSON.parse(localStorage.getItem('tp_capstone')),newTripHolder]
        }else{
            arrTPcapstone=[newTripHolder];
        }

        //add the trip to localstorage
        localStorage.setItem('tp_capstone',JSON.stringify(arrTPcapstone))

    }else{
        alert('Your Browser doesn\'t support the local storage. \nPlease, update your browser!');
        
        return false;
    }
}
export{
    getDataAPI,
    saveNewtrip,
    weatherAPI,
    PixaIMG
}