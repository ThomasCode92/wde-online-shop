const BTN_SELECTOR = '.product-item button';

const deleteProductBtnElements = document.querySelectorAll(BTN_SELECTOR);

async function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;

  const baseUrl = '/admin/products/' + productId;

  const response = await fetch(baseUrl + '?_csrf=' + csrfToken, {
    method: 'DELETE',
  });

  if (!response.ok) {
    return alert('Something went wrong!');
  }

  // Select & remove the li-element (via DOM traversal)
  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const buttonElements of deleteProductBtnElements) {
  buttonElements.addEventListener('click', deleteProduct);
}
