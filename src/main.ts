import './style.css' // Подключаем наши стили

// 1. Задаем строгие правила для структуры товара
interface Product {
  id: number;
  name: string;
  size: '25' | '35'; // Только два размера, TypeScript не даст ошибиться
  color: string;
  price: string;
}

// 2. База данных снастей Piscari (добавляем разные цвета)
const products: Product[] = [
  { id: 1, name: "Piscari Micro", size: "25", color: "Огненно-красный", price: "По запросу" },
  { id: 2, name: "Piscari Micro", size: "25", color: "Кислотно-зеленый", price: "По запросу" },
  { id: 3, name: "Piscari Micro", size: "25", color: "Натуральный малёк", price: "По запросу" },
  { id: 4, name: "Piscari Master", size: "35", color: "Ядовитый оранжевый", price: "По запросу" },
  { id: 5, name: "Piscari Master", size: "35", color: "Глубокий черный", price: "По запросу" },
  { id: 6, name: "Piscari Master", size: "35", color: "Золотая осень", price: "По запросу" }
];

// 3. Функция автоматической отрисовки карточек снастей
function renderProducts(filteredSize: string) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  // Очищаем сетку от старых товаров
  grid.innerHTML = '';

  // Фильтруем массив по выбранному размеру
  const filtered = filteredSize === 'all' 
    ? products 
    : products.filter(p => p.size === filteredSize);

  // Создаем HTML-код для каждого товара
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

// 4. Логика переключения кнопок-фильтров
const buttons = document.querySelectorAll('.filter-btn');
buttons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Убираем подсветку со всех кнопок
    buttons.forEach(b => b.classList.remove('active'));
    
    // Добавляем подсветку нажатой кнопке
    const target = e.target as HTMLButtonElement;
    target.classList.add('active');

    // Берем размер из атрибута data-size и обновляем каталог
    const size = target.getAttribute('data-size') || 'all';
    renderProducts(size);
  });
});

// Первичный запуск: при открытии сайта загружаем все снасти сразу
renderProducts('all');
