function Gallery(gallery) {
	if (!(gallery instanceof Element)) {
		throw new Error('No gallery found');
	}

	// Grab the necessary elements 
	const images = Array.from(gallery.querySelectorAll('img'));
	const modal = document.querySelector('.modal-container');
	const prevButton = modal.querySelector('.prev');
	const nextButton = modal.querySelector('.next');
	let currentImage;

	function openModal() {
		//Check if the modal is already open 
		if (modal.matches('open')) {
			console.info('Modal is already open');
			return;
		}
		modal.classList.add('open');


		window.addEventListener('keydown', handleKeyDown);
		nextButton.addEventListener('click', showNextImage);
		prevButton.addEventListener('click', showPrevImage);
	}

	function closeModal() {
		modal.classList.remove('open');

		window.removeEventListener('keydown', handleKeyDown);
		nextButton.removeEventListener('click', showNextImage);
		prevButton.removeEventListener('click', showPrevImage);
	}

	function handleClickOutsideModal(e) {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	}

	function handleKeyDown(e) {
		if (e.key === 'Escape') return closeModal();
		if (e.key === 'ArrowRight') return showNextImage();
		if (e.key === 'ArrowLeft') return showPrevImage();
	}

	function showNextImage() {
		showImage(currentImage.nextElementSibling || gallery.firstElementChild);
	}

	function showPrevImage() {
		showImage(currentImage.previousElementSibling || gallery.lastElementChild);
	}

	function showImage(el) {
		if (!el) {
			console.info('No image to show');
			return;
		}

		// Update the modal with the new info 
		modal.querySelector('img').src = el.src;
		modal.querySelector('h2').textContent = el.title;
		modal.querySelector('p').textContent = el.dataset.description;
		currentImage = el;

		// Open modal 
		openModal();
	}

	// Event listeners
	images.forEach(image => image.addEventListener('click', e => showImage(e.currentTarget)));
	modal.addEventListener('click', handleClickOutsideModal);

	// Loop over each image
	images.forEach(image => image.addEventListener('keydown', e => {
		//Attach an eventlister for each image
		// When press enter show the modal for the current image
		if (e.key === 'Enter') {
			showImage(e.currentTarget);
		}
	}));
	
}

Gallery(document.querySelector('.gallery1'))
Gallery(document.querySelector('.gallery2'))