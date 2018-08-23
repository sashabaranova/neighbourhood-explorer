import React, { Component } from 'react';
import Modal from 'react-modal';
// in order to trap focus in the modal window I used react-modal library
// the code below indicates the application id for the content to be hidden from screenreaders and assistive technologies
// when the modal window is open
Modal.setAppElement('#root');
// import Unsplash from 'unsplash-js/native';


class Infobox extends Component {

	state = {
		currentMarkerId: null
	}

	// make fetch request on componentDidMount
	componentDidMount() {
		this.fetchImage();
		this.fetchWikiPage();
	};

	// making sure we re-render the page only if a new marker is clicked
	// NB: it was actually introduced before the current modal window solution
	// (before the infobox did not take the whole window and the user could interact with other markers too)
	// but it might be worth keeping it in case we want to change that
	componentDidUpdate() {
		if (this.state.currentMarkerId !== this.props.markerClickedId) {
			this.fetchImage();
			this.fetchWikiPage();
		}
	};

	// Fetching images from Unsplash
	fetchImage = () => {
		const {markerClickedId, markers} = this.props;
		//storing the value of the current (clicked) marker 
		this.setState({ currentMarkerId: markerClickedId });
		fetch(`https://api.unsplash.com/photos/${markers[markerClickedId - 1].unsplashId}`, {
	    headers: {
	      Authorization: 'Client-ID cb467f56304beb2019bc0b585f76883aba9e5043e7120303fe8293d0582fa1b4'
	    }
		}).then(response => response.json())
		.then(this.loadImage)
		.catch(this.handleError);
	};

	// Fetching a wikipedia article
	fetchWikiPage = () => {
		const {markerClickedId, loadInfoboxSnippet, markers} = this.props;
		//storing the value of the current (clicked) marker 
		this.setState({ currentMarkerId: markerClickedId });
		// console.log('request works!')
		fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${markers[markerClickedId - 1].title}&limit=1&snippet&sectiontitle`).then(function(resp) {
	    // console.log(resp);
	    return resp.json()
		}).then(loadInfoboxSnippet)
		.catch(this.handleError);
	};

	loadImage = (image) => {
		// making sure that there was no error while fetching the image (image will have errors object as value)
		// otherwise we do not load anything
		if (!image.errors) {
			this.props.loadInfoboxImage(image);
		}
		return;
	};


	handleError = (e) => {
		console.log(e);
		if (this.props.image === null && this.props.snippet === null) {
			alert('Oops! There was an error with your request');
		}
	};


	render() {
		const {markerClickedId, markers, image, snippet, wikiUrl, isLoaded, closeModal} = this.props;
		// console.log('infobox render', this.props.isLoaded, this.props.snippet, this.props.image);

		// first checking if we manage to fetch at least an image or a snippet, otherwise we do not render the infowindow
		// and the handleError function shows the error type in an alert
		// in the JSX below more checks are implemented in order to render the right content in defferent scenarios
		// e.g. if we fetch only an image or just a snippet from Wikipedia

		if (snippet === null && image === null) {
			return null
		} else {
			return (
				<div className="infobox-wrapper">
					<Modal 
						className="modal"
						overlayClassName="overlay"
						isOpen={this.props.modalIsOpen}
						onRequestClose={closeModal}
					>
				    <i className="fas fa-times close" 
							onClick={closeModal}
		          aria-label="Close the dialogue window"
	            role="button"
	            tabIndex="0"
	          ></i>
	          <div className="image-wrapper">
	            {isLoaded && image !== null ? (
	              <figure>
	                <img src={image.urls.regular} className="unsplash" alt={`${markers[markerClickedId - 1].title}`}/>
	                <figcaption>Photo by <a href={`https://unsplash.com/@${image.user.username}?utm_source=My_Udaciy_App&utm_medium`}>{image.user.name}</a> on <a href={`https://unsplash.com/?utm_source=My_Udacity_App&utm_medium=referral`}>Unsplash</a>
	                </figcaption>
	              </figure>
	              ) : (isLoaded && image === null && snippet !== null ? (
	              		<p className="error-message">Sorry, no picture is available.</p>
	              	) : null
	              )
	            }
	          </div>
	          <h2>{markers[markerClickedId - 1].title}</h2>
	          {snippet !== undefined && snippet !== null ? (
	          	<div>
			          <p className="snippet">{snippet}</p>
			          <p className="wiki-ref">Read the rest on <a href={wikiUrl} aria-label="Read the rest of the article">Wikipedia</a></p>
			         </div>
		         	) : (
		         		<p className="snippet">Sorry, no information is available.</p>
		         	)
	        	}
					</Modal>
				</div>
	    );
	  }
	}
}

export default Infobox;