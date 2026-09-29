/* =====================================================================
   CONTENU DU SITE — Quentin PERSON
   ---------------------------------------------------------------------
   C'est le SEUL fichier à modifier pour ajouter ou changer du contenu.
   Le site se reconstruit tout seul à partir de ces listes.

   ➜ Ajouter une vidéo / un projet : copier un bloc { ... } dans PROJECTS,
     le coller en haut de la liste, puis changer les textes.
   ➜ Ajouter une image dans la galerie : ajouter une ligne dans GALLERY.
   ➜ Les images vont dans le dossier  assets/img/
   ➜ Pour une vidéo YouTube, il suffit de l'identifiant :
     https://youtu.be/P3rBxPYOgHA  →  youtube: "P3rBxPYOgHA"
     (la vignette est chargée automatiquement si "cover" est vide)
   ===================================================================== */

window.SITE = {
  name: "Quentin Person",
  email: "personquentin700@gmail.com",
  phone: "06 51 28 48 06",
  linkedin: "https://www.linkedin.com/in/quentin-person/",
  cv: "assets/docs/CV_Quentin_PERSON.pdf",
  portfolioPdf: "assets/docs/Portfolio_Quentin_PERSON_2026.pdf",
  alternance: "Master Directeur artistique Motion design · LISAA Paris · 2026 – 2027",
  disciplines: ["Motion design", "Vidéo", "3D", "Graphisme", "Direction artistique", "Création de contenu", "Digital"],
};

/* ---------------------------------------------------------------------
   PROJETS
   category : "montage" | "motion" | "3d" | "contenu" | "design"
              (plusieurs possibles : ["motion","3d"])
   featured : true  → apparaît aussi dans « Projets à la une »
   --------------------------------------------------------------------- */
window.PROJECTS = [
  {
    id: "mg-prod",
    title: "MG Prod · Fit & Fun",
    kicker: "Podcast",
    year: "",
    category: ["montage"],
    featured: true,
    youtube: "P3rBxPYOgHA",
    cover: "assets/img/yt-P3rBxPYOgHA.webp",
    summary: "Montage d'un podcast réalisé à partir de rushs, entièrement seul.",
    description: "Sélection des meilleurs moments, rythme de la discussion entre les trois intervenants, habillage et effets pour garder l'attention du spectateur du début à la fin.",
    role: "Réalisé seul",
    skills: ["Montage vidéo", "Motion design", "VFX / SFX", "Habillage"],
    tools: ["Premiere Pro", "After Effects", "Blender"],
    accent: "#FF6FAE",
  },
  {
    id: "eva-stadium",
    title: "EVA Stadium",
    kicker: "Motion 3D · stage",
    year: "2026",
    category: ["motion", "3d"],
    featured: true,
    youtube: "AqYTQAIX0yU",
    cover: "assets/img/yt-AqYTQAIX0yU.webp",
    summary: "Motion design réalisé pendant mon stage chez EVA Stadium, dans l'univers gaming et VR.",
    description: "Vidéo destinée à être projetée dans les salles EVA. Réalisée entièrement seul : modélisation 3D, animation, lumière et mise en scène.",
    role: "Stage · réalisé seul",
    skills: ["Motion design", "3D", "3D mapping"],
    tools: ["Blender", "After Effects"],
    accent: "#4C6BFF",
  },
  {
    id: "innovation-lab-motion",
    title: "Innovation Lab · Motions",
    kicker: "Projet de groupe",
    year: "2025",
    category: ["motion", "contenu"],
    featured: true,
    youtube: "R8VcxbqhzdQ",
    extraVideos: [{ youtube: "MctOrA6uZME", label: "Motion didactique 2" }],
    cover: "assets/img/yt-R8VcxbqhzdQ.webp",
    summary: "Supports numériques et vidéo du projet Innovation Lab : motions didactiques et contenus pour les réseaux sociaux.",
    description: "Projet réalisé en groupe. Je me suis principalement occupé de la partie supports numériques et vidéo : vidéos TikTok / Instagram en format vertical, interviews YouTube en format paysage et deux motions didactiques.",
    role: "Supports numériques & vidéo",
    skills: ["Motion design", "Montage", "Création de contenu", "Travail en équipe"],
    tools: ["After Effects", "Premiere Pro", "DaVinci Resolve"],
    link: { label: "Voir la présentation Innovation Lab", url: "https://personquentin700.my.canva.site" },
    accent: "#2F55D4",
  },
  {
    id: "innovation-lab-interview",
    title: "Innovation Lab · Interview",
    kicker: "Interview",
    year: "2025",
    category: ["montage", "contenu"],
    youtube: "uIAQieItChQ",
    cover: "assets/img/yt-uIAQieItChQ.webp",
    summary: "Interview étudiante : montage et habillage vidéo.",
    description: "Tournage réalisé en groupe. J'ai réalisé le montage et l'habillage vidéo : sélection des propos, rythme, sous-titres en anglais et habillage aux couleurs d'Innovation Lab.",
    role: "Montage & habillage",
    skills: ["Interview", "Tournage", "Montage", "Habillage", "Travail en équipe"],
    tools: ["DaVinci Resolve", "Premiere Pro", "After Effects"],
  },
  {
    id: "mini-cv",
    title: "Mini CV vidéo",
    kicker: "Projet personnel",
    year: "",
    category: ["3d", "montage"],
    featured: true,
    youtube: "Zv0g-LTNb48",
    cover: "assets/img/cv-scene.webp",
    summary: "Projet personnel pour présenter mes vidéos et mon univers créatif.",
    description: "Une chambre rétro modélisée en 3D : ordinateur, post-it, affiches et illustrations au mur. Chaque détail renvoie à un projet.",
    role: "Projet personnel",
    skills: ["3D", "Storytelling", "Montage"],
    tools: ["Blender", "Photoshop"],
  },
  {
    id: "sncf",
    title: "SNCF · Éco-mobilité",
    kicker: "Motion flat design",
    year: "",
    category: ["motion"],
    featured: true,
    youtube: "ix2qFUPcq3U",
    cover: "assets/img/yt-ix2qFUPcq3U.webp",
    summary: "Motion design en flat design sur l'impact du carburant et l'intérêt du train.",
    description: "Message court, sous-titré et compréhensible sans le son.",
    skills: ["Motion design", "Flat design", "Communication visuelle"],
    tools: ["After Effects"],
  },
  {
    id: "teaser-festival",
    title: "Teaser festival",
    kicker: "Motion typographique",
    year: "",
    category: ["motion"],
    youtube: "89hMC05G4Rk",
    cover: "assets/img/yt-89hMC05G4Rk.webp",
    summary: "Teaser typographique pour un festival de musique.",
    description: "Annonce de la billetterie avec un rythme adapté à l'énergie de l'événement.",
    skills: ["Motion design", "Typographie", "Animation"],
    tools: ["After Effects"],
  },
  {
    id: "redbull",
    title: "Projet vidéo Red Bull",
    kicker: "Court métrage",
    year: "",
    category: ["montage", "3d"],
    youtube: "41y0VRqXE6c",
    cover: "assets/img/cover-redbull.webp",
    summary: "Projet vidéo autour de Red Bull : court métrage et travail de shading 3D.",
    description: "Court métrage mêlant vidéo et éléments 3D, avec un travail de shading.",
    skills: ["Montage", "3D", "Shading"],
    tools: ["Premiere Pro", "Blender"],
  },
  {
    id: "logo-animation",
    title: "Animation de logo",
    kicker: "Motion",
    year: "",
    category: ["motion"],
    youtube: "Y2vZ9pLlVHc",
    cover: "assets/img/yt-Y2vZ9pLlVHc.webp",
    summary: "Animation d'un logo.",
    description: "Révélation animée d'un logo : rythme, transitions et mise en valeur de l'identité.",
    skills: ["Motion design", "Animation de logo"],
    tools: ["After Effects"],
  },
  {
    id: "innovation-lab-identite",
    title: "Innovation Lab · Identité",
    kicker: "Identité visuelle",
    year: "2025",
    category: ["design"],
    cover: "assets/img/cover-innovation.webp",
    summary: "Identité visuelle et design system d'Innovation Lab, pensés pour un usage réel.",
    description: "Projet mené en équipe sur 14 semaines : logo, design system, supports print et digitaux. Je me suis principalement occupé des supports numériques et de la vidéo.",
    role: "Projet de groupe · 14 semaines",
    skills: ["Identité visuelle", "Design system", "Supports digitaux"],
    tools: ["Suite Adobe"],
    link: { label: "Voir la présentation complète", url: "https://personquentin700.my.canva.site" },
  },
  {
    id: "socotec-ui",
    title: "SOCOTEC · UI design",
    kicker: "Interface · stage",
    year: "2026",
    category: ["design"],
    cover: "assets/img/ui-socotec.webp",
    summary: "Conception des écrans d'une application de supervision de capteurs.",
    description: "Hiérarchie visuelle claire pour des données techniques, composants cohérents et réutilisables, maquettes Figma puis intégration front-end.",
    role: "Stage",
    skills: ["UI", "UX", "Webdesign", "Intégration"],
    tools: ["Figma", "VS Code"],
  },
];

/* ---------------------------------------------------------------------
   GALERIE (images) — group : "3d" | "illustration" | "affiche"
   src : image grand format / thumb : petite image (facultatif)
   --------------------------------------------------------------------- */
window.GALLERY = [
  { group: "3d", title: "Dragon", src: "assets/img/3d-dragon.webp" },
  { group: "3d", title: "Haches", src: "assets/img/3d-haches.webp" },
  { group: "3d", title: "Épée double", src: "assets/img/3d-epee.webp" },
  { group: "3d", title: "Puits", src: "assets/img/3d-puits.webp" },
  { group: "3d", title: "Créature", src: "assets/img/3d-creature.webp" },
  { group: "3d", title: "Robot", src: "assets/img/3d-robot.webp" },
  { group: "3d", title: "Robot · lumière rouge", src: "assets/img/3d-robot-rouge.webp" },
  { group: "3d", title: "Cristal", src: "assets/img/3d-cristal.webp" },
  { group: "3d", title: "Terrain", src: "assets/img/3d-terrain.webp" },
  { group: "3d", title: "Chope", src: "assets/img/3d-chope.webp" },
  { group: "3d", title: "Bouteilles", src: "assets/img/3d-bouteilles.webp" },
  { group: "3d", title: "Shading", src: "assets/img/3d-shading.webp" },

  { group: "illustration", title: "Pirate", src: "assets/img/illu-pirate.webp" },
  { group: "illustration", title: "Dragon rouge", src: "assets/img/illu-dragon-rouge.webp" },
  { group: "illustration", title: "Squelette", src: "assets/img/illu-squelette.webp" },
  { group: "illustration", title: "Dragon violet", src: "assets/img/illu-dragon-violet.webp" },
  { group: "illustration", title: "Serpent", src: "assets/img/illu-serpent.webp" },
  { group: "illustration", title: "Dragon d'os", src: "assets/img/illu-dragon-os.webp" },
  { group: "illustration", title: "Araignée", src: "assets/img/illu-araignee.webp" },
  { group: "illustration", title: "Personnage", src: "assets/img/illu-rousse.webp" },
  { group: "illustration", title: "Fan art", src: "assets/img/illu-scraggy.webp" },
  { group: "illustration", title: "Chevalier", src: "assets/img/illu-chevalier.webp" },
  { group: "illustration", title: "06", src: "assets/img/illu-06.webp" },

  { group: "affiche", title: "Musée Zoo", src: "assets/img/affiche-zoo.webp" },
  { group: "affiche", title: "Musée zoologique bizarre", src: "assets/img/affiche-bizarre.webp" },
  { group: "affiche", title: "Shark Attack", src: "assets/img/affiche-shark.webp" },
];

/* ---------------------------------------------------------------------
   PARCOURS
   --------------------------------------------------------------------- */
window.EXPERIENCES = [
  { year: "2026", title: "EVA Stadium", place: "Strasbourg", type: "Stage", text: "Motion design 3D projeté dans les salles, montage vidéo, 3D mapping." },
  { year: "2026", title: "SOCOTEC Monitoring", place: "Paris", type: "Stage", text: "Motion design, vidéos de communication, UI design et intégration web." },
  { year: "2025", title: "Innovation Lab", place: "", type: "Projet de groupe", text: "Supports numériques et vidéo : motions, interviews, formats verticaux." },
  { year: "2025", title: "JonD Academy", place: "", type: "Stage", text: "Montage vidéo et motion design, création de visuels." },
  { year: "2024", title: "KSK Prod", place: "Strasbourg", type: "Stage", text: "Post-production : montage, exports multi-formats, titres animés." },
];
window.EDUCATION = [
  { year: "2026 – 2027", title: "Master Directeur artistique Motion design", place: "LISAA Paris · en alternance" },
  { year: "2023 – 2026", title: "BUT MMI · diplômé", place: "IUT de Haguenau · spécialisation graphique" },
  { year: "2022 – 2023", title: "BUT Réseaux & Télécoms · 1re année", place: "IUT de Colmar" },
  { year: "2022", title: "Baccalauréat général", place: "Lycée du Haut-Barr, Saverne" },
];

window.TOOLS = ["After Effects", "Premiere Pro", "DaVinci Resolve", "Photoshop", "Illustrator", "InDesign", "Lightroom", "Blender", "Figma", "VS Code"];
