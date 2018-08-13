import React, { Component } from 'react';

class CustomMarker extends Component {

	render() {
		return (
			<i
        className="fas fa-map-marker-alt"
        lat={this.props.lat}
        lng={this.props.lng}
        key={this.props.id}
        id={this.props.id}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
			></i>
		);
	}
}

export default CustomMarker;