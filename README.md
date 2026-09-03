# Phénix Assainissement — site vitrine

Site vitrine professionnel, moderne et responsive pour **Phénix Assainissement**.
Construit avec **Vite + Tailwind CSS v4** et déployé automatiquement sur **GitHub Pages**.

## 🚀 Démarrage

```bash
npm install      # installer les dépendances (une seule fois)
npm run dev      # serveur de développement → http://localhost:5173
npm run build    # générer le site optimisé dans dist/
npm run preview  # prévisualiser le build de production
```

## 🌐 Mise en ligne sur GitHub Pages (à faire une seule fois)

1. Poussez le code sur GitHub (branche `main` ou `master`).
2. Dans le dépôt : **Settings → Pages → Build and deployment → Source = « GitHub Actions »**.
3. À chaque `git push`, le workflow `.github/workflows/deploy.yml` reconstruit et
   publie le site automatiquement.
4. Le site sera disponible sur :
   **https://omgh18.github.io/Phenix_website/**

> 💡 **Domaine personnalisé** (ex. `www.phenix-assainissement.fr`) : ajoutez-le dans
> Settings → Pages, puis remplacez `base: '/Phenix_website/'` par `base: '/'` dans
> `vite.config.js`.

## ✏️ Ce qu'il reste à personnaliser

Tout ce qui est à remplacer est signalé par le symbole **⚠️** dans le code.

| Élément | Où | Actuellement |
|---|---|---|
| **Logo** | En-tête + pied de page (`index.html`), `public/favicon.svg`, `public/og-image.svg` | Placeholder « phénix » |
| **Téléphone** | `index.html` (liens `tel:`) + `favicon`/JSON-LD | `01 23 45 67 89` |
| **E-mail** | `index.html` (liens `mailto:`) | `contact@phenix-assainissement.fr` |
| **Adresse** | Section contact + pied de page + JSON-LD | `12 rue de l'Exemple, 75000 Paris` |
| **Zone d'intervention** | Section `#zone` | Île-de-France (exemple) |
| **Chiffres clés** | Attributs `data-count` du hero | 15 ans / 8000 / 98 % |
| **Avis clients** | Section `#avis` | Témoignages exemples |
| **Formulaire** | Attribut `action` du `<form>` | Voir ci-dessous |
| **Photos** | Zones « Photo à insérer » | Placeholders |

### 📮 Faire fonctionner le formulaire de contact

GitHub Pages héberge des fichiers statiques : il ne peut pas traiter un formulaire
côté serveur. Solution gratuite recommandée : **[Formspree](https://formspree.io)**.

1. Créez un compte, créez un formulaire, récupérez votre identifiant.
2. Dans `index.html`, remplacez `action="https://formspree.io/f/VOTRE_ID"` par votre URL.

### 🖼️ Remplacer le logo

- **En-tête / pied de page** : cherchez `<!-- LOGO (placeholder` dans `index.html`
  et remplacez le bloc `<svg>` par une balise `<img src="./mon-logo.svg" ... />`
  (placez le fichier dans `public/`).
- **Favicon & image de partage** : remplacez `public/favicon.svg` et
  `public/og-image.svg`.

## 🎨 Stack technique

- **Vite 8** — build ultra-rapide, CSS/JS optimisés
- **Tailwind CSS v4** — design system dans `src/style.css` (`@theme`)
- **JavaScript vanilla** — menu, animations au scroll, compteurs, FAQ (`src/main.js`)
- **Polices auto-hébergées** (Sora + Inter) — performance et conformité RGPD
- **SEO** — meta tags, Open Graph, données structurées `LocalBusiness`
- **Accessibilité** — HTML sémantique, focus visibles, `prefers-reduced-motion`
