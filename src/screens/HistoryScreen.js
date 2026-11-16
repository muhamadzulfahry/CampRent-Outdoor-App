import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Header from '../components/Header';

export default function HistoryScreen({ alatCamp, setAlatCamp, riwayat, setRiwayat }) {
  const handleKembalikan = (transaksi) => {
    // Kembalikan stok alat camp
    const updatedAlat = alatCamp.map((a) =>
      a.id === transaksi.alatId ? { ...a, stok: a.stok + 1 } : a
    );
    setAlatCamp(updatedAlat);

    // Ubah status menjadi Selesai
    const updatedRiwayat = riwayat.map((r) =>
      r.id === transaksi.id ? { ...r, status: 'Dikembalikan' } : r
    );
    setRiwayat(updatedRiwayat);

    Alert.alert('Sukses', 'Alat camp telah dikembalikan dan stok diperbarui.');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Data Penyewaan"
        subtitle="Pantau status penyewaan & pengembalian alat"
      />

      <View style={styles.content}>
        {riwayat.length === 0 ? (
          <Text style={styles.empty}>Belum ada transaksi penyewaan.</Text>
        ) : (
          <FlatList
            data={riwayat}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.barang}>{item.namaAlat}</Text>
                  <Text style={styles.detail}>
                    Penyewa: {item.penyewa} ({item.noHp})
                  </Text>
                  <Text style={styles.detail}>
                    Durasi: {item.lamaHari} Hari • Tgl: {item.tanggal}
                  </Text>
                  <Text style={styles.harga}>
                    Total: Rp {item.totalBiaya.toLocaleString('id-ID')}
                  </Text>
                  <Text
                    style={[
                      styles.status,
                      { color: item.status === 'Disewa' ? '#D97706' : '#16A34A' },
                    ]}
                  >
                    Status: {item.status}
                  </Text>
                </View>

                {item.status === 'Disewa' && (
                  <TouchableOpacity
                    style={styles.returnBtn}
                    onPress={() => handleKembalikan(item)}
                  >
                    <Text style={styles.returnText}>Selesai</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  content: { flex: 1, padding: 16 },
  empty: { textAlign: 'center', marginTop: 40, color: '#6B7280', fontSize: 15 },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  barang: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  detail: { fontSize: 13, color: '#4B5563', marginTop: 2 },
  harga: { fontSize: 13, fontWeight: 'bold', color: '#1B4332', marginTop: 3 },
  status: { fontSize: 13, fontWeight: 'bold', marginTop: 4 },
  returnBtn: {
    backgroundColor: '#2D6A4F',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  returnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
});