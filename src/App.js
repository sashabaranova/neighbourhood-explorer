import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import MapDisplay from './MapDisplay';
import ListLocations from './ListLocations';
import Infobox from './Infobox';

class App extends Component {

  state = {
    markers: [
      { id: 1, title: 'Buddha Tooth Relic Temple', location: { lat: 1.2815014, lng: 103.8420485 }, cat: 'art', unsplashId: 'JH8YVV39R74' },
      { id: 2, title: 'Esplanade', location: { lat: 1.2897934, lng: 103.8558166 }, cat: 'music', unsplashId: 'pJ3O3NZc22s' },
      { id: 3, title: 'Gardens by the Bay', location: { lat: 1.282917280291502, lng: 103.8649621802915 }, cat: 'parks', unsplashId: '4HVCsDOg0qI' },
      { id: 4, title: 'Merlion Park', location: { lat: 1.2866996, lng: 103.8521297 }, cat: 'parks', unsplashId: 'HA1jee1s9qg' },
      { id: 5, title: 'National Stadium, Singapore', location: { lat: 1.3040184, lng: 103.8726539 }, cat: 'architecture', unsplashId: 'cTO6DWSIdWI' },
      { id: 6, title: 'ArtScience Museum', location: { lat: 1.2862792, lng: 103.8570776 }, cat: 'art', unsplashId: 'WNk-f-TnZDw' }
    ],

    activeMarkerId: null,
    markerClickedId: null,
    option: null,
    error: null,
    isLoaded: false,
    image: null,
    snippet: null,
    wikiUrl: null,
    menuClass: 'locations-list',
    isClicked: false, 
    modalIsOpen: false
  };

  handleSelectChange = (e) => {
    this.setState({ option: e.target.value });
    // console.log(e.target.value);
  };



  onMouseOverItem = (e) => {
    // console.log(e.target.dataset);
    if (this.state.activeMarkerId === null || this.state.activeMarkerId !== e.target.dataset.id) {
      this.setState({ activeMarkerId: e.target.dataset.id });

      // console.log(e.target.style, this.state.activeMarkerId);
    }

  //   //console.log('mouse over', this.state.activeMarker);
  };

  onMouseOutOfItem = (e) => {

    this.setState({ activeMarkerId: null });

    // console.log('mouse out');
  };

  onItemClick = (e) => {

    console.log(this.state.image);

    if (this.state.markerClickedId === null || this.state.markerClickedId !== e.target.dataset.id) {
      this.setState({ markerClickedId: e.target.dataset.id, activeMarkerId: null, isLoaded: false, modalIsOpen: true });
    }
    console.log(this.state.modalIsOpen);
  };

  closeModal = (e) => {
    console.log(this.state.modalIsOpen)
    // if (this.state.isLoaded) {
    //   this.setState({ isLoaded: false, image: null })
    // }
    if (this.state.markerClickedId !== null) {
      this.setState({ markerClickedId: null, modalIsOpen: false });
    }
  };

  loadInfoboxImage = (img) => {
    // console.log(data.results[0]);
    this.setState({ isLoaded: true, image: img })
  };

  loadInfoboxSnippet = (data) => {
    this.setState({ snippet: data[2][0], wikiUrl: data[3][0] })
  };

  onHamClick = () => {
    console.log(this.state.isClicked);
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
