// src/screens/HomeScreen.tsx
import BannerCarousel from '@/components/banner/Banner';
import Categories from '@/components/categories/Categories';
import FeaturedList from '@/components/featured/Featured';
import ProductCard from '@/components/productcard/ProductCard';
import { fetchProducts } from '@/services/api';
import { BannerItem, Product } from '@/types';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [categories] = useState<string[]>(['All','Clothing','Shoes','Electronics','Accessories']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState('');

  const banners: BannerItem[] = [
    { id: 'b1', img: 'https://picsum.photos/1200/600?random=1', label: 'Summer Sale' },
    { id: 'b2', img: 'https://picsum.photos/1200/600?random=2', label: 'New Arrivals' },
    { id: 'b3', img: 'https://picsum.photos/1200/600?random=3', label: 'Limited Deals' },
  ];

  useEffect(() => { loadProducts(); }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
      setFeatured(data.slice(0, 8));
    } catch (err) {
      console.warn('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (!text) return setFilteredProducts(products);
    setFilteredProducts(products.filter(p => p.name.toLowerCase().includes(name.toLowerCase())));
  };

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'All') return setFilteredProducts(products);
    setFilteredProducts(products.filter(p => p.title.toLowerCase().includes(cat.toLowerCase())));
  };

  const onPressProduct = (id: string) => navigation.navigate('Product' as never, { id });

  const onAddToCart = (product: Product) => setCartCount(c => c + 1);

  return (
    <FlatList
      data={filteredProducts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={onPressProduct}
          onAddToCart={onAddToCart}
        />
      )}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 12, marginBottom: 12 }}
      contentContainerStyle={{ paddingBottom: 40 }}
      ListHeaderComponent={
        <>
          <BannerCarousel banners={banners} />
          <Categories categories={categories} active={activeCategory} onSelect={handleCategorySelect} />
          <FeaturedList featured={featured} onPressProduct={onPressProduct} />
          <View style={{ marginTop: 12, paddingHorizontal: 12 }}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Popular</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Products' as never)}>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      }
      ListEmptyComponent={loading ? <ActivityIndicator style={{ marginTop: 40 }} size="large" /> : null}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  seeAll: { color: '#3b82f6', fontWeight: '600' },
});
