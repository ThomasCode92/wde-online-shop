const FORM_SELECTOR = '.cart-item-management';
const TOTAL_PRICE_SELECTOR = 'cart-total-price';
const BADGE_SELECTOR = '.nav-items .badge';

const cartItemUpdateFormElements = document.querySelectorAll(FORM_SELECTOR);
const cartTotalPriceElement = document.getElementById(TOTAL_PRICE_SELECTOR);
const cartBadge = document.querySelector(BADGE_SELECTOR);

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

  if (responseData.updatedCartData.updatedItemPrice === 0) {
    form.parentElement.parentElement.remove();
  } else {
    const cartItemTotalPriceElement =
      form.parentElement.querySelector('.cart-item-price');

    cartItemTotalPriceElement.textContent =
      '$' + responseData.updatedCartData.updatedItemPrice.toFixed(2);
  }

  cartTotalPriceElement.textContent =
    '$' + responseData.updatedCartData.newTotalPrice.toFixed(2);

  cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener('submit', updateCartItem);
}
