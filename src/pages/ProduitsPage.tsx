import React, { useState, useMemo } from 'react';
import { mockProducts, mockCategories } from '../data/mockData';
import { Product } from '../types';
import { KpiGrid, ProductList, LowStockAlert, ProductFormModal, SortFilter, TagFilter } from '../components/produit';
import Button from '../components/common/Button';
import Collapsible from '../components/common/Collapsible';
import { Search, Plus, Filter, X } from 'lucide-react';

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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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
    const filtered = mockProducts.filter(product => {
      const matchesSearch = searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
      
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

  const handleSaveProduct = (productData: Partial<Product>) => {
    console.log('Saving product:', productData);
    // Ici, vous intégreriez la logique pour appeler votre API (création ou mise à jour)
    // Pour la démo, nous ne faisons qu'afficher les données.
    handleCloseModal();
  };

  const handleDeleteProduct = (product: Product) => {
    console.log('Deleting product:', product.id);
    // Logique de suppression via API
  };

  // --- RENDU DU COMPOSANT ---
  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col md:flex-row">
      {/* Colonne de gauche (Filtres) - Fixe sur Desktop */}
      <aside className="hidden md:block w-full md:w-72 lg:w-80 bg-black p-4 md:p-6 flex-shrink-0 md:h-screen md:sticky md:top-0">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Produits</h1>
            <p className="text-gray-400 text-sm">Gérez votre inventaire</p>
          </div>
          
          <Button 
            onClick={() => handleOpenModal('create')}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>Ajouter un produit</span>
          </Button>

          <div className="space-y-4">
            <Collapsible title="Filtres">
              <div className="space-y-4 pt-4">
                {/* Barre de recherche */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <SortFilter 
                  value={sortOption}
                  onChange={setSortOption}
                />
                <TagFilter 
                  selectedCategories={selectedCategories}
                  onCategoriesChange={setSelectedCategories}
                />
              </div>
            </Collapsible>
          </div>
        </div>
      </aside>

      {/* Colonne de droite (Contenu) - Scrollable */}
      <div className="flex-1 flex flex-col">
        {/* Header Mobile */}
        <header className="md:hidden bg-black p-4 sticky top-0 z-10 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">Produits</h1>
            <div className="flex items-center space-x-2">
              <Button 
                onClick={() => handleOpenModal('create')}
                variant="primary"
                size="sm"
              >
                <Plus size={18} />
              </Button>
              <Button 
                onClick={() => setIsFilterModalOpen(true)}
                variant="secondary"
                size="sm"
              >
                <Filter size={18} />
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="space-y-6">
            <KpiGrid products={filteredAndSortedProducts} />
            <LowStockAlert products={lowStockProducts} />
            <ProductList
              products={filteredAndSortedProducts}
              onEditProduct={(product) => handleOpenModal('edit', product)}
              onDeleteProduct={handleDeleteProduct}
            />
          </div>
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

      {/* Modale de Filtres Mobile */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:hidden">
          <div className="bg-gray-900 w-full rounded-t-2xl p-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filtres</h2>
              <button onClick={() => setIsFilterModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-6">
              <SortFilter 
                value={sortOption}
                onChange={setSortOption}
              />
              <TagFilter 
                selectedCategories={selectedCategories}
                onCategoriesChange={setSelectedCategories}
              />
              <Button onClick={() => setIsFilterModalOpen(false)} className="w-full">Appliquer</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProduitsPage;
