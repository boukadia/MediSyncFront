# MediSync Front - Bootstrap Integration

## 🎨 Bootstrap a été intégré avec succès !

### 📦 Packages installés

```json
{
  "bootstrap": "^5.3.x",
  "react-bootstrap": "^2.x.x",
  "@popperjs/core": "^2.x.x"
}
```

### ✅ Modifications effectuées

1. **Installation des dépendances Bootstrap**
   - Bootstrap CSS
   - React-Bootstrap (composants React)
   - Popper.js (pour les tooltips, popovers, etc.)

2. **Configuration globale** (`src/main.tsx`)
   ```tsx
   import 'bootstrap/dist/css/bootstrap.min.css'
   import './custom.css'
   ```

3. **Composants mis à jour avec Bootstrap**
   - ✅ `Navbar.tsx` - Navigation avec thème clair/sombre
   - ✅ `Hero.tsx` - Section héros responsive
   - ✅ `Testimonial.tsx` - Cards de témoignages
   - ✅ `Footer.tsx` - Footer moderne
   - ✅ `LoginForm.tsx` - Formulaire de connexion complet

4. **Composants UI Bootstrap** (`src/components/ui/`)
   - ✅ `Button.tsx` - Wrapper pour Bootstrap Button
   - ✅ `Input.tsx` - Input avec validation
   - ✅ `Select.tsx` - Select personnalisé
   - ✅ `Modal.tsx` - Modal Bootstrap
   - ✅ `Spinner.tsx` - Loading spinner

### 🎯 Utilisation des composants

#### Button
```tsx
import Button from './components/ui/Button';

<Button variant="primary" size="lg">
  Cliquez ici
</Button>
```

#### Input
```tsx
import Input from './components/ui/Input';

<Input
  type="email"
  label="Email"
  placeholder="votre@email.com"
  error={errors.email}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

#### Select
```tsx
import Select from './components/ui/Select';

<Select label="Pays" value={country} onChange={handleChange}>
  <option value="">Sélectionnez</option>
  <option value="fr">France</option>
  <option value="us">États-Unis</option>
</Select>
```

#### Modal
```tsx
import Modal from './components/ui/Modal';

<Modal show={show} onHide={handleClose} title="Titre du modal">
  <p>Contenu du modal</p>
</Modal>
```

### 🎨 Classes Bootstrap utiles

#### Layout & Spacing
```tsx
// Container
<Container> ou <Container fluid>

// Grid System
<Row>
  <Col md={6} lg={4}>Contenu</Col>
</Row>

// Spacing (m=margin, p=padding)
className="mt-3 mb-4 p-2"  // margin-top, margin-bottom, padding
className="mx-auto"         // margin horizontal auto (centrer)
className="py-5"            // padding vertical
```

#### Couleurs & Typographie
```tsx
// Couleurs de texte
className="text-primary text-muted text-danger"

// Couleurs de fond
className="bg-light bg-dark bg-primary"

// Tailles de texte
className="display-1 display-4 lead"

// Poids de police
className="fw-bold fw-normal"
```

#### Flexbox
```tsx
className="d-flex justify-content-between align-items-center"
className="d-flex flex-column gap-3"
```

#### Responsive
```tsx
// Affichage responsive
className="d-none d-md-block"  // Caché sur mobile, visible sur tablette+

// Colonnes responsive
<Col xs={12} md={6} lg={4}>  // 12 colonnes mobile, 6 tablette, 4 desktop
```

### 🚀 Commandes

```bash
# Démarrer le serveur de développement
npm run dev

# Build pour production
npm run build

# Lint
npm run lint
```

### 📚 Documentation Bootstrap

- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
- [React-Bootstrap Documentation](https://react-bootstrap.github.io/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

### 🎨 Thème clair/sombre

Le thème est géré via `data-bs-theme` attribute:
```tsx
document.documentElement.setAttribute('data-bs-theme', 'dark');
```

### 💡 Conseils

1. **Utilisez les composants React-Bootstrap** au lieu des classes HTML natives
2. **Évitez le CSS personnalisé** - utilisez les utilitaires Bootstrap
3. **Responsive First** - pensez mobile d'abord avec les classes responsive
4. **Consistance** - utilisez toujours les mêmes variants (primary, secondary, etc.)

### 🗑️ Fichiers CSS supprimés/ignorés

Les fichiers CSS personnalisés suivants ne sont plus nécessaires :
- ❌ `App.css`
- ❌ `home.css`
- ❌ `index.css`

Tout le style est maintenant géré par Bootstrap et `custom.css` (minimal).

---

Développé avec ❤️ par Mustapha Boukadi
