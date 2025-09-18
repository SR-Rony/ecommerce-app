// src/components/Categories.tsx
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  categories: string[];
  active: string;
  onSelect: (c: string) => void;
};

export default function Categories({ categories, active, onSelect }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            style={[styles.chip, active === item && styles.chipActive]}
          >
            <Text style={[styles.chipText, active === item && styles.chipTextActive]}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginTop: 16 },
  title: { fontSize: 16, fontWeight: '700', marginHorizontal: 12, marginBottom: 8 },
  chip: { backgroundColor: '#f4f4f4', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, marginRight: 8 },
  chipActive: { backgroundColor: '#000' },
  chipText: { color: '#333' },
  chipTextActive: { color: '#fff' },
});
