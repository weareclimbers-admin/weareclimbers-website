import type { LegalDocument } from './types';

/**
 * Conditions Générales de Vente — SPÉCIFIQUES AU SITE VITRINE (vente de biens
 * en pré-commande : bracelet Polar 360 + app WAC). N'existe PAS côté repo coach
 * (les CGV du SaaS coach couvrent l'abonnement logiciel, pas la vente de biens).
 * Ne jamais resynchroniser aveuglément depuis le repo coach.
 *
 * ⚠️ AVANT MISE EN LIGNE, Julien doit valider :
 *   - la date limite de livraison (§4.2 — engagement légal L.216-1)
 *   - l'adhésion effective au médiateur CM2C (§13 — obligatoire)
 *   - la politique de frais de retour (§9.4 — à la charge du client)
 */
export const CGV: LegalDocument = {
  key: 'cgv',
  title: 'Conditions Générales de Vente',
  subtitle: 'Pré-commandes weareclimbers.fr',
  version: '1.0',
  lastUpdated: '2026-08-14',
  preamble: `Les présentes Conditions Générales de Vente (« CGV ») régissent les ventes de produits conclues sur le site weareclimbers.fr entre WeAreClimbers SAS et toute personne physique agissant en qualité de consommateur (« le Client »). Toute commande implique l'acceptation préalable et sans réserve des présentes CGV.`,
  sections: [
    {
      id: '1',
      title: '1. Identité du vendeur',
      content: `WeAreClimbers SAS
Société par Actions Simplifiée au capital de 1 000 €
Siège social : 97 Allée Théodore Monod, 64210 Bidart, France
SIRET : 98923006500017 — TVA intracommunautaire : FR39989230065
Directeur de la publication : Julien Salvadori (Président)

Contact :
- Email : contact@weareclimbers.fr
- Support : support@weareclimbers.fr
- Téléphone : +33 6 40 75 00 80 (lundi au vendredi, 9h-18h heure de Paris)`,
    },
    {
      id: '2',
      title: '2. Champ d\'application',
      content: `Les présentes CGV s'appliquent à toute commande passée sur la boutique du site weareclimbers.fr, à l'exclusion de tout autre canal de vente (notamment les ventes réalisées via les coachs partenaires ou les abonnements souscrits dans l'application mobile, régis par leurs conditions propres).

Elles s'appliquent à l'exclusion de toutes autres conditions, et sont accessibles à tout moment sur le site. La version applicable est celle en vigueur au jour de la commande ; elle est communiquée au Client avec sa confirmation de commande.

L'utilisation de l'application mobile WAC est régie par les Conditions Générales d'Utilisation, distinctes des présentes CGV.`,
    },
    {
      id: '3',
      title: '3. Produits',
      subsections: [
        {
          id: '3.1',
          title: '3.1 Description',
          content: `Les produits proposés à la vente sont décrits sur les pages du site (notamment la fiche produit de la boutique et les pages « Le bracelet » et « L'app »). Il s'agit à la date des présentes du pack composé :
- d'un bracelet connecté Polar 360 (capteur de fréquence cardiaque haute précision, sans écran),
- de l'accès à l'application mobile WAC (téléchargement gratuit), nécessaire à l'utilisation du bracelet.

Les photographies et visuels illustrant les produits n'ont pas de valeur contractuelle. Les caractéristiques essentielles (précision, autonomie, compatibilité iOS/Android, contenu de la boîte) figurent sur les pages produit du site.`,
        },
        {
          id: '3.2',
          title: '3.2 Prérequis',
          content: `L'utilisation du bracelet nécessite un smartphone compatible (iOS 15.1 minimum ou Android 13 minimum), l'installation de l'application mobile WAC (gratuite) et la création d'un compte utilisateur. Le Client est invité à vérifier cette compatibilité avant de commander.`,
        },
      ],
    },
    {
      id: '4',
      title: '4. Pré-commande — modalités particulières',
      subsections: [
        {
          id: '4.1',
          title: '4.1 Nature de la pré-commande',
          content: `Les produits sont proposés en PRÉ-COMMANDE : ils sont payés au moment de la commande mais expédiés ultérieurement, à une échéance annoncée sur la fiche produit avant la validation de la commande.

La période de pré-commande est limitée dans le temps ; sa date de clôture est affichée sur la boutique. À la clôture, WeAreClimbers passe commande des bracelets auprès de son fournisseur, puis prépare et expédie les commandes dans l'ordre de leur enregistrement.`,
        },
        {
          id: '4.2',
          title: '4.2 Date de livraison',
          content: `Sauf indication différente portée sur la fiche produit au jour de la commande, les produits en pré-commande sont expédiés au cours du mois de novembre 2026 et livrés au plus tard le 15 décembre 2026.

Conformément aux articles L.216-1 et suivants du Code de la consommation, si le produit n'est pas livré à cette date, le Client peut enjoindre WeAreClimbers, par lettre recommandée avec accusé de réception ou par écrit sur un autre support durable, d'effectuer la livraison dans un délai supplémentaire raisonnable. À défaut de livraison dans ce nouveau délai, le Client peut résoudre le contrat par les mêmes moyens ; WeAreClimbers rembourse alors la totalité des sommes versées, au plus tard dans les 14 jours suivant la résolution.

Le Client peut par ailleurs annuler sa pré-commande à tout moment avant son expédition, sur simple demande à contact@weareclimbers.fr, et obtenir le remboursement intégral des sommes versées.`,
        },
      ],
    },
    {
      id: '5',
      title: '5. Prix',
      subsections: [
        {
          id: '5.1',
          title: '5.1 Prix des produits',
          content: `Les prix sont affichés sur la boutique en euros, toutes taxes comprises (TVA française incluse au taux en vigueur), hors frais de livraison. Le prix total (produits + livraison) est affiché avant la validation définitive de la commande.

Le prix applicable est celui en vigueur au jour de la commande. WeAreClimbers se réserve le droit de modifier ses prix à tout moment pour les commandes futures.`,
        },
        {
          id: '5.2',
          title: '5.2 Livraisons hors Union européenne et outre-mer',
          content: `Pour les livraisons vers la Suisse et vers les collectivités françaises d'outre-mer, les prix s'entendent hors taxes et droits applicables dans le territoire de destination. Les éventuels droits de douane, TVA locale, octroi de mer et frais de dédouanement sont à la charge exclusive du destinataire et sont réclamés, le cas échéant, par le transporteur ou l'administration locale à la livraison.`,
        },
        {
          id: '5.3',
          title: '5.3 Codes promotionnels',
          content: `Des codes promotionnels peuvent être proposés (notamment aux inscrits de la liste d'attente). Sauf mention contraire : un code est utilisable une seule fois par Client, n'est pas cumulable avec d'autres offres, s'applique au prix des produits (hors frais de livraison) et n'a aucune valeur monétaire (il ne peut être ni remboursé, ni échangé, ni cédé).`,
        },
      ],
    },
    {
      id: '6',
      title: '6. Commande',
      content: `Le processus de commande comprend les étapes suivantes :
1. Sélection de la quantité, de la zone de livraison et du mode de livraison (le cas échéant, choix du point relais Mondial Relay) sur la boutique ;
2. Redirection vers la page de paiement sécurisée opérée par Stripe : saisie des coordonnées (adresse de facturation ou de livraison selon le mode choisi, téléphone, email), éventuel code promotionnel, puis validation du paiement ;
3. Confirmation de la commande : un email récapitulatif est adressé au Client, accompagné de sa facture.

La commande n'est définitive qu'après confirmation du paiement. WeAreClimbers se réserve le droit de refuser ou d'annuler toute commande en cas de motif légitime, notamment : litige avec le Client, suspicion de fraude, quantités manifestement destinées à la revente, ou impossibilité de livrer la destination indiquée. La quantité maximale par commande est indiquée sur la boutique.

Les commandes et factures sont archivées par WeAreClimbers ; le Client peut en obtenir copie sur demande.`,
    },
    {
      id: '7',
      title: '7. Paiement',
      content: `Le paiement s'effectue en ligne, en une fois et en totalité au moment de la commande, par carte bancaire via la plateforme de paiement sécurisée Stripe (Stripe Payments Europe Ltd). Les données bancaires sont saisies exclusivement sur les pages sécurisées de Stripe et ne transitent jamais par les serveurs de WeAreClimbers.

Le débit intervient dès la validation de la commande, y compris pour les pré-commandes (le paiement finance la production et la logistique de la première série).

Une facture est établie automatiquement et transmise au Client par email au format PDF.`,
    },
    {
      id: '8',
      title: '8. Livraison',
      subsections: [
        {
          id: '8.1',
          title: '8.1 Zones et modes de livraison',
          content: `Les produits sont livrés dans les zones suivantes, selon les modes proposés au moment de la commande :
- France métropolitaine (et Monaco) : livraison en point relais Mondial Relay ou à domicile ;
- Belgique et Luxembourg : livraison en point relais Mondial Relay ;
- Suisse : livraison à domicile ;
- Collectivités françaises d'outre-mer : livraison à domicile.

Les frais de livraison applicables à chaque zone et mode sont affichés sur la boutique et avant la validation du paiement.`,
        },
        {
          id: '8.2',
          title: '8.2 Livraison en point relais',
          content: `En cas de livraison en point relais, le Client choisit son point relais au moment de la commande ; celui-ci figure sur sa confirmation de commande et sur sa facture. Le Client est averti de la mise à disposition de son colis par le transporteur (email et/ou SMS, d'où l'importance de coordonnées exactes).

Le colis doit être retiré dans le délai de garde du point relais (généralement 8 jours calendaires). À défaut de retrait dans ce délai, le colis est retourné à WeAreClimbers ; le Client est alors contacté pour convenir d'une nouvelle expédition (frais de réexpédition à sa charge) ou d'un remboursement du produit (hors frais de livraison initiaux).`,
        },
        {
          id: '8.3',
          title: '8.3 Transfert des risques et réserves',
          content: `Les risques de perte ou d'endommagement des produits sont transférés au Client au moment où il en prend physiquement possession (ou lorsqu'un tiers désigné par lui, autre que le transporteur proposé par WeAreClimbers, en prend possession).

Il appartient au Client de vérifier l'état du colis à la livraison. En cas de colis endommagé ou de produit manquant, le Client est invité à formuler des réserves auprès du transporteur et à contacter support@weareclimbers.fr dans les meilleurs délais, photographies à l'appui.

En cas d'adresse de livraison erronée ou incomplète communiquée par le Client, les frais de réexpédition sont à sa charge.`,
        },
      ],
    },
    {
      id: '9',
      title: '9. Droit de rétractation',
      subsections: [
        {
          id: '9.1',
          title: '9.1 Principe',
          content: `Conformément aux articles L.221-18 et suivants du Code de la consommation, le Client dispose d'un délai de QUATORZE (14) JOURS à compter de la réception du produit (par lui-même ou par un tiers qu'il a désigné, autre que le transporteur) pour exercer son droit de rétractation, sans avoir à motiver sa décision.

Pour une pré-commande non encore expédiée, le Client peut simplement demander l'annulation (voir article 4.2) — sans attendre la livraison.`,
        },
        {
          id: '9.2',
          title: '9.2 Exercice du droit',
          content: `Le Client notifie sa décision de rétractation avant l'expiration du délai, par une déclaration dénuée d'ambiguïté adressée à :
- Email : contact@weareclimbers.fr, ou
- Courrier : WeAreClimbers SAS, 97 Allée Théodore Monod, 64210 Bidart, France.

Il peut utiliser le modèle de formulaire figurant à l'article 16 des présentes, sans que cela soit obligatoire.`,
        },
        {
          id: '9.3',
          title: '9.3 Retour du produit',
          content: `Le Client renvoie le produit à WeAreClimbers (adresse ci-dessus), sans retard excessif et au plus tard QUATORZE (14) JOURS après la communication de sa décision de rétractation. Le produit doit être retourné complet (bracelet, accessoires, notice, emballage d'origine dans la mesure du possible).

Le Client peut essayer le produit dans la mesure nécessaire pour en établir la nature, les caractéristiques et le bon fonctionnement. Sa responsabilité peut être engagée en cas de dépréciation résultant de manipulations autres que celles-ci (rayures d'usage, traces d'utilisation prolongée, etc.), sous la forme d'une décote appliquée au remboursement.`,
        },
        {
          id: '9.4',
          title: '9.4 Frais et remboursement',
          content: `Les frais directs de renvoi du produit sont à la charge du Client.

WeAreClimbers rembourse la totalité des sommes versées, y compris les frais de livraison initiaux (au tarif standard le moins cher proposé), sans retard excessif et au plus tard QUATORZE (14) JOURS à compter de la date à laquelle elle est informée de la décision de rétractation. Le remboursement peut être différé jusqu'à récupération du produit ou jusqu'à ce que le Client ait fourni une preuve de son expédition.

Le remboursement est effectué via le même moyen de paiement que celui utilisé pour la commande, sans frais pour le Client.`,
        },
      ],
    },
    {
      id: '10',
      title: '10. Garanties légales',
      subsections: [
        {
          id: '10.1',
          title: '10.1 Encadré légal obligatoire',
          content: `Le consommateur dispose d'un délai de deux ans à compter de la délivrance du bien pour obtenir la mise en œuvre de la garantie légale de conformité en cas d'apparition d'un défaut de conformité. Durant ce délai, le consommateur n'est tenu d'établir que l'existence du défaut de conformité, et non la date d'apparition de celui-ci.

Lorsque le contrat de vente prévoit la fourniture d'un contenu numérique ou d'un service numérique de manière continue, la garantie légale de conformité s'applique à ce contenu ou service tout au long de la période de fourniture prévue.

La garantie légale de conformité donne au consommateur droit à la réparation ou au remplacement du bien dans un délai de trente jours suivant sa demande, sans frais et sans inconvénient majeur pour lui. Si le bien est réparé dans le cadre de la garantie légale de conformité, le consommateur bénéficie d'une extension de six mois de la garantie initiale.

Si le consommateur demande la réparation du bien mais que le vendeur impose le remplacement, la garantie légale de conformité est renouvelée pour une période de deux ans à compter de la date de remplacement du bien.

Le consommateur peut obtenir une réduction du prix d'achat en conservant le bien, ou mettre fin au contrat en se faisant rembourser intégralement contre restitution du bien, si :
1° Le professionnel refuse de réparer ou de remplacer le bien ;
2° La réparation ou le remplacement du bien intervient après un délai de trente jours ;
3° La réparation ou le remplacement du bien occasionne un inconvénient majeur pour le consommateur ;
4° La non-conformité du bien persiste en dépit de la tentative de mise en conformité du vendeur restée infructueuse.

Le consommateur a également droit à une réduction du prix du bien ou à la résolution du contrat lorsque le défaut de conformité est si grave qu'il justifie une réduction immédiate du prix ou la résolution du contrat. Le consommateur n'est alors pas tenu de demander la réparation ou le remplacement du bien au préalable.

Le consommateur n'a pas droit à la résolution de la vente si le défaut de conformité est mineur.

Toute période d'immobilisation du bien en vue de sa réparation ou de son remplacement suspend la garantie qui restait à courir jusqu'à la délivrance du bien remis en état.

Les droits mentionnés ci-dessus résultent de l'application des articles L.217-1 à L.217-32 du Code de la consommation.

Le vendeur qui fait obstacle de mauvaise foi à la mise en œuvre de la garantie légale de conformité encourt une amende civile d'un montant maximal de 300 000 euros, qui peut être porté jusqu'à 10 % du chiffre d'affaires moyen annuel (article L.241-5 du Code de la consommation).

Le consommateur bénéficie également de la garantie légale des vices cachés en application des articles 1641 à 1649 du Code civil, pendant une durée de deux ans à compter de la découverte du défaut. Cette garantie donne droit à une réduction de prix si le bien est conservé, ou à un remboursement intégral contre restitution du bien.`,
        },
        {
          id: '10.2',
          title: '10.2 Mise en œuvre',
          content: `Pour toute demande au titre des garanties légales, contactez support@weareclimbers.fr en décrivant le défaut constaté (photographies ou vidéos à l'appui). WeAreClimbers organise, le cas échéant, le retour du produit à ses frais dans le cadre de la garantie légale de conformité.`,
        },
        {
          id: '10.3',
          title: '10.3 Garantie commerciale du fabricant',
          content: `Le bracelet Polar 360 bénéficie en outre de la garantie commerciale du fabricant Polar Electro Oy (2 ans), selon les conditions propres à ce dernier. Cette garantie commerciale s'ajoute aux garanties légales ci-dessus, qui s'appliquent en tout état de cause et que la garantie commerciale ne limite en rien.`,
        },
      ],
    },
    {
      id: '11',
      title: '11. Responsabilité',
      content: `Les produits sont destinés à un usage sportif et de bien-être. Le bracelet et l'application WAC ne sont pas des dispositifs médicaux : les données mesurées et les indicateurs calculés sont fournis à titre informatif et ne remplacent en aucun cas un avis médical. Consultez un médecin avant d'entreprendre un programme d'entraînement intensif ou en cas de problème de santé.

La responsabilité de WeAreClimbers ne saurait être engagée en cas d'inexécution ou de mauvaise exécution du contrat imputable au Client, au fait imprévisible et insurmontable d'un tiers étranger au contrat, ou à un cas de force majeure au sens de l'article 1218 du Code civil (voir article 14).

Rien dans les présentes CGV ne limite ou n'exclut la responsabilité de WeAreClimbers en cas de dommage corporel, de dol ou de faute lourde, ni les droits que le Client tient des garanties légales.`,
    },
    {
      id: '12',
      title: '12. Données personnelles',
      content: `Les données personnelles collectées dans le cadre des commandes (identité, coordonnées, adresse, historique d'achat) sont traitées par WeAreClimbers SAS, responsable de traitement, aux fins de gestion des commandes, des livraisons, de la facturation et de la relation client. Elles sont transmises aux seuls prestataires nécessaires à l'exécution de la commande (Stripe pour le paiement, Mondial Relay ou l'opérateur postal pour la livraison, Brevo pour les emails transactionnels).

Pour le détail des traitements, des durées de conservation et de vos droits (accès, rectification, effacement, opposition, portabilité), consultez notre Politique de Confidentialité. Contact : dpo@weareclimbers.fr.`,
    },
    {
      id: '13',
      title: '13. Médiation de la consommation',
      content: `Conformément aux articles L.612-1 et suivants du Code de la consommation, le Client peut recourir gratuitement à un médiateur de la consommation en cas de litige non résolu avec le service client (après réclamation écrite préalable auprès de contact@weareclimbers.fr).

Médiateur compétent :
CM2C — Centre de Médiation de la Consommation de Conciliateurs de Justice
14 rue Saint-Jean, 75017 Paris
Email : cm2c@cm2c.net — Site : https://www.cm2c.net

Le Client peut également utiliser la plateforme européenne de règlement en ligne des litiges : https://ec.europa.eu/consumers/odr/`,
    },
    {
      id: '14',
      title: '14. Force majeure',
      content: `L'exécution des obligations de WeAreClimbers est suspendue en cas de survenance d'un événement de force majeure au sens de l'article 1218 du Code civil (notamment : catastrophe naturelle, incendie, épidémie, conflit armé, grève des transporteurs, défaillance majeure d'un fournisseur ou d'une infrastructure essentielle). WeAreClimbers en informe le Client dans les meilleurs délais.

Si l'empêchement est définitif, ou dure plus de soixante (60) jours, chacune des parties peut résoudre le contrat ; les sommes versées par le Client lui sont alors intégralement remboursées.`,
    },
    {
      id: '15',
      title: '15. Droit applicable et litiges',
      content: `Les présentes CGV et les ventes qu'elles régissent sont soumises au droit français. Elles sont rédigées en langue française.

En cas de litige, une solution amiable sera recherchée en priorité (service client, puis médiation — voir article 13). À défaut, le litige relève des juridictions françaises compétentes dans les conditions de droit commun. Le Client consommateur peut saisir, à son choix, l'une des juridictions territorialement compétentes en vertu du Code de procédure civile ou la juridiction du lieu où il demeurait au moment de la conclusion du contrat ou de la survenance du fait dommageable.

Les dispositions impératives plus favorables de la loi du pays de résidence habituelle du Client au sein de l'Union européenne demeurent applicables.`,
    },
    {
      id: '16',
      title: '16. Annexe — Formulaire de rétractation',
      content: `(Veuillez compléter et renvoyer le présent formulaire uniquement si vous souhaitez vous rétracter du contrat.)

À l'attention de : WeAreClimbers SAS, 97 Allée Théodore Monod, 64210 Bidart, France — contact@weareclimbers.fr

Je vous notifie par la présente ma rétractation du contrat portant sur la vente du bien ci-dessous :

- Commandé le : ____________ / Reçu le : ____________
- Numéro de commande : ____________
- Nom du consommateur : ____________
- Adresse du consommateur : ____________
- Signature (uniquement en cas de notification sur papier) : ____________
- Date : ____________`,
    },
  ],
};
