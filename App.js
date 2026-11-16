import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // State utama daftar alat camping beserta tarif sewa per hari
  const [alatCamp, setAlatCamp] = useState([
    { id: '1', nama: 'Tenda Dome Kapasitas 4 Orang', kategori: 'Tenda', hargaPerHari: 50000, stok: 4 },
    { id: '2', nama: 'Carrier Eiger 60L', kategori: 'Tas Gunung', hargaPerHari: 35000, stok: 3 },
    { id: '3', nama: 'Sleeping Bag Polar', kategori: 'Perlengkapan Tidur', hargaPerHari: 15000, stok: 6 },
    { id: '4', nama: 'Kompor Portable + Nesting', kategori: 'Alat Masak', hargaPerHari: 25000, stok: 5 },
    { id: '5', nama: 'Flysheet 3x4m + Tiang', kategori: 'Shelter', hargaPerHari: 20000, stok: 3 },
    { id: '6', nama: 'Headlamp LED Waterproof', kategori: 'Penerangan', hargaPerHari: 10000, stok: 7 },
  ]);

  // State riwayat penyewaan
  const [riwayat, setRiwayat] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: 'Katalog Sewa Camp' }}>
          {(props) => (
            <HomeScreen
              {...props}
              alatCamp={alatCamp}
              setAlatCamp={setAlatCamp}
              riwayat={riwayat}
              setRiwayat={setRiwayat}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="History" options={{ title: 'Riwayat Sewa' }}>
          {(props) => (
            <HistoryScreen
              {...props}
              alatCamp={alatCamp}
              setAlatCamp={setAlatCamp}
              riwayat={riwayat}
              setRiwayat={setRiwayat}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}