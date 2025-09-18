// src/components/FeaturedList.tsx
import { Image } from 'expo-image';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../../types';

type Props = {
  featured: Product[];
  onPressProduct: (id: string) => void;
  loading?: boolean;
};

export default function FeaturedList({ featured, onPressProduct }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured</Text>
      <FlatList
        data={featured}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => onPressProduct(item._id)}>
            <Image source={{ uri: item?.images?.[0]?.url ?? `https://picsum.photos/360/360?random=${item._id}` }} style={styles.img} contentFit="cover" />
            <Text numberOfLines={1} style={styles.name}>{item.title}</Text>
            <Text style={styles.price}>৳ {Number(item.price ?? 0).toFixed(2)}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  title: { fontSize: 16, fontWeight: '700', marginHorizontal: 12, marginBottom: 8 },
  card: { width: 120, marginRight: 12 },
  img: { width: 120, height: 120, borderRadius: 8 },
  name: { marginTop: 8, fontSize: 13, fontWeight: '600' },
  price: { marginTop: 4, fontSize: 13, fontWeight: '700' },
});
