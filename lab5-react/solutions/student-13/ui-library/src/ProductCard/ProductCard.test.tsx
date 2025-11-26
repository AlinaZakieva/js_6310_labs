import { fireEvent, render, screen } from '@testing-library/react'

import { ProductCard, type Product } from './ProductCard'

describe('ProductCard', () => {
  const baseProduct: Product = {
    id: '1',
    title: 'Тестовый товар',
    description: 'Описание товара',
    price: 1999,
    imageUrl: 'https://example.com/image.jpg'
  }

  test('рендерит данные товара', () => {
    const handleAddToCart = jest.fn()

    render(
      <ProductCard
        product={baseProduct}
        onAddToCart={handleAddToCart}
      />
    )

    expect(screen.getByText('Тестовый товар')).toBeInTheDocument()
    expect(screen.getByText('Описание товара')).toBeInTheDocument()
    // В разметке сейчас обычный пробел, без NBSP
    expect(screen.getByText('1999 ₽')).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: /тестовый товар/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /добавить в корзину/i })
    ).toBeInTheDocument()
  })

  test('вызывает onAddToCart при клике', () => {
    const handleAddToCart = jest.fn()

    render(
      <ProductCard
        product={baseProduct}
        onAddToCart={handleAddToCart}
      />
    )

    const button = screen.getByRole('button', {
      name: /добавить в корзину/i
    })

    fireEvent.click(button)

    expect(handleAddToCart).toHaveBeenCalledTimes(1)
    expect(handleAddToCart).toHaveBeenCalledWith(baseProduct)
  })

  test('не показывает описание, если его нет', () => {
    const handleAddToCart = jest.fn()

    const productWithoutDescription: Product = {
      ...baseProduct,
      description: undefined
    }

    render(
      <ProductCard
        product={productWithoutDescription}
        onAddToCart={handleAddToCart}
      />
    )

    // Если описания нет, строка baseProduct.description точно не должна появиться
    expect(
      screen.queryByText(baseProduct.description ?? '')
    ).not.toBeInTheDocument()
  })
})