import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';

class ListLocations extends Component {

	render() {

		// this.props.markers.map(marker => console.log(marker.cat));

		return (
			<div className="locations-list">
				<div className="filter-wrapper">
					<select defaultValue="exploreAll" onChange={this.props.handleSelectChange}>
						<option value="exploreAll">Explore All</option>
						<option value="art">Art</option>
						<option value="music">Music</option>
						<option value="architecture">Architecture</option>
						<option value="parks">Parks</option>
					</select>
				</div>
				<ul>
					{this.props.option === null || this.props.option === 'exploreAll' ?
						this.props.markers.map(marker => (
              <li 
								key={`list${marker.id}`}
								data-id={marker.id}
								onMouseOver={this.props.onMouseOverListItem}
								onMouseOut={this.props.onMouseOutofListItem}
								onClick={this.props.onListItemClick}
							>{marker.title}</li>
            )) : this.props.markers.filter(marker => marker.cat === this.props.option).map(marker => (
              <li 
								key={`list${marker.id}`}
								data-id={marker.id}
								onMouseOver={this.props.onMouseOverListItem}
								onMouseOut={this.props.onMouseOutofListItem}
								onClick={this.props.onListItemClick}
							>{marker.title}</li>
            ))
          }
				</ul>
			</div>
		);
	}
}

export default ListLocations;
