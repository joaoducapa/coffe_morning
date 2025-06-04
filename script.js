// MENU HAMBURGUER
const hamburguer = document.querySelector('.hamburguer');
const navMenu = document.querySelector('.nav-menu ul');

hamburguer.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// CARRINHO - modal
const cartBtn = document.getElementById('cart-btn');
const modal = document.getElementById('cart-modal');
const closeModalBtn = document.querySelector('.close-modal');

cartBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  renderCartItems();
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
});

// CARRINHO - gerenciamento dos itens
let cart = [];

const cartItemsUl = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');

function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  alert(`${name} adicionado ao carrinho!`);
  renderCartItems();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderCartItems();
}

function renderCartItems() {
  cartItemsUl.innerHTML = '';
  if (cart.length === 0) {
    cartItemsUl.innerHTML = '<li>Seu carrinho está vazio.</li>';
    totalPriceEl.textContent = '0.00';
    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove-btn" data-id="${item.id}" style="margin-left:10px; background:#c94f4f; border:none; border-radius:4px; color:#fff; cursor:pointer; padding:2px 8px; font-size:0.9rem;">x</button>
    `;
    cartItemsUl.appendChild(li);
  });

  totalPriceEl.textContent = total.toFixed(2);

  // adicionar eventos aos botões de remover
  const removeBtns = document.querySelectorAll('.remove-btn');
  removeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      removeFromCart(id);
    });
  });
}

// Botões "Adicionar ao Carrinho"
const addToCartBtns = document.querySelectorAll('.add-to-cart');

addToCartBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.menu-item');
    const id = card.getAttribute('data-id');
    const name = card.querySelector('h3').textContent;
    const priceText = card.querySelector('.price').textContent;
    const price = parseFloat(priceText.replace('R$ ', '').replace(',', '.'));
    addToCart(id, name, price);
  });
});

// Checkout - simulação simples
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return alert('Seu carrinho está vazio.');
  alert('Compra finalizada! Obrigado pelo pedido :)');
  cart = [];
  renderCartItems();
  modal.style.display = 'none';
});

// FORMULÁRIO ASSINATURA
const subscriptionForm = document.getElementById('subscription-form');

subscriptionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = subscriptionForm.name.value.trim();
  const email = subscriptionForm.email.value.trim();
  const plan = subscriptionForm.plan.value;

  if (!name || !email) {
    alert('Por favor, preencha nome e email.');
    return;
  }

  alert(`Obrigado, ${name}! Sua assinatura do plano ${plan} foi recebida.`);
  subscriptionForm.reset();
});

// FORMULÁRIO CONTATO
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    alert('Por favor, preencha todos os campos do formulário de contato.');
    return;
  }

  alert(`Obrigado, ${name}! Sua mensagem foi enviada.`);
  contactForm.reset();
});
