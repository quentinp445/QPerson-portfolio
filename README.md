# Portfolio — Quentin Person

Site : https://quentinp445.github.io/QPerson-portfolio/

## Structure

```
index.html              → la page (sections, textes fixes)
assets/js/content.js    → TOUT le contenu modifiable (projets, galerie, parcours)
assets/js/main.js       → animations et interactions (ne pas modifier)
assets/css/style.css    → design (couleurs en haut du fichier)
assets/img/             → images (format .webp conseillé)
assets/docs/            → CV et portfolio PDF
assets/models/          → modèle 3D (.glb)
```

## Ajouter un projet vidéo (2 minutes, directement sur GitHub)

1. Ouvrir `assets/js/content.js` → icône crayon (Edit).
2. Dans `window.PROJECTS`, copier un bloc `{ ... },` existant et le coller en haut de la liste.
3. Modifier :
   - `id` : un nom unique sans espace (ex. `"clip-rap"`)
   - `title`, `kicker`, `year`, `summary`, `description`
   - `youtube` : l'identifiant de la vidéo (`https://youtu.be/ABC123` → `"ABC123"`)
   - `cover` : laisser `""` pour utiliser la vignette YouTube automatiquement
   - `category` : `"montage"`, `"motion"`, `"3d"`, `"contenu"` ou `"design"`
   - `skills` et `tools` : listes entre crochets
   - `featured: true` pour l'afficher aussi dans « Projets à la une »
4. « Commit changes ». Le site se met à jour en 1 à 2 minutes.

## Ajouter une image dans la galerie

1. Envoyer l'image dans `assets/img/` (Add file → Upload files).
   Conseil : 1800 px de large maximum, format .webp ou .jpg.
2. Dans `content.js`, ajouter une ligne dans `window.GALLERY` :
   `{ group: "3d", title: "Mon rendu", src: "assets/img/mon-rendu.webp" },`
   (`group` : `"3d"`, `"illustration"` ou `"affiche"`)

## Mettre à jour le CV ou le portfolio PDF

Remplacer `assets/docs/CV_Quentin_PERSON.pdf` ou `assets/docs/Portfolio_Quentin_PERSON_2026.pdf`
par un fichier du **même nom**.

## Changer les couleurs

En haut de `assets/css/style.css` : `--accent` (rouge), `--bg` (fond).
