/* =====================================================================
   CONTENU DU SITE — Quentin Person
   ---------------------------------------------------------------------
   Seul fichier à modifier pour changer ou ajouter du contenu.
   Le site se reconstruit à partir de ces listes.

   Ajouter une réalisation : copier un bloc { ... } dans WORKS et le
   coller à l'endroit voulu (l'ordre de la liste = l'ordre sur le site).
   Vidéo YouTube : https://youtu.be/P3rBxPYOgHA  ->  youtube: "P3rBxPYOgHA"
   Images : dossier assets/img/
   ===================================================================== */

window.SITE = {
  name: "Quentin Person",
  email: "personquentin700@gmail.com",
  phone: "06 51 28 48 06",
  phoneLink: "+33651284806",
  linkedin: "https://www.linkedin.com/in/quentin-person/",
  cv: "assets/docs/CV_Quentin_PERSON.pdf",
  portfolioPdf: "assets/docs/Portfolio_Quentin_PERSON_2026.pdf",
  city: "Paris",
};

/* ---------------------------------------------------------------------
   RÉALISATIONS — dans l'ordre d'affichage
   type : texte court affiché sous le titre (ex. "Motion 3D")
   --------------------------------------------------------------------- */
window.WORKS = [
  {
    id: "eva-stadium",
    title: "EVA Stadium",
    type: "Motion design · 3D",
    year: "2026",
    context: "Stage",
    youtube: "AqYTQAIX0yU",
    cover: "assets/img/yt-AqYTQAIX0yU.webp",
    summary: "Motion design projeté dans les salles EVA, dans l'univers gaming et VR.",
    description: "Vidéo réalisée entièrement seul pendant mon stage chez EVA Stadium : modélisation 3D, animation, lumière et mise en scène, pour une diffusion en projection dans les salles.",
    skills: ["Motion design", "3D", "3D mapping"],
    tools: ["Blender", "After Effects"],
  },
  {
    id: "mg-prod",
    title: "MG Prod — Fit & Fun",
    type: "Montage · podcast",
    year: "",
    context: "Réalisé seul",
    youtube: "P3rBxPYOgHA",
    cover: "assets/img/yt-P3rBxPYOgHA.webp",
    summary: "Montage d'un podcast à trois voix, réalisé à partir des rushs.",
    description: "Sélection des meilleurs moments, rythme de la discussion entre les trois intervenants, habillage, effets visuels et sonores pour garder l'attention du début à la fin.",
    skills: ["Montage vidéo", "Motion design", "VFX / SFX", "Habillage"],
    tools: ["Premiere Pro", "After Effects", "Blender"],
  },
  {
    id: "innovation-lab-motion",
    title: "Innovation Lab",
    type: "Motion design · contenus",
    year: "2025",
    context: "Projet de groupe",
    youtube: "R8VcxbqhzdQ",
    extraVideos: [{ youtube: "MctOrA6uZME", label: "Motion 2" }],
    cover: "assets/img/yt-R8VcxbqhzdQ.webp",
    summary: "Deux motions didactiques et les contenus vidéo du projet.",
    description: "Projet réalisé en groupe sur 14 semaines. J'ai pris en charge les supports numériques et la vidéo : vidéos TikTok / Instagram en format vertical, interviews YouTube en format paysage et deux motions didactiques.",
    skills: ["Motion design", "Montage", "Création de contenu", "Travail en équipe"],
    tools: ["After Effects", "Premiere Pro", "DaVinci Resolve"],
    link: { label: "Présentation complète", url: "https://personquentin700.my.canva.site" },
  },
  {
    id: "sncf",
    title: "SNCF — Éco-mobilité",
    type: "Motion design · flat design",
    year: "",
    context: "Projet d'école",
    youtube: "ix2qFUPcq3U",
    cover: "assets/img/yt-ix2qFUPcq3U.webp",
    summary: "L'impact du carburant et l'intérêt du train, en quelques secondes.",
    description: "Motion design en flat design. Message court, sous-titré et compréhensible sans le son.",
    skills: ["Motion design", "Flat design", "Communication visuelle"],
    tools: ["After Effects"],
  },
  {
    id: "mini-cv",
    title: "Mini CV vidéo",
    type: "3D · montage",
    year: "2026",
    context: "Projet personnel",
    youtube: "Zv0g-LTNb48",
    cover: "assets/img/cv-scene.webp",
    summary: "Une chambre rétro modélisée en 3D pour présenter mon univers.",
    description: "Ordinateur, post-it, affiches et illustrations au mur : chaque détail de la scène renvoie à un projet. Modélisation et éclairage dans Blender, textures et visuels dans Photoshop.",
    skills: ["3D", "Storytelling", "Montage"],
    tools: ["Blender", "Photoshop"],
  },
  {
    id: "innovation-lab-interview",
    title: "Interview étudiante",
    type: "Montage · habillage",
    year: "2025",
    context: "Innovation Lab",
    youtube: "uIAQieItChQ",
    cover: "assets/img/yt-uIAQieItChQ.webp",
    summary: "Montage et habillage d'une interview tournée en groupe.",
    description: "Tournage réalisé en groupe. J'ai réalisé le montage et l'habillage vidéo : sélection des propos, rythme, sous-titres en anglais et habillage aux couleurs d'Innovation Lab.",
    skills: ["Interview", "Tournage", "Montage", "Habillage"],
    tools: ["DaVinci Resolve", "Premiere Pro", "After Effects"],
  },
  {
    id: "teaser-festival",
    title: "Teaser festival",
    type: "Motion typographique",
    year: "",
    context: "",
    youtube: "89hMC05G4Rk",
    cover: "assets/img/yt-89hMC05G4Rk.webp",
    summary: "Annonce de billetterie pour un festival de musique.",
    description: "Teaser typographique dont le rythme suit l'énergie de l'événement.",
    skills: ["Motion design", "Typographie", "Animation"],
    tools: ["After Effects"],
  },
  {
    id: "socotec-ui",
    title: "SOCOTEC — Supervision",
    type: "UI / UX · web",
    year: "2026",
    context: "Stage",
    youtube: "",
    cover: "assets/img/ui-socotec.webp",
    summary: "Les écrans d'une application de supervision de capteurs.",
    description: "Hiérarchie visuelle claire pour des données techniques, composants cohérents et réutilisables, maquettes Figma puis intégration front-end.",
    skills: ["UI", "UX", "Webdesign", "Intégration"],
    tools: ["Figma", "VS Code"],
  },
  {
    id: "logo-animation",
    title: "Animation de logo",
    type: "Motion design",
    year: "",
    context: "",
    youtube: "Y2vZ9pLlVHc",
    cover: "assets/img/yt-Y2vZ9pLlVHc.webp",
    summary: "Révélation animée d'un logo.",
    description: "Rythme, transitions et mise en valeur de l'identité.",
    skills: ["Motion design", "Animation de logo"],
    tools: ["After Effects"],
  },
  {
    id: "redbull",
    title: "Red Bull",
    type: "Vidéo · 3D",
    year: "",
    context: "",
    youtube: "41y0VRqXE6c",
    cover: "assets/img/cover-redbull.webp",
    summary: "Court métrage et travail de shading 3D.",
    description: "Court métrage mêlant vidéo et éléments 3D, avec un travail de shading.",
    skills: ["Montage", "3D", "Shading"],
    tools: ["Premiere Pro", "Blender"],
  },
  {
    id: "innovation-lab-identite",
    title: "Innovation Lab — Identité",
    type: "Identité visuelle",
    year: "2025",
    context: "Projet de groupe",
    youtube: "",
    cover: "assets/img/cover-innovation.webp",
    summary: "Logo, design system et supports print et digitaux.",
    description: "Identité visuelle et design system pensés pour un usage réel, déclinés sur supports print et digitaux.",
    skills: ["Identité visuelle", "Design system"],
    tools: ["Suite Adobe", "Figma"],
    link: { label: "Présentation complète", url: "https://personquentin700.my.canva.site" },
  },
];

/* ---------------------------------------------------------------------
   IMAGES & PRINT (partie secondaire)
   group : "illustration" | "affiche" | "3d"
   --------------------------------------------------------------------- */
window.GALLERY = [
  { group: "3d", title: "Dragon", src: "assets/img/3d-dragon.webp" },
  { group: "3d", title: "Haches", src: "assets/img/3d-haches.webp" },
  { group: "3d", title: "Épée double", src: "assets/img/3d-epee.webp" },
  { group: "3d", title: "Puits", src: "assets/img/3d-puits.webp" },
  { group: "3d", title: "Créature", src: "assets/img/3d-creature.webp" },
  { group: "3d", title: "Robot", src: "assets/img/3d-robot-rouge.webp" },
  { group: "3d", title: "Cristal", src: "assets/img/3d-cristal.webp" },
  { group: "3d", title: "Terrain", src: "assets/img/3d-terrain.webp" },
  { group: "affiche", title: "Musée Zoo", src: "assets/img/affiche-zoo.webp" },
  { group: "affiche", title: "Musée zoologique bizarre", src: "assets/img/affiche-bizarre.webp" },
  { group: "affiche", title: "Shark Attack", src: "assets/img/affiche-shark.webp" },
  { group: "illustration", title: "Pirate", src: "assets/img/illu-pirate.webp" },
  { group: "illustration", title: "Dragon rouge", src: "assets/img/illu-dragon-rouge.webp" },
  { group: "illustration", title: "Squelette", src: "assets/img/illu-squelette.webp" },
  { group: "illustration", title: "Dragon violet", src: "assets/img/illu-dragon-violet.webp" },
  { group: "illustration", title: "Serpent", src: "assets/img/illu-serpent.webp" },
  { group: "illustration", title: "Dragon d'os", src: "assets/img/illu-dragon-os.webp" },
  { group: "illustration", title: "Araignée", src: "assets/img/illu-araignee.webp" },
  { group: "illustration", title: "Personnage", src: "assets/img/illu-rousse.webp" },
];

/* ---------------------------------------------------------------------
   COMPÉTENCES (grille 3 × 3)
   --------------------------------------------------------------------- */
window.SKILLS = [
  { title: "Motion design", text: "Motions didactiques, typographie animée, flat design, animation de logo.", tools: "After Effects" },
  { title: "Vidéo & montage", text: "Podcast, interview, court métrage : rythme, habillage, VFX, son.", tools: "Premiere Pro · DaVinci Resolve" },
  { title: "3D", text: "Modélisation, texturing, lumière et rendu. 3D mapping.", tools: "Blender" },
  { title: "Graphisme", text: "Affiches, supports print, illustration et peinture numérique.", tools: "Photoshop · Illustrator · InDesign" },
  { title: "Direction artistique", text: "Univers visuels cohérents, identité, design system.", tools: "Suite Adobe · Figma" },
  { title: "UI / UX", text: "Interfaces claires pour des données techniques, composants réutilisables.", tools: "Figma" },
  { title: "Web", text: "Intégration front-end, sites et supports digitaux.", tools: "HTML · CSS · JS · VS Code" },
  { title: "Création de contenu", text: "Formats verticaux et horizontaux : TikTok, Reels, Shorts, YouTube.", tools: "Premiere Pro · After Effects" },
  { title: "Communication digitale", text: "Déclinaison d'un message sur les réseaux sociaux, le web et l'événementiel.", tools: "Suite Adobe" },
];

/* ---------------------------------------------------------------------
   PARCOURS (timelines horizontales)
   --------------------------------------------------------------------- */
window.EXPERIENCES = [
  { year: "2024", title: "KSK Prod", place: "Strasbourg · stage", text: "Post-production, exports, titres animés." },
  { year: "2025", title: "JonD Academy", place: "Stage", text: "Montage vidéo, motion design, visuels." },
  { year: "2025", title: "Innovation Lab", place: "Projet de groupe", text: "Motions, interviews, formats verticaux." },
  { year: "2026", title: "SOCOTEC Monitoring", place: "Paris · stage", text: "Motion, vidéos de communication, UI et web." },
  { year: "2026", title: "EVA Stadium", place: "Strasbourg · stage", text: "Motion 3D projeté en salle, 3D mapping." },
];
window.EDUCATION = [
  { year: "2022", title: "Baccalauréat général", place: "Lycée du Haut-Barr, Saverne" },
  { year: "2022 — 2023", title: "BUT Réseaux & Télécoms", place: "IUT de Colmar · 1re année" },
  { year: "2023 — 2026", title: "BUT MMI", place: "IUT de Haguenau · diplômé" },
  { year: "2026 — 2027", title: "Master DA Motion design", place: "LISAA Paris" },
];

window.TOOLS = ["After Effects", "Premiere Pro", "DaVinci Resolve", "Blender", "Photoshop", "Illustrator", "InDesign", "Lightroom", "Figma", "VS Code"];
window.LANGS = [["Français", "Langue maternelle"], ["Anglais", "C1"], ["Allemand", "B1"]];
