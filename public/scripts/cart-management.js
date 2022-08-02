const BTN_SELECTOR = '#product-details button';
const BADGE_SELECTOR = '.nav-items .badge';

const addToCartBtnElement = document.querySelector(BTN_SELECTOR);
const cartBadgeElements = document.querySelectorAll(BADGE_SELECTOR);

async function addToCart() {
  const productId = addToCartBtnElement.dataset.productid;
  const csrfToken = addToCartBtnElement.dataset.csrf;

  let response;

  try {
    response = await fetch('/cart/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: productId, _csrf: csrfToken }),
    });
  } catch (error) {
    return alert('Something went wrong!');
  }

  if (!response.ok) {
    return alert('Something went wrong!');
  }

  const responseData = await response.json();
  const newTotalQuantity = responseData.newTotalItems;

  for (const cartBadgeElement of cartBadgeElements) {
    cartBadgeElement.textContent = newTotalQuantity;
  }
}

addToCartBtnElement.addEventListener('click', addToCart);
