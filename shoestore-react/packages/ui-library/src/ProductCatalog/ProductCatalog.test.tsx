import { render, screen } from '@testing-library/react'

import { ProductCatalog } from './ProductCatalog'

import type { Product } from '../ProductCard/ProductCard'

const products: Product[] = [
  {
    id: '1',
    title: 'Товар 1',
    description: 'Описание 1',
    price: 1000,
    imageUrl: 'image1.jpg'
  },
  {
    id: '2',
    title: 'Товар 2',
    description: 'Описание 2',
    price: 2000,
    imageUrl: 'image2.jpg'
  }
]

describe('ProductCatalog', () => {
  test('показывает сообщение, если каталог пуст', () => {
    render(<ProductCatalog products={[]} />)

    expect(screen.getByText(/каталог пуст/i)).toBeInTheDocument()
  })

  test('рендерит карточки товаров', () => {
    render(<ProductCatalog products={products} />)

    expect(screen.getByText('Товар 1')).toBeInTheDocument()
    expect(screen.getByText('Товар 2')).toBeInTheDocument()
  })
})