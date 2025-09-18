'use client';

import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type CartItem = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

// Example initial cart items
const initialCart: CartItem[] = [
  { _id: '1', title: 'Organic Eggs', price: 500, quantity: 1, image: 'https://picsum.photos/200/200?random=1' },
  { _id: '2', title: 'Fresh Chicken', price: 1200, quantity: 2, image: 'https://picsum.photos/200/200?random=2' },
];

export default function CartScreen() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const removeItem = (id: string) => setCart(prev => prev.filter(item => item._id !== id));
  const incrementQty = (id: string) => setCart(prev => prev.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
  const decrementQty = (id: string) => setCart(prev => prev.map(item => item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.heading}>My Cart</Text>
        <View style={{ width: 24 }} /> {/* placeholder for spacing */}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {cart.length === 0 ? (
          <View style={styles.empty}>
            <MaterialIcons name="remove-shopping-cart" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        ) : (
          cart.map((item) => (
            <View key={item._id} style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardBody}>
                <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>৳ {item.price.toFixed(2)}</Text>

                <View style={styles.qtyRow}>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => decrementQty(item._id)}>
                    <Text style={styles.qtyText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyValue}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => incrementQty(item._id)}>
                    <Text style={styles.qtyText}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.removeBtn} onPress={() => removeItem(item._id)}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {cart.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ৳ {totalPrice.toFixed(2)}</Text>
          <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/checkout')}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: '#fff', elevation: 2 },
  backBtn: { padding: 4 },
  heading: { fontSize: 18, fontWeight: '700' },

  empty: { marginTop: 100, alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#888', marginTop: 12 },

  card: { flexDirection: 'row', padding: 12, marginHorizontal: 12, marginVertical: 6, backgroundColor: '#fff', borderRadius: 12, elevation: 2 },
  image: { width: 90, height: 90, borderRadius: 10, marginRight: 12 },
  cardBody: { flex: 1, justifyContent: 'space-between' },
  title: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  price: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  qtyBtn: { width: 28, height: 28, borderRadius: 6, backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center' },
  qtyText: { fontSize: 16, fontWeight: '700' },
  qtyValue: { marginHorizontal: 12, fontSize: 14, fontWeight: '600' },
  removeBtn: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 8, backgroundColor: '#ff3b30', borderRadius: 6 },
  removeText: { color: '#fff', fontSize: 12, fontWeight: '600' },

  totalContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16, elevation: 4 },
  totalText: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  checkoutBtn: { backgroundColor: '#FDC700', borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  checkoutText: { fontSize: 16, fontWeight: '700', color: '#fff' },
});
