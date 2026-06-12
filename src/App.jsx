import { useState } from 'react'
import photo from '/matheus.jpg'

const CONTACT = {
  firstName: 'Matheus',
  lastName: 'Pessoa',
  title: 'CTO',
  org: 'Sous Clinic',
  phoneDisplay: '+55 (81) 99832-7146',
  phoneRaw: '+5581998327146',
  emails: [
    { label: 'Corporativo', value: 'matheus@sousclinic.com', type: 'WORK' },
    { label: 'Pessoal', value: 'matheuspessoa.tech@gmail.com', type: 'HOME' },
  ],
}

function buildVCard() {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${CONTACT.lastName};${CONTACT.firstName};;;`,
    `FN:${CONTACT.firstName} ${CONTACT.lastName}`,
    `ORG:${CONTACT.org}`,
    `TITLE:${CONTACT.title}`,
    `TEL;TYPE=CELL,VOICE:${CONTACT.phoneRaw}`,
    ...CONTACT.emails.map((e) => `EMAIL;TYPE=INTERNET,${e.type}:${e.value}`),
    'END:VCARD',
  ]
  return lines.join('\r\n')
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8.5" r="3.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5.5 19a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M19 7v4M21 9h-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export default function App() {
  const [saved, setSaved] = useState(false)

  function handleSaveContact() {
    const blob = new Blob([buildVCard()], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Matheus Pessoa.vcf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 1500)
    setSaved(true)
    setTimeout(() => setSaved(false), 2600)
  }

  return (
    <main className="stage">
      <div className="grain" aria-hidden="true" />
      <article className="card">
        <header className="card__head">
          <span className="card__eyebrow">Cartão de apresentação</span>
          <span className="card__monogram">MP</span>
        </header>

        <div className="portrait">
          <div className="portrait__ring" aria-hidden="true" />
          <img className="portrait__img" src={photo} alt="Matheus Pessoa" />
        </div>

        <div className="identity">
          <h1 className="identity__name">Matheus Pessoa</h1>
          <p className="identity__role">
            <span className="identity__title">Chief Technology Officer</span>
            <span className="identity__divider" aria-hidden="true" />
            <span className="identity__org">Sous Clinic</span>
          </p>
        </div>

        <button className="cta" onClick={handleSaveContact} aria-live="polite">
          <span className="cta__icon">
            <ContactIcon />
          </span>
          <span className="cta__label">{saved ? 'Contato adicionado' : 'Adicionar à agenda'}</span>
        </button>

        <ul className="links">
          <li>
            <a className="link" href={`tel:${CONTACT.phoneRaw}`}>
              <span className="link__icon">
                <PhoneIcon />
              </span>
              <span className="link__body">
                <span className="link__label">Telefone</span>
                <span className="link__value">{CONTACT.phoneDisplay}</span>
              </span>
            </a>
          </li>
          {CONTACT.emails.map((e) => (
            <li key={e.value}>
              <a className="link" href={`mailto:${e.value}`}>
                <span className="link__icon">
                  <MailIcon />
                </span>
                <span className="link__body">
                  <span className="link__label">{e.label}</span>
                  <span className="link__value">{e.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <footer className="card__foot">
          <span className="card__foot-line" aria-hidden="true" />
          <span className="card__foot-text">Sous Clinic · Tecnologia</span>
        </footer>
      </article>
    </main>
  )
}
