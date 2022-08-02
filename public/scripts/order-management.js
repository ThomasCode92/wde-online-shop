const FORM_SELECTOR = '.order-actions form';

const updateOrderFormElements = document.querySelectorAll(FORM_SELECTOR);

async function updateOrder(event) {
  event.preventDefault();

  const form = event.target;

  const formData = new FormData(form);
  const newStatus = formData.get('status');
  const orderId = formData.get('orderid');
  const csrfToken = formData.get('_csrf');

  let response;

  try {
    response = await fetch(`/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newStatus: newStatus, _csrf: csrfToken }),
    });
  } catch (error) {
    return alert('Something went wrong - could not update order status.');
  }

  if (!response.ok) {
    return alert('Something went wrong - could not update order status.');
  }

  const responseData = await response.json();

  form.parentElement.parentElement.querySelector('.badge').textContent =
    responseData.newStatus.toUpperCase();
}

for (const updateOrderFormElement of updateOrderFormElements) {
  updateOrderFormElement.addEventListener('submit', updateOrder);
}
