import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatistikBox({ tersedia, disewa }) {
  return (
    <View style={styles.row}>
      <View style={[styles.card, { backgroundColor: '#D8F3DC' }]}>
        <Text style={[styles.angka, { color: '#1B4332' }]}>{tersedia}</Text>
        <Text style={styles.label}>Unit Ready</Text>
      </View>
      <View style={[styles.card, { backgroundColor: '#FEF3C7' }]}>
        <Text style={[styles.angka, { color: '#92400E' }]}>{disewa}</Text>
        <Text style={styles.label}>Sedang Disewa</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    gap: 10,
  },
  card: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  angka: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: '#374151',
    marginTop: 4,
  },
});