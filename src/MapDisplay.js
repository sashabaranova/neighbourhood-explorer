import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import CustomMarker from './CustomMarker';


export class MapDisplay extends Component {

  static defaultProps = {
    center: {
      lat : 1.2852096,
      lng : 103.8599263
    },
    zoom: 13,
    options: {
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#444444"
            }
          ]
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [
            {
              color: "#f2f2f2"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [
            {
              saturation: -100
            },
            {
              lightness: 45
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [
            {
              visibility: "simplified"
            }
          ]
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [
            {
              color: "#adb6b7"
            },
            {
              visibility: "on"
            }
          ]
        }
      ]
    }
  };

  

  render() {


    return (
      <div className="map-container">
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={this.props.options}>
          {this.props.option === null || this.props.option === 'exploreAll' ? // render all markers if no option is chosen
            this.props.markers.map(marker => (
              <CustomMarker
                className="fas fa-map-marker-alt"
                lat={marker.location.lat}
                lng={marker.location.lng}
                key={marker.id}
                id={marker.id}
                onMouseOver={this.props.onMouseOverMarker}
                onMouseOut={this.props.onMouseOutOfMarker}
                onClick={this.props.onMarkerClick}
                activeMarkerId={this.props.activeMarkerId}
                markerClickedId={this.props.markerClickedId}
              />
            )) : this.props.markers.filter(marker => marker.cat === this.props.option).map(marker => ( // render filtered menu items according to the chosen option
              <CustomMarker
                className="fas fa-map-marker-alt"
                tabIndex="1"
                lat={marker.location.lat}
                lng={marker.location.lng}
                key={marker.id}
                id={marker.id}
                onMouseOver={this.props.onMouseOverMarker}
                onMouseOut={this.props.onMouseOutOfMarker}
                onClick={this.props.onMarkerClick}
                activeMarkerId={this.props.activeMarkerId}
                markerClickedId={this.props.markerClickedId}
              />
            ))
          }
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapDisplay;