import './style.scss'
import { productsData } from './products' // ИМПОРТИРУЕМ НАШ ВЫНЕСЕННЫЙ МАССИВ

// Настройка дубового и надежного аудио-плеера
const castSound = new Audio('./cast.mp3');

function playCastSound(): void {
  castSound.currentTime = 0;
  castSound.volume = 1.0; 
  castSound.play().catch(() => {});
}

// Разблокировка звукового контекста браузера по самому первому щелчку
document.addEventListener('click', () => {
  castSound.play().then(() => {
    castSound.pause();
    castSound.currentTime = 0;
  }).catch(() => {});
}, { once: true });

// Доступ к элементам HTML-разметки
const mainPage = document.getElementById('main-page');
const productPage = document.getElementById('product-page');
const productGrid = document.getElementById('product-grid');
const detailView = document.getElementById('product-detail-view');
const btnBack = document.getElementById('btn-back-to-catalog');
const navCatalogLink = document.getElementById('nav-catalog-link');
const burgerBtn = document.getElementById('burger-menu-btn');
const headerNav = document.getElementById('header-nav');

// Клик по бургеру — со звуком лески!
burgerBtn?.addEventListener('click', () => {
  playCastSound(); 
  burgerBtn.classList.toggle('open');
  headerNav?.classList.toggle('open');
});

// Клик по ссылкам и соцсетям внутри шторки — со звуком лески!
const allMenuElements = headerNav?.querySelectorAll('a');
allMenuElements?.forEach(element => {
  element.addEventListener('click', () => {
    playCastSound();
    burgerBtn?.classList.remove('open');
    headerNav?.classList.remove('open');
  });
});

// Дополнительно вешаем звук заброса на соцсети в подвале сайта
document.querySelectorAll('.footer .social-link').forEach(link => {
  link.addEventListener('click', () => {
    playCastSound();
  });
});

// Отрисовка витрины каталога
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
      <div class="base-img-stub" style="background-image: url('./product-bg.png'); background-size: contain; background-position: center; background-repeat: no-repeat;"></div>
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

// Страница товара (стиль карточки Ozon)
function openProductPage(productId: string): void {
  const product = productsData.find(p => p.id === productId);
  if (!product || !detailView || !mainPage || !productPage) return;

  mainPage.classList.add('hidden');
  productPage.classList.remove('hidden');
  window.scrollTo({ top: 0 });

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
      <div class="ozon-large-img-box" id="large-img-box" style="background-color: ${defaultColor.hex}; background-image: url('./product-bg.png'); background-repeat: no-repeat; background-position: center; background-size: contain;">
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

  // Клик по ЛЮБОМУ кружочку палитры — со звуком лески!
  badges.forEach(badge => {
    badge.addEventListener('click', () => {
      playCastSound(); // Добавили "Вжух!" при выборе цвета приманки
      badges.forEach(b => b.classList.remove('active'));
      badge.classList.add('active');

      const name = badge.getAttribute('data-name') || '';
      const hex = badge.getAttribute('data-hex') || '';

      if (largeImgBox) {
        largeImgBox.style.backgroundColor = hex;
        largeImgBox.style.backgroundImage = "url('./product-bg.png')";
      }
      if (colorNameText) colorNameText.innerText = name;
    });
  });

  // Клик по финальной кнопке заказа — со звуком лески!
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
  window.scrollTo({ top: 0 });
}

// Клик по кнопке Назад — со звуком!
btnBack?.addEventListener('click', () => {
  playCastSound();
  showMainPage();
});

navCatalogLink?.addEventListener('click', (e: Event) => {
  e.preventDefault();
  playCastSound();
  showMainPage();
  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
});

renderMainCatalog('all');
