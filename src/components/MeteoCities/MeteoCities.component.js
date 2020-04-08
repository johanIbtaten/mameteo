import styles from './MeteoCities.styles.scss';

const template = document.createElement('template');
template.innerHTML = `
  <style>${styles.toString()}</style>
  <ul class="cities">    
    <slot />
  </ul>
`;

class MeteoCities extends HTMLElement {

  set datasToDisplay(value) {
    this._datasToDisplay = value;   
    this.renderForecast();
  }
  
  get datasToDisplay() {
    return this._datasToDisplay;
  }

  set type(value) {
    this._type = value; 
  }
  
  get type() {
    return this._type;
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  renderForecast() {
    console.log('type', this._type);  ///////////////////////////////////
    console.log('renderForecast', this._datasToDisplay); ///////////////////////////////////

    this.innerHTML = '';

    this._type = (this._type === 'forecast') ? 'small-card' : 'big-card';

    this._datasToDisplay.forEach( (item, index) => {     
      const card = document.createElement('meteo-city-card');
      card.classList.add('fadein');
      card.classList.add(this._type);
      card.classList.add(`card-${index}`);
      card.type = this._type;
      card.datas = item;
      this.appendChild(card);
    })
  }

}

export default MeteoCities