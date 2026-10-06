import './style.css' // Подключаем наши обновленные стили
import clientLogo from './assets/logo.png' // Умный импорт логотипа из src/assets/

// Автоматически передаем путь к логотипу в тег img в шапке
const logoImg = document.querySelector('.logo-img') as HTMLImageElement;
if (logoImg) {
  logoImg.src = clientLogo;
}

interface Product {
  id: number;
  name: string;
  size: '25' | '35';
  color: string;
  price: string;
}

const products: Product[] = [
  { id: 1, name: "Piscari Micro", size: "25", color: "Огненно-красный", price: "По запросу" },
  { id: 2, name: "Piscari Micro", size: "25", color: "Кислотно-зеленый", price: "По запросу" },
  { id: 3, name: "Piscari Micro", size: "25", color: "Натуральный малёк", price: "По запросу" },
  { id: 4, name: "Piscari Master", size: "35", color: "Ядовитый оранжевый", price: "По запросу" },
  { id: 5, name: "Piscari Master", size: "35", color: "Глубокий черный", price: "По запросу" },
  { id: 6, name: "Piscari Master", size: "35", color: "Золотая осень", price: "По запросу" }
];

function renderProducts(filteredSize: string) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  grid.innerHTML = '';

  const filtered = filteredSize === 'all' 
    ? products 
    : products.filter(p => p.size === filteredSize);

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-stub">Фото снасти ${product.size}мм</div>
      <h3>${product.name}</h3>
      <p class="product-color">Цвет: ${product.color}</p>
      <div class="product-price">${product.price}</div>
      <button class="btn-buy">Заказать</button>
    `;
    grid.appendChild(card);
  });
}

const buttons = document.querySelectorAll('.filter-btn');
buttons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    buttons.forEach(b => b.classList.remove('active'));
    const target = e.target as HTMLButtonElement;
    target.classList.add('active');
    const size = target.getAttribute('data-size') || 'all';
    renderProducts(size);
  });
});

renderProducts('all');
