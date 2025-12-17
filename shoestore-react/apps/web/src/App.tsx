import { type MouseEventHandler, useState } from 'react'

import '@my-app/ui-library/dist/index.css'
import { ProductCatalog, type Product } from '@my-app/ui-library'

import './App.css'

type View = 'catalog' | 'product' | 'cart'

type CartItem = {
  id: string
  product: Product
}

const products: Product[] = [
  {
    id: '1',
    title: 'Кроссовки Nike W AIR ZOOM PEGASUS 41 SE',
    description: 'Лёгкие беговые кроссовки с амортизацией Air Zoom, подходят для тренировок и повседневной носки.',
    price: 20990,
    imageUrl: 'https://avatars.mds.yandex.net/get-mpic/15242005/img_id3780048994985185153.jpeg/optimize'
  },
  {
    id: '2',
    title: 'Кроссовки Nike WMNS AIR MAX 90 NN',
    description: 'Амортизационная система AIR MAX на основе воздушных вставок помогает справиться с ударными нагрузками, обеспечивая необходимую защиту.',
    price: 16490,
    imageUrl: 'https://avatars.mds.yandex.net/get-mpic/15419534/img_id7951864692354829226.jpeg/optimize'
  },
  {
    id: '3',
    title: 'Кеды Puma Club II Era',
    description: 'Кроссовки PUMA Club II Era воплощают наследие архивных коллекций футбольной обуви, но представлены в современном дизайне из мягкой замши и кожи.',
    price: 7199,
    imageUrl: 'https://avatars.mds.yandex.net/get-mpic/16430688/img_id24540000894949583.jpeg/optimize'
  },
  {
    id: '4',
    title: 'Полусапоги Abricot',
    description: 'Тёплые полусапоги для осени и зимы.',
    price: 4380,
    imageUrl: 'https://avatars.mds.yandex.net/get-mpic/15243415/2a000001988268ef14701382f4363b437367/optimize'
  }
]

const productCharacteristics: Record<string, string[]> = {
  '1': [
    'Бренд: Nike',
    'Модель: W AIR ZOOM PEGASUS 41 SE',
    'Тип: беговые кроссовки',
    'Материал: текстиль / синтетические материалы',
    'Назначение: тренировки и повседневная носка'
  ],
  '2': [
    'Бренд: Nike',
    'Модель: WMNS AIR MAX 90 NN',
    'Тип: кроссовки на каждый день',
    'Материал: искусственная кожа и текстиль',
    'Амортизация: система AIR MAX'
  ],
  '3': [
    'Бренд: Puma',
    'Модель: Club II Era',
    'Тип: кеды в винтажном стиле',
    'Материал: мягкая замша и кожа',
    'Назначение: прогулки по городу'
  ],
  '4': [
    'Бренд: Abricot',
    'Тип: тёплые полусапоги',
    'Материал: верх — искусственная кожа, подклад — утеплитель',
    'Сезон: осень / зима',
    'Особенности: удобная колодка для повседневной носки'
  ]
}

const getCharacteristics = (product: Product): string[] => {
  return productCharacteristics[product.id] ?? [
    'Материал: натуральная кожа / текстиль',
    'Размеры: 36–45',
    'Производитель: ShoeStore'
  ]
}

function App() {
  const [view, setView] = useState<View>('catalog')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const itemsCount = cartItems.length
  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price, 0)

  const handleOpenCatalog: MouseEventHandler<HTMLButtonElement> = () => {
    setView('catalog')
  }

  const handleOpenCart: MouseEventHandler<HTMLButtonElement> = () => {
    setView('cart')
  }

  const handleProductClick = (product: Product): void => {
    setSelectedProduct(product)
    setView('product')
  }

  const handleAddToCart = (product: Product): void => {
    setCartItems(prev => [
      ...prev,
      {
        id: `${product.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        product
      }
    ])
  }

  const handleRemoveFromCart = (id: string): void => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handleBackToCatalog: MouseEventHandler<HTMLButtonElement> = () => {
    setView('catalog')
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__top">
          <button
            type="button"
            className="app-logo"
            onClick={handleOpenCatalog}
          >
            ShoeStore
          </button>

          <nav className="app-nav">
            <button
              type="button"
              className={`app-nav__link ${view === 'catalog' ? 'app-nav__link--active' : ''}`}
              onClick={handleOpenCatalog}
            >
              Каталог
            </button>
          </nav>

          <button
            type="button"
            className="app-cart"
            onClick={handleOpenCart}
          >
            <span className="app-cart__label">
              Корзина
            </span>
            <span className="app-cart__info">
              {itemsCount}
              {' '}
              шт ·
              {' '}
              {totalPrice.toFixed(2)}
              {' '}
              ₽
            </span>
          </button>
        </div>
      </header>

      <main className="app-main">
        {view === 'catalog' && (
          <section className="section">
            <h2>Каталог обуви</h2>
            <ProductCatalog
              products={products}
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
            />
          </section>
        )}

        {view === 'product' && selectedProduct && (
          <section className="section">
            <h2>Карточка товара</h2>

            <button
              type="button"
              className="product-page__back-button"
              onClick={handleBackToCatalog}
            >
              ← Назад в каталог
            </button>

            <div className="product-page">
              <div className="product-page__image">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  className="product-page__image-el"
                />
              </div>

              <div className="product-page__details">
                <h3>{selectedProduct.title}</h3>
                <p className="product-page__price">
                  {selectedProduct.price.toFixed(0)}
                  {'\u00A0₽'}
                </p>
                <p>{selectedProduct.description}</p>

                <h4>Характеристики</h4>
                <ul>
                  {getCharacteristics(selectedProduct).map(char => (
                    <li key={char}>{char}</li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="product-card__button"
                  onClick={() => handleAddToCart(selectedProduct)}
                >
                  Добавить в корзину
                </button>
              </div>
            </div>
          </section>
        )}

        {view === 'cart' && (
          <section className="section">
            <h2>Корзина</h2>

            {cartItems.length === 0 ? (
              <p>Корзина пуста</p>
            ) : (
              <>
                <ul className="cart-page__list">
                  {cartItems.map(item => (
                    <li
                      key={item.id}
                      className="cart-page__item"
                    >
                      <span className="cart-page__item-title">
                        {item.product.title}
                      </span>
                      <span className="cart-page__item-price">
                        {item.product.price.toFixed(0)}
                        {'\u00A0₽'}
                      </span>
                      <button
                        type="button"
                        className="cart-page__remove-button"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Удалить
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="cart-page__summary">
                  <span>
                    Итого:
                    {' '}
                    {itemsCount}
                    {' '}
                    шт ·
                    {' '}
                    {totalPrice.toFixed(2)}
                    {' '}
                    ₽
                  </span>
                </div>
              </>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default App