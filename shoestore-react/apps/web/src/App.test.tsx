import { fireEvent, render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  test('открывает карточку из каталога и добавляет товар в корзину', () => {
    render(<App />)

    // По умолчанию виден каталог обуви
    expect(
      screen.getByRole('heading', { name: /каталог обуви/i, level: 2 })
    ).toBeInTheDocument()

    // Кликаем по первому товару в каталоге

    const firstProductTitle = screen.getByRole('heading', {
      name: /кроссовки nike w air zoom pegasus 41 se/i,
      level: 3
    })

    fireEvent.click(firstProductTitle)

    // Открылась страница "Карточка товара"
    expect(
      screen.getByRole('heading', { name: /карточка товара/i, level: 2 })
    ).toBeInTheDocument()

    // Добавляем товар в корзину

    const addToCartButton = screen.getByRole('button', {
      name: /добавить в корзину/i
    })

    fireEvent.click(addToCartButton)

    // В шапке у корзины появился 1 товар

    const cartButton = screen.getByRole('button', { name: /корзина/i })

    expect(cartButton).toHaveTextContent(/1 шт/i)
  })
})