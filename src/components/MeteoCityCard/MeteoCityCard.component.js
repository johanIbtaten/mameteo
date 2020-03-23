import styles from './MeteoCityCard.styles.scss';

const template = document.createElement('template');
template.innerHTML = `
  <style>${styles.toString()}</style>
  <li class="city-card">
    <h2 class="city-name">
      <span></span>
      <span class="country"></span>
    </h2>
    <div class="city-day"></div>
    <figure>
    ${ /*    
      <img class="city-icon" src="" alt="">
      <img style="width: 80px" class="city-icon-wi" src="" alt="">
      */'' }
    <canvas class="skycon" width="115" height="115"></canvas>
    </figure>
    <div class="city-temp"><span></span></div>
    <div class="city-description"></div>
  </li>
`;

class MeteoCityCard extends HTMLElement {

  set datas(value) {
    this._datas = value;
    this.render();
  }
  
  get datas() {
    return this._datas;
  }

  set type(value) {
    this._type = value; 
  }
  
  get type() {
    return this._type;
  }

  constructor() {
    super()

    const shadowDOM = this.attachShadow({ mode: 'open' })

    shadowDOM.appendChild(template.content.cloneNode(true))
  }
  
  render() {

    // const dictIcon = {
    //   '01d': 'wi-day-sunny',
    //   '02d': 'wi-day-cloudy',
    //   '03d': 'wi-cloud',
    //   '04d': 'wi-cloudy',
    //   '09d': 'wi-showers',
    //   '10d': 'wi-day-rain-mix',
    //   '11d': 'wi-thunderstorm',
    //   '13d': 'wi-snow',
    //   '50d': 'wi-fog',
    //   '01n': 'wi-night-clear',
    //   '02n': 'wi-night-alt-cloudy',
    //   '03n': 'wi-night-alt-cloudy-high',
    //   '04n': 'wi-cloudy',
    //   '09n': 'wi-night-alt-sprinkle',
    //   '10n': 'wi-night-alt-showers',
    //   '11n': 'wi-night-alt-thunderstorm',
    //   '13n': 'wi-night-alt-snow',
    //   '50n': 'wi-night-fog'
    // };  

    const dictSkyIcon = {
      '01d': Skycons.CLEAR_DAY,
      '02d': Skycons.PARTLY_CLOUDY_DAY,
      '03d': Skycons.CLOUDY,
      '04d': Skycons.CLOUDY,
      '09d': Skycons.RAIN,
      '10d': Skycons.RAIN,
      '11d': Skycons.WIND,
      '13d': Skycons.SNOW,
      '50d': Skycons.FOG,
      '01n': Skycons.CLEAR_NIGHT,
      '02n': Skycons.PARTLY_CLOUDY_NIGHT,
      '03n': Skycons.PARTLY_CLOUDY_NIGHT,
      '04n': Skycons.CLOUDY,
      '09n': Skycons.RAIN,
      '10n': Skycons.RAIN,
      '11n': Skycons.WIND,
      '13n': Skycons.SNOW,
      '50n': Skycons.FOG
    };

    console.log('typeCanvas', this._type); ///////////////////////////////////////////

    const canvas = this.shadowRoot.querySelector('canvas')
    if (this._type === 'big-card' ) {
      canvas.setAttribute('width', 175);
      canvas.setAttribute('height', 175);
    } else {
      canvas.setAttribute('width', 115);
      canvas.setAttribute('height', 115);
    }

    this.shadowRoot.querySelector('.city-name span').textContent = this._datas.name
    this.shadowRoot.querySelector('.city-name .country').textContent = this._datas.country
    this.shadowRoot.querySelector('.city-temp span').textContent = Math.round(this._datas.temperature)+'°'
    this.shadowRoot.querySelector('.city-description').textContent = this._datas.description
    this.shadowRoot.querySelector('.city-day').textContent = this._datas.jour

    //this.shadowRoot.querySelector('.city-icon').src = `http://openweathermap.org/img/w/${this._datas.icon}.png`;
    //this.shadowRoot.querySelector('.city-icon').alt = this._datas.description;    
    //this.shadowRoot.querySelector('.city-icon-wi').src = `img/${dictIcon[this._datas.icon]}.svg`;
    //this.shadowRoot.querySelector('.city-icon').alt = this._datas.description;

    var icons = new Skycons({"color": "#FCC418"});
    icons.set(this.shadowRoot.querySelector('.skycon'), dictSkyIcon[this._datas.icon]);
    icons.play();
  }

}

export default MeteoCityCard