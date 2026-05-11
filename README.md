# Acurave — Site Next.js

Landing page complète pour Acurave. Stack : Next.js 14 (App Router), TypeScript, Tailwind CSS.

## Structure

```
app/
  layout.tsx        → Font Montserrat + metadata SEO
  page.tsx          → Assembly des sections
  globals.css       → Reset, animations, scrollbar

components/
  StarField.tsx     → Particules interactives (souris + touch) + curseur custom
  WaveHero.tsx      → Hero avec ondes animées + lettres en fadeUp
  Nav.tsx           → Navigation + toggle FR/EN
  Manifeste.tsx     → Section identité / manifeste
  Roster.tsx        → Grille artistes (placeholder)
  DemoForm.tsx      → Formulaire de soumission de démo
  Newsletter.tsx    → Inscription événements
  Footer.tsx        → Pied de page

tailwind.config.ts  → Font + animations custom
```

## Installation

```bash
# Copier les fichiers dans ton projet existant
cp -r components/ ton-projet/components/
cp app/page.tsx ton-projet/app/page.tsx
cp app/layout.tsx ton-projet/app/layout.tsx
cp app/globals.css ton-projet/app/globals.css
cp tailwind.config.ts ton-projet/tailwind.config.ts
```

## Connexions à faire

### Formulaire démo (DemoForm.tsx)
```tsx
// Remplacer le handleSubmit par un appel à ton API
const handleSubmit = async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  await fetch('/api/demo', { method: 'POST', body: formData })
  setSent(true)
}
```

### Newsletter (Newsletter.tsx)
```tsx
// Brancher sur Brevo / Mailchimp
await fetch('/api/newsletter', {
  method: 'POST',
  body: JSON.stringify({ email }),
})
```

### Ajouter des artistes (Roster.tsx)
```tsx
const artists = [
  { name: 'Nom Artiste', genre: 'Électronique' },
  // ...
]
// Remplacer les slots par un map sur artists
```

## Mobile
- Layout responsive : 1 colonne sur mobile, 2 colonnes sur desktop
- Curseur custom masqué sur mobile (hidden md:block)
- Touch events actifs sur les particules
- Hero adaptatif : clamp(36px, 8vw, 60px) pour le titre
