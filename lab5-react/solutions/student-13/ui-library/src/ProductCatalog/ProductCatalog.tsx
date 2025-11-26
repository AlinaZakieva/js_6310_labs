import './ProductCatalog.css'

import { ProductCard } from '../ProductCard/ProductCard'

import type { Product } from '../ProductCard/ProductCard'

export type ProductCatalogProps = {
  products: Product[]
  onAddToCart?: (product: Product) => void
  onProductClick?: (product: Product) => void
}

export function ProductCatalog({
  products,
  onAddToCart,
  onProductClick
}: ProductCatalogProps) {
  const safeOnAddToCart = onAddToCart ?? (() => {})

  if (products.length === 0) {
    return (
      <section
        aria-label="Каталог товаров"
        className="product-catalog"
      >
        <p className="product-catalog__empty">
          Каталог пуст
        </p>
      </section>
    )
  }

  return (
    <section
      aria-label="Каталог товаров"
      className="product-catalog"
    >
      <div className="product-catalog__grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={safeOnAddToCart}
            onClick={onProductClick}
          />
        ))}
      </div>
    </section>
  )
}