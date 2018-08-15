import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import MapDisplay from './MapDisplay';
import ListLocations from './ListLocations';

class App extends Component {

  state = {
    markers: [
      { id: 1, title: "Statue of Sir Stamford Raffles", location: { lat: 1.2903844, lng: 103.8521383 }, /*icon: "fas fa-monument"*/ },
      { id: 2, title: "Esplanade", location: { lat: 1.2897934, lng: 103.8558166 }, /*icon: "fas fa-theater-masks"*/ },
      { id: 3, title: "Gardens by the Bay", location: { lat: 1.282917280291502, lng: 103.8649621802915 }, /*icon: "fas fa-leaf"*/ },
      { id: 4, title: "One Raffles Place", location: { lat: 1.285536280291502, lng: 103.8524067802915 }, /*icon: "fas fa-building"*/ },
      { id: 5, title: "Fort Canning", location: { lat: 1.295860780291502, lng: 103.8471493802915 }, /*icon: "fas fa-leaf"*/ },
      { id: 6, title: "Masjid Sultan", location: { lat: 1.302751, lng: 103.8565582 }, /*icon: "fas fa-university"*/ },
      { id: 7, title: "Singapore Art Museum", location: { lat: 1.2973126, lng: 103.8488728 }, /*icon: "fas fa-university"*/ }
    ],

    activeMarkerId: null,
    markerClickedId: null
  };


  onMouseOverItem = (e) => {
    console.log(e.target);
    if (this.state.activeMarkerId === null || this.state.activeMarkerId !== e.target.dataset.id) {
      this.setState({ activeMarkerId: e.target.dataset.id});

      // console.log(e.target.style, this.state.activeMarkerId);
    }

  //   //console.log('mouse over', this.state.activeMarker);
  };

  onMouseOutOfItem = (e) => {

    this.setState({ activeMarkerId: null });

    console.log('mouse out');
  };

  onItemClick = (e) => {
    console.log(e.target);
    if (this.state.markerClickedId === null || this.state.markerClickedId !== e.target.dataset.id) {
      this.setState({ markerClickedId: e.target.dataset.id, activeMarkerId: null });
    }
    console.log('click');
  };

  onAppClick = (e) => {
    if (this.state.markerClickedId !== null) {
      this.setState({ markerClickedId: null });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1
            onClick={this.onAppClick}
          >Neighbourhood Explorer</h1>
          <ListLocations 
            markers={this.state.markers}
            onMouseOverListItem={this.onMouseOverItem}
            onMouseOutofListItem={this.onMouseOutOfItem}
            onListItemClick={this.onItemClick}
            activeMarkerId={this.state.activeMarkerId}
            markerClickedId={this.state.markerClickedId}
            onAppClick={this.onAppClick}
          />
        </div>
        <MapDisplay
          markers={this.state.markers}
          onMouseOverMarker={this.onMouseOverItem}
          onMouseOutOfMarker={this.onMouseOutOfItem}
          onMarkerClick={this.onItemClick}
          activeMarkerId={this.state.activeMarkerId}
          markerClickedId={this.state.markerClickedId}
          onAppClick={this.onAppClick}
          />
        {this.state.markerClickedId != null ? (
          <div
            className="infobox">
            {this.state.markers[this.state.markerClickedId - 1].title}
          </div>): null
        } 
      </div>
    );
  }
}

export default App;
