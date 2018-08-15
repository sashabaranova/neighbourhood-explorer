import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';

class ListLocations extends Component {

	render() {

		// this.props.markers.map(marker => console.log(marker.id));

		console.log(this.props);
		return (
			<div className="locations-list">
				<div className="filter-input-wrapper">
					<input type="text" placeholder="E.g. music, art, architechture"/>
				</div>
				<ul>
					{this.props.markers.map(marker => (
						<li 
							key={`list${marker.id}`}
							data-id={marker.id}
							onMouseOver={this.props.onMouseOverListItem}
							onMouseOut={this.props.onMouseOutofListItem}
							onClick={this.props.onListItemClick}
						>{marker.title}</li>
					))}
				</ul>
			</div>
		);
	}
}

export default ListLocations;
