const config = window.__APP_CONFIG__ || { apiBaseUrl: '/api', banner: {} };
const output = document.getElementById('output');
const productsEl = document.getElementById('products');
const bannerEl = document.getElementById('banner');

bannerEl.textContent = `${config.banner.title || 'Docker Swarm Store'} - ${config.banner.message || ''}`;

async function callApi(path, options = {}) {
  const url = `${config.apiBaseUrl}${path}`;
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options });
  const data = await res.json();
  output.textContent = JSON.stringify(data, null, 2);
  return data;
}

async function loadProducts() {
  const data = await callApi('/products');
  const products = data.products || [];
  productsEl.innerHTML = products.map(p => `
    <div class="card">
      <h3>${p.name}</h3>
      <p>SKU: ${p.sku}</p>
      <p>가격: ${p.price}</p>
      <button onclick="addToCart('${p.sku}')">담기</button>
    </div>
  `).join('');
}

async function loadHealth() {
  await callApi('/health');
}

async function addToCart(sku) {
  await callApi('/carts', { method: 'POST', body: JSON.stringify({ sku, qty: 1 }) });
}

async function createOrder() {
  await callApi('/orders', {
    method: 'POST',
    body: JSON.stringify({ customer: 'workbook-user', items: [{ sku: 'SKU-1001', qty: 1 }] })
  });
}

window.loadProducts = loadProducts;
window.loadHealth = loadHealth;
window.addToCart = addToCart;
window.createOrder = createOrder;
