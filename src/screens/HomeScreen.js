import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Header from '../components/Header';
import StatistikBox from '../components/StatistikBox';
import ItemCard from '../components/ItemCard';
import FormModal from '../components/FormModal';

export default function HomeScreen({ navigation, alatCamp, setAlatCamp, riwayat, setRiwayat }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [totalTersedia, setTotalTersedia] = useState(0);

  // Hook useEffect: otomatis menghitung ulang total unit alat camp yang ready
  useEffect(() => {
    const total = alatCamp.reduce((sum, item) => sum + item.stok, 0);
    setTotalTersedia(total);
  }, [alatCamp]);

  const handleOpenSewa = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleProsesSewa = (item, namaPenyewa, noHp, lamaHari, totalBiaya) => {
    // Kurangi stok alat camp
    const updatedAlat = alatCamp.map((a) =>
      a.id === item.id ? { ...a, stok: a.stok - 1 } : a
    );
    setAlatCamp(updatedAlat);

    // Simpan ke riwayat penyewaan
    const transaksiBaru = {
      id: Date.now().toString(),
      alatId: item.id,
      namaAlat: item.nama,
      penyewa: namaPenyewa,
      noHp: noHp,
      lamaHari: lamaHari,
      totalBiaya: totalBiaya,
      tanggal: new Date().toLocaleDateString('id-ID'),
      status: 'Disewa',
    };
    setRiwayat([transaksiBaru, ...riwayat]);

    setModalVisible(false);
    Alert.alert(
      'Booking Berhasil!',
      `${item.nama} disewa oleh ${namaPenyewa} selama ${lamaHari} hari (Total: Rp ${totalBiaya.toLocaleString('id-ID')})`
    );
  };

  const totalDisewa = riwayat.filter((r) => r.status === 'Disewa').length;

  return (
    <View style={styles.container}>
      <Header
        title="CampRent Outdoor"
        subtitle="Penyewaan Perlengkapan Camping & Hiking"
      />

      <View style={styles.content}>
        <StatistikBox tersedia={totalTersedia} disewa={totalDisewa} />

        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.navBtnText}>
            Daftar Penyewa & Pengembalian ({riwayat.length}) →
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Katalog Peralatan Camp</Text>
        <FlatList
          data={alatCamp}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemCard item={item} onSewa={handleOpenSewa} />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      <FormModal
        visible={modalVisible}
        item={selectedItem}
        onClose={() => setModalVisible(false)}
        onSubmit={handleProsesSewa}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  content: { flex: 1, paddingHorizontal: 16 },
  navBtn: {
    backgroundColor: '#1B4332',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  navBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
});