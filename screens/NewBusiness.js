import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import * as businessesActions from '../store/business-actions';

import Colors from '../constants/Colors';
import BusinessItem from '../components/BusinessItem';

const NewBusiness = props => {
    const [titleValue, setTitleValue] = useState('');

    const dispatch = useDispatch(); 

    const titleChangeHandler = text => {
        //consider validation here 
        setTitleValue(text);
    }

    const saveBusinessHandler = () => {
        dispatch(businessesActions.addBusiness(titleValue));
        props.navigation.goBack(); 
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                 />
                <Button
                    title="Save Business"
                    color={Colors.primary}
                    onPress={saveBusinessHandler}
                />
            </View>
        </ScrollView>
    );
};

NewBusiness.navigationOptions = {
    headerTitle: 'Add Business'
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 80,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1, 
        marginBottom: 15, 
        paddingVertical: 4, 
        paddingHorizontal: 2
    }
});

export default NewBusiness;