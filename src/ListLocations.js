import React, { Component } from 'react';

class ListLocations extends Component {

	render() {



		return (
			<div className={this.props.menuClass}>
				<div className="filter-wrapper">
					<select defaultValue="exploreAll" onChange={this.props.handleSelectChange} aria-hidden={this.props.ariaHidden}>
						<option value="exploreAll">Explore All</option>
						<option value="art">Art</option>
						<option value="music">Music</option>
						<option value="architecture">Architecture</option>
						<option value="parks">Parks</option>
					</select>
				</div>
				<ul role="menuBar" tabIndex="0"> 
					{this.props.option === null || this.props.option === 'exploreAll' ? // render all menu items if no option is chosen
						this.props.markers.map(marker => (
							<li 
								role="Menuitem"
								tabIndex="0"
								key={`list${marker.id}`}
								data-id={marker.id}
								onMouseOver={this.props.onMouseOverListItem}
								onMouseOut={this.props.onMouseOutofListItem}
								onClick={this.props.onListItemClick}
								className={(+marker.id === +this.props.activeMarkerId || +marker.id === +this.props.markerClickedId) ? // setting the right className for active&clicked menue items
									'red' : 'black'}
							>{marker.title}</li>
						)) : this.props.markers.filter(marker => marker.cat === this.props.option).map(marker => ( // render filtered menu items according to the chosen option
							<li
								role="Menuitem"
								tabIndex="0"
								key={`list${marker.id}`}
								data-id={marker.id}
								onMouseOver={this.props.onMouseOverListItem}
								onMouseOut={this.props.onMouseOutofListItem}
								onClick={this.props.onListItemClick}
								className={(+marker.id === +this.props.activeMarkerId || +marker.id === +this.props.markerClickedId) ? // setting the right className for active&clicked menu items
									'red' : 'black'}
							>{marker.title}</li>
						))
					}
				</ul>
			</div>
		);
	}
}

export default ListLocations;
