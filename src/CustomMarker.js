import React, { Component } from 'react';

class CustomMarker extends Component {

	render() {
		// console.log(this.props);
		return (
			<i
				className={(+this.props.id === +this.props.activeMarkerId || +this.props.id === +this.props.markerClickedId) ? // setting the right className for active&clicked markers
					`${this.props.className} red` : `${this.props.className} black`}
				lat={this.props.lat}
				lng={this.props.lng}
				key={this.props.id}
				data-id={this.props.id}
				onMouseOver={this.props.onMouseOver}
				onMouseOut={this.props.onMouseOut}
				onClick={this.props.onClick}
			></i>
		);
	}
}

export default CustomMarker;