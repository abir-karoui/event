import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../constants/Colors';

interface EventCardProps {
  title: string;
  startDate: string;  // Ajouté
  endDate: string;    // Ajouté
  participants: number; // Ajouté
  location: string;
  price: string;
  image: string;
  onPress: () => void;
  onParticipate?: () => void; // Nouvelle action pour le bouton
}

export const EventCard: React.FC<EventCardProps> = ({ 
  title, startDate, endDate, participants, location, price, image, onPress, onParticipate 
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: image }} style={styles.image} />
      
      <View style={styles.priceTag}>
        <Text style={styles.priceText}>{price === "0" ? "Gratuit" : `${price} DT`}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        
        {/* Dates Début et Fin */}
        <View style={styles.row}>
          <Ionicons name="time-outline" size={16} color={Colors.blue} />
          <Text style={styles.detailsText}>Du {startDate} au {endDate}</Text>
        </View>

        {/* Lieu */}
        <View style={styles.row}>
          <Ionicons name="location-outline" size={16} color={Colors.blue} />
          <Text style={styles.detailsText} numberOfLines={1}>{location}</Text>
        </View>
        <View style={styles.footerRow}>
          <View style={styles.participantContainer}>
            <Ionicons name="people-outline" size={18} color={Colors.gray} />
            <Text style={styles.participantText}>{participants} participants</Text>
          </View>

          <TouchableOpacity 
            style={styles.participateBtn} 
            onPress={onParticipate}
          >
            <Text style={styles.participateBtnText}>Participer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginBottom: hp(2.5),
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: hp(18),
    backgroundColor: Colors.lightGrey,
  },
  priceTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.blue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    zIndex: 1,
  },
  priceText: { color: Colors.white, fontWeight: 'bold', fontSize: wp(3.5) },
  infoContainer: { padding: wp(4) },
  title: { fontSize: wp(4.5), fontWeight: 'bold', color: Colors.black, marginBottom: hp(1) },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: hp(0.8) },
  detailsText: { marginLeft: 8, color: Colors.gray, fontSize: wp(3.5) },
  
  footerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: hp(1.5),
    paddingTop: hp(1.5),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  participantContainer: { flexDirection: 'row', alignItems: 'center' },
  participantText: { marginLeft: 5, color: Colors.gray, fontSize: wp(3.2), fontWeight: '500' },
  
  participateBtn: {
    backgroundColor: Colors.blue,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    width: wp(40),
  },
  participateBtnText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: wp(4.5),
    textAlign: 'center',
  }
});