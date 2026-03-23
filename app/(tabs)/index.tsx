import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import { SearchBar } from '../../src/components/SearchBar';
import { EventCard } from '../../src/components/EventCard';
import { Colors } from '../../src/constants/Colors';

const MOCK_EVENTS = [
  { 
    id: '1', 
    title: 'Festival de Musique', 
    startDate: '25/10', 
    endDate: '27/10', 
    location: 'Théâtre de Carthage', 
    participants: 120, 
    price: '50', 
    image: 'https://picsum.photos/400/200' 
  },
  { 
    id: '2', 
    title: 'Tech Workshop', 
    startDate: '12/11', 
    endDate: '12/11', 
    location: 'Sousse Hub', 
    participants: 45, 
    price: '0', 
    image: 'https://picsum.photos/401/200' 
  },
];

export default function EventsListScreen() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const filteredEvents = MOCK_EVENTS.filter(event => 
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trouvez des événements</Text>
        <SearchBar value={search} onChangeText={setSearch} />
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <EventCard
            {...item}
            onPress={() => router.push({
                pathname: "/event-details/[id]", // Route dynamique
                params: { id: item.id }
            })}
            onParticipate={() => alert(`Inscription à : ${item.title}`)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucun événement trouvé.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { paddingHorizontal: wp(5), paddingTop: hp(6), paddingBottom: hp(2), backgroundColor: Colors.white },
  headerTitle: { fontSize: wp(6), fontWeight: 'bold', color: Colors.black, marginVertical: hp(2) },
  listContent: { padding: wp(5) },
  empty: { textAlign: 'center', marginTop: 50, color: Colors.gray }
});