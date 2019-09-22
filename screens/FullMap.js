import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const FullMap = props => {
    const mapRegion = {
        latitude: 33.7838235,
        longitude: -118.1162791,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0421
    };
    return <MapView style={styles.map} region={mapRegion}/>;

};

const styles = StyleSheet.create({
   
    map: {
        flex: 1
    }
});

export default FullMap;