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
        <span class="loader"><img src="img/loader.svg" alt="loader"></span>
        </label>
    </form>
  </div>
  <span class="error-message fade-in"></span>
`;
class MeteoSearch extends HTMLElement {
  
  set errorMessage(value) {
    this._errorMessage = value;
    this.render('errors');
  }
  
  get errorMessage() {
    return this._errorMessage;
  }

  set isLoading(value) {
    this._isLoading = value;
    this.render();
  }
  
  get isLoading() {
    return this._isLoading;
  }

  constructor() {
    super()

    this._searchValue = '';
    this._errorMessageElement;
    this._loaderElement;

    this._isLoading = false;

    this.attachShadow({mode: 'open'});

    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback(){
    const form = this.shadowRoot.querySelector('form')
    const inputSearch = this.shadowRoot.querySelector('form input') 
    this._errorMessageElement = this.shadowRoot.querySelector('.error-message')
    this._loaderElement = this.shadowRoot.querySelector('.loader')
    
    inputSearch.focus()   

    console.log(debounce)
    
    inputSearch.addEventListener('keyup', debounce((e) => {

      this._errorMessageElement.style.display = 'none';

      this._searchValue = inputSearch.value;
      
      const searchEvent = new CustomEvent("search", {
        bubbles: true,
        composed: true, // Laisse passer l'event en dehors du périmètre du shadowDOM
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

  render(errors) {
    if (errors) {
      this._errorMessageElement.textContent = this._errorMessage
      this._errorMessageElement.style.display = 'inline-block';
    } else {
      if (this._isLoading) {
        this._loaderElement.classList.remove('invisible')
      } else {
        this._loaderElement.classList.add('invisible')
      }
    }


  }
}

export default MeteoSearch