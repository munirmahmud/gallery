function Gallery(gallery) {
	if (!(gallery instanceof Element)) {
		throw new Error('No gallery found');
	}

	this.gallery = gallery;

	// Bind methods to the instance to get the exact object
	this.handleKeyDown = this.handleKeyDown.bind(this);
	this.showNextImage = this.showNextImage.bind(this);
	this.showPrevImage = this.showPrevImage.bind(this);

	// Grab the necessary elements 
	this.images = Array.from(gallery.querySelectorAll('img'));
	this.modal = document.querySelector('.modal-container');
	this.prevButton = this.modal.querySelector('.prev');
	this.nextButton = this.modal.querySelector('.next');

	// Event listeners
	this.images.forEach(image => image.addEventListener('click', e => this.showImage(e.currentTarget)));
	this.modal.addEventListener('click', this.handleClickOutsideModal.bind(this));

	// Loop over each image
	this.images.forEach(image => image.addEventListener('keydown', e => {
		//Attach an eventlister for each image
		// When press enter show the modal for the current image
		if (e.key === 'Enter') {
			this.showImage(e.currentTarget);
		}
	}));
	
}


// Gallery Prototypes 
Gallery.prototype.openModal = function() {
	//Check if the modal is already open 
	if (this.modal.matches('open')) {
		console.info('Modal is already open');
		return;
	}
	this.modal.classList.add('open');


	window.addEventListener('keydown', this.handleKeyDown);
	this.nextButton.addEventListener('click', this.showNextImage);
	this.prevButton.addEventListener('click', this.showPrevImage);
};

Gallery.prototype.closeModal = function() {
	this.modal.classList.remove('open');

	window.removeEventListener('keydown', this.handleKeyDown);
	this.nextButton.removeEventListener('click', this.showNextImage);
	this.prevButton.removeEventListener('click', this.showPrevImage);
};

Gallery.prototype.handleClickOutsideModal = function(e) {
	if (e.target === e.currentTarget) {
		this.closeModal();
	}
};

Gallery.prototype.handleKeyDown = function(e) {
	if (e.key === 'Escape') return this.closeModal();
	if (e.key === 'ArrowRight') return this.showNextImage();
	if (e.key === 'ArrowLeft') return this.showPrevImage();
};

Gallery.prototype.showNextImage = function() {
	this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementChild);
};

Gallery.prototype.showPrevImage = function() {
	this.showImage(this.currentImage.previousElementSibling || this.gallery.lastElementChild);
};

Gallery.prototype.showImage = function(el) {
	if (!el) {
		console.info('No image to show');
		return;
	}

	// Update the modal with the new info 
	this.modal.querySelector('img').src = el.src;
	this.modal.querySelector('h2').textContent = el.title;
	this.modal.querySelector('p').textContent = el.dataset.description;
	this.currentImage = el;

	// Open modal 
	this.openModal();
};

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));