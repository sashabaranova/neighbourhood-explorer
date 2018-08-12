import React, { Component } from 'react';
import {Map, InfoWindow, /*Marker,*/ GoogleApiWrapper} from 'google-maps-react';
import Marker from './Marker';

export class MapDisplay extends Component {

  static defaultProps = {
    center: {
      lat : 1.2852096,
      lng : 103.8599263
    },
    zoom: 14,

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
  };

  isHoveredMarker = (activeMarker, marker) => {
    console.log(activeMarker, marker);

    if (typeof activeMarker === 'undefined' || activeMarker === null) {
      return false;
    }

    if (activeMarker.title === marker.title) {
      return true;
    }

    return false;
  }

  render() {

    console.log('MapDisplay render', this.props.activeMarker);

    // const defaultMarker = {
    //   url: 'http://maps.google.com/mapfiles/kml/paddle/wht-stars.png',
    //   scaledSize: new this.props.google.maps.Size(42, 42) 
    // };

    // const hoverMarker = {
    //   url: 'http://maps.google.com/mapfiles/kml/paddle/ltblu-stars.png',
    //   scaledSize: new this.props.google.maps.Size(52, 52) 
    // };

    return (
      // Important! Always set the container height explicitly
      <div className="map-container">
        <Map
          // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
          google={this.props.google}
          initialCenter={this.props.center}
          zoom={this.props.zoom}
          styles={this.props.styles}>
          {this.props.markers.map(marker => (
              <Marker
                title={marker.title}
                className={marker.icon}
                position={marker.location}
                key={marker.title}
                mapCenter={this.props.center}
                map={this.map}
                google={this.props.google}
                icon={ this.isHoveredMarker(this.props.activeMarker, marker) ? hoverMarker : defaultMarker }
                onMouseover={this.props.onMouseoverMarker}
                onMouseout={this.props.onMouseOutOfMarker}/>
            ))
          }

          { /* <InfoWindow></InfoWindow> */ }
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAvUk8FLH0Ys53K2XTdSYRRo5Ik1fiS47I'
})(MapDisplay)