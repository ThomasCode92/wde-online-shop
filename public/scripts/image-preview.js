const IMAGE_PICKER_SELECTOR = '#image-upload-control input';
const IMAGE_PREVIEW_SELECTOR = '#image-upload-control img';

const imagePickerElement = document.querySelector(IMAGE_PICKER_SELECTOR);
const imagePreviewElement = document.querySelector(IMAGE_PREVIEW_SELECTOR);

function updateImagePreview() {
  const files = imagePickerElement.files;

  if (!files || files.length === 0) {
    imagePreviewElement.style.display = 'none';
    return;
  }

  const pickedFile = files[0];

  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewElement.style.display = 'block';
}

imagePickerElement.addEventListener('change', updateImagePreview);
