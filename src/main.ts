import './style.scss'

interface ColorOption {
  name: string;
  hex: string;
}

interface ProductGroup {
  id: string;
  name: string;
  size: '25' | '35';
  price: string;
  colors: ColorOption[];
}

// НАСТОЯЩИЙ ЗВУК ЗАБРОСА УДОЧКИ/СПИННИНГА С КАТУШКОЙ
const castSound = new Audio('https://mixkit.co');

// База данных приманок Piscari
const productsData: ProductGroup[] = [
  {
    id: "p25",
    name: "Piscari Micro",
    size: "25",
    price: "По запросу",
    colors: [
      { name: "Огненно-красный", hex: "#cc0000" },
      { name: "Кислотно-зеленый (Chartreuse)", hex: "#39ff14" },
      { name: "Натуральный малёк", hex: "#7a8b7b" },
      { name: "Ультрафиолет (UV Поплавок)", hex: "#6a0dad" },
      { name: "Лимонный неон", hex: "#ccff00" },
      { name: "Машинное масло с золотом", hex: "#593e1a" },
      { name: "Белый перламутр", hex: "#eaeaea" },
      { name: "Спелая вишня", hex: "#800020" },
      { name: "Светящийся в темноте (Glow)", hex: "#aaffaa" },
      { name: "Шоколад с золотыми блестками", hex: "#4a2c11" },
      { name: "Розовая фуксия", hex: "#ff007f" },
      { name: "Болотная лягушка", hex: "#465d33" },
      { name: "Карамель с серебром", hex: "#d2b48c" },
      { name: "Арбузный микс", hex: "#ff6b6b" },
      { name: "Кола с красной точкой", hex: "#2b1a1a" },
      { name: "Желтый сыр (Форелевый)", hex: "#ffcc00" },
      { name: "Серебристый металик", hex: "#a8b1b8" },
      { name: "Оранжевый неон", hex: "#ff5500" },
      { name: "Фиолетовый аметист", hex: "#8a2be2" },
      { name: "Двухцветный: Халк", hex: "linear-gradient(135deg, #39ff14 50%, #6a0dad 50%)" }
    ]
  },
  {
    id: "p35",
    name: "Piscari Master",
    size: "35",
    price: "По запросу",
    colors: [
      { name: "Ядовитый оранжевый", hex: "#ff4500" },
      { name: "Глубокий черный", hex: "#111111" },
      { name: "Золотая осень", hex: "#ffbe0b" },
      { name: "Зеленый арбуз с флешем", hex: "#1e4620" },
      { name: "Белый жемчуг (Судак)", hex: "#ffffff" },
      { name: "Кислотная креветка", hex: "#ff7f50" },
      { name: "Бензин (Светоотражающий)", hex: "linear-gradient(135deg, #00ffff, #ff00ff)" },
      { name: "Кровавая пиявка", hex: "#7a0010" },
      { name: "Насыщенный ультрафиолет", hex: "#480ca8" },
      { name: "Салатовый лед (Glow)", hex: "#c7f9cc" },
      { name: "Темный шоколад", hex: "#3a2216" },
      { name: "Розовый неон", hex: "#f72585" },
      { name: "Медная чешуя", hex: "#b87333" },
      { name: "Изумрудный окунь", hex: "#00a86b" },
      { name: "Морковный взрыв", hex: "#ff6600" },
      { name: "Синий кристалл с блеском", hex: "#4361ee" },
      { name: "Двухцветный: Оса", hex: "linear-gradient(135deg, #ffcc00 50%, #111111 50%)" },
      { name: "Двухцветный: Малина-лимон", hex: "linear-gradient(135deg, #ff007f 50%, #ccff00 50%)" },
      { name: "Копченая корюшка", hex: "#6d6875" },
      { name: "Красноголовый малёк (Red Head)", hex: "linear-gradient(135deg, #cc0000 35%, #ffffff 35%)" }
    ]
  }
];

const mainPage = document.getElementById('main-page');
const productPage = document.getElementById('product-page');
const productGrid = document.getElementById('product-grid');
const detailView = document.getElementById('product-detail-view');
const btnBack = document.getElementById('btn-back-to-catalog');
const navCatalogLink = document.getElementById('nav-catalog-link');
const burgerBtn = document.getElementById('burger-menu-btn');
const headerNav = document.getElementById('header-nav');

// Функция запуска звукового эффекта
function playCastSound(): void {
  castSound.currentTime = 0; 
  castSound.play().catch(err => console.log("Звук ожидает первого клика:", err));
}

// УПРАВЛЕНИЕ БУРГЕР-МЕНЮ
burgerBtn?.addEventListener('click', () => {
  playCastSound(); 
  burgerBtn.classList.toggle('open');
  headerNav?.classList.toggle('open');
});

// Закрытие шторки бургера при клике на ссылки и соцсети внутри неё
const allMenuElements = headerNav?.querySelectorAll('a');
allMenuElements?.forEach(element => {
  element.addEventListener('click', () => {
    burgerBtn?.classList.remove('open');
    headerNav?.classList.remove('open');
  });
});

// Отрисовка витрины на Главной странице
function renderMainCatalog(sizeFilter: string): void {
  if (!productGrid) return;
  productGrid.innerHTML = '';

  const filtered = sizeFilter === 'all' 
    ? productsData 
    : productsData.filter(p => p.size === sizeFilter);

  filtered.forEach(group => {
    const card = document.createElement('div');
    card.className = 'base-product-card';
    card.innerHTML = `
      <div class="base-img-stub" style="background-color: #2d3b32">Piscari ${group.size}мм</div>
      <h3>${group.name}</h3>
      <p class="size-tag">Размер: ${group.size} мм (20 расцветок)</p>
      <div class="price">${group.price}</div>
      <button class="btn-open-product">Провалиться в карточку</button>
    `;

    card.querySelector('.btn-open-product')?.addEventListener('click', () => {
      playCastSound();
      openProductPage(group.id);
    });
    
    card.querySelector('.base-img-stub')?.addEventListener('click', () => {
      playCastSound();
      openProductPage(group.id);
    });

    productGrid.appendChild(card);
  });
}

// Внутренняя страница товара (стиль OZON)
function openProductPage(productId: string): void {
  const product = productsData.find(p => p.id === productId);
  if (!product || !detailView || !mainPage || !productPage) return;

  mainPage.classList.add('hidden');
  productPage.classList.remove('hidden');
  window.scrollTo({ top: 0 });

  // ЖЕЛЕЗОБЕТОННО ИСПРАВЛЕНО ТУТ: Берём именно первый элемент массива [0]
  const defaultColor = product.colors[0];

  let htmlBadges = '';
  product.colors.forEach((color, idx) => {
    const activeClass = idx === 0 ? 'active' : '';
    htmlBadges += `
      <button 
        class="color-badge ${activeClass}" 
        style="background: ${color.hex}" 
        data-name="${color.name}" 
        data-hex="${color.hex}">
      </button>
    `;
  });

  detailView.innerHTML = `
    <div class="ozon-detail-layout">
      <div class="ozon-large-img-box" id="large-img-box" style="background: ${defaultColor.hex}">
        <span class="ozon-large-text">${product.size} мм</span>
      </div>
      
      <div class="ozon-details-info">
        <h2>${product.name}</h2>
        <p class="ozon-selected-color">Выбранный цвет: <span id="ozon-color-name">${defaultColor.name}</span></p>
        
        <div class="ozon-color-picker">
          ${htmlBadges}
        </div>
        
        <div class="ozon-large-price">${product.price}</div>
        <button class="btn-ozon-order">Заказать эту приманку</button>
      </div>
    </div>
  `;

  const badges = detailView.querySelectorAll('.color-badge');
  const largeImgBox = detailView.querySelector('#large-img-box') as HTMLElement;
  const colorNameText = detailView.querySelector('#ozon-color-name') as HTMLElement;

  badges.forEach(badge => {
    badge.addEventListener('click', () => {
      badges.forEach(b => b.classList.remove('active'));
      badge.classList.add('active');

      const name = badge.getAttribute('data-name') || '';
      const hex = badge.getAttribute('data-hex') || '';

      if (largeImgBox) largeImgBox.style.background = hex;
      if (colorNameText) colorNameText.innerText = name;
    });
  });

  detailView.querySelector('.btn-ozon-order')?.addEventListener('click', () => {
    playCastSound();
    productPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
  });
}

function showMainPage(): void {
  if (!mainPage || !productPage) return;
  productPage.classList.add('hidden');
  mainPage.classList.remove('hidden');
}

btnBack?.addEventListener('click', showMainPage);

navCatalogLink?.addEventListener('click', (e: Event) => {
  e.preventDefault();
  showMainPage();
  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
});

const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
  btn.addEventListener('click', (e: Event) => {
    filterButtons.forEach(b => b.classList.remove('active'));
    const target = e.target as HTMLButtonElement;
    target.classList.add('active');
    const size = target.getAttribute('data-size') || 'all';
    renderMainCatalog(size);
  });
});

renderMainCatalog('all');
