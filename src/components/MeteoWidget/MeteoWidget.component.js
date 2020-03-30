import styles from './MeteoWidget.styles.scss';

const template = document.createElement('template');
template.innerHTML = `
  <style>${styles.toString()}</style>
  <div class="container">
    <h1>Ma météo 
      <span class="loader"><img src="img/loader.svg" alt="loader"></span>
    </h1>
    <meteo-search></meteo-search>
    <meteo-controls></meteo-controls>
    <meteo-cities></meteo-cities>
  <div>
`;

class MeteoWidget extends HTMLElement {

  constructor() {
    super();

    this._search = '';

    this.attachShadow({mode: 'open'});

    this.shadowRoot.appendChild(template.content.cloneNode(true))    
  }

  connectedCallback(){  
    
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('isPos', position); ///////////////////////////////////
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          this.fetchAPIData('local', lat, long);
      });
    }

    this.addEventListener("search", function (e) {
      console.log('listen to search'); ///////////////////////////////////
      if (e.detail) {
        this._search = e.detail
      }
      this.fetchAPIData('weather');
    });

    this.addEventListener("forecast", function (e) {
      console.log('listen to forecast'); /////////////////////////////////////
      this.fetchAPIData('forecast');
    });
  }  

  fetchAPIData(type, lat, long) {
    const meteoSearchElement = this.shadowRoot.querySelector('meteo-search')    
    const meteoCitiesElement = this.shadowRoot.querySelector('meteo-cities');
    const meteoControlsElement = this.shadowRoot.querySelector('meteo-controls')  
    const loaderElement = this.shadowRoot.querySelector('.loader')  
    
    const errorMessage = "Merci d'indiquer un nom de ville valide 😅"

    const apiKey = "daa616bfbe98e9bf9906387e804181c5";
    
    let apiURL = null;
    
    console.log(lat, long); //////////////////////////////////////////
    
    loaderElement.classList.remove('invisible')
    if (type === 'local') {
      apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&lang=fr&appid=${apiKey}`
    } else {
      apiURL = `https://api.openweathermap.org/data/2.5/${type}?q=${this._search}&units=metric&lang=fr&appid=${apiKey}`
    }

    fetch(apiURL)
      .then(response => response.json())
      .then(json => {
        
        console.log('Fetch json data success', json); ///////////////////////////////////
        
        if (json.cod == 200) {
          meteoControlsElement.classList.add('visible');
          meteoControlsElement.type = type;
          loaderElement.classList.add('invisible')
        }                 
            
          const options = { weekday: 'long', month: 'long', day: 'numeric' };
          
          if (type === 'local') {
            this._search = json.name
          }

          if (type === 'forecast') {
            console.log('Fetch forecast'); ///////////////////////////////////
            const { city, list } = json;
            
            let forecastObj = {
              name: city.name,
              country: city.country,
              temperature: null,
              description: null,
              icon: null,
              jour: null
            }

            const dateNow = new Date(list[0].dt_txt);
            
            const listFiltered =  list.filter((item) => {
              const date = new Date(item.dt_txt);

              if (dateNow.getHours() == 0) {
                return (date.getHours() == 15);
              } else {
                return (date.getHours() == 15 && (date.setHours(0,0,0,0)) > (dateNow.setHours(0,0,0,0)));
              }              
            });

            console.log('listFiltered', listFiltered);  ///////////////////////////////////
                
            const forecastData = listFiltered.map( item => {
              const date = new Date(item.dt*1000);
              
              let jourActuel = date.toLocaleDateString('fr-FR', options);
              jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

              let description = item.weather[0].description;
              description = description.charAt(0).toUpperCase() + description.slice(1);

              return { ...forecastObj, 
                temperature: item.main.temp,
                description,
                icon: item.weather[0].icon,
                jour: jourActuel
              }
            })
              
            console.log('forecastData', forecastData); ///////////////////////////////////

            meteoCitiesElement.type = type;
            meteoCitiesElement.datasToDisplay = forecastData;

          } else {
            console.log('Fetch today');  ///////////////////////////////////

            const date = new Date(json.dt*1000);

            let jourActuel = date.toLocaleDateString('fr-FR', options);
            jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

            let description = json.weather[0].description;
            description = description.charAt(0).toUpperCase() + description.slice(1);

            const todayData = [];

            let todayObj = {
              name: json.name,
              country: json.sys.country,
              temperature: json.main.temp,
              description,
              icon: json.weather[0].icon,
              jour: jourActuel
            }

            console.log('todayObj', todayObj);  ///////////////////////////////////

            todayData.push(todayObj);

            console.log('todayData', todayData);  ///////////////////////////////////

            meteoCitiesElement.type = type;
            meteoCitiesElement.datasToDisplay = todayData;
          }         
      })
      .catch(() => {
        loaderElement.classList.add('invisible')          
        meteoSearchElement.errorMessage = errorMessage;
      });
  }

}

export default MeteoWidget