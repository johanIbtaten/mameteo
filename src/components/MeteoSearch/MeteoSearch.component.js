import styles from './MeteoSearch.styles.scss';
import debounce from '../../utils/utils'

const template = document.createElement('template');
template.innerHTML = `
  <style>${styles.toString()}</style>
  <div class="searchWrapper">    
    <form>
      <label>
        <span>Ville</span>
        <input type="text" placeholder="Ex : Paris ou Paris,US" value=''>
      </label>
      <button type="submit">Voir la météo !</button>
    </form>
  </div>
  <span class="error-message"></span>
`;
class MeteoSearch extends HTMLElement {
  
  set errorMessage(value) {
    this._errorMessage = value;
    this.render();
  }
  
  get errorMessage() {
    return this._errorMessage;
  }

  constructor() {
    super()

    this._searchValue = '';
    this._errorMessageElement;

    this.attachShadow({mode: 'open'});

    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback(){
    const form = this.shadowRoot.querySelector('form')
    const inputSearch = this.shadowRoot.querySelector('form input') 
    this._errorMessageElement = this.shadowRoot.querySelector('.error-message')
    
    inputSearch.focus()   

    console.log(debounce)
    
    inputSearch.addEventListener('keyup', debounce((e) => {

      this._errorMessageElement.style.display = 'none';

      this._searchValue = inputSearch.value;
      
      const searchEvent = new CustomEvent("search", {
        bubbles: true,
        composed: true, // Laisse passer l'event à en dehors du périmètre du shadowDOM
        detail: this._searchValue
      });

      if (this._searchValue != '') {
        this.dispatchEvent(searchEvent);
      } 
    }, 800))

    form.addEventListener("submit", e => {
      e.preventDefault();
    });
  }

  render() {
    this._errorMessageElement.textContent = this._errorMessage
    this._errorMessageElement.style.display = 'inline-block';
  }
}

export default MeteoSearch