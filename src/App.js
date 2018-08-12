import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import MapDisplay from './MapDisplay';
import ListLocations from './ListLocations';

class App extends Component {

  state = {
    markers: [
      { title: "Statue of Sir Stamford Raffles", location: { lat: 1.2903844, lng: 103.8521383 }, icon: "fas fa-monument" },
      { title: "Esplanade", location: { lat: 1.2897934, lng: 103.8558166 }, icon: "fas fa-theater-masks" },
      { title: "Gardens by the Bay", location: { lat: 1.282917280291502, lng: 103.8649621802915 }, icon: "fas fa-leaf" },
      { title: "One Raffles Place", location: { lat: 1.285536280291502, lng: 103.8524067802915 }, icon: "fas fa-building" },
      { title: "Fort Canning", location: { lat: 1.295860780291502, lng: 103.8471493802915 }, icon: "fas fa-leaf" },
      { title: "Masjid Sultan", location: { lat: 1.302751, lng: 103.8565582 }, icon: "fas fa-university" },
      { title: "Singapore Art Museum", location: { lat: 1.2973126, lng: 103.8488728 }, icon: "fas fa-university" }
    ],
    activeMarker: {},
    selectedPlace: {}
  };

  onMouseoverMarker = (props, marker, e) => {
    if (this.state.activeMarker === null || this.state.activeMarker.title !== marker.title) {
      this.setState({ 
          activeMarker: marker
          //selectedPlace: props
        }
      );
    }

    //console.log('mouse over', this.state.activeMarker);
  };

  onMouseOutOfMarker = (props, marker, e) => {
    this.setState({ activeMarker: null });

    //console.log('mouse out');
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Neighbourhood Explorer</h1>
        </div>

        { /* <ListLocations 
          markers={this.state.markers}
          activeMarker={this.activeMarker}
          onMouseoverMarker={this.onMouseoverMarker}
          onMouseOutOfMarker={this.onMouseOutOfMarker} /> */ }

        <MapDisplay
          markers={this.state.markers}
          activeMarker={this.state.activeMarker}
          onMouseoverMarker={this.onMouseoverMarker}
          onMouseOutOfMarker={this.onMouseOutOfMarker} />
      </div>
    );
  }
}

export default App;
