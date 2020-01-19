function Gallery(gallery) {
	if (!gallery) {
		throw new Error('No gallery found');
	}

	// Grab the necessary elements 
	const images = Array.from(gallery.querySelectorAll('img'));
	const modal = document.querySelector('.modal-container');
	const prevButton = modal.querySelector('.prev');
	const nextButton = modal.querySelector('.next');

	function showImage(el) {
		if (!el) {
			console.info('No image to show');
			return;
		}

		// Update the modal with the new info 
		modal.querySelector('img').src = el.src;
		modal.querySelector('h2').textContent = el.title;
		modal.querySelector('p').textContent = el.dataset.description;

	}

	images.forEach(image => image.addEventListener('click', e => showImage(e.currentTarget)));
	console.log(images)
}

Gallery(document.querySelector('.gallery1'))
Gallery(document.querySelector('.gallery2'))