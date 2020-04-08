import styles from './MeteoControls.styles.scss';

const template = document.createElement('template');
template.innerHTML = `
  <style>${styles.toString()}</style>
  <div class="meteo-controls">
    <button class="btn-today">Aujourd'hui</button>
    <button class="btn-forecast">Semaine</button>
  </div>
`;

class MeteoControls extends HTMLElement {

  set type(value) {
    this._type = value;
    this.render();
  }
  
  get type() {
    return this._type;
  }

  constructor() {
    super();

    this._type;

    const shadowDOM = this.attachShadow({ mode: 'open' })

    shadowDOM.appendChild(template.content.cloneNode(true))
  }

  connectedCallback(){

    
    const btnToday = this.shadowRoot.querySelector('.btn-today')
    const btnForecast = this.shadowRoot.querySelector('.btn-forecast')   
  
    btnForecast.addEventListener("click", e => {
      e.preventDefault();

      const forecastEvent = new CustomEvent("forecast", {
        bubbles: true,
        composed: true // Laisse passer l'event à en dehors du périmètre du shadowDOM
      });
      
      this.dispatchEvent(forecastEvent);
    });

    btnToday.addEventListener("click", e => {
      e.preventDefault();

      const searchEvent = new CustomEvent("search", {
        bubbles: true,
        composed: true
      });
      
      this.dispatchEvent(searchEvent);
    });
  }

  render() {
    console.log(this.type);
    const btnToday = this.shadowRoot.querySelector('.btn-today') ///////////////////////////////////////////
    const btnForecast = this.shadowRoot.querySelector('.btn-forecast') /////////////////////////////////////////// 
    
    if (this._type !== 'forecast') {
      btnToday.classList.add('active');
      btnForecast.classList.remove('active');
    } else {
      btnToday.classList.remove('active');
      btnForecast.classList.add('active');
    }
  }

}

export default MeteoControls