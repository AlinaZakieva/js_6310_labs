import './ProductCard.css'

export type Product = {
  id: string
  title: string
  description?: string
  price: number
  imageUrl: string
}

export type ProductCardProps = {
  product: Product
  onAddToCart: (product: Product) => void
  onClick?: (product: Product) => void
}

export function ProductCard(props: ProductCardProps) {
  const { product, onAddToCart, onClick } = props
  const { title, description, price, imageUrl } = product

  const handleCardClick = (): void => {
    if (onClick) {
      onClick(product)
    }
  }

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation()
    onAddToCart(product)
  }

  return (
    <article
      className="product-card"
      style={{ cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      <div className="product-card__image-wrapper">
        <img
          src={imageUrl}
          alt={title}
          className="product-card__image"
        />
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">
          {title}
        </h3>

        {description && (
          <p className="product-card__description">
            {description}
          </p>
        )}

        <div className="product-card__footer">
          <span className="product-card__price">
            {price.toFixed(0)}
            {'\u00A0₽'}
          </span>

          <button
            type="button"
            className="product-card__button"
            onClick={handleAddClick}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </article>
  )
}