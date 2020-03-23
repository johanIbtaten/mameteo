import './img/loader.svg';

import MeteoWidget from './components/MeteoWidget/MeteoWidget.component'
import MeteoSearch from './components/MeteoSearch/MeteoSearch.component'
import MeteoControls from './components/MeteoControls/MeteoControls.component'
import MeteoCities from './components/MeteoCities/MeteoCities.component'
import MeteoCityCard from './components/MeteoCityCard/MeteoCityCard.component'

customElements.define('meteo-widget', MeteoWidget)
customElements.define('meteo-search', MeteoSearch)
customElements.define('meteo-controls', MeteoControls)
customElements.define('meteo-cities', MeteoCities)
customElements.define('meteo-city-card', MeteoCityCard)


// import './img/loader.svg';

// import MeteoWidget from './lib/MeteoWidget.component'
// import MeteoSearch from './lib/MeteoSearch.component'
// import MeteoControls from './lib/MeteoControls.component'
// import MeteoCities from './lib/MeteoCities.component'
// import MeteoCityCard from './lib/MeteoCityCard.component'

// customElements.define('meteo-widget', MeteoWidget)
// customElements.define('meteo-search', MeteoSearch)
// customElements.define('meteo-controls', MeteoControls)
// customElements.define('meteo-cities', MeteoCities)
// customElements.define('meteo-city-card', MeteoCityCard)