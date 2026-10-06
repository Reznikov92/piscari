import './style.css'

interface Product {
  id: number;
  name: string;
  size: '25' | '35';
  color: string;
  price: string;
}

const products: Product[] = [
  // === РАЗМЕР 25 мм (20 штук) ===
  { id: 1, name: "Piscari Micro", size: "25", color: "Огненно-красный", price: "По запросу" },
  { id: 2, name: "Piscari Micro", size: "25", color: "Кислотно-зеленый (Chartreuse)", price: "По запросу" },
  { id: 3, name: "Piscari Micro", size: "25", color: "Натуральный малёк", price: "По запросу" },
  { id: 4, name: "Piscari Micro", size: "25", color: "Ультрафиолет (UV)", price: "По запросу" },
  { id: 5, name: "Piscari Micro", size: "25", color: "Лимонный неон", price: "По запросу" },
  { id: 6, name: "Piscari Micro", size: "25", color: "Машинное масло с золотом", price: "По запросу" },
  { id: 7, name: "Piscari Micro", size: "25", color: "Белый перламутр", price: "По запросу" },
  { id: 8, name: "Piscari Micro", size: "25", color: "Спелая вишня", price: "По запросу" },
  { id: 9, name: "Piscari Micro", size: "25", color: "Светящийся в темноте (Glow)", price: "По запросу" },
  { id: 10, name: "Piscari Micro", size: "25", color: "Шоколад с блестками", price: "По запросу" },
  { id: 11, name: "Piscari Micro", size: "25", color: "Розовая фуксия", price: "По запросу" },
  { id: 12, name: "Piscari Micro", size: "25", color: "Болотная лягушка", price: "По запросу" },
  { id: 13, name: "Piscari Micro", size: "25", color: "Карамель с серебром", price: "По запросу" },
  { id: 14, name: "Piscari Micro", size: "25", color: "Арбузный микс", price: "По запросу" },
  { id: 15, name: "Piscari Micro", size: "25", color: "Кола с красной точкой", price: "По запросу" },
  { id: 16, name: "Piscari Micro", size: "25", color: "Желтый сыр (Форелевый)", price: "По запросу" },
  { id: 17, name: "Piscari Micro", size: "25", color: "Серебристый металик", price: "По запросу" },
  { id: 18, name: "Piscari Micro", size: "25", color: "Оранжевый неон", price: "По запросу" },
  { id: 19, name: "Piscari Micro", size: "25", color: "Фиолетовый аметист", price: "По запросу" },
  { id: 20, name: "Piscari Micro", size: "25", color: "Двухцветный: Халк", price: "По запросу" },

  // === РАЗМЕР 35 мм (20 штук) ===
  { id: 21, name: "Piscari Master", size: "35", color: "Ядовитый оранжевый", price: "По запросу" },
  { id: 22, name: "Piscari Master", size: "35", color: "Глубокий черный", price: "По запросу" },
  { id: 23, name: "Piscari Master", size: "35", color: "Золотая осень", price: "По запросу" },
  { id: 24, name: "Piscari Master", size: "35", color: "Зеленый арбуз с флешем", price: "По запросу" },
  { id: 25, name: "Piscari Master", size: "35", color: "Белый жемчуг (Судак)", price: "По запросу" },
  { id: 26, name: "Piscari Master", size: "35", color: "Кислотная креветка", price: "По запросу" },
  { id: 27, name: "Piscari Master", size: "35", color: "Бензин (Светоотражающий)", price: "По запросу" },
  { id: 28, name: "Piscari Master", size: "35", color: "Кровавая пиявка", price: "По запросу" },
  { id: 29, name: "Piscari Master", size: "35", color: "Насыщенный ультрафиолет", price: "По запросу" },
  { id: 30, name: "Piscari Master", size: "35", color: "Салатовый лед (Glow)", price: "По запросу" },
  { id: 31, name: "Piscari Master", size: "35", color: "Темный шоколад", price: "По запросу" },
  { id: 32, name: "Piscari Master", size: "35", color: "Розовый неон", price: "По запросу" },
  { id: 33, name: "Piscari Master", size: "35", color: "Медная чешуя", price: "По запросу" },
  { id: 34, name: "Piscari Master", size: "35", color: "Изумрудный окунь", price: "По запросу" },
  { id: 35, name: "Piscari Master", size: "35", color: "Морковный взрыв", price: "По запросу" },
  { id: 36, name: "Piscari Master", size: "35", color: "Синий кристалл с блеском", price: "По запросу" },
  { id: 37, name: "Piscari Master", size: "35", color: "Двухцветный: Оса", price: "По запросу" },
  { id: 38, name: "Piscari Master", size: "35", color: "Двухцветный: Малина-лимон", price: "По запросу" },
  { id: 39, name: "Piscari Master", size: "35", color: "Копченая корюшка", price: "По запросу" },
  { id: 40, name: "Piscari Master", size: "35", color: "Красноголовый малёк", price: "По запросу" }
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
      <button class="btn-buy" onclick="document.getElementById('contacts').scrollIntoView({behavior: 'smooth'})">Заказать снасть</button>
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
