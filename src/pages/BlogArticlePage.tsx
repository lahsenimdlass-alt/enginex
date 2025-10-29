import { ArrowLeft, Calendar, Clock, Share2, Tractor, HardHat, Newspaper } from 'lucide-react';

type BlogArticlePageProps = {
  onNavigate: (page: string, params?: any) => void;
  category?: string;
  id?: string;
};

export function BlogArticlePage({ onNavigate, category = 'agricole', id = '' }: BlogArticlePageProps) {
  const articles: Record<string, any> = {
    'comment-choisir-un-tracteur': {
      category: 'agricole',
      title: 'Comment choisir un tracteur adapté à votre exploitation',
      date: '15 Janvier 2025',
      readTime: '8 min',
      image: 'https://images.pexels.com/photos/164186/pexels-photo-164186.jpeg',
      content: `
        <p>Le choix d'un tracteur est une décision importante qui peut significativement impacter la productivité de votre exploitation agricole. Voici les critères essentiels à considérer.</p>

        <h2>1. Déterminez la taille de votre exploitation</h2>
        <p>La superficie de vos terres est le premier critère à prendre en compte :</p>
        <ul>
          <li><strong>Moins de 10 hectares :</strong> Un tracteur compact de 30-50 CV suffit largement</li>
          <li><strong>10 à 50 hectares :</strong> Optez pour un tracteur de 50-100 CV</li>
          <li><strong>Plus de 50 hectares :</strong> Privilégiez un tracteur de 100 CV et plus</li>
        </ul>

        <h2>2. Analysez vos besoins spécifiques</h2>
        <p>Chaque exploitation a des besoins particuliers :</p>
        <ul>
          <li><strong>Cultures céréalières :</strong> Tracteur puissant avec bonne capacité de traction</li>
          <li><strong>Maraîchage :</strong> Tracteur compact et maniable pour travailler entre les rangs</li>
          <li><strong>Élevage :</strong> Tracteur polyvalent avec chargeur frontal</li>
        </ul>

        <h2>3. Budget et financement</h2>
        <p>Le prix d'un tracteur varie considérablement :</p>
        <ul>
          <li><strong>Tracteur neuf :</strong> À partir de 300 000 MAD pour un modèle d'entrée de gamme</li>
          <li><strong>Tracteur d'occasion :</strong> Entre 100 000 et 250 000 MAD selon l'année et l'état</li>
          <li><strong>Solutions de financement :</strong> Crédit agricole, leasing, subventions gouvernementales</li>
        </ul>

        <h2>4. Les marques recommandées au Maroc</h2>
        <p>Plusieurs marques sont reconnues pour leur fiabilité :</p>
        <ul>
          <li><strong>John Deere :</strong> Leader mondial, excellent réseau de service au Maroc</li>
          <li><strong>New Holland :</strong> Bon rapport qualité-prix, très populaire</li>
          <li><strong>Massey Ferguson :</strong> Robuste et facile d'entretien</li>
          <li><strong>Case IH :</strong> Performances élevées pour grandes exploitations</li>
        </ul>

        <h2>5. Points de vérification avant l'achat</h2>
        <p>Que ce soit neuf ou d'occasion, vérifiez :</p>
        <ul>
          <li>Les heures de fonctionnement (idéalement moins de 5000h pour l'occasion)</li>
          <li>L'état du moteur et de la transmission</li>
          <li>La disponibilité des pièces de rechange</li>
          <li>Le réseau de service après-vente dans votre région</li>
          <li>Les garanties proposées</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Le choix d'un tracteur doit être mûrement réfléchi. N'hésitez pas à consulter d'autres agriculteurs de votre région et à essayer plusieurs modèles avant de prendre votre décision. Sur EngineX Maroc, vous trouverez une large sélection de tracteurs neufs et d'occasion adaptés à tous les budgets.</p>
      `,
    },
    'marques-de-tracteurs-populaires': {
      category: 'agricole',
      title: 'Les marques de tracteurs les plus populaires au Maroc',
      date: '12 Janvier 2025',
      readTime: '10 min',
      image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg',
      content: `
        <p>Le marché marocain des tracteurs agricoles est dominé par plusieurs marques internationales reconnues. Découvrez leurs forces et spécificités.</p>

        <h2>John Deere - Le leader incontesté</h2>
        <p><strong>Points forts :</strong></p>
        <ul>
          <li>Technologie de pointe et innovation constante</li>
          <li>Excellent réseau de concessionnaires au Maroc (Casablanca, Rabat, Marrakech, Fès)</li>
          <li>Service après-vente réactif</li>
          <li>Valeur de revente élevée</li>
        </ul>
        <p><strong>Gammes populaires :</strong> Série 5E (50-75 CV), Série 6M (110-140 CV)</p>
        <p><strong>Prix indicatif :</strong> À partir de 450 000 MAD</p>

        <h2>New Holland - Le best-seller marocain</h2>
        <p><strong>Points forts :</strong></p>
        <ul>
          <li>Excellent rapport qualité-prix</li>
          <li>Large gamme adaptée aux petites et grandes exploitations</li>
          <li>Pièces détachées facilement disponibles</li>
          <li>Consommation de carburant optimisée</li>
        </ul>
        <p><strong>Gammes populaires :</strong> Série T4 (75-105 CV), Série T6 (110-145 CV)</p>
        <p><strong>Prix indicatif :</strong> À partir de 380 000 MAD</p>

        <h2>Massey Ferguson - La robustesse légendaire</h2>
        <p><strong>Points forts :</strong></p>
        <ul>
          <li>Conception robuste et durable</li>
          <li>Entretien simple et économique</li>
          <li>Parfait pour conditions difficiles</li>
          <li>Grande communauté d'utilisateurs au Maroc</li>
        </ul>
        <p><strong>Gammes populaires :</strong> Série 5700 (65-90 CV), Série 6700 (95-130 CV)</p>
        <p><strong>Prix indicatif :</strong> À partir de 360 000 MAD</p>

        <h2>Case IH - Pour les professionnels exigeants</h2>
        <p><strong>Points forts :</strong></p>
        <ul>
          <li>Performances exceptionnelles</li>
          <li>Technologie avancée</li>
          <li>Confort de conduite supérieur</li>
          <li>Idéal pour grandes surfaces</li>
        </ul>
        <p><strong>Gammes populaires :</strong> Farmall série C (75-115 CV), Puma série (165-240 CV)</p>
        <p><strong>Prix indicatif :</strong> À partir de 500 000 MAD</p>

        <h2>Comment choisir entre ces marques ?</h2>
        <p>Voici quelques recommandations selon votre profil :</p>
        <ul>
          <li><strong>Budget limité :</strong> Massey Ferguson ou New Holland d'occasion</li>
          <li><strong>Petit agriculteur :</strong> New Holland T4 ou John Deere 5E</li>
          <li><strong>Exploitation moyenne :</strong> John Deere 6M ou New Holland T6</li>
          <li><strong>Grande exploitation :</strong> Case IH Puma ou John Deere série 7</li>
        </ul>

        <h2>Disponibilité des pièces et service</h2>
        <p>Un critère souvent négligé mais crucial :</p>
        <ul>
          <li><strong>John Deere :</strong> Meilleur réseau, pièces disponibles sous 24-48h</li>
          <li><strong>New Holland :</strong> Très bon réseau, prix des pièces raisonnables</li>
          <li><strong>Massey Ferguson :</strong> Pièces compatibles avec plusieurs modèles</li>
          <li><strong>Case IH :</strong> Réseau en développement, pièces haut de gamme</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Toutes ces marques offrent d'excellents tracteurs. Le choix dépend de votre budget, de vos besoins spécifiques et de la proximité d'un concessionnaire. Consultez les annonces sur EngineX Maroc pour comparer les modèles disponibles dans votre région.</p>
      `,
    },
    'entretenir-son-moteur-agricole': {
      category: 'agricole',
      title: 'Guide d\'entretien pour prolonger la vie de votre engin agricole',
      date: '8 Janvier 2025',
      readTime: '12 min',
      image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg',
      content: `
        <p>Un entretien régulier peut multiplier par deux la durée de vie de votre tracteur. Voici un guide complet des opérations à effectuer.</p>

        <h2>Entretien quotidien (avant chaque utilisation)</h2>
        <ul>
          <li><strong>Vérification visuelle :</strong> Fuites d'huile, de carburant ou de liquide de refroidissement</li>
          <li><strong>Niveau d'huile moteur :</strong> Vérifier et compléter si nécessaire</li>
          <li><strong>Pression des pneus :</strong> Cruciale pour la stabilité et la consommation</li>
          <li><strong>Nettoyage du filtre à air :</strong> Surtout en conditions poussiéreuses</li>
          <li><strong>Graissage des points critiques :</strong> Rotules, axes de direction</li>
        </ul>

        <h2>Entretien hebdomadaire (toutes les 50 heures)</h2>
        <ul>
          <li><strong>Nettoyage complet :</strong> Enlever boue et débris végétaux</li>
          <li><strong>Vérification des courroies :</strong> Tension et usure</li>
          <li><strong>Contrôle du liquide de refroidissement :</strong> Niveau et couleur</li>
          <li><strong>Inspection des connexions électriques :</strong> Nettoyer si corrosion</li>
          <li><strong>Test des freins :</strong> Efficacité et réglage</li>
        </ul>

        <h2>Entretien mensuel (toutes les 200 heures)</h2>
        <ul>
          <li><strong>Changement de l'huile moteur :</strong> Avec le filtre à huile</li>
          <li><strong>Remplacement du filtre à carburant :</strong> Essentiel pour la longévité du moteur</li>
          <li><strong>Contrôle de la batterie :</strong> Charge et état des cosses</li>
          <li><strong>Vérification du système hydraulique :</strong> Niveau et qualité de l'huile</li>
          <li><strong>Inspection des flexibles :</strong> Remplacer si craquelés</li>
        </ul>

        <h2>Entretien saisonnier (tous les 6 mois)</h2>
        <ul>
          <li><strong>Vidange complète du système hydraulique :</strong> Tous les 1000 heures</li>
          <li><strong>Remplacement du filtre à air :</strong> Si très encrassé</li>
          <li><strong>Contrôle de la transmission :</strong> Niveau et qualité de l'huile</li>
          <li><strong>Révision du système de refroidissement :</strong> Détartrage si nécessaire</li>
          <li><strong>Inspection complète des pneus :</strong> Usure et dommages</li>
        </ul>

        <h2>Entretien annuel (révision complète)</h2>
        <ul>
          <li><strong>Diagnostic électronique :</strong> Vérification de tous les systèmes</li>
          <li><strong>Contrôle de la géométrie :</strong> Parallélisme et équilibrage</li>
          <li><strong>Révision du moteur :</strong> Compression et injecteurs</li>
          <li><strong>Test complet de sécurité :</strong> Freins, éclairage, signalisation</li>
          <li><strong>Mise à jour logicielle :</strong> Si tracteur moderne avec électronique</li>
        </ul>

        <h2>Conseils pratiques pour économiser</h2>
        <ul>
          <li><strong>Achetez en gros :</strong> Filtres et huiles en quantité pour réduire les coûts</li>
          <li><strong>Apprenez les bases :</strong> Changement d'huile et filtres vous-même</li>
          <li><strong>Tenez un carnet d'entretien :</strong> Pour suivre toutes les opérations</li>
          <li><strong>Anticipez les pannes :</strong> Remplacez avant rupture complète</li>
          <li><strong>Stockage hivernal :</strong> Protégez votre tracteur pendant l'arrêt</li>
        </ul>

        <h2>Coûts d'entretien annuels estimés</h2>
        <ul>
          <li><strong>Tracteur compact (30-50 CV) :</strong> 8 000 - 12 000 MAD/an</li>
          <li><strong>Tracteur moyen (50-100 CV) :</strong> 15 000 - 25 000 MAD/an</li>
          <li><strong>Tracteur puissant (100+ CV) :</strong> 30 000 - 50 000 MAD/an</li>
        </ul>

        <h2>Signes d'alerte à ne jamais ignorer</h2>
        <ul>
          <li>Fumée excessive (blanche, noire ou bleue)</li>
          <li>Bruits anormaux du moteur ou de la transmission</li>
          <li>Perte de puissance inexpliquée</li>
          <li>Consommation excessive de carburant</li>
          <li>Vibrations inhabituelles</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Un entretien régulier représente un investissement minimal comparé au coût d'une panne majeure ou d'un remplacement prématuré. Suivez ce calendrier et votre tracteur vous servira fidèlement pendant des décennies. Pour toute question technique, n'hésitez pas à consulter la communauté EngineX Maroc.</p>
      `,
    },
    'comparatif-bulldozer-pelle': {
      category: 'btp',
      title: 'Bulldozer vs Pelle mécanique : lequel choisir pour votre chantier ?',
      date: '18 Janvier 2025',
      readTime: '9 min',
      image: 'https://images.pexels.com/photos/1106468/pexels-photo-1106468.jpeg',
      content: `
        <p>Le choix entre un bulldozer et une pelle mécanique dépend de la nature de vos travaux. Voici une analyse comparative détaillée.</p>

        <h2>Le Bulldozer : Le maître du terrassement</h2>
        <p><strong>Avantages :</strong></p>
        <ul>
          <li>Puissance exceptionnelle pour pousser de grandes quantités de terre</li>
          <li>Stabilité parfaite sur terrain accidenté</li>
          <li>Idéal pour nivellement et préparation de terrain</li>
          <li>Coût d'exploitation relativement faible</li>
          <li>Maintenance simple</li>
        </ul>
        <p><strong>Inconvénients :</strong></p>
        <ul>
          <li>Limité en termes de polyvalence</li>
          <li>Ne peut pas creuser en profondeur</li>
          <li>Mobilité réduite</li>
          <li>Transport difficile et coûteux</li>
        </ul>

        <h2>La Pelle Mécanique : La polyvalence incarnée</h2>
        <p><strong>Avantages :</strong></p>
        <ul>
          <li>Extrêmement polyvalente (excavation, levage, démolition)</li>
          <li>Capacité de creuser en profondeur</li>
          <li>Précision dans les travaux délicats</li>
          <li>Grande mobilité, notamment sur pneus</li>
          <li>Accessoires multiples disponibles</li>
        </ul>
        <p><strong>Inconvénients :</strong></p>
        <ul>
          <li>Moins efficace pour pousser de grandes quantités</li>
          <li>Maintenance plus complexe et coûteuse</li>
          <li>Nécessite un opérateur qualifié</li>
          <li>Prix d'achat plus élevé</li>
        </ul>

        <h2>Comparaison par type de projet</h2>

        <h3>Terrassement de grande surface</h3>
        <p><strong>Gagnant : Bulldozer</strong></p>
        <p>Pour préparer un terrain de plusieurs hectares, le bulldozer est imbattable en termes de productivité et de coût.</p>

        <h3>Excavation de fondations</h3>
        <p><strong>Gagnant : Pelle mécanique</strong></p>
        <p>La précision et la capacité de creuser en profondeur font de la pelle le choix évident.</p>

        <h3>Construction de routes</h3>
        <p><strong>Égalité (selon la phase)</strong></p>
        <p>Bulldozer pour le décapage et nivellement initial, pelle pour les tranchées et l'excavation précise.</p>

        <h3>Démolition</h3>
        <p><strong>Gagnant : Pelle mécanique</strong></p>
        <p>Avec les accessoires adaptés (pince de démolition, brise-roche), la pelle est plus polyvalente.</p>

        <h3>Aménagement paysager</h3>
        <p><strong>Gagnant : Pelle mécanique</strong></p>
        <p>La précision et la polyvalence sont essentielles pour ces travaux délicats.</p>

        <h2>Comparaison des coûts au Maroc</h2>

        <h3>Bulldozer</h3>
        <ul>
          <li><strong>Neuf (petit modèle) :</strong> 800 000 - 1 200 000 MAD</li>
          <li><strong>Neuf (moyen) :</strong> 1 500 000 - 2 500 000 MAD</li>
          <li><strong>Occasion (10 ans) :</strong> 400 000 - 800 000 MAD</li>
          <li><strong>Location journalière :</strong> 3 000 - 5 000 MAD</li>
        </ul>

        <h3>Pelle Mécanique</h3>
        <ul>
          <li><strong>Neuf (12-15 tonnes) :</strong> 900 000 - 1 400 000 MAD</li>
          <li><strong>Neuf (20-25 tonnes) :</strong> 1 600 000 - 2 800 000 MAD</li>
          <li><strong>Occasion (10 ans) :</strong> 450 000 - 900 000 MAD</li>
          <li><strong>Location journalière :</strong> 2 500 - 4 500 MAD</li>
        </ul>

        <h2>Marques recommandées au Maroc</h2>

        <h3>Pour Bulldozers</h3>
        <ul>
          <li><strong>Caterpillar :</strong> Leader mondial, robustesse légendaire</li>
          <li><strong>Komatsu :</strong> Excellent rapport qualité-prix</li>
          <li><strong>Shantui :</strong> Alternative économique chinoise</li>
        </ul>

        <h3>Pour Pelles Mécaniques</h3>
        <ul>
          <li><strong>Caterpillar :</strong> Valeur sûre, réseau excellent</li>
          <li><strong>Komatsu :</strong> Technologie avancée</li>
          <li><strong>Volvo :</strong> Confort et performance</li>
          <li><strong>Hyundai :</strong> Bon rapport qualité-prix</li>
        </ul>

        <h2>Notre recommandation</h2>
        <p><strong>Choisissez un bulldozer si :</strong></p>
        <ul>
          <li>Vous faites principalement du terrassement de surface</li>
          <li>Vous travaillez sur de grandes surfaces</li>
          <li>Votre budget est limité</li>
          <li>Vous avez besoin de robustesse extrême</li>
        </ul>

        <p><strong>Choisissez une pelle mécanique si :</strong></p>
        <ul>
          <li>Vous avez besoin de polyvalence</li>
          <li>Vous faites de l'excavation en profondeur</li>
          <li>Vos projets varient en nature</li>
          <li>Vous voulez un seul engin pour plusieurs usages</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Pour la plupart des entreprises de BTP, une pelle mécanique est le meilleur premier investissement grâce à sa polyvalence. Le bulldozer devient intéressant pour des projets spécifiques ou comme complément à votre parc. Consultez les annonces sur EngineX Maroc pour trouver l'engin qui correspond à vos besoins et votre budget.</p>
      `,
    },
    'prix-engins-btp-2025': {
      category: 'btp',
      title: 'Guide des prix des engins BTP au Maroc en 2025',
      date: '14 Janvier 2025',
      readTime: '15 min',
      image: 'https://images.pexels.com/photos/1153838/pexels-photo-1153838.jpeg',
      content: `
        <p>Un guide complet et actualisé des prix du marché pour tous les principaux engins de construction au Maroc. Prix indicatifs en dirhams marocains.</p>

        <h2>Pelles Mécaniques</h2>

        <h3>Mini-pelles (1-6 tonnes)</h3>
        <ul>
          <li><strong>Neuf :</strong> 250 000 - 500 000 MAD</li>
          <li><strong>Occasion (5 ans) :</strong> 150 000 - 300 000 MAD</li>
          <li><strong>Marques populaires :</strong> Bobcat, Kubota, Takeuchi</li>
        </ul>

        <h3>Pelles moyennes (12-20 tonnes)</h3>
        <ul>
          <li><strong>Neuf :</strong> 900 000 - 1 600 000 MAD</li>
          <li><strong>Occasion (5 ans) :</strong> 550 000 - 900 000 MAD</li>
          <li><strong>Marques populaires :</strong> CAT 320, Komatsu PC200, Volvo EC210</li>
        </ul>

        <h3>Pelles lourdes (25+ tonnes)</h3>
        <ul>
          <li><strong>Neuf :</strong> 2 000 000 - 4 500 000 MAD</li>
          <li><strong>Occasion (5 ans) :</strong> 1 200 000 - 2 500 000 MAD</li>
          <li><strong>Marques populaires :</strong> CAT 336, Komatsu PC360, Volvo EC380</li>
        </ul>

        <h2>Bulldozers</h2>

        <h3>Petits bulldozers (80-120 CV)</h3>
        <ul>
          <li><strong>Neuf :</strong> 800 000 - 1 200 000 MAD</li>
          <li><strong>Occasion (5 ans) :</strong> 450 000 - 700 000 MAD</li>
          <li><strong>Marques populaires :</strong> Shantui SD16, Komatsu D61</li>
        </ul>

        <h3>Bulldozers moyens (150-250 CV)</h3>
        <ul>
          <li><strong>Neuf :</strong> 1 500 000 - 2 500 000 MAD</li>
          <li><strong>Occasion (5 ans) :</strong> 900 000 - 1 500 000 MAD</li>
          <li><strong>Marques populaires :</strong> CAT D6, Komatsu D85</li>
        </ul>

        <h3>Gros bulldozers (300+ CV)</h3>
        <ul>
          <li><strong>Neuf :</strong> 3 500 000 - 7 000 000 MAD</li>
          <li><strong>Occasion (5 ans) :</strong> 2 000 000 - 4 000 000 MAD</li>
          <li><strong>Marques populaires :</strong> CAT D8, Komatsu D155</li>
        </ul>

        <h2>Chargeuses</h2>

        <h3>Mini-chargeuses (50-70 CV)</h3>
        <ul>
          <li><strong>Neuf :</strong> 400 000 - 650 000 MAD</li>
          <li><strong>Occasion (5 ans) :</strong> 250 000 - 400 000 MAD</li>
          <li><strong>Marques populaires :</strong> Bobcat S570, CAT 246D</li>
        </ul>

        <h3>Chargeuses sur pneus moyennes</h3>
        <ul>
          <li><strong>Neuf :</strong> 900 000 - 1 600 000 MAD</li>
          <li><strong>Occasion (5 ans) :</strong> 550 000 - 950 000 MAD</li>
          <li><strong>Marques populaires :</strong> CAT 950, Komatsu WA320, Volvo L90</li>
        </ul>

        <h3>Grandes chargeuses (200+ CV)</h3>
        <ul>
          <li><strong>Neuf :</strong> 2 200 000 - 4 000 000 MAD</li>
          <li><strong>Occasion (5 ans) :</strong> 1 300 000 - 2 400 000 MAD</li>
          <li><strong>Marques populaires :</strong> CAT 966, Komatsu WA470</li>
        </ul>

        <h2>Niveleuses</h2>
        <ul>
          <li><strong>Neuf (petite) :</strong> 1 500 000 - 2 200 000 MAD</li>
          <li><strong>Neuf (moyenne) :</strong> 2 500 000 - 3 800 000 MAD</li>
          <li><strong>Occasion (5 ans) :</strong> 1 000 000 - 2 000 000 MAD</li>
          <li><strong>Marques populaires :</strong> CAT 140M, Komatsu GD555</li>
        </ul>

        <h2>Compacteurs</h2>

        <h3>Compacteurs à pneus</h3>
        <ul>
          <li><strong>Neuf :</strong> 600 000 - 1 200 000 MAD</li>
          <li><strong>Occasion (5 ans) :</strong> 350 000 - 700 000 MAD</li>
        </ul>

        <h3>Compacteurs vibrants</h3>
        <ul>
          <li><strong>Neuf :</strong> 400 000 - 900 000 MAD</li>
          <li><strong>Occasion (5 ans) :</strong> 250 000 - 550 000 MAD</li>
        </ul>

        <h2>Dumpers et Tombereaux</h2>

        <h3>Dumpers articulés (25-30 tonnes)</h3>
        <ul>
          <li><strong>Neuf :</strong> 1 800 000 - 2 800 000 MAD</li>
          <li><strong>Occasion (5 ans) :</strong> 1 000 000 - 1 600 000 MAD</li>
          <li><strong>Marques populaires :</strong> CAT 730, Volvo A30</li>
        </ul>

        <h3>Tombereaux rigides (40+ tonnes)</h3>
        <ul>
          <li><strong>Neuf :</strong> 2 500 000 - 5 000 000 MAD</li>
          <li><strong>Occasion (5 ans) :</strong> 1 400 000 - 2 800 000 MAD</li>
        </ul>

        <h2>Grues Mobiles</h2>
        <ul>
          <li><strong>20-30 tonnes :</strong> 1 500 000 - 2 500 000 MAD (neuf)</li>
          <li><strong>40-60 tonnes :</strong> 3 000 000 - 5 500 000 MAD (neuf)</li>
          <li><strong>80+ tonnes :</strong> 6 000 000 - 12 000 000 MAD (neuf)</li>
        </ul>

        <h2>Facteurs influençant les prix</h2>
        <ul>
          <li><strong>Marque :</strong> CAT et Volvo sont 15-25% plus chers que les marques asiatiques</li>
          <li><strong>Heures d'utilisation :</strong> Dépréciation moyenne de 10% par 1000 heures</li>
          <li><strong>État général :</strong> Différence de 20-30% entre excellent et moyen état</li>
          <li><strong>Accessoires inclus :</strong> Peuvent représenter 10-20% de la valeur</li>
          <li><strong>Période de l'année :</strong> Prix plus élevés en mars-mai (début des chantiers)</li>
        </ul>

        <h2>Options de financement</h2>
        <ul>
          <li><strong>Crédit bancaire classique :</strong> Taux 6-9%, durée 5-7 ans</li>
          <li><strong>Leasing :</strong> Solution flexible, déduction fiscale</li>
          <li><strong>Location longue durée :</strong> Sans apport, maintenance incluse</li>
          <li><strong>Location-vente :</strong> Option d'achat à la fin</li>
        </ul>

        <h2>Coûts annexes à prévoir</h2>
        <ul>
          <li><strong>Transport :</strong> 5 000 - 30 000 MAD selon distance et taille</li>
          <li><strong>Assurance annuelle :</strong> 1-3% de la valeur</li>
          <li><strong>Entretien annuel :</strong> 3-5% de la valeur pour engin neuf, 5-8% pour occasion</li>
          <li><strong>Carburant :</strong> 30-200 litres/jour selon l'engin</li>
        </ul>

        <h2>Conseils pour négocier</h2>
        <ul>
          <li>Négociation possible de 5-15% sur le neuf, 15-25% sur l'occasion</li>
          <li>Meilleure période : décembre-janvier (fin d'exercice fiscal)</li>
          <li>Demandez toujours l'historique complet d'entretien</li>
          <li>Faites inspecter par un expert (coût : 2 000 - 5 000 MAD)</li>
          <li>Vérifiez la disponibilité locale des pièces de rechange</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Le marché marocain offre un excellent choix d'engins BTP neufs et d'occasion. Les prix sont compétitifs comparés à l'Europe, mais attention aux engins importés sans garantie. Privilégiez les vendeurs établis et vérifiez toujours l'état réel avant d'acheter. Consultez régulièrement EngineX Maroc pour les meilleures opportunités du marché.</p>
      `,
    },
    'astuces-pour-acheter-occasion': {
      category: 'btp',
      title: 'Acheter un engin BTP d\'occasion : les points à vérifier',
      date: '10 Janvier 2025',
      readTime: '11 min',
      image: 'https://images.pexels.com/photos/1249610/pexels-photo-1249610.jpeg',
      content: `
        <p>L'achat d'un engin BTP d'occasion peut représenter une excellente affaire, mais nécessite vigilance et expertise. Voici votre guide complet.</p>

        <h2>Étape 1 : Recherche et pré-sélection</h2>

        <h3>Définir vos besoins</h3>
        <ul>
          <li><strong>Type d'engin :</strong> Adapté à vos travaux principaux</li>
          <li><strong>Capacité :</strong> Ni trop petit ni surdimensionné</li>
          <li><strong>Budget total :</strong> Achat + réparations + transport</li>
          <li><strong>Disponibilité des pièces :</strong> Crucial pour les réparations futures</li>
        </ul>

        <h3>Où chercher ?</h3>
        <ul>
          <li><strong>EngineX Maroc :</strong> Plateforme spécialisée avec vérifications</li>
          <li><strong>Concessionnaires officiels :</strong> Garanties mais prix plus élevés</li>
          <li><strong>Ventes aux enchères :</strong> Bonnes affaires mais risques</li>
          <li><strong>Particuliers :</strong> Prix négociables, vérifications essentielles</li>
        </ul>

        <h2>Étape 2 : Vérifications documentaires</h2>

        <h3>Documents obligatoires</h3>
        <ul>
          <li><strong>Carte grise :</strong> Vérifier concordance avec numéro de série</li>
          <li><strong>Historique d'entretien :</strong> Carnet complet ou factures</li>
          <li><strong>Rapports d'inspection :</strong> Si disponibles</li>
          <li><strong>Certificat de non-gage :</strong> Essentiel avant tout achat</li>
          <li><strong>Justificatif de propriété :</strong> Éviter les litiges</li>
        </ul>

        <h3>Informations à vérifier</h3>
        <ul>
          <li><strong>Heures de fonctionnement :</strong> Réelles vs déclarées</li>
          <li><strong>Année de fabrication :</strong> Attention aux déclarations fausses</li>
          <li><strong>Historique des propriétaires :</strong> Nombre et profil</li>
          <li><strong>Travaux effectués :</strong> Type d'utilisation (intensif, occasionnel)</li>
        </ul>

        <h2>Étape 3 : Inspection visuelle</h2>

        <h3>Extérieur</h3>
        <ul>
          <li><strong>Châssis :</strong> Fissures, soudures, déformations</li>
          <li><strong>Peinture :</strong> Rouille cachée, repeints suspects</li>
          <li><strong>Pneus/Chenilles :</strong> Usure, dommages, tension</li>
          <li><strong>Fuites :</strong> Huile, hydraulique, carburant</li>
          <li><strong>Cabine :</strong> État général, vitres, sièges</li>
        </ul>

        <h3>Compartiment moteur</h3>
        <ul>
          <li><strong>Propreté :</strong> Un moteur propre facilite l'inspection</li>
          <li><strong>Fuites :</strong> Joints, durites, raccords</li>
          <li><strong>Courroies :</strong> État et tension</li>
          <li><strong>Câblage :</strong> Pas de réparations de fortune</li>
          <li><strong>Radiateur :</strong> État des ailettes, fuites</li>
        </ul>

        <h3>Système hydraulique</h3>
        <ul>
          <li><strong>Flexibles :</strong> Fissures, bulles, fuites</li>
          <li><strong>Vérins :</strong> Fuites, rayures sur les tiges</li>
          <li><strong>Pompe hydraulique :</strong> Bruits anormaux</li>
          <li><strong>Niveau d'huile :</strong> Couleur et quantité</li>
        </ul>

        <h2>Étape 4 : Tests de fonctionnement</h2>

        <h3>Démarrage</h3>
        <ul>
          <li><strong>À froid :</strong> Démarrage difficile = problème</li>
          <li><strong>Fumée :</strong> Blanche (joints), noire (injection), bleue (segments)</li>
          <li><strong>Bruits :</strong> Claquements, sifflements anormaux</li>
          <li><strong>Tableau de bord :</strong> Voyants d'alerte</li>
        </ul>

        <h3>Tests dynamiques</h3>
        <ul>
          <li><strong>Déplacement :</strong> Ligne droite, virages, pentes</li>
          <li><strong>Vitesses :</strong> Toutes les vitesses, passage fluide</li>
          <li><strong>Freinage :</strong> Efficacité, symétrie</li>
          <li><strong>Direction :</strong> Jeu, réactivité</li>
        </ul>

        <h3>Tests hydrauliques</h3>
        <ul>
          <li><strong>Levage :</strong> Puissance, vitesse, stabilité</li>
          <li><strong>Creusement :</strong> Force, précision</li>
          <li><strong>Rotation :</strong> Fluidité, bruits</li>
          <li><strong>Accessoires :</strong> Fonctionnement de tous les équipements</li>
        </ul>

        <h2>Étape 5 : Évaluation de l'état</h2>

        <h3>Classification</h3>
        <ul>
          <li><strong>Excellent (95-100%) :</strong> Comme neuf, peu d'heures</li>
          <li><strong>Très bon (85-94%) :</strong> Bien entretenu, usure normale</li>
          <li><strong>Bon (70-84%) :</strong> Usage visible mais fonctionnel</li>
          <li><strong>Moyen (50-69%) :</strong> Nécessite travaux importants</li>
          <li><strong>Médiocre (&lt;50%) :</strong> À éviter sauf prix très bas</li>
        </ul>

        <h3>Heures de fonctionnement critiques</h3>
        <ul>
          <li><strong>&lt; 2000h :</strong> Très bon état si bien entretenu</li>
          <li><strong>2000-5000h :</strong> Normal, vérifier entretien</li>
          <li><strong>5000-8000h :</strong> Usure importante, révision probable</li>
          <li><strong>&gt; 8000h :</strong> Risques élevés, expertise obligatoire</li>
        </ul>

        <h2>Étape 6 : Négociation du prix</h2>

        <h3>Arguments de négociation</h3>
        <ul>
          <li>Réparations nécessaires (avec devis)</li>
          <li>Pièces manquantes ou endommagées</li>
          <li>Heures de fonctionnement élevées</li>
          <li>Absence d'historique d'entretien</li>
          <li>Marché actuel (comparaison avec annonces similaires)</li>
        </ul>

        <h3>Fourchette de négociation</h3>
        <ul>
          <li><strong>État excellent :</strong> 5-10% de réduction possible</li>
          <li><strong>État bon :</strong> 10-20% de réduction</li>
          <li><strong>État moyen :</strong> 20-35% de réduction</li>
        </ul>

        <h2>Étape 7 : Avant de conclure</h2>

        <h3>Inspection professionnelle</h3>
        <p><strong>Coût :</strong> 2 000 - 5 000 MAD selon l'engin</p>
        <p><strong>Avantages :</strong></p>
        <ul>
          <li>Détection de défauts cachés</li>
          <li>Évaluation précise de la valeur</li>
          <li>Argument de négociation</li>
          <li>Sécurité juridique</li>
        </ul>

        <h3>Essai prolongé</h3>
        <p>Si possible, demandez un essai de plusieurs heures dans des conditions réelles de travail.</p>

        <h2>Pièges à éviter</h2>
        <ul>
          <li><strong>Compteur trafiqué :</strong> Vérifier cohérence avec usure générale</li>
          <li><strong>Réparations cachées :</strong> Peinture fraîche suspecte</li>
          <li><strong>Engin volé :</strong> Vérifier numéro de série auprès de la gendarmerie</li>
          <li><strong>Vendeur pressé :</strong> Méfiance si urgence de vente</li>
          <li><strong>Prix trop bas :</strong> Souvent révélateur de problèmes graves</li>
        </ul>

        <h2>Check-list finale avant achat</h2>
        <ul>
          <li>Tous les documents sont en règle</li>
          <li>Inspection complète effectuée</li>
          <li>Tests de fonctionnement concluants</li>
          <li>Prix négocié est juste</li>
          <li>Budget réparations prévu</li>
          <li>Transport organisé</li>
          <li>Assurance prête</li>
          <li>Contrat de vente rédigé</li>
        </ul>

        <h2>Conclusion</h2>
        <p>L'achat d'un engin d'occasion demande du temps et de la rigueur, mais peut vous faire économiser 40-60% par rapport au neuf. Ne vous précipitez jamais, faites-vous accompagner par un expert si vous manquez d'expérience, et privilégiez toujours la transparence du vendeur. Sur EngineX Maroc, nous vérifions systématiquement les annonces pour vous offrir plus de sécurité.</p>
      `,
    },
    'foires-agricoles-2025': {
      category: 'actualites',
      title: 'Les foires agricoles à ne pas manquer en 2025 au Maroc',
      date: '20 Janvier 2025',
      readTime: '7 min',
      image: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg',
      content: `
        <p>2025 sera une année riche en événements agricoles au Maroc. Voici le calendrier complet des foires et salons incontournables.</p>

        <h2>SIAM 2025 - Salon International de l'Agriculture de Meknès</h2>
        <p><strong>Dates :</strong> 24-29 Avril 2025</p>
        <p><strong>Lieu :</strong> Complexe d'Expositions, Meknès</p>
        <p><strong>Points forts :</strong></p>
        <ul>
          <li>Plus grand salon agricole d'Afrique</li>
          <li>Plus de 1500 exposants internationaux</li>
          <li>Présentation des dernières innovations en machinisme agricole</li>
          <li>Démonstrations en direct de tracteurs et équipements</li>
          <li>Conférences sur l'agriculture durable</li>
          <li>Zone dédiée aux engins agricoles modernes</li>
        </ul>
        <p><strong>Pourquoi y aller :</strong> C'est LE rendez-vous pour comparer toutes les marques de tracteurs et engins agricoles, négocier directement avec les importateurs, et bénéficier de tarifs préférentiels.</p>

        <h2>Agri-Expo Casablanca</h2>
        <p><strong>Dates :</strong> 15-17 Mars 2025</p>
        <p><strong>Lieu :</strong> OFEC, Casablanca</p>
        <p><strong>Points forts :</strong></p>
        <ul>
          <li>Focus sur l'agriculture moderne et la mécanisation</li>
          <li>Présence des principaux concessionnaires marocains</li>
          <li>Solutions de financement sur place</li>
          <li>Ateliers pratiques sur l'entretien des engins</li>
        </ul>
        <p><strong>Avantage :</strong> Ambiance plus intime que le SIAM, idéal pour des discussions approfondies avec les vendeurs.</p>

        <h2>Foire Agricole Régionale de Fès</h2>
        <p><strong>Dates :</strong> 8-10 Juin 2025</p>
        <p><strong>Lieu :</strong> Parc d'Expositions, Fès</p>
        <p><strong>Spécificités :</strong></p>
        <ul>
          <li>Orientation céréales et cultures pluviales</li>
          <li>Matériel adapté aux conditions du Nord du Maroc</li>
          <li>Démonstrations en conditions réelles</li>
          <li>Marché d'occasion très actif</li>
        </ul>

        <h2>Salon Agro-Tech Marrakech</h2>
        <p><strong>Dates :</strong> 20-22 Septembre 2025</p>
        <p><strong>Lieu :</strong> Palais des Congrès, Marrakech</p>
        <p><strong>Thématiques :</strong></p>
        <ul>
          <li>Agriculture de précision et digitalisation</li>
          <li>Tracteurs connectés et guidage GPS</li>
          <li>Solutions d'irrigation intelligente</li>
          <li>Drones agricoles et nouvelles technologies</li>
        </ul>
        <p><strong>Public cible :</strong> Agriculteurs innovants et grandes exploitations.</p>

        <h2>Journées Techniques de Démonstration</h2>
        <p><strong>Organisées par les concessionnaires tout au long de l'année</strong></p>

        <h3>John Deere Days</h3>
        <ul>
          <li><strong>Dates :</strong> Février et Octobre 2025</li>
          <li><strong>Lieux :</strong> Rabat, Casablanca, Marrakech</li>
          <li><strong>Programme :</strong> Essais gratuits, formations techniques, offres spéciales</li>
        </ul>

        <h3>New Holland Field Days</h3>
        <ul>
          <li><strong>Dates :</strong> Mars et Novembre 2025</li>
          <li><strong>Lieux :</strong> Meknès, Fès, Béni Mellal</li>
          <li><strong>Programme :</strong> Démonstrations au champ, comparatifs de performance</li>
        </ul>

        <h2>Événements BTP</h2>

        <h3>Batimat Maroc 2025</h3>
        <p><strong>Dates :</strong> 18-21 Mai 2025</p>
        <p><strong>Lieu :</strong> OFEC, Casablanca</p>
        <p><strong>Focus :</strong></p>
        <ul>
          <li>Engins de construction lourds</li>
          <li>Solutions de levage et manutention</li>
          <li>Équipements de chantier</li>
        </ul>

        <h3>Construction Expo</h3>
        <p><strong>Dates :</strong> 10-12 Octobre 2025</p>
        <p><strong>Lieu :</strong> Tanger</p>
        <p><strong>Spécialité :</strong> Matériel pour grandes infrastructures</p>

        <h2>Comment profiter au maximum de ces événements ?</h2>

        <h3>Avant la visite</h3>
        <ul>
          <li>Définissez clairement vos besoins</li>
          <li>Préparez un budget réaliste</li>
          <li>Listez les marques et modèles qui vous intéressent</li>
          <li>Préparez vos questions techniques</li>
          <li>Inscrivez-vous en ligne pour éviter les files</li>
        </ul>

        <h3>Pendant la visite</h3>
        <ul>
          <li>Arrivez tôt pour éviter la foule</li>
          <li>Visitez d'abord les stands prioritaires</li>
          <li>Collectez les brochures et cartes de visite</li>
          <li>Négociez les prix (remises spéciales salon)</li>
          <li>Essayez les équipements si possible</li>
          <li>Assistez aux conférences techniques</li>
          <li>Réseautez avec d'autres agriculteurs/entrepreneurs</li>
        </ul>

        <h3>Après la visite</h3>
        <ul>
          <li>Comparez les offres reçues</li>
          <li>Recontactez les exposants intéressants</li>
          <li>Vérifiez les annonces sur EngineX Maroc pour comparer</li>
          <li>Prenez votre décision sans précipitation</li>
        </ul>

        <h2>Avantages d'acheter lors des salons</h2>
        <ul>
          <li><strong>Remises spéciales :</strong> 5-15% sur les prix habituels</li>
          <li><strong>Offres groupées :</strong> Accessoires et formations inclus</li>
          <li><strong>Conditions de financement :</strong> Taux préférentiels</li>
          <li><strong>Garanties étendues :</strong> Souvent offertes</li>
          <li><strong>Livraison gratuite :</strong> Dans certains cas</li>
        </ul>

        <h2>Tips pour les visiteurs internationaux</h2>
        <ul>
          <li>Réservez votre hébergement 2-3 mois à l'avance</li>
          <li>Location de voiture recommandée pour les déplacements</li>
          <li>Budget repas : 150-300 MAD/jour</li>
          <li>Badge professionnel donne accès à des zones exclusives</li>
        </ul>

        <h2>Calendrier récapitulatif 2025</h2>
        <ul>
          <li><strong>Mars :</strong> Agri-Expo Casablanca</li>
          <li><strong>Avril :</strong> SIAM Meknès (événement majeur)</li>
          <li><strong>Mai :</strong> Batimat Maroc</li>
          <li><strong>Juin :</strong> Foire Régionale Fès</li>
          <li><strong>Septembre :</strong> Salon Agro-Tech Marrakech</li>
          <li><strong>Octobre :</strong> Construction Expo Tanger</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Ces événements sont des opportunités uniques pour découvrir, comparer et acheter votre équipement agricole ou BTP dans les meilleures conditions. Planifiez vos visites dès maintenant et suivez EngineX Maroc pour les dernières actualités et offres exclusives liées à ces salons.</p>
      `,
    },
    'innovations-btp-maroc': {
      category: 'actualites',
      title: 'Les innovations technologiques qui transforment le BTP au Maroc',
      date: '17 Janvier 2025',
      readTime: '10 min',
      image: 'https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg',
      content: `
        <p>Le secteur du BTP marocain connaît une révolution technologique. Découvrez les innovations qui changent la donne en 2025.</p>

        <h2>1. Engins Autonomes et Semi-Autonomes</h2>

        <h3>État actuel au Maroc</h3>
        <p>Plusieurs grands chantiers marocains testent déjà des engins partiellement automatisés :</p>
        <ul>
          <li><strong>Caterpillar Command :</strong> Pelles et bulldozers téléguidés</li>
          <li><strong>Komatsu Intelligent Machine Control :</strong> Nivellement automatique</li>
          <li><strong>Volvo Co-Pilot :</strong> Assistance à la conduite avancée</li>
        </ul>

        <h3>Avantages concrets</h3>
        <ul>
          <li><strong>Productivité :</strong> +30% d'efficacité mesurée</li>
          <li><strong>Sécurité :</strong> Réduction de 60% des accidents</li>
          <li><strong>Précision :</strong> Erreurs réduites de 80%</li>
          <li><strong>Économies :</strong> -15% de consommation carburant</li>
        </ul>

        <h3>Projets pilotes au Maroc</h3>
        <ul>
          <li>LGV Casablanca-Marrakech : utilisation de niveleuses autonomes</li>
          <li>Port Tanger Med 3 : camions autonomes pour transport de conteneurs</li>
          <li>Autoroute Tiznit-Dakhla : bulldozers avec guidage GPS</li>
        </ul>

        <h2>2. Drones pour le BTP</h2>

        <h3>Applications pratiques</h3>
        <ul>
          <li><strong>Topographie :</strong> Relevés en 1/10ème du temps traditionnel</li>
          <li><strong>Inspection :</strong> Structures en hauteur sans échafaudage</li>
          <li><strong>Suivi de chantier :</strong> Photos et vidéos régulières automatiques</li>
          <li><strong>Cubatures :</strong> Calcul précis des volumes de terrassement</li>
        </ul>

        <h3>Coûts et ROI</h3>
        <ul>
          <li><strong>Drone professionnel :</strong> 30 000 - 150 000 MAD</li>
          <li><strong>Formation opérateur :</strong> 5 000 - 10 000 MAD</li>
          <li><strong>ROI :</strong> Amortissement en 6-12 mois pour chantiers moyens</li>
        </ul>

        <h3>Entreprises marocaines pionnières</h3>
        <ul>
          <li>TGCC : utilisation systématique pour suivi de projets</li>
          <li>Sgtm : drones pour inspection d'ouvrages d'art</li>
          <li>SOBECA : cartographie 3D avant terrassement</li>
        </ul>

        <h2>3. BIM (Building Information Modeling)</h2>

        <h3>Adoption au Maroc</h3>
        <p>Le BIM devient obligatoire pour les grands projets publics à partir de 2025 :</p>
        <ul>
          <li>Projets &gt; 100 millions MAD : BIM niveau 2 requis</li>
          <li>Formation de 5000 professionnels prévue d'ici 2026</li>
          <li>Création du Moroccan BIM Council en 2024</li>
        </ul>

        <h3>Bénéfices mesurés</h3>
        <ul>
          <li><strong>Réduction des coûts :</strong> 15-20% en moyenne</li>
          <li><strong>Gain de temps :</strong> 25-30% sur la planification</li>
          <li><strong>Moins d'erreurs :</strong> 70% de reprises évitées</li>
          <li><strong>Meilleure collaboration :</strong> Toutes parties prenantes synchronisées</li>
        </ul>

        <h3>Logiciels utilisés au Maroc</h3>
        <ul>
          <li>Autodesk Revit (le plus populaire)</li>
          <li>ArchiCAD</li>
          <li>Tekla Structures</li>
          <li>Allplan</li>
        </ul>

        <h2>4. Équipements Électriques et Hybrides</h2>

        <h3>Disponibilité au Maroc en 2025</h3>
        <ul>
          <li><strong>Mini-pelles électriques :</strong> Bobcat, Wacker Neuson</li>
          <li><strong>Chargeuses compactes électriques :</strong> Volvo, Caterpillar</li>
          <li><strong>Chariots élévateurs électriques :</strong> Gamme complète disponible</li>
        </ul>

        <h3>Avantages</h3>
        <ul>
          <li><strong>Coûts d'exploitation :</strong> -70% vs diesel</li>
          <li><strong>Maintenance :</strong> -50% de coûts</li>
          <li><strong>Bruit :</strong> Réduction de 90% (idéal zones urbaines)</li>
          <li><strong>Environnement :</strong> Zéro émission directe</li>
        </ul>

        <h3>Limites actuelles</h3>
        <ul>
          <li>Autonomie limitée (4-8h selon utilisation)</li>
          <li>Infrastructure de recharge à développer</li>
          <li>Prix d'achat +30-50% vs diesel</li>
          <li>Puissance limitée pour gros engins</li>
        </ul>

        <h2>5. Télématique et Gestion de Flotte</h2>

        <h3>Systèmes disponibles</h3>
        <ul>
          <li><strong>Caterpillar Product Link :</strong> Le plus complet</li>
          <li><strong>Komatsu Komtrax :</strong> Excellent rapport qualité-prix</li>
          <li><strong>Volvo CareTrack :</strong> Interface intuitive</li>
          <li><strong>JCB LiveLink :</strong> Monitoring en temps réel</li>
        </ul>

        <h3>Données collectées</h3>
        <ul>
          <li>Position GPS en temps réel</li>
          <li>Heures de fonctionnement</li>
          <li>Consommation de carburant</li>
          <li>Alertes de maintenance</li>
          <li>Codes d'erreur moteur</li>
          <li>Utilisation des fonctions</li>
        </ul>

        <h3>ROI pour entreprises marocaines</h3>
        <ul>
          <li><strong>Réduction vol :</strong> 100% de récupération si équipé</li>
          <li><strong>Économies carburant :</strong> 10-15% par optimisation</li>
          <li><strong>Maintenance préventive :</strong> -25% de pannes</li>
          <li><strong>Productivité :</strong> +15% par meilleure allocation</li>
        </ul>

        <h2>6. Réalité Augmentée et Réalité Virtuelle</h2>

        <h3>Applications BTP</h3>
        <ul>
          <li><strong>Formation opérateurs :</strong> Simulateurs VR immersifs</li>
          <li><strong>Visualisation projets :</strong> Présentation clients en 3D</li>
          <li><strong>Maintenance :</strong> Instructions AR superposées</li>
          <li><strong>Sécurité :</strong> Formation aux situations dangereuses</li>
        </ul>

        <h3>Centres de formation au Maroc</h3>
        <ul>
          <li>OFPPT Casablanca : simulateurs de pelle et grue</li>
          <li>Centre de formation CAT : VR pour conduite d'engins</li>
          <li>Plusieurs concessionnaires : démos AR disponibles</li>
        </ul>

        <h2>7. Impression 3D et Construction Modulaire</h2>

        <h3>Projets pilotes marocains</h3>
        <ul>
          <li><strong>Benguérir :</strong> Premier bâtiment imprimé en 3D (2024)</li>
          <li><strong>Casablanca :</strong> Logements sociaux par construction modulaire</li>
          <li><strong>Marrakech :</strong> Test de ponts imprimés en 3D</li>
        </ul>

        <h3>Avantages</h3>
        <ul>
          <li><strong>Rapidité :</strong> Maison de 100m² en 48h</li>
          <li><strong>Coût :</strong> -40% vs construction traditionnelle</li>
          <li><strong>Déchets :</strong> -60% de matériaux gaspillés</li>
          <li><strong>Design :</strong> Formes complexes possibles</li>
        </ul>

        <h2>8. Intelligence Artificielle et Big Data</h2>

        <h3>Applications concrètes</h3>
        <ul>
          <li><strong>Prédiction de pannes :</strong> Analyse des données télématiques</li>
          <li><strong>Optimisation de chantier :</strong> Planning dynamique par IA</li>
          <li><strong>Sécurité :</strong> Détection automatique de situations dangereuses</li>
          <li><strong>Estimation :</strong> Prix plus précis grâce aux données historiques</li>
        </ul>

        <h3>Startups marocaines innovantes</h3>
        <ul>
          <li>WeBuild : plateforme de gestion de chantier avec IA</li>
          <li>SmartBTP : solutions IoT pour le BTP</li>
          <li>ConstructAI : estimation automatique par IA</li>
        </ul>

        <h2>9. Matériaux Intelligents</h2>

        <h3>Innovations disponibles</h3>
        <ul>
          <li><strong>Béton auto-réparant :</strong> Tests en cours sur A1</li>
          <li><strong>Capteurs intégrés :</strong> Monitoring santé des structures</li>
          <li><strong>Matériaux à changement de phase :</strong> Régulation thermique</li>
        </ul>

        <h2>10. Énergies Renouvelables sur Chantier</h2>

        <h3>Solutions adoptées</h3>
        <ul>
          <li><strong>Tours d'éclairage solaires :</strong> Autonomie 7 jours</li>
          <li><strong>Groupes électrogènes hybrides :</strong> -50% consommation</li>
          <li><strong>Panneaux solaires portables :</strong> Recharge outils et engins</li>
        </ul>

        <h2>Comment rester à jour ?</h2>
        <ul>
          <li>Suivez les salons BTP (Batimat Maroc, etc.)</li>
          <li>Formations continues chez les concessionnaires</li>
          <li>Abonnement à des revues spécialisées</li>
          <li>Réseautage avec autres entrepreneurs</li>
          <li>Consultez régulièrement EngineX Maroc pour les nouveautés</li>
        </ul>

        <h2>Conclusion</h2>
        <p>La transformation digitale du BTP marocain s'accélère. Les entreprises qui adoptent ces technologies gagnent en compétitivité, sécurité et rentabilité. Ne restez pas en arrière : explorez ces innovations dès aujourd'hui. Sur EngineX Maroc, vous trouverez des engins équipés des dernières technologies à des prix compétitifs.</p>
      `,
    },
    'partenariats-enginex': {
      category: 'actualites',
      title: 'EngineX Maroc annonce de nouveaux partenariats stratégiques',
      date: '13 Janvier 2025',
      readTime: '5 min',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      content: `
        <p>EngineX Maroc franchit une nouvelle étape avec l'annonce de partenariats majeurs qui renforceront sa position de leader sur le marché marocain des engins agricoles et BTP.</p>

        <h2>Partenariat avec Caterpillar Maroc</h2>

        <h3>Détails de l'accord</h3>
        <p>EngineX Maroc devient partenaire digital officiel de Caterpillar pour la commercialisation d'engins d'occasion certifiés au Maroc.</p>

        <h3>Avantages pour les utilisateurs</h3>
        <ul>
          <li><strong>Certification officielle :</strong> Tous les engins CAT sont inspectés par des techniciens agréés</li>
          <li><strong>Garantie étendue :</strong> 6 mois inclus sur pièces majeures</li>
          <li><strong>Historique complet :</strong> Carnet d'entretien vérifié et disponible</li>
          <li><strong>Prix préférentiels :</strong> Remises négociées pour nos utilisateurs</li>
          <li><strong>Service après-vente :</strong> Accès au réseau national CAT</li>
        </ul>

        <h3>Gamme disponible</h3>
        <ul>
          <li>Pelles mécaniques (12 à 45 tonnes)</li>
          <li>Bulldozers (D6 à D8)</li>
          <li>Chargeuses sur pneus (950 à 980)</li>
          <li>Niveleuses (140M et 160M)</li>
        </ul>

        <h2>Collaboration avec Crédit Agricole du Maroc</h2>

        <h3>Solutions de financement exclusives</h3>
        <p>Un accord de partenariat permet désormais à tous les utilisateurs d'EngineX d'accéder à des conditions de financement privilégiées :</p>

        <h3>Offres disponibles</h3>
        <ul>
          <li><strong>Crédit Tracteur :</strong>
            <ul>
              <li>Taux : à partir de 5,5% (vs 7-8% marché)</li>
              <li>Durée : jusqu'à 7 ans</li>
              <li>Apport : à partir de 15%</li>
              <li>Franchise : 6 mois possible</li>
            </ul>
          </li>
          <li><strong>Leasing Professionnel :</strong>
            <ul>
              <li>Option d'achat à la fin</li>
              <li>Déduction fiscale avantageuse</li>
              <li>Maintenance incluse (option)</li>
            </ul>
          </li>
          <li><strong>Crédit BTP :</strong>
            <ul>
              <li>Spécialement adapté aux entrepreneurs</li>
              <li>Remboursements flexibles selon activité</li>
              <li>Possibilité de financer plusieurs engins</li>
            </ul>
          </li>
        </ul>

        <h3>Processus simplifié</h3>
        <ul>
          <li>Demande en ligne en 5 minutes sur EngineX</li>
          <li>Réponse de principe sous 48h</li>
          <li>Dossier complet traité en 7 jours</li>
          <li>Déblocage des fonds sous 10 jours</li>
        </ul>

        <h2>Partenariat avec l'OFPPT</h2>

        <h3>Programme de formation</h3>
        <p>EngineX s'associe à l'Office de la Formation Professionnelle et de la Promotion du Travail pour créer un programme de formation aux métiers de conduite et maintenance d'engins.</p>

        <h3>Objectifs</h3>
        <ul>
          <li>Former 500 opérateurs qualifiés par an</li>
          <li>Créer un vivier de talents pour le secteur</li>
          <li>Améliorer la sécurité sur les chantiers</li>
          <li>Faciliter l'employabilité des jeunes</li>
        </ul>

        <h3>Centres de formation</h3>
        <ul>
          <li>Casablanca : Centre d'Excellence BTP</li>
          <li>Meknès : Formation agricole spécialisée</li>
          <li>Marrakech : École de conduite d'engins</li>
          <li>Tanger : Pôle BTP et infrastructures</li>
        </ul>

        <h3>Certifications proposées</h3>
        <ul>
          <li>CACES Pelles mécaniques</li>
          <li>CACES Chargeuses</li>
          <li>CACES Grues auxiliaires</li>
          <li>Conduite de tracteurs agricoles</li>
          <li>Maintenance de premier niveau</li>
        </ul>

        <h2>Alliance avec New Holland Agriculture</h2>

        <h3>Programme "Tracteur Neuf Accessible"</h3>
        <p>Grâce à ce partenariat, EngineX propose des tracteurs New Holland neufs avec :</p>
        <ul>
          <li><strong>Reprise majorée :</strong> +10% sur valeur marché de votre ancien engin</li>
          <li><strong>Pack accessoires offert :</strong> Valeur 30 000 MAD</li>
          <li><strong>Formation gratuite :</strong> 2 jours pour vous et vos employés</li>
          <li><strong>Maintenance 1ère année incluse :</strong> Révisions et main d'œuvre</li>
        </ul>

        <h3>Gamme prioritaire</h3>
        <ul>
          <li>Série T4 (75-105 CV) : à partir de 380 000 MAD</li>
          <li>Série T6 (110-145 CV) : à partir de 520 000 MAD</li>
          <li>Série T7 (165-215 CV) : à partir de 780 000 MAD</li>
        </ul>

        <h2>Partenariat avec Assurance RMA Watanya</h2>

        <h3>Assurance Engins Simplifiée</h3>
        <p>Couverture complète pour votre matériel avec :</p>
        <ul>
          <li><strong>Assurance tous risques :</strong> Vol, incendie, accidents</li>
          <li><strong>Responsabilité civile :</strong> Dommages tiers</li>
          <li><strong>Bris de machine :</strong> Panne mécanique couverte</li>
          <li><strong>Assistance 24/7 :</strong> Dépannage et remorquage</li>
        </ul>

        <h3>Tarifs préférentiels</h3>
        <ul>
          <li>15% de réduction vs tarifs standards</li>
          <li>Franchise réduite de 20%</li>
          <li>Paiement mensuel sans frais</li>
          <li>Souscription 100% en ligne</li>
        </ul>

        <h2>Programme "EngineX Pro"</h2>

        <h3>Service Premium pour Professionnels</h3>
        <p>Lancé simultanément à ces partenariats, EngineX Pro offre :</p>
        <ul>
          <li><strong>Conseiller dédié :</strong> Accompagnement personnalisé</li>
          <li><strong>Accès prioritaire :</strong> Nouvelles annonces 48h en avance</li>
          <li><strong>Inspection gratuite :</strong> Expert vérifie l'engin avant achat</li>
          <li><strong>Négociation assistée :</strong> Nous vous aidons à obtenir le meilleur prix</li>
          <li><strong>Réseau privilégié :</strong> Accès à des ventes privées</li>
        </ul>

        <h3>Tarif</h3>
        <ul>
          <li>2 500 MAD/an pour particuliers</li>
          <li>5 000 MAD/an pour professionnels</li>
          <li>Gratuit pour le premier achat &gt; 500 000 MAD</li>
        </ul>

        <h2>Impact pour le marché marocain</h2>

        <h3>Professionnalisation du secteur</h3>
        <p>Ces partenariats contribuent à :</p>
        <ul>
          <li>Structurer le marché de l'occasion</li>
          <li>Réduire la fraude et les arnaques</li>
          <li>Faciliter l'accès au financement</li>
          <li>Améliorer la formation des opérateurs</li>
          <li>Augmenter la sécurité sur les chantiers</li>
        </ul>

        <h3>Création d'emplois</h3>
        <ul>
          <li>50 nouveaux postes chez EngineX d'ici 2026</li>
          <li>500 opérateurs formés par an</li>
          <li>Soutien à l'écosystème de maintenance et réparation</li>
        </ul>

        <h2>Témoignages</h2>

        <h3>Ahmed Benali, Directeur Général EngineX Maroc</h3>
        <p><em>"Ces partenariats marquent un tournant pour EngineX et pour le marché marocain. Notre objectif est de devenir la référence incontournable en combinant technologie, transparence et services de qualité."</em></p>

        <h3>Karim Fassi, Agriculteur à Meknès</h3>
        <p><em>"Grâce au partenariat avec le Crédit Agricole, j'ai pu acheter mon tracteur New Holland avec un financement à 5,5%. Le processus était simple et rapide."</em></p>

        <h2>Prochaines étapes</h2>
        <p>D'autres annonces sont prévues pour 2025 :</p>
        <ul>
          <li><strong>Q2 2025 :</strong> Partenariat avec une plateforme de pièces détachées</li>
          <li><strong>Q3 2025 :</strong> Lancement d'une marketplace de services (transport, maintenance)</li>
          <li><strong>Q4 2025 :</strong> Expansion vers l'Afrique de l'Ouest</li>
        </ul>

        <h2>Comment en profiter ?</h2>
        <ul>
          <li>Créez votre compte sur EngineX.ma</li>
          <li>Remplissez votre profil professionnel</li>
          <li>Contactez nos conseillers pour activer les offres partenaires</li>
          <li>Profitez des avantages dès votre premier achat</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Ces partenariats stratégiques positionnent EngineX Maroc comme bien plus qu'une simple plateforme d'annonces. Nous construisons un écosystème complet au service des agriculteurs et entrepreneurs du BTP : financement, assurance, formation, maintenance. Notre ambition est de transformer l'achat et la vente d'engins au Maroc pour en faire une expérience simple, sûre et avantageuse pour tous.</p>

        <p><strong>Rejoignez-nous dans cette révolution du marché marocain des engins !</strong></p>
      `,
    },
  };

  const article = articles[id] || articles['comment-choisir-un-tracteur'];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'agricole': return Tractor;
      case 'btp': return HardHat;
      case 'actualites': return Newspaper;
      default: return Tractor;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'agricole': return 'text-green-700 bg-green-100';
      case 'btp': return 'text-orange-700 bg-orange-100';
      case 'actualites': return 'text-blue-700 bg-blue-100';
      default: return 'text-green-700 bg-green-100';
    }
  };

  const Icon = getCategoryIcon(article.category);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#156D3E] to-[#0f5630] text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate(`blog-${category}`)}
            className="flex items-center space-x-2 text-white hover:text-green-100 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour</span>
          </button>
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${getCategoryColor(article.category)} mb-4`}>
            <Icon className="h-4 w-4" />
            <span className="text-sm font-semibold capitalize">{article.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center space-x-6 text-green-100">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>{article.readTime} de lecture</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-96 object-cover"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:my-4 prose-li:text-gray-700 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Partagez cet article</h3>
              <p className="text-sm text-gray-600">Aidez d'autres professionnels en partageant ces informations</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#156D3E] text-white rounded-md hover:bg-[#0f5630] transition-colors">
              <Share2 className="h-5 w-5" />
              <span>Partager</span>
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#156D3E] to-[#0f5630] rounded-lg shadow-md p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Vous cherchez un engin ?</h3>
          <p className="text-green-100 mb-6">
            Découvrez notre sélection de tracteurs et engins BTP sur EngineX Maroc
          </p>
          <button
            onClick={() => onNavigate('listings')}
            className="bg-white text-[#156D3E] px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Voir les annonces
          </button>
        </div>
      </div>
    </div>
  );
}
