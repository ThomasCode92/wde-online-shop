const FROM_SELECTOR = '.cart-item-management';

const cartItemUpdateFormElements = document.querySelectorAll(FROM_SELECTOR);

async function updateCartItem(event) {
  event.preventDefault();

  const form = event.target;
  const input = form.firstElementChild;

  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = input.value;

  let response;

  try {
    response = await fetch('/cart/items', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
    });
  } catch (error) {
    return alert('Something went wrong!');
  }

  if (!response.ok) {
    return alert('Something went wrong!');
  }

  const responseData = await response.json();
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener('submit', updateCartItem);
}
