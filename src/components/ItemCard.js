import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ItemCard({ item, onSewa }) {
  const isAvailable = item.stok > 0;

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nama}>{item.nama}</Text>
        <Text style={styles.kategori}>Kategori: {item.kategori}</Text>
        <Text style={styles.harga}>
          Rp {item.hargaPerHari.toLocaleString('id-ID')} / hari
        </Text>
        <Text style={[styles.stok, { color: isAvailable ? '#2D6A4F' : '#DC2626' }]}>
          Stok Ready: {item.stok} unit
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.btn, !isAvailable && styles.btnDisabled]}
        disabled={!isAvailable}
        onPress={() => onSewa(item)}
      >
        <Text style={styles.btnText}>{isAvailable ? 'Sewa' : 'Habis'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  info: { flex: 1 },
  nama: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  kategori: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  harga: { fontSize: 14, fontWeight: 'bold', color: '#D97706', marginVertical: 3 },
  stok: { fontSize: 12, fontWeight: '600' },
  btn: {
    backgroundColor: '#2D6A4F',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  btnDisabled: { backgroundColor: '#9CA3AF' },
  btnText: { color: '#FFFFFF', fontWeight: 'bold' },
});