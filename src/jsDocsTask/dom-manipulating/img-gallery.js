const form = document.getElementById('addImageForm');
const galleryContainer = document.getElementById('galleryContainer');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.getElementById('closeLightbox');

form.addEventListener('submit', ev =>{
    ev.preventDefault();

    const imageUrl = document.getElementById('imageUrl').value;
    const imageDescription = document.getElementById('imageDescription').value;

    if (imageUrl && imageDescription) {
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl; 
        imgElement.alt = imageDescription; 

        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'image-wrapper';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () =>imageWrapper.remove() );

        imgElement.addEventListener('click', () =>{
            lightboxImg.src = imgElement.src;
            lightbox.classList.remove('hidden');
        });

        imageWrapper.append(deleteButton);
        imageWrapper.append(imgElement);

        galleryContainer.append(imageWrapper);

        form.reset();
    }
});

closeLightbox.addEventListener('click', () =>{
    lightbox.classList.add('hidden');
});
