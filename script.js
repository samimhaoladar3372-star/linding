const foodGrid = document.getElementById('foodGrid');
const toysGrid = document.getElementById('toysGrid');
const cagesGrid = document.getElementById('cagesGrid');
const clothesGrid = document.getElementById('clothesGrid');
const categoryButtons = document.querySelectorAll('.category-card');
const searchInput = document.getElementById('searchInput');
const shopNowBtn = document.getElementById('shopNowBtn');
const exploreBtn = document.getElementById('exploreBtn');
const cartBtn = document.getElementById('cartBtn');
const productPanel = document.getElementById('productPanel');
const checkoutPanel = document.getElementById('checkoutPanel');
const closeProduct = document.getElementById('closeProduct');
const closeCheckout = document.getElementById('closeCheckout');
const buyNowBtn = document.getElementById('buyNowBtn');
const detailImage = document.getElementById('detailImage');
const detailCategory = document.getElementById('detailCategory');
const detailTitle = document.getElementById('detailTitle');
const detailDescription = document.getElementById('detailDescription');
const detailPrice = document.getElementById('detailPrice');
const summaryTitle = document.getElementById('summaryTitle');
const summaryPrice = document.getElementById('summaryPrice');
const summaryTotal = document.getElementById('summaryTotal');
const confirmOrderBtn = document.getElementById('confirmOrderBtn');

let activeProduct = null;
let products = [];

const fallbackProducts = [
  {
    id: 'food-1',
    category: 'Pet Food',
    section: 'pet-food',
    title: 'Premium Puppy Kibble',
    price: 23.99,
    image: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=700&q=80',
    description: 'A balanced meal with vitamins, minerals, and delicious flavor for growing puppies.',
  },
  {
    id: 'food-2',
    category: 'Pet Food',
    section: 'pet-food',
    title: 'Grain-Free Salmon Bites',
    price: 29.5,
    image: 'https://images.unsplash.com/photo-1494256997604-768d1f608cac?auto=format&fit=crop&w=700&q=80',
    description: 'Soft, grain-free bites packed with salmon protein and natural antioxidants.',
  },
  {
    id: 'food-3',
    category: 'Pet Food',
    section: 'pet-food',
    title: 'Happy Cat Crunch',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=700&q=80',
    description: 'Crunchy cat food with taurine and real chicken for playful cats.',
  },
  {
    id: 'food-4',
    category: 'Pet Food',
    section: 'pet-food',
    title: 'Vitamin Boost Chews',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1516972810927-80185027ca84?auto=format&fit=crop&w=700&q=80',
    description: 'Daily vitamin chews to support immunity and coat health.',
  },
  {
    id: 'toy-1',
    category: 'Toys',
    section: 'toys',
    title: 'Squeaky Plush Ball',
    price: 12.5,
    image: 'https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=700&q=80',
    description: 'Soft plush ball with a joyful squeak for playful fetch sessions.',
  },
  {
    id: 'toy-2',
    category: 'Toys',
    section: 'toys',
    title: 'Chewy Rope Tug',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=700&q=80',
    description: 'Durable rope toy made for tug-of-war and long chewing sessions.',
  },
  {
    id: 'toy-3',
    category: 'Toys',
    section: 'toys',
    title: 'Cat Feather Wand',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
    description: 'Lightweight wand toy to stimulate hunting instincts and active play.',
  },
  {
    id: 'toy-4',
    category: 'Toys',
    section: 'toys',
    title: 'Puzzle Treat Ball',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=700&q=80',
    description: 'Interactive treat ball that keeps pets engaged and mentally sharp.',
  },
  {
    id: 'cage-1',
    category: 'Cage',
    section: 'cages',
    title: 'Cozy Pet Crate',
    price: 65.0,
    image: 'https://images.unsplash.com/photo-1495131822220-8dd59073a5c2?auto=format&fit=crop&w=700&q=80',
    description: 'Comfortable and safe crate for home travel and calm napping.',
  },
  {
    id: 'cage-2',
    category: 'Cage',
    section: 'cages',
    title: 'Small Animal Cage',
    price: 48.9,
    image: 'https://images.unsplash.com/photo-1516216628859-9bccecab13ca?auto=format&fit=crop&w=700&q=80',
    description: 'Spacious home for rabbits, guinea pigs, and other small pets.',
  },
  {
    id: 'cage-3',
    category: 'Cage',
    section: 'cages',
    title: 'Travel Carrier',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1571781926716-416b0f1b1a4c?auto=format&fit=crop&w=700&q=80',
    description: 'Secure carrier designed for stress-free vet trips and travel.',
  },
  {
    id: 'cage-4',
    category: 'Cage',
    section: 'cages',
    title: 'Luxury Playpen',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=700&q=80',
    description: 'A premium playpen with breathable mesh and padded flooring.',
  },
  {
    id: 'cloth-1',
    category: 'Pet Clothes',
    section: 'clothes',
    title: 'Cozy Winter Sweater',
    price: 24.0,
    image: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=700&q=80',
    description: 'Soft knit sweater to keep small pets warm and adorable.',
  },
  {
    id: 'cloth-2',
    category: 'Pet Clothes',
    section: 'clothes',
    title: 'Raincoat Jacket',
    price: 22.5,
    image: 'https://images.unsplash.com/photo-1478810810369-a07ef6a3f6b1?auto=format&fit=crop&w=700&q=80',
    description: 'Waterproof jacket for comfortable walks in rainy weather.',
  },
  {
    id: 'cloth-3',
    category: 'Pet Clothes',
    section: 'clothes',
    title: 'Holiday Bandana',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1472713274610-1b4430c04d47?auto=format&fit=crop&w=700&q=80',
    description: 'Festive bandana to make your pet the star of the season.',
  },
  {
    id: 'cloth-4',
    category: 'Pet Clothes',
    section: 'clothes',
    title: 'Comfort Sleep Tee',
    price: 18.75,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
    description: 'Lightweight sleep tee for calm evenings and cozy naps.',
  },
];

function createCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.id = product.id;
  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}" loading="lazy">
    <h4>${product.title}</h4>
    <p>${product.description}</p>
    <div class="price">
      <span>$${product.price.toFixed(2)}</span>
      <button class="card-button" type="button">Add to Cart</button>
    </div>
  `;

  card.addEventListener('click', () => {
    showProductDetails(product.id);
  });

  return card;
}

function renderProducts(filter = '') {
  const query = filter.trim().toLowerCase();
  foodGrid.innerHTML = '';
  toysGrid.innerHTML = '';
  cagesGrid.innerHTML = '';
  clothesGrid.innerHTML = '';

  const list = products.length ? products : fallbackProducts;

  list.forEach((product) => {
    const searchableText = `${product.title} ${product.description} ${product.category}`.toLowerCase();
    if (query && !searchableText.includes(query)) {
      return;
    }
    const card = createCard(product);
    if (product.section === 'pet-food') {
      foodGrid.appendChild(card);
    } else if (product.section === 'toys') {
      toysGrid.appendChild(card);
    } else if (product.section === 'cages') {
      cagesGrid.appendChild(card);
    } else if (product.section === 'clothes') {
      clothesGrid.appendChild(card);
    }
  });
}

function scrollToSection(targetId) {
  document.getElementById(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    products = data.products ?? fallbackProducts;
  } catch (error) {
    console.warn('Backend fetch failed, using fallback products.', error);
    products = fallbackProducts;
  }
  renderProducts();
}

function getProductById(id) {
  const list = products.length ? products : fallbackProducts;
  return list.find((item) => item.id === id);
}

function showProductDetails(id) {
  const product = getProductById(id);
  if (!product) {
    alert('Product not found.');
    return;
  }

  activeProduct = product;
  detailImage.src = product.image;
  detailImage.alt = product.title;
  detailCategory.textContent = product.category;
  detailTitle.textContent = product.title;
  detailDescription.textContent = product.description;
  detailPrice.textContent = `$${product.price.toFixed(2)}`;

  productPanel.classList.remove('hidden');
  checkoutPanel.classList.add('hidden');
}

function showCheckout() {
  if (!activeProduct) {
    activeProduct = products.length ? products[0] : fallbackProducts[0];
  }

  const delivery = 5.99;
  const total = activeProduct.price + delivery;

  summaryTitle.textContent = activeProduct.title;
  summaryPrice.textContent = `$${activeProduct.price.toFixed(2)}`;
  summaryTotal.textContent = `$${total.toFixed(2)}`;

  checkoutPanel.classList.remove('hidden');
  productPanel.classList.add('hidden');
}

function closePanels() {
  productPanel.classList.add('hidden');
  checkoutPanel.classList.add('hidden');
}

async function submitOrder() {
  if (!activeProduct) {
    alert('Please select a product first.');
    return;
  }

  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
  if (!paymentMethod) {
    alert('Please choose a payment option.');
    return;
  }

  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: activeProduct.id,
        paymentMethod,
        customerName: 'Guest Buyer',
        email: 'hello@petpalace.shop',
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Checkout failed.');
    }

    alert(`Order confirmed: ${data.order.orderId}. Total: $${data.order.total.toFixed(2)}`);
    closePanels();
  } catch (error) {
    alert(`Checkout failed: ${error.message}`);
  }
}

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    scrollToSection(button.dataset.target);
  });
});

shopNowBtn.addEventListener('click', () => scrollToSection('pet-food'));
exploreBtn.addEventListener('click', () => scrollToSection('toys'));
cartBtn.addEventListener('click', showCheckout);
closeProduct.addEventListener('click', closePanels);
closeCheckout.addEventListener('click', closePanels);
buyNowBtn.addEventListener('click', showCheckout);
confirmOrderBtn.addEventListener('click', submitOrder);
searchInput.addEventListener('input', (event) => renderProducts(event.target.value));

loadProducts();
