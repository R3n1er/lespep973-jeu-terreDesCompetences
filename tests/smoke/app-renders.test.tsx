import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '@/App'

describe('App', () => {
  it('rend le header et les boutons de base', () => {
    render(<App />)
    expect(
      screen.getByText(/Terres de Compétences/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Démarrer le développement/i })
    ).toBeInTheDocument()
  })
})

