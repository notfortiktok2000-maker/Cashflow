# Refonte Shopify PDP Compacte & Suivi de Commande — ESSENTIELS.MA

Transformation de la boutique en une véritable fiche produit Shopify compacte (PDP), intégrant une galerie visuelle avec images de packs générées en studio, des déclencheurs d'achat (rareté du stock, livraison express), des badges de réassurance adaptés au marché marocain, et un module interactif de suivi de colis en temps réel.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Décisions confirmées lors de la phase de cadrage :**
> - **Format Fiche Produit Shopify compacte** : Remplacement de la longue page multi-sections par une interface PDP ergonomique (galerie interactive à gauche/haut, module d'achat fluide à droite avec sélecteur de packs Solo / Duo, accordéons compacts pour les détails et la FAQ).
> - **Suivi de commande par numéro de référence** : Module dédié permettant au client de renseigner son numéro de commande (généré lors du passage de commande ou prédéfini ex. `MA-2026-8492`) pour afficher une frise chronologique détaillée du colis avec transporteur marocain (Amana / Cathedis).
> - **Déclencheurs de conversion sélectionnés** :
>   1. Compteur d'unités restantes en stock dynamique (incitation immédiate à la commande).
>   2. Expédition rapide 24h–48h partout au Maroc.
>   3. Paiement sécurisé 100% à la livraison (Cash on Delivery).
>   4. Badges de réassurance visuels (emballage discret, vérification à réception, service client WhatsApp dédié).
> - **Génération d'images studio réalistes** : Création d'images professionnelles pour le Pack Solo (10 boxers élégamment présentés) et Pack Duo (20 boxers / double coffret) via `generate_image`.

---

## 1. Overview & Core Concept

- **Ce que fait la solution** : Offre une expérience d'achat directe, inspirée des meilleures fiches produits direct-to-consumer (DTC) de Shopify. L'utilisateur découvre le produit sans scroll infini, visualise les packs avec photos studio réelles, sélectionne son offre (Solo 199 DH ou Duo 269 DH), observe la disponibilité des stocks et confirme son panier instantanément sur WhatsApp. Il peut également suivre son expédition en direct grâce au numéro de commande attribué.
- **Public cible** : Hommes et acheteurs au Maroc recherchant des sous-vêtements essentiels à prix juste, sans carte bancaire ni formalités complexes, avec garantie de paiement à la réception.
- **Valeur clé** : Taux de conversion maximisé grâce à la compacité du viewport, des visuels rassurants, des déclencheurs psychologiques éthiques et un suivi transparent.

---

## 2. User Experience & Visual Design

### Parcours utilisateur (User Flows)
1. **Écran principal (PDP Shopify)** :
   - Haut de page : Barre d'annonce concise (Livraison gratuite 24-48h partout au Maroc + lien direct "Suivre mon colis").
   - Zone produit centrale :
     - **Colonne gauche (Desktop) / Galerie carrousel (Mobile)** : Photos studio haute définition du produit, zoom sur les finitions, aperçu du packaging 10 pièces et 20 pièces.
     - **Colonne droite (Module d'achat Shopify)** : Titre du produit, avis vérifiés et note étoiles, sélecteur de pack (Solo 10 pcs 199 DH vs Duo 20 pcs 269 DH "Meilleure valeur"), déclencheur de stock ("Plus que 12 packs disponibles"), sélection de taille rapide (M, L, XL, XXL), bouton principal *"Commander via WhatsApp — Paiement à la livraison"*, et barre de réassurance.
     - **Section basse repliable (Accordéons)** : Description matière, guide des tailles express, modalités de livraison, et FAQ concise.
2. **Tunnel de commande express** :
   - Clic sur "Commander" -> Formulaire de livraison optimisé (Prénom, Nom, Téléphone marocain normalisé, Ville, Adresse).
   - Génération automatique d'un numéro de commande unique (ex. `MA-8492`) inclus dans le message WhatsApp pré-rempli.
3. **Module de suivi de commande (Order Tracker)** :
   - Onglet ou page dédiée accessible depuis le header.
   - Saisie du numéro de commande -> Affichage du statut en temps réel (Confirmée -> En préparation à Casablanca -> Pris en charge par le transporteur -> En cours de livraison -> Livrée).

### Direction visuelle & Palette
- **Canvas** : Blanc cassé moderne `#FAF9F6` et blanc pur `#FFFFFF` pour les conteneurs.
- **Typographie** : `Plus Jakarta Sans` pour les titres et le corps, chiffres tabulaires (`tabular-nums`) pour les prix et les codes de suivi.
- **Accents & Statuts** :
  - Bleu marine profond `#1E293B` pour les CTA et bordures actives.
  - Ambre feutré `#B45309` pour le déclencheur de stock restant (sans agressivité néon).
  - Vert émeraude `#047857` pour la livraison gratuite et les étapes validées du suivi.
- **Zéro-Pill & Clarté** : Pas de badges superflus; des icônes SVG légères et des séparateurs discrets.

---

## 3. Key Product Decisions & Trade-Offs

- **Décision 1 : Structure PDP Shopify monobloc plutôt que landing page à défilement**
  - *Choix* : Regrouper l'ensemble des informations critiques au-dessus de la ligne de flottaison sur desktop et dans les premiers scrolls sur mobile.
  - *Raison* : Évite la dispersion des utilisateurs mobiles, augmente l'accessibilité immédiate du bouton de commande et correspond aux standards d'e-commerce direct les plus efficaces.
- **Décision 2 : Stockage local & simulation réaliste pour le suivi de colis**
  - *Choix* : Générer et enregistrer les commandes dans le `localStorage` du navigateur avec des statuts dynamiques horodatés, tout en fournissant des commandes de démonstration pour tester l'interface immédiatement.
  - *Raison* : Fournit une expérience utilisateur 100% fonctionnelle sans nécessiter de base de données complexe ou d'authentification lourde non souhaitée.
- **Décision 3 : Génération d'images studio dédiées via `generate_image`**
  - *Choix* : Générer 3 images studio cohérentes (Pack Solo 10 boxers pliés sobrement sur fond neutre, Pack Duo double coffret, et prise de vue macro textile).
  - *Raison* : Remplace les placeholders par des visuels photographiques professionnels adaptés au marché marocain, sans dépendre d'URLs externes fragiles.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                               App.tsx                                  │
│                 (Router: "/" PDP | "/suivi" Tracker)                   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
       ┌────────────────────────────┴───────────────────────────┐
       ▼                                                        ▼
┌──────────────────────────────────────┐     ┌──────────────────────────────────┐
│             Shopify PDP              │     │          Order Tracker           │
│         (src/pages/PDP.tsx)          │     │    (src/pages/OrderTracker.tsx)  │
├──────────────────────────────────────┤     ├──────────────────────────────────┤
│ • Header (Nav + Lien Suivi)          │     │ • Champ de recherche réf.        │
│ • ProductGallery (Images studio)     │     │ • Statut en temps réel           │
│ • PackVariantSelector (Solo / Duo)   │     │ • Timeline d'expédition          │
│ • StockTrigger ("12 restants")       │     │ • Détails colis & transporteur   │
│ • TrustBadges (COD, 24-48h, Échange) │     │ • Bouton contact WhatsApp aide   │
│ • QuickCheckoutDrawer / Modal        │     └──────────────────────────────────┘
│ • CollapsibleDetails (Matière, FAQ)  │
└──────────────────┬───────────────────┘
                   ▼
┌───────────────────────────────────────────────────────────────────────┐
│              WhatsApp Order Engine (src/utils/whatsapp.ts)            │
│  - Validation numéro marocain (06/07/+212)                            │
│  - Génération identifiant commande (ex: MA-2026-XXXX)                 │
│  - Enregistrement localStorage pour suivi                             │
│  - Encodage URL wa.me avec format exact                               │
└───────────────────────────────────────────────────────────────────────┘
```

### Plan d'exécution en Phase 3 :
1. **Génération par lot des visuels studio** (`generate_image` pour Pack Solo, Pack Duo, et Détail matière).
2. **Module de gestion des commandes & suivi** (`src/utils/orderStorage.ts` et `src/pages/OrderTracker.tsx`).
3. **Composants PDP Shopify** (`ProductGallery.tsx`, `PackSelector.tsx`, `TrustBadges.tsx`, `StockTrigger.tsx`, `AccordionSection.tsx`).
4. **Intégration du checkout direct et mise à jour des routes**.
5. **Compilation, vérification visuelle et responsive test**.
