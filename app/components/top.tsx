'use client'

import Link from 'next/link'
import { CSSProperties } from 'react'

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
  },
  optionsContainer: {
    display: 'flex',
    gap: '2rem',
  },
  option: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  button: {
    width: '128px',
    height: '128px',
    backgroundColor: '#3182ce',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.3s',
  },
  icon: {
    width: '64px',
    height: '64px',
    fill: 'white',
  },
}

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" style={styles.icon}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
)

export default function Component() {
  return (
    <div style={styles.container}>
      <div style={styles.optionsContainer}>
        <div style={styles.option}>
          <h2 style={styles.title}>観光客</h2>
          {/* tourist-login */}
          <Link href="/tourist-login" passHref>
            <div style={styles.button}>
              <PersonIcon />
            </div>
          </Link>
        </div>
        <div style={styles.option}>
          <h2 style={styles.title}>地域</h2>
          {/* municipality-login */}
          <Link href="/municipality-login" passHref>
            <div style={styles.button}>
              <PersonIcon />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
