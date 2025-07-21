import React, { useState, useMemo } from 'react';
import { mockProducts, mockCategories } from '../data/mockData';
import { Product } from '../types';
import {
  ProductHeader,
  KpiGrid,
  ProductList,
  LowStockAlert,
  ProductFormModal
} from '../components/produit';

// Seuil pour le stock faible
const LOW_STOCK_THRESHOLD = 10;

/**
 * Page principale pour la gestion des produits et du stock.
 * Affiche les indicateurs de performance (KPIs), les alertes de stock faible,
 * et la liste complète des produits avec des options de recherche, de tri et de filtrage.
 */
const ProduitsPage: React.FC = () => {
  // --- ÉTATS LOCAUX ---
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('created_desc');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // --- DONNÉES ET FILTRAGE ---

  // Fonction de tri générique pour les produits
  const sortProducts = (products: Product[], sortBy: string): Product[] => {
    const sorted = [...products];
    switch (sortBy) {
      case 'created_desc': return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'created_asc': return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'name_asc': return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc': return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'stock_desc': return sorted.sort((a, b) => (b.stock ?? 0) - (a.stock ?? 0));
      case 'stock_asc': return sorted.sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0));
      case 'price_desc': return sorted.sort((a, b) => b.price - a.price);
      case 'price_asc': return sorted.sort((a, b) => a.price - b.price);
      default: return sorted;
    }
  };

  // Mémoïsation des produits filtrés et triés pour optimiser les performances
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.barcode?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.includes(product.categoryId);

      return matchesSearch && matchesCategory;
    });

    return sortProducts(filtered, sortOption);
  }, [searchTerm, selectedCategories, sortOption]);

  // Produits avec un stock faible
  const lowStockProducts = useMemo(() => 
    filteredAndSortedProducts.filter(p => p.stock !== undefined && p.stock < LOW_STOCK_THRESHOLD)
  , [filteredAndSortedProducts]);

  // --- GESTIONNAIRES D'ÉVÉNEMENTS ---

  const handleOpenModal = (mode: 'create' | 'edit', product: Product | null = null) => {
    setModalMode(mode);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = (productData: Product) => {
    console.log('Saving product:', productData);
    // Ici, vous intégreriez la logique pour appeler votre API (création ou mise à jour)
    // Pour la démo, nous ne faisons qu'afficher les données.
    handleCloseModal();
  };

  const handleDeleteProduct = (productId: string) => {
    console.log('Deleting product:', productId);
    // Logique de suppression via API
  };

  // --- RENDU DU COMPOSANT ---
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="p-4 md:p-6">
        {/* En-tête de la page (Sticky) */}
        <header className="sticky top-0 bg-black z-10 py-4 -mx-4 -mt-4 px-4 md:-mx-6 md:px-6 md:-mt-6 mb-6 border-b border-gray-800">
          <ProductHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortOption={sortOption}
            onSortChange={setSortOption}
            categories={mockCategories}
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
            onAddProduct={() => handleOpenModal('create')}
          />
        </header>

        {/* Section des indicateurs de performance (KPIs) */}
        <KpiGrid products={filteredAndSortedProducts} />

        {/* Alerte pour les produits à stock faible */}
        <LowStockAlert products={lowStockProducts} />

        {/* Section principale : liste des produits */}
        <main className="mt-6">
          <ProductList
            products={filteredAndSortedProducts}
            onEditProduct={(product) => handleOpenModal('edit', product)}
            onDeleteProduct={handleDeleteProduct}
          />
        </main>
      </div>

      {/* Modale pour la création et l'édition de produits */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        product={selectedProduct}
        mode={modalMode}
        categories={mockCategories}
      />
    </div>
  );
};

export default ProduitsPage;
