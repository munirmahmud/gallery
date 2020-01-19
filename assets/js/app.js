function Gallery(gallery) {
	if (!gallery) {
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
	}

	function closeModal() {
		modal.classList.remove('open');
	}

	function handleClickOutsideModal(e) {
		if (e.target === e.currentTarget) {
			closeModal();
		}
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
	console.log(images);
	modal.addEventListener('click', handleClickOutsideModal);
}

Gallery(document.querySelector('.gallery1'))
Gallery(document.querySelector('.gallery2'))