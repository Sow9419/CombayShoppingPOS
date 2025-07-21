
Objectif UX : Donner un contrôle total sur le catalogue produits. La vendeuse doit pouvoir consulter, rechercher, filtrer, et modifier rapidement n'importe quel produit, tout en ayant une vision claire de l'état du stock et de la rentabilité (Prix d'Achat vs Prix de Vente).
1. Zone de Contrôles & Filtres (En-tête)
Composant : <ProductHeader>
UI : Barre horizontale contenant une barre de recherche et les filtres principaux.
UX Desktop : Tous les filtres sont visibles et accessibles directement.
UX Mobile : La barre de recherche reste proéminente. Les filtres complexes (produits, Catégorie) sont regroupés sous un seul bouton "Filtres" qui ouvre une "bottom sheet". Le tri (Créé le plus récent...) reste un menu déroulant simple.
Composant : <SortFilter>
UI : Menu déroulant "Créé (le plus récent en premier)".
Data : Liste statique d'options de tri (par date, par nom, par stock...).
État : Mémorise l'option de tri active pour l'appliquer à la requête.
Composant : <TagFilter>
UI : Boutons avec une icône et un + ("produits", "Catégorie").
UX : Au clic, ouvre une pop-up ou une modale permettant de sélectionner plusieurs options (ex: cocher plusieurs catégories). Les options sélectionnées apparaissent comme des "tags" (étiquettes) amovibles.
Data : La liste des catégories/types est chargée depuis la base de données.
État : Mémorise un tableau d'IDs des filtres actifs.
2. Zone de Contenu Principal (Centre)
Composant : <KpiGrid>
Composant : <ProductList>
UI : Une liste dense affichée sous forme de tableau, où chaque ligne représente une variante de produit.
UX Desktop : Affichage en tableau classique avec des colonnes alignées pour une comparaison facile.
UX Mobile : L'affichage tableau est abandonné au profit d'une liste de cartes verticales (<ProductDetailCard>). Chaque carte empile les informations pour une meilleure lisibilité.
Data : Liste paginée des variantes_produit (avec toutes les infos jointes : produit, catégorie...).
État : Géré par React Query (useAllProductsQuery), se met à jour en fonction de tous les filtres actifs (recherche, tri, tags).
Composant : <ProductListItem> / <ProductDetailCard>
UI : Affiche une image miniature, le nom du produit, le stock (Stock : Nombre), un tag pour la catégorie , un badge pour l'état du stock , le Prix d'Achat (P.A), le Prix de Vente (P.V), et les icônes d'action.
UX : La ligne entière (sauf les boutons d'action) est cliquable pour ouvrir la modale d'édition.
Data : Reçoit un objet variante_produit complet. L'état du stock (Suffisant, Faible, En rupture) est calculé dynamiquement à partir de la quantite_disponible et du seuil_stock_faible.
Action :
Icône "Crayon" (Modifier) : Ouvre une modale (<ProductFormModal>) pré-remplie avec les données du produit.
Icône "Poubelle" (Supprimer) : Ouvre une modale de confirmation avant d'appeler la fonction RPC de suppression.