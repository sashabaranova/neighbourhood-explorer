import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';

class ListLocations extends Component {

	render() {
		return (
			<div className="locations-list">
				<div className="filter-input-wrapper">
					<input type="text" placeholder="E.g. music, art, architechture"/>
				</div>
				<ul>
					{this.props.markers.map(marker => (
						<li>{marker.title}</li>
					))}
				</ul>
			</div>
		);
	}
}

export default ListLocations;
