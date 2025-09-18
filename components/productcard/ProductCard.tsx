import { Product } from '@/types';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  product: Product;
  onPress: (id: string) => void;
  onAddToCart: (p: Product) => void;
}

export default function ProductCard({ product, onPress, onAddToCart }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product._id)} activeOpacity={0.85}>
      {/* 🔹 Product Image */}
      <Image
        source={{
          uri:
            product?.image ??
            `https://picsum.photos/400/400?random=${product._id}`,
        }}
        style={styles.image}
        contentFit="cover"
        transition={500}
      />

      {/* 🔹 Product Details */}
      <View style={styles.cardBody}>
        <Text numberOfLines={2} style={styles.title}>
          {product.name}
        </Text>
        <Text style={styles.price}>৳ {formatPrice(product.price)}</Text>

        {/* 🔹 Add to Cart Button */}
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => onAddToCart(product)}
        >
          <Feather name="shopping-cart" size={16} color="#111" />
          <Text style={styles.btnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function formatPrice(n: number | undefined) {
  if (!n && n !== 0) return '0.00';
  return Number(n).toFixed(2);
}

const CARD_WIDTH = (width - 36) / 2;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: { width: '100%', height: 160 },
  cardBody: { padding: 10 },
  title: { fontSize: 13, fontWeight: '600', marginBottom: 4, color: '#222' },
  price: { fontSize: 14, fontWeight: '700', marginBottom: 10, color: '#111' },

  cartBtn: {
    backgroundColor: '#FDC700',
    borderRadius: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  btnText: { color: '#111', fontSize: 12, fontWeight: '600' }, // better contrast
});
