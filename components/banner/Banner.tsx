// src/components/BannerCarousel.tsx
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BannerItem } from '../../types';

const { width } = Dimensions.get('window');
const DEFAULT_HEIGHT = 180;

type Props = {
  banners: BannerItem[];
  height?: number;
};

export default function BannerCarousel({ banners, height = DEFAULT_HEIGHT }: Props) {
  return (
    <View style={{ height, marginTop: 12 }}>
      <FlatList
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.bannerCard, { height }]}>
            <Image source={{ uri: item.img }} style={styles.bannerImage} contentFit="cover" />
            <View style={styles.bannerOverlay} />
            <Text style={styles.bannerLabel}>{item.label}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bannerCard: {
    width: width - 24,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  bannerImage: { width: '100%', height: '100%' },
  bannerOverlay: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 64, backgroundColor: 'rgba(0,0,0,0.18)' },
  bannerLabel: { position: 'absolute', left: 18, bottom: 18, color: '#fff', fontSize: 18, fontWeight: '700' },
});
