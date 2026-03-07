const form = document.getElementById('newsletter-form');
const successMsg = document.getElementById('newsletter-success');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    });

    if (res.ok) {
      form.classList.add('hidden');
      successMsg.classList.remove('hidden');
    } else {
      console.error('Form submission failed', res.status);
    }
  } catch (err) {
    console.error('Network error', err);
  }
});
