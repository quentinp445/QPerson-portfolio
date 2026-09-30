# Portfolio — Quentin Person

Site : https://quentinp445.github.io/QPerson-portfolio/

## Fichiers

```
index.html      → la page
style.css       → le design (couleurs en haut du fichier)
main.js         → animations et interactions (ne pas modifier)
content.js      → TOUT le contenu modifiable (projets, galerie, compétences, parcours)
assets/img/     → images (.webp conseillé, 1800 px max)
assets/docs/    → CV et portfolio PDF
```

## Ajouter un projet vidéo (directement sur GitHub)

1. Ouvrir `content.js` → icône crayon.
2. Dans `window.WORKS`, copier un bloc `{ ... },` et le coller en haut de la liste.
3. Modifier `id` (unique, sans espace), `title`, `kicker`, `summary`, `description`,
   `youtube` (https://youtu.be/ABC123 → "ABC123"), `category`, `skills`, `tools`.
   `cover: ""` = vignette YouTube automatique. L'ordre de la liste = l'ordre dans la grille (4 colonnes, toutes les vignettes ont la même taille).
4. « Commit changes ». Le site se met à jour en 1 à 2 minutes.

## Ajouter une image

1. Envoyer l'image dans `assets/img/` (Add file → Upload files).
2. Dans `content.js`, ajouter une ligne dans `window.GALLERY` :
   `{ group: "illustration", title: "Mon dessin", src: "assets/img/mon-dessin.webp" },`
   (`group` : "illustration", "affiche" ou "3d")

Les textes du profil (compétences, parcours, langues, outils) sont aussi dans `content.js`.

## Mettre à jour le CV / le portfolio PDF

Remplacer le fichier dans `assets/docs/` par un fichier du **même nom**.
