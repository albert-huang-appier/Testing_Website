const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const yearEl = document.getElementById('year');
const demoToast = document.getElementById('demoToast');

const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const sortSelect = document.getElementById('sortSelect');
const productGrid = document.getElementById('productGrid');
const statProducts = document.getElementById('statProducts');
const randomPick = document.getElementById('randomPick');

const productModal = document.getElementById('productModal');
const productModalContent = document.getElementById('productModalContent');

const cartToggle = document.getElementById('cartToggle');
const cartClose = document.getElementById('cartClose');
const cartDrawer = document.getElementById('cartDrawer');
const drawerBackdrop = document.getElementById('drawerBackdrop');
const cartItemsEl = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');

const promoInput = document.getElementById('promoInput');
const promoStatus = document.getElementById('promoStatus');
const applyPromoBtn = document.getElementById('applyPromo');
const subtotalEl = document.getElementById('subtotal');
const discountEl = document.getElementById('discount');
const shippingEl = document.getElementById('shipping');
const totalEl = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');

const THEME_KEY = 'site-theme';
const CART_KEY = 'shop-cart-v1';
const PROMO_KEY = 'shop-promo-v1';

function money(n) {
  return `$${n.toFixed(2)}`;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function makeImageDataUri(label, bg = '#2563eb') {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${bg}" stop-opacity="0.95"/>
        <stop offset="1" stop-color="#0f172a" stop-opacity="0.35"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="900" fill="url(#g)"/>
    <circle cx="980" cy="220" r="180" fill="rgba(255,255,255,0.08)"/>
    <circle cx="260" cy="720" r="260" fill="rgba(255,255,255,0.06)"/>
    <text x="60" y="130" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="64" fill="rgba(255,255,255,0.92)" font-weight="800">${escapeHtml(
      label
    )}</text>
    <text x="60" y="200" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="28" fill="rgba(255,255,255,0.8)" font-weight="600">Testing Shop</text>
  </svg>`;
  const encoded = encodeURIComponent(svg).replaceAll('%0A', '').replaceAll('%20', ' ');
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}

const PRODUCTS = [
  {
    id: 'tee-1',
    name: 'Everyday Tee',
    category: 'Apparel',
    price: 18,
    rating: 4.6,
    color: '#2563eb',
    description: 'Soft, breathable tee for daily wear. Looks great tucked or untucked.'
  },
  {
    id: 'hoodie-1',
    name: 'Cloud Hoodie',
    category: 'Apparel',
    price: 48,
    rating: 4.8,
    color: '#7c3aed',
    description: 'Heavyweight comfort with a clean silhouette. Your new go-to layer.'
  },
  {
    id: 'mug-1',
    name: 'Ceramic Mug',
    category: 'Home',
    price: 14,
    rating: 4.4,
    color: '#16a34a',
    description: 'Classic mug for coffee, tea, or late-night debugging.'
  },
  {
    id: 'bottle-1',
    name: 'Stainless Bottle',
    category: 'Home',
    price: 26,
    rating: 4.7,
    color: '#0ea5e9',
    description: 'Keeps drinks cold (or hot) for hours. Minimal, durable, leak resistant.'
  },
  {
    id: 'mousepad-1',
    name: 'Desk Mousepad',
    category: 'Workspace',
    price: 22,
    rating: 4.5,
    color: '#f59e0b',
    description: 'Smooth glide + grippy base. A subtle upgrade for your setup.'
  },
  {
    id: 'notebook-1',
    name: 'Dot Grid Notebook',
    category: 'Workspace',
    price: 12,
    rating: 4.3,
    color: '#ef4444',
    description: 'For sketches, todos, and ideas. Dot grid makes everything look nicer.'
  },
  {
    id: 'cap-1',
    name: 'Weekend Cap',
    category: 'Apparel',
    price: 20,
    rating: 4.2,
    color: '#475569',
    description: 'Low-profile cap with an adjustable strap. Easy, casual, clean.'
  },
  {
    id: 'lamp-1',
    name: 'Warm Desk Lamp',
    category: 'Workspace',
    price: 34,
    rating: 4.1,
    color: '#ec4899',
    description: 'Warmer light for a cozier workspace. Great for evenings.'
  }
].map((p) => ({
  ...p,
  image: makeImageDataUri(p.name, p.color),
  featuredRank: Math.round((5 - p.rating) * 10 + p.price)
}));

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function toggleTheme() {
  const current = root.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

function showToast(message) {
  // Minimal unobtrusive toast
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.className = 'toast';
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 2000);
}

function initYear() {
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initTheme() {
  setTheme(getPreferredTheme());
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

function initDemoToast() {
  if (!demoToast) return;
  demoToast.addEventListener('click', () => showToast('This is a demo toast.'));
}

function getFilters() {
  const q = (searchInput?.value || '').trim().toLowerCase();
  const cat = categorySelect?.value || 'all';
  const sort = sortSelect?.value || 'featured';
  return { q, cat, sort };
}

function sortProducts(items, sort) {
  const arr = [...items];
  if (sort === 'price-asc') arr.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') arr.sort((a, b) => b.price - a.price);
  else if (sort === 'rating-desc') arr.sort((a, b) => b.rating - a.rating);
  else arr.sort((a, b) => a.featuredRank - b.featuredRank);
  return arr;
}

function renderProducts() {
  if (!productGrid) return;
  const { q, cat, sort } = getFilters();
  const filtered = PRODUCTS.filter((p) => {
    const matchesQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    const matchesCat = cat === 'all' || p.category === cat;
    return matchesQuery && matchesCat;
  });
  const sorted = sortProducts(filtered, sort);
  productGrid.innerHTML = sorted
    .map((p) => {
      return `
        <article class="tile product" data-product-id="${escapeHtml(p.id)}">
          <button class="product-media" type="button" data-action="details" aria-label="View details for ${escapeHtml(
            p.name
          )}">
            <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy" />
          </button>
          <div class="product-body">
            <h3 class="product-title">${escapeHtml(p.name)}</h3>
            <div class="meta-row">
              <span class="price">${money(p.price)}</span>
              <span class="rating" aria-label="Rating ${p.rating} out of 5">★ ${p.rating.toFixed(1)}</span>
            </div>
            <p class="muted small-note">${escapeHtml(p.category)}</p>
            <div class="product-actions">
              <button class="button small" type="button" data-action="details">Details</button>
              <button class="button small primary" type="button" data-action="add">Add to cart</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  if (sorted.length === 0) {
    productGrid.innerHTML = `<div class="tile"><h3>No results</h3><p class="muted">Try a different search or category.</p></div>`;
  }
}

function initCategories() {
  if (!categorySelect) return;
  const cats = Array.from(new Set(PRODUCTS.map((p) => p.category))).sort();
  categorySelect.innerHTML = [`<option value="all">All</option>`]
    .concat(cats.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`))
    .join('');
}

function openProductModal(product) {
  if (!productModal || !productModalContent) return;
  productModalContent.innerHTML = `
    <div class="modal-media">
      <img src="${product.image}" alt="${escapeHtml(product.name)}" />
    </div>
    <div class="modal-details">
      <h3>${escapeHtml(product.name)}</h3>
      <div class="pill-row">
        <span class="pill">${escapeHtml(product.category)}</span>
        <span class="pill">★ ${product.rating.toFixed(1)}</span>
        <span class="pill">${money(product.price)}</span>
      </div>
      <p>${escapeHtml(product.description)}</p>
      <div class="product-actions" style="margin-top: 1rem;">
        <button class="button primary" type="button" data-action="add-from-modal" data-product-id="${escapeHtml(
          product.id
        )}">Add to cart</button>
        <button class="button" type="button" data-action="open-cart">Open cart</button>
      </div>
    </div>
  `;
  productModal.showModal();
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed;
  } catch {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartCount(cart) {
  return Object.values(cart).reduce((sum, n) => sum + Number(n || 0), 0);
}

function getCartItems(cart) {
  return Object.entries(cart)
    .map(([id, qty]) => {
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) return null;
      return { product, qty: Number(qty || 0) };
    })
    .filter(Boolean);
}

function loadPromo() {
  return (localStorage.getItem(PROMO_KEY) || '').trim().toUpperCase();
}

function savePromo(code) {
  localStorage.setItem(PROMO_KEY, code);
}

function computeTotals(cart, promoCode) {
  const items = getCartItems(cart);
  const subtotal = items.reduce((sum, it) => sum + it.product.price * it.qty, 0);

  const promo = (promoCode || '').toUpperCase().trim();
  const discountRate = promo === 'WELCOME10' ? 0.1 : 0;
  const discount = subtotal * discountRate;

  const shipping = subtotal - discount >= 50 || subtotal === 0 ? 0 : 6;
  const total = Math.max(0, subtotal - discount + shipping);

  return { subtotal, discount, shipping, total, appliedPromo: discountRate ? promo : '' };
}

function renderCart() {
  const cart = loadCart();
  const promo = loadPromo();
  const items = getCartItems(cart);
  const count = getCartCount(cart);

  if (cartCountEl) cartCountEl.textContent = String(count);

  if (cartItemsEl) {
    if (items.length === 0) {
      cartItemsEl.innerHTML = `
        <div class="tile">
          <h3>Your cart is empty</h3>
          <p class="muted">Add something from the shop to get started.</p>
        </div>
      `;
    } else {
      cartItemsEl.innerHTML = items
        .map(({ product, qty }) => {
          return `
            <div class="cart-item" data-product-id="${escapeHtml(product.id)}">
              <img src="${product.image}" alt="${escapeHtml(product.name)}" />
              <div>
                <div class="cart-row">
                  <div>
                    <h4>${escapeHtml(product.name)}</h4>
                    <div class="muted">${escapeHtml(product.category)} • ${money(product.price)}</div>
                  </div>
                  <button class="icon-button" type="button" data-action="remove" aria-label="Remove ${escapeHtml(
                    product.name
                  )}">✕</button>
                </div>
                <div class="cart-row" style="margin-top: 0.6rem;">
                  <div class="qty" aria-label="Quantity">
                    <button class="icon-button" type="button" data-action="dec" aria-label="Decrease quantity">−</button>
                    <input type="number" min="1" max="99" value="${qty}" data-action="qty" aria-label="Quantity input" />
                    <button class="icon-button" type="button" data-action="inc" aria-label="Increase quantity">+</button>
                  </div>
                  <div class="price">${money(product.price * qty)}</div>
                </div>
              </div>
            </div>
          `;
        })
        .join('');
    }
  }

  const totals = computeTotals(cart, promo);
  if (subtotalEl) subtotalEl.textContent = money(totals.subtotal);
  if (discountEl) discountEl.textContent = `-${money(totals.discount)}`;
  if (shippingEl) shippingEl.textContent = money(totals.shipping);
  if (totalEl) totalEl.textContent = money(totals.total);

  if (promoInput) promoInput.value = promo;
  if (promoStatus) {
    if (!promo) promoStatus.textContent = '';
    else if (totals.appliedPromo) promoStatus.textContent = `Applied ${totals.appliedPromo} (10% off).`;
    else promoStatus.textContent = `Code "${promo}" not recognized. Try WELCOME10.`;
  }
}

function setCartDrawerOpen(open) {
  if (!cartDrawer || !drawerBackdrop) return;
  cartDrawer.classList.toggle('open', open);
  cartDrawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  drawerBackdrop.hidden = !open;
  if (open) renderCart();
}

function updateCartItem(productId, delta) {
  const cart = loadCart();
  const next = { ...cart };
  const prevQty = Number(next[productId] || 0);
  const newQty = clamp(prevQty + delta, 0, 99);
  if (newQty <= 0) delete next[productId];
  else next[productId] = newQty;
  saveCart(next);
  renderCart();
}

function setCartQty(productId, qty) {
  const cart = loadCart();
  const next = { ...cart };
  const newQty = clamp(Number(qty || 1), 1, 99);
  next[productId] = newQty;
  saveCart(next);
  renderCart();
}

function addToCart(productId) {
  updateCartItem(productId, 1);
  showToast('Added to cart');
}

function initEvents() {
  searchInput?.addEventListener('input', renderProducts);
  categorySelect?.addEventListener('change', renderProducts);
  sortSelect?.addEventListener('change', renderProducts);

  productGrid?.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const card = target.closest('[data-product-id]');
    if (!card) return;
    const id = card.getAttribute('data-product-id');
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;

    const actionEl = target.closest('[data-action]');
    const action = actionEl?.getAttribute('data-action');
    if (action === 'add') addToCart(product.id);
    else openProductModal(product);
  });

  productModalContent?.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const actionEl = target.closest('[data-action]');
    const action = actionEl?.getAttribute('data-action');
    if (action === 'add-from-modal') {
      const id = actionEl?.getAttribute('data-product-id');
      if (id) addToCart(id);
    } else if (action === 'open-cart') {
      setCartDrawerOpen(true);
      productModal?.close();
    }
  });

  cartToggle?.addEventListener('click', () => setCartDrawerOpen(true));
  cartClose?.addEventListener('click', () => setCartDrawerOpen(false));
  drawerBackdrop?.addEventListener('click', () => setCartDrawerOpen(false));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setCartDrawerOpen(false);
  });

  cartItemsEl?.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const item = target.closest('.cart-item');
    if (!item) return;
    const id = item.getAttribute('data-product-id');
    if (!id) return;

    const actionEl = target.closest('[data-action]');
    const action = actionEl?.getAttribute('data-action');
    if (!action) return;
    if (action === 'remove') updateCartItem(id, -999);
    if (action === 'inc') updateCartItem(id, 1);
    if (action === 'dec') updateCartItem(id, -1);
  });

  cartItemsEl?.addEventListener('change', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.getAttribute('data-action') !== 'qty') return;
    const item = target.closest('.cart-item');
    const id = item?.getAttribute('data-product-id');
    if (!id) return;
    setCartQty(id, target.value);
  });

  applyPromoBtn?.addEventListener('click', () => {
    const code = (promoInput?.value || '').trim().toUpperCase();
    savePromo(code);
    renderCart();
  });

  checkoutBtn?.addEventListener('click', () => {
    const cart = loadCart();
    const count = getCartCount(cart);
    if (count === 0) {
      showToast('Your cart is empty');
      return;
    }
    showToast('Checkout complete (demo)');
    saveCart({});
    savePromo('');
    renderCart();
  });

  randomPick?.addEventListener('click', () => {
    const pick = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    if (pick) openProductModal(pick);
  });
}

function initStats() {
  if (statProducts) statProducts.textContent = String(PRODUCTS.length);
}

initTheme();
initYear();
initDemoToast();
initCategories();
initStats();
renderProducts();
renderCart();
initEvents();

