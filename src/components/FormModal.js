import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function FormModal({ visible, item, onClose, onSubmit }) {
  const [namaPenyewa, setNamaPenyewa] = useState('');
  const [noHp, setNoHp] = useState('');
  const [lamaHari, setLamaHari] = useState('1');

  const jumlahHari = parseInt(lamaHari) || 0;
  const totalBiaya = item ? item.hargaPerHari * jumlahHari : 0;

  const handleConfirm = () => {
    if (!namaPenyewa.trim() || !noHp.trim() || jumlahHari <= 0) {
      Alert.alert('Peringatan', 'Nama, No. HP, dan Lama Sewa (minimal 1 hari) wajib diisi!');
      return;
    }
    onSubmit(item, namaPenyewa, noHp, jumlahHari, totalBiaya);
    setNamaPenyewa('');
    setNoHp('');
    setLamaHari('1');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Form Sewa Alat Camp</Text>
          <Text style={styles.itemName}>
            {item?.nama} (Rp {item?.hargaPerHari.toLocaleString('id-ID')}/hari)
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nama Lengkap Penyewa"
            value={namaPenyewa}
            onChangeText={setNamaPenyewa}
          />
          <TextInput
            style={styles.input}
            placeholder="No. WhatsApp / HP"
            keyboardType="phone-pad"
            value={noHp}
            onChangeText={setNoHp}
          />
          <TextInput
            style={styles.input}
            placeholder="Lama Sewa (Hari)"
            keyboardType="numeric"
            value={lamaHari}
            onChangeText={setLamaHari}
          />

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Estimasi Total Biaya:</Text>
            <Text style={styles.totalHarga}>
              Rp {totalBiaya.toLocaleString('id-ID')}
            </Text>
          </View>

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
              <Text style={styles.btnCancelText}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSubmit} onPress={handleConfirm}>
              <Text style={styles.btnSubmitText}>Sewa Sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  itemName: { fontSize: 13, color: '#2D6A4F', fontWeight: '600', marginBottom: 15, marginTop: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  totalBox: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  totalLabel: { fontSize: 14, color: '#374151', fontWeight: '600' },
  totalHarga: { fontSize: 15, color: '#1B4332', fontWeight: 'bold' },
  btnRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  btnCancel: { padding: 12, borderRadius: 8, backgroundColor: '#E5E7EB' },
  btnCancelText: { color: '#374151', fontWeight: 'bold' },
  btnSubmit: { padding: 12, borderRadius: 8, backgroundColor: '#2D6A4F' },
  btnSubmitText: { color: '#FFFFFF', fontWeight: 'bold' },
});