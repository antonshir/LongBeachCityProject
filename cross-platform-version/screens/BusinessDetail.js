import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';



const BusinessDetail = props => {
    const pickMapHandler = () => {
        props.navigation.navigate('Map');
    };
    return (
        <View>
            <Button title="Business Location" onPress={pickMapHandler} />
        </View>
    );
};

BusinessDetail.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('businessTitle')
    };
};

const styles = StyleSheet.create({});

export default BusinessDetail;