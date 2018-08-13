import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import CustomMarker from './CustomMarker';


export class MapDisplay extends Component {

  static defaultProps = {
    center: {
      lat : 1.2852096,
      lng : 103.8599263
    },
    zoom: 14,
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

  // isHoveredMarker = (activeMarker, marker) => {
  //   console.log(activeMarker, marker);

  //   if (typeof activeMarker === 'undefined' || activeMarker === null) {
  //     return false;
  //   }

  //   if (activeMarker.title === marker.title) {
  //     return true;
  //   }

  //   return false;
  // }

  // onMouseOverMarker = (e) => {

  // };

  render() {


    return (
      // Important! Always set the container height explicitly
      <div className="map-container">
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={this.props.options}>
            {this.props.markers.map(marker => (
              <CustomMarker
                className="fas fa-map-marker-alt"
                lat={marker.location.lat}
                lng={marker.location.lng}
                key={marker.id}
                id={marker.id}
                onMouseOver={this.props.onMouseOverMarker}
                onMouseOut={this.props.onMouseOutOfMarker}
              />
            ))
          }
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapDisplay;