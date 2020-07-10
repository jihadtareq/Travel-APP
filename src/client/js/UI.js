import {daysDifference} from './handler'

const createTripHtml = (newTrip)=>{
    let content = ''
    
    let newTripLocationBlock= document.createElement('div')
    newTripLocationBlock.classList.add('trip__block')

    for(let dest of newTrip) {

        content += `<div class="trip__destination">
                        <div class="loc__image" ${ dest.image != false ? 'style="background-image: url(' + dest.image + ')"' : ``}></div>
                        <div class="loc__info">
                            <h2 class="loc__name">
                                <span class="loc__city">${dest.destination.city}</span>,
                                <span class="loc__country">${dest.destination.country}</span>
                            </h2>
                            <div class="loc__dates">
                                <div class="loc__date">
                                    <div class="start-end-date">
                                        <span class="date-start">${dest.dateStart}</span>
                                        -
                                        <span class="date-end">${dest.dateEnd}</span>
                                        /
                                        <span class="total-days">${daysDifference(dest.dateStart, dest.dateEnd)} days</span>
                                    </div>
                                </div>
                                <div class="loc__remain">
                                    The Trip will start in: <span class="remain-days">${daysDifference(new Date(), dest.dateStart)}</span> days
                                </div>
                            </div>
                            <div class="loc__weather weather">
                                <div class="weather__title">Weather forecast:</div>
                                <div class="weather__content">
                                    <div class="weather__icon">
                                        <img src="https://www.weatherbit.io/static/img/icons/${dest.weather.icon}.png"/>
                                    </div>
                                    <div class="weather__info">
                                        <div class="weather__data"><span>${dest.weather.mix_temp}</span> &deg;C</div>
                                        <div class="weather__commnents">${dest.weather.description}</div>
                                    </div>
                                </div>
                            </div>`;
        }
        content +=`<div id="new-trip-actions" class="trip__actions">
        <div class="nt-btn save-trip">
            <div id="save-new-trip" class="save-trip-icon"><span></span></div>
            <p>Save the Trip</p>
       </div>
    </div>`

newTripLocationBlock.innerHTML = content;


return newTripLocationBlock;                

}

const createTripListBlock = (trips = '') => {

    let content = '';
    const newTripListBlock = document.createElement('div');
    newTripListBlock.classList.add('all-trips');

    let itr = 0;
    for(let trip of trips) {
        
        let daysLeft = daysDifference(new Date(), trip[0].dateStart);
        content += `<div class="trip-container" data-trip-nr="${itr}">
                        <div class="trip-container__header">
                            <div class="trip-container__remain">Trip will start in <span class="num-icon">${daysLeft}</span> days</div>
                        </div>
                    <div class="trip__block">`;
                    
        for(var dest of trip) {
        
        content += `<div class="trip__destination">
            <div class="loc__image" ${ dest.image != false ? 'style="background-image: url(' + dest.image + ')"' : ``}></div>
            <div class="loc__info">
                <h2 class="loc__name">
                    <span class="loc__city">${dest.destination.city}</span>,
                    <span class="loc__country">${dest.destination.country}</span>
                </h2>
                <div class="loc__dates">
                    <div class="loc__date">
                        <div class="start-end-date">
                            <span class="date-start">${dest.dateStart}</span>
                            -
                            <span class="date-end">${dest.dateEnd}</span>
                            /
                            <span class="total-days">${daysDifference(dest.dateStart, dest.dateEnd)} days</span>
                        </div>
                    </div>
                    <div class="loc__remain">
                        The Trip will start in: <span class="remain-days">${daysDifference(new Date(), dest.dateStart)}</span> days
                    </div>
                </div>
                <div class="loc__weather weather">
                    <div class="weather__title">Weather forecast:</div>
                    <div class="weather__content">
                        <div class="weather__icon">
                            <img src="https://www.weatherbit.io/static/img/icons/${dest.weather.icon}.png"/>
                        </div>
                        <div class="weather__info">
                            <div class="weather__data"><span>${dest.weather.mix_temp}</span> &deg;C</div>
                            <div class="weather__commnents">${dest.weather.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        }
        content += `</div>
                    <div class="trip-container__actions">
                        <div class="action-btn remove-trip" data-trip-nr="${itr}" title="Remove The Trip"></div>
                    </div>
        
                    </div>`; //end trip-container
        
        itr++; //increment
    }
    newTripListBlock.innerHTML = content;
    return newTripListBlock;    
}

export {
    createTripHtml, 
    createTripListBlock
    
}