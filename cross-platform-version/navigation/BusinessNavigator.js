import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import BusinessList from '../screens/BusinessList';
import BusinessDetail from '../screens/BusinessDetail';
import NewBusiness from '../screens/NewBusiness';
import FullMap from '../screens/FullMap';
import Colors from '../constants/Colors';

const BusinessNavigator = createStackNavigator({
    Businesses: BusinessList,
    NewBusiness: NewBusiness,
    BusinessDetail: BusinessDetail,
    Map: FullMap
    
    
}, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
        }
    }
);

export default createAppContainer(BusinessNavigator);