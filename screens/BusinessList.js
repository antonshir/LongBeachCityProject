import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import BusinessItem from '../components/BusinessItem';

import HeaderButton  from '../components/HeaderButton';

const BusinessList = props => {
    const businesses = useSelector(state => state.businesses.businesses);

    return (
        <FlatList
            data={businesses}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <BusinessItem
                    image={null}
                    title={itemData.item.title}
                    address={null}
                    onSelect={() => {
                        props.navigation.navigate('BusinessDetail', {
                            businessTitle: itemData.item.title,
                            businessId: itemData.item.id
                        });
                    }}
                />
            )}
        /> 
    );
};

BusinessList.navigationOptions = navData => {
    return {
        headerTitle: 'All Bussinesses',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Add Business"
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate('NewBusiness');
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({});

export default BusinessList;