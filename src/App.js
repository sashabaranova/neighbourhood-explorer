import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import MapDisplay from './MapDisplay';
import ListLocations from './ListLocations';
import Infobox from './Infobox';

class App extends Component {

  state = {

    // set of hardcoded markers
    markers: [
      { id: 1, title: 'Buddha Tooth Relic Temple', location: { lat: 1.2815014, lng: 103.8420485 }, cat: 'art', unsplashId: 'JH8YVV39R74' },
      { id: 2, title: 'Esplanade', location: { lat: 1.2897934, lng: 103.8558166 }, cat: 'music', unsplashId: 'pJ3O3NZc22s' },
      { id: 3, title: 'Gardens by the Bay', location: { lat: 1.282917280291502, lng: 103.8649621802915 }, cat: 'parks', unsplashId: '4HVCsDOg0qI' },
      { id: 4, title: 'Merlion Park', location: { lat: 1.2866996, lng: 103.8521297 }, cat: 'parks', unsplashId: 'HA1jee1s9qg' },
      { id: 5, title: 'National Stadium, Singapore', location: { lat: 1.3040184, lng: 103.8726539 }, cat: 'architecture', unsplashId: 'cTO6DWSIdWI' },
      { id: 6, title: 'ArtScience Museum', location: { lat: 1.2862792, lng: 103.8570776 }, cat: 'art', unsplashId: 'WNk-f-TnZDw' }
    ],

    // storing id of a hovered marker
    activeMarkerId: null,
    // storing id of a clicked marker
    markerClickedId: null,
    //storing the chosen select option
    option: null,
    // if fetch request was successful
    isLoaded: false,
    // storing the fetched image object
    image: null,
    // storing the fetched wiki snippet
    snippet: null,
    // storing the fetched wiki url
    wikiUrl: null,
    // storing the class name of the navigation menu
    menuClass: 'locations-list',
    // whether the marker/menu item is clicked
    isClicked: false, 
    // if the modal winfow is open
    modalIsOpen: false
  };

  // handles the select input changes; is passed to ListLocations
  handleSelectChange = (e) => {
    this.setState({ option: e.target.value });
    // console.log(e.target.value);
  };


  // this function handles mouse over events both for navigation menu items and markers
  onMouseOverItem = (e) => {
    // console.log(e.target.dataset);
    if (this.state.activeMarkerId === null || this.state.activeMarkerId !== e.target.dataset.id) {
      this.setState({ activeMarkerId: e.target.dataset.id });

      // console.log(e.target.style, this.state.activeMarkerId);
    }

  //   //console.log('mouse over', this.state.activeMarker);
  };

  // this function handles mouse out of elements events both for navigation menu items and markers
  onMouseOutOfItem = (e) => {

    this.setState({ activeMarkerId: null });

    // console.log('mouse out');
  };

  // this function handles mouse click events both for navigation menu items and markers.
  // Basically, it opens the modal by changing isModal to true
  onItemClick = (e) => {

    // console.log(this.state.image);

    if (this.state.markerClickedId === null || this.state.markerClickedId !== e.target.dataset.id) {
      this.setState({ markerClickedId: e.target.dataset.id, activeMarkerId: null, isLoaded: false, modalIsOpen: true });
    }
    // console.log(this.state.modalIsOpen);
  };

  // function that closes the modal window

  closeModal = (e) => {
    // console.log(this.state.modalIsOpen)
    if (this.state.markerClickedId !== null) {
      this.setState({ markerClickedId: null, modalIsOpen: false });
    }
  };

  // the two functions below are responsible for setting the state with values from fetched responses from Wiki and Unsplash

  loadInfoboxImage = (img) => {
    // console.log(data.results[0]);
    this.setState({ isLoaded: true, image: img })
  };

  loadInfoboxSnippet = (data) => {
    this.setState({ snippet: data[2][0], wikiUrl: data[3][0] })
  };

  // handles the click on the hamburger menu icon for small screen sizes
  // .open triggers a dropdownlist which is displayed. By default the menu is hidden
  onHamClick = () => {
    // console.log(this.state.isClicked);
    if (!this.state.isClicked) {
      this.setState({ isClicked: true, menuClass: 'locations-list open' })
    } else {
      this.setState({ isClicked: false, menuClass: 'locations-list' })
    }
  }


  render() {
    // console.log(this.state.activeMarkerId, this.state.markerClickedId)
    return (
      <div className="App">
        <div className="header">
          <i className="fas fa-bars hamburger"
            onClick={this.onHamClick}
            role="Button"
            tabIndex="0"
          ></i>
          <a href="./">
            <h1
              onClick={this.onAppClick}
            >Neighbourhood Explorer</h1>
          </a>
          <ListLocations 
            markers={this.state.markers}
            onMouseOverListItem={this.onMouseOverItem}
            onMouseOutofListItem={this.onMouseOutOfItem}
            onListItemClick={this.onItemClick}
            activeMarkerId={this.state.activeMarkerId}
            markerClickedId={this.state.markerClickedId}
            handleSelectChange={this.handleSelectChange}
            option={this.state.option}
            menuClass={this.state.menuClass}
          />
        </div>
        <MapDisplay
          markers={this.state.markers}
          onMouseOverMarker={this.onMouseOverItem}
          onMouseOutOfMarker={this.onMouseOutOfItem}
          onMarkerClick={this.onItemClick}
          activeMarkerId={this.state.activeMarkerId}
          markerClickedId={this.state.markerClickedId}
          option={this.state.option}
          />
        {this.state.markerClickedId != null ? (
          <Infobox 
            markers={this.state.markers}
            markerClickedId={this.state.markerClickedId}
            isLoaded={this.state.isLoaded}
            image={this.state.image}
            loadInfoboxImage={this.loadInfoboxImage}
            loadInfoboxSnippet={this.loadInfoboxSnippet}
            snippet={this.state.snippet}
            wikiUrl={this.state.wikiUrl}
            closeModal={this.closeModal}
            modalIsOpen={this.state.modalIsOpen}
          />  
        ): null
        } 
      </div>
    );
  }
}

export default App;
