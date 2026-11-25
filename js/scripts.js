// ===== Product Catalog (Exact Asset Paths) =====
const MENU_ITEMS = [
  { id: 1, name: "Royal Chicken Biryani", category: "indian", price: 299, rating: 4.9, tag: "Bestseller", desc: "Aromatic basmati rice slow-cooked with tender spiced chicken and saffron.", image: "css/image/biryani.image.png" },
  { id: 2, name: "Double Cheese Burger", category: "fastfood", price: 189, rating: 4.8, tag: "Popular", desc: "Juicy grilled patty loaded with melted cheddar, crisp lettuce, and house sauce.", image: "css/image/burgercheese.image.png" },
  { id: 3, name: "Cheesy Spicy Pizza", category: "fastfood", price: 349, rating: 4.8, tag: "Hot", desc: "Wood-fired crust topped with mozzarella, jalapenos, peppers, and chili flakes.", image: "css/image/Chessyspicypizza.image.png" },
  { id: 4, name: "Creamy Cheesy Pasta", category: "fastfood", price: 229, rating: 4.7, tag: "Chef Special", desc: "Al dente penne tossed in rich velvety cheese sauce with herbs and olives.", image: "css/image/Cheesypasta.image.png" },
  { id: 5, name: "Steamed Momos", category: "chinese", price: 149, rating: 4.8, tag: "Street Fav", desc: "Soft dumplings stuffed with seasoned veggies, served with fiery red chutney.", image: "css/image/momos.image.png" },
  { id: 6, name: "Gravy Manchurian", category: "chinese", price: 199, rating: 4.6, tag: "Spicy", desc: "Crispy veg balls simmered in tangy garlic-soy Indo-Chinese gravy.", image: "css/image/Gravy manchu.image.png" },
  { id: 7, name: "Spicy Chinese Bhel", category: "chinese", price: 129, rating: 4.5, tag: "Crunchy", desc: "Crispy fried noodles tossed with shredded cabbage, schezwan sauce, and scallions.", image: "css/image/chinesebhel.image.png" },
  { id: 8, name: "Grilled Club Sandwich", category: "snacks", price: 159, rating: 4.6, tag: "Fresh", desc: "Triple-layered toasted sandwich packed with cheese, veggies, and mint mayo.", image: "css/image/sandwhich.image.png" },
  { id: 9, name: "Crispy Peri-Peri Fries", category: "snacks", price: 119, rating: 4.7, tag: "Crispy", desc: "Golden shoestring fries dusted with zesty peri-peri seasoning.", image: "css/image/frenchfries.image.png" },
  { id: 10, name: "Signature Cold Coffee", category: "desserts", price: 139, rating: 4.9, tag: "Chilled", desc: "Rich espresso blended with creamy milk, ice cream, and cocoa drizzle.", image: "css/image/Coffee.image.png" },
  { id: 11, name: "Chocolate Truffle Cake", category: "desserts", price: 179, rating: 4.9, tag: "Sweet", desc: "Decadent dark chocolate sponge layered with silky ganache.", image: "css/image/cake.image.png" },
  { id: 12, name: "Artisan Ice Cream Roll", category: "desserts", price: 159, rating: 4.8, tag: "Cool", desc: "Hand-rolled creamy ice cream topped with choco chips and syrup.", image: "css/image/ice cream roll.image.png" }
];

const DEAL_ITEMS = [
  { id: 101, name: "Ultimate Party Combo", oldPrice: 699, price: 499, discount: "29% OFF", desc: "Cheesy Spicy Pizza + Crispy Fries + 2 Signature Cold Coffees.", image: "css/image/meal1.jpg" },
  { id: 102, name: "Desi Feast Box", oldPrice: 549, price: 399, discount: "27% OFF", desc: "Royal Biryani + Gravy Manchurian + Chocolate Truffle Cake slice.", image: "css/image/meal2.jpg" },
  { id: 103, name: "Midnight Cravings Box", oldPrice: 449, price: 319, discount: "29% OFF", desc: "Double Cheese Burger + Steamed Momos + Peri-Peri Fries + Cold Coffee.", image: "css/image/meal3.jpg" }
];

const ALL_PRODUCTS = [...MENU_ITEMS, ...DEAL_ITEMS];

const ORDER_STEPS = [
  { title: 'Order Placed', desc: 'We have received your order', icon: 'fa-receipt', eta: '28 mins' },
  { title: 'Preparing', desc: 'Chefs are cooking your meal fresh', icon: 'fa-fire-burner', eta: '18 mins' },
  { title: 'Out for Delivery', desc: 'Rider is on the way to you', icon: 'fa-motorcycle', eta: '8 mins' },
  { title: 'Delivered', desc: 'Enjoy your BiteBox!', icon: 'fa-house-circle-check', eta: 'Arrived' }
];

// ===== Storage Helpers =====
const getCart = () => JSON.parse(localStorage.getItem('bitebox_cart')) || [];
const saveCart = (cart) => {
  localStorage.setItem('bitebox_cart', JSON.stringify(cart));
  updateCartBadge();
};

const getOrders = () => JSON.parse(localStorage.getItem('bitebox_orders')) || [];
const saveOrders = (orders) => localStorage.setItem('bitebox_orders', JSON.stringify(orders));

const getCurrentUser = () => JSON.parse(localStorage.getItem('bitebox_user')) || null;

// ===== Toast Notification =====
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--secondary);"></i> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

// ===== Cart Logic =====
function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'grid' : 'none';
  });
}

function addToCart(productId) {
  const product = ALL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
  }
  saveCart(cart);
  showToast(`Added "${product.name}" to cart`);
}

function changeQty(productId, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }
  saveCart(cart);
  renderCartPage();
}

function removeFromCart(productId) {
  const cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
  renderCartPage();
  showToast('Item removed from cart');
}

// ===== Card Template =====
function createFoodCard(item, isDeal = false) {
  return `
    <article class="card">
      <div class="card-img-wrap">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <span class="badge-pill ${isDeal ? 'badge-deal' : ''}">${isDeal ? item.discount : item.tag}</span>
      </div>
      <div class="card-body">
        ${!isDeal ? `
          <div class="card-meta">
            <span>${item.category.toUpperCase()}</span>
            <span class="rating"><i class="fa-solid fa-star"></i> ${item.rating}</span>
          </div>` : ''}
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.desc}</p>
        <div class="card-footer">
          <div class="price">
            ₹${item.price}
            ${isDeal && item.oldPrice ? `<span class="price-old">₹${item.oldPrice}</span>` : ''}
          </div>
          <button class="btn btn-primary btn-sm" onclick="addToCart(${item.id})">
            <i class="fa-solid fa-plus"></i> Add
          </button>
        </div>
      </div>
    </article>
  `;
}

// ===== Page Renderers =====
function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  grid.innerHTML = MENU_ITEMS.slice(0, 4).map(item => createFoodCard(item)).join('');
}

function renderMenuPage() {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;

  let activeCategory = 'all';
  let searchQuery = '';

  const updateGrid = () => {
    const filtered = MENU_ITEMS.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery) || item.desc.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    grid.innerHTML = filtered.length
      ? filtered.map(item => createFoodCard(item)).join('')
      : `<p style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--dark-muted);">No dishes match your search. Try another keyword!</p>`;
  };

  document.querySelectorAll('.pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      updateGrid();
    });
  });

  const searchInput = document.getElementById('menu-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      updateGrid();
    });
  }

  updateGrid();
}

function renderDealsPage() {
  const grid = document.getElementById('deals-grid');
  if (!grid) return;
  grid.innerHTML = DEAL_ITEMS.map(item => createFoodCard(item, true)).join('');
}

let appliedDiscount = 0;

function renderCartPage() {
  const listEl = document.getElementById('cart-items');
  if (!listEl) return;

  const cart = getCart();
  if (cart.length === 0) {
    listEl.innerHTML = `
      <div style="text-align:center; padding: 40px 10px;">
        <i class="fa-solid fa-bag-shopping" style="font-size: 3rem; color: var(--border); margin-bottom: 14px;"></i>
        <h3>Your cart is empty</h3>
        <p style="color: var(--dark-muted); margin: 8px 0 20px;">Looks like you haven't added any delicious bites yet.</p>
        <a href="menu.html" class="btn btn-primary">Explore Menu</a>
      </div>
    `;
  } else {
    listEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p style="color: var(--dark-muted); font-size: 0.9rem;">₹${item.price} each</p>
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-weight: 800; margin-bottom: 8px;">₹${item.price * item.qty}</div>
          <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = subtotal > 0 ? (subtotal >= 500 ? 0 : 40) : 0;
  const discountAmt = Math.round(subtotal * appliedDiscount);
  const tax = Math.round((subtotal - discountAmt) * 0.05);
  const total = subtotal - discountAmt + delivery + tax;

  document.getElementById('summary-subtotal').textContent = `₹${subtotal}`;
  document.getElementById('summary-delivery').textContent = delivery === 0 && subtotal > 0 ? 'FREE' : `₹${delivery}`;
  document.getElementById('summary-tax').textContent = `₹${tax}`;
  document.getElementById('summary-discount').textContent = `-₹${discountAmt}`;
  document.getElementById('summary-total').textContent = `₹${total}`;
}

function initCartActions() {
  const promoBtn = document.getElementById('apply-promo');
  const checkoutBtn = document.getElementById('checkout-btn');
  const modal = document.getElementById('order-modal');

  if (promoBtn) {
    promoBtn.addEventListener('click', () => {
      const code = document.getElementById('promo-input').value.trim().toUpperCase();
      if (code === 'BITE20') {
        appliedDiscount = 0.20;
        showToast('Promo BITE20 applied! 20% off.');
        renderCartPage();
      } else {
        appliedDiscount = 0;
        showToast('Invalid promo code. Try BITE20');
        renderCartPage();
      }
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const cart = getCart();
      if (cart.length === 0) {
        showToast('Add items to your cart first!');
        return;
      }

      const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
      const delivery = subtotal >= 500 ? 0 : 40;
      const discountAmt = Math.round(subtotal * appliedDiscount);
      const tax = Math.round((subtotal - discountAmt) * 0.05);
      const total = subtotal - discountAmt + delivery + tax;

      const orderId = 'BB-' + Math.floor(1000 + Math.random() * 9000);
      const newOrder = {
        id: orderId,
        items: cart,
        total,
        createdAt: Date.now(),
        step: 0
      };

      const orders = getOrders();
      orders.unshift(newOrder);
      saveOrders(orders);

      saveCart([]);
      appliedDiscount = 0;
      renderCartPage();

      if (modal) {
        const idSpan = document.getElementById('modal-order-id');
        const trackLink = document.getElementById('modal-track-link');
        if (idSpan) idSpan.textContent = orderId;
        if (trackLink) trackLink.href = `track.html?id=${orderId}`;
        modal.classList.add('open');
      }
    });
  }
}

// ===== Order Tracking Page =====
function renderOrderTracker(orderId) {
  const view = document.getElementById('tracker-view');
  if (!view) return;

  const orders = getOrders();
  const order = orderId
    ? orders.find(o => o.id.toUpperCase() === orderId.toUpperCase())
    : orders[0];

  if (!order) {
    view.innerHTML = `
      <div class="tracker-card" style="text-align:center; padding: 48px 20px;">
        <i class="fa-solid fa-box-open" style="font-size: 3rem; color: var(--border); margin-bottom: 14px;"></i>
        <h3>${orderId ? `Order "${orderId}" not found` : 'No active orders yet'}</h3>
        <p style="color: var(--dark-muted); margin: 8px 0 22px;">Place an order from our menu to track it live here.</p>
        <a href="menu.html" class="btn btn-primary">Order Food Now</a>
      </div>
    `;
    return;
  }

  const elapsedSteps = Math.min(3, Math.floor((Date.now() - order.createdAt) / 30000));
  const currentStep = Math.max(order.step, elapsedSteps);
  const isDelivered = currentStep >= 3;
  const placedTime = new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  view.innerHTML = `
    <div class="tracker-card">
      <div class="tracker-header">
        <div>
          <span style="font-size: 0.85rem; color: var(--dark-muted);">Order ID</span>
          <h2 style="font-size: 1.6rem;">${order.id}</h2>
          <p style="font-size: 0.85rem; color: var(--dark-muted);">Placed at ${placedTime}</p>
        </div>
        <div style="text-align: right;">
          <span class="order-status-pill ${isDelivered ? 'delivered' : ''}">
            ${ORDER_STEPS[currentStep].title}
          </span>
          <p style="font-size: 0.9rem; margin-top: 8px; font-weight: 600;">
            ${isDelivered ? 'Delivered on time' : `Estimated Arrival: ${ORDER_STEPS[currentStep].eta}`}
          </p>
        </div>
      </div>

      <div class="stepper">
        ${ORDER_STEPS.map((s, idx) => {
          const state = idx < currentStep ? 'completed' : idx === currentStep ? 'active' : '';
          return `
            <div class="step ${state}">
              <div class="step-icon"><i class="fa-solid ${s.icon}"></i></div>
              <div>
                <h4>${s.title}</h4>
                <p>${s.desc}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="tracker-details">
        <div>
          <h4 style="margin-bottom: 12px;">Items Ordered</h4>
          ${order.items.map(i => `
            <div class="tracker-item-row">
              <span>${i.qty}x ${i.name}</span>
              <strong>₹${i.price * i.qty}</strong>
            </div>
          `).join('')}
          <div class="tracker-item-row" style="font-size: 1.05rem; padding-top: 14px;">
            <strong>Total Paid</strong>
            <strong style="color: var(--primary);">₹${order.total}</strong>
          </div>
        </div>

        <div style="background: var(--bg-light); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border);">
          <h4 style="margin-bottom: 8px;">Delivery Partner</h4>
          <p style="font-size: 0.9rem; color: var(--dark-muted); margin-bottom: 16px;">
            <i class="fa-solid fa-motorcycle" style="color: var(--primary);"></i> Rahul S. • 4.9 ★
          </p>
          ${!isDelivered ? `
            <button class="btn btn-outline btn-sm btn-block" onclick="advanceOrderStep('${order.id}')">
              <i class="fa-solid fa-forward-step"></i> Simulate Next Stage
            </button>
          ` : `
            <a href="menu.html" class="btn btn-primary btn-sm btn-block">Order Again</a>
          `}
        </div>
      </div>
    </div>
  `;
}

function advanceOrderStep(orderId) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const elapsedSteps = Math.min(3, Math.floor((Date.now() - order.createdAt) / 30000));
  order.step = Math.min(3, Math.max(order.step, elapsedSteps) + 1);
  saveOrders(orders);
  renderOrderTracker(orderId);
  renderRecentOrders();
  showToast(`Order ${orderId}: ${ORDER_STEPS[order.step].title}`);
}

function renderRecentOrders() {
  const wrap = document.getElementById('recent-orders-wrap');
  const list = document.getElementById('recent-orders-list');
  if (!wrap || !list) return;

  const orders = getOrders();
  if (orders.length === 0) {
    wrap.style.display = 'none';
    return;
  }

  wrap.style.display = 'block';
  list.innerHTML = orders.map(o => {
    const step = Math.max(o.step, Math.min(3, Math.floor((Date.now() - o.createdAt) / 30000)));
    return `
      <div class="recent-order-card" onclick="renderOrderTracker('${o.id}'); window.scrollTo({ top: 180, behavior: 'smooth' });">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <strong>${o.id}</strong>
          <span class="order-status-pill ${step >= 3 ? 'delivered' : ''}" style="font-size:0.75rem;">${ORDER_STEPS[step].title}</span>
        </div>
        <p style="font-size:0.85rem; color:var(--dark-muted);">${o.items.length} item(s) • ₹${o.total}</p>
      </div>
    `;
  }).join('');
}

function initTrackPage() {
  if (!document.getElementById('tracker-view')) return;

  const params = new URLSearchParams(window.location.search);
  const initialId = params.get('id');
  renderOrderTracker(initialId);
  renderRecentOrders();

  const searchForm = document.getElementById('track-search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('track-order-input').value.trim();
      renderOrderTracker(id);
    });
  }
}

// ===== Auth Logic =====
function initAuthUI() {
  const authSlot = document.getElementById('auth-slot');
  if (!authSlot) return;

  const user = getCurrentUser();
  if (user) {
    authSlot.innerHTML = `
      <span style="font-size: 0.88rem; font-weight: 600;">Hi, ${user.name.split(' ')[0]}</span>
      <button class="btn btn-outline btn-sm" id="logout-btn">Logout</button>
    `;
    document.getElementById('logout-btn').addEventListener('click', () => {
      localStorage.removeItem('bitebox_user');
      showToast('Logged out successfully');
      setTimeout(() => window.location.reload(), 600);
    });
  }
}

function initAuthForms() {
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim().toLowerCase();
      const password = document.getElementById('signup-password').value;
      const confirm = document.getElementById('signup-confirm').value;

      if (password.length < 6) return showToast('Password must be at least 6 characters');
      if (password !== confirm) return showToast('Passwords do not match');

      const users = JSON.parse(localStorage.getItem('bitebox_users')) || [];
      if (users.some(u => u.email === email)) return showToast('Account already exists. Please log in.');

      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem('bitebox_users', JSON.stringify(users));
      localStorage.setItem('bitebox_user', JSON.stringify(newUser));
      showToast('Account created! Redirecting...');
      setTimeout(() => window.location.href = 'index.html', 900);
    });
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const password = document.getElementById('login-password').value;

      const users = JSON.parse(localStorage.getItem('bitebox_users')) || [];
      const found = users.find(u => u.email === email && u.password === password);
      if (!found) return showToast('Invalid email or password');

      localStorage.setItem('bitebox_user', JSON.stringify(found));
      showToast(`Welcome back, ${found.name}!`);
      setTimeout(() => window.location.href = 'index.html', 900);
    });
  }

  document.querySelectorAll('.toggle-pass').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      btn.innerHTML = isHidden ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
    });
  });
}

// ===== Mobile Nav & Init =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  updateCartBadge();
  initAuthUI();
  initAuthForms();
  renderFeatured();
  renderMenuPage();
  renderDealsPage();
  renderCartPage();
  initCartActions();
  initTrackPage();
});