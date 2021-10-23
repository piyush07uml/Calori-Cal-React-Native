import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
// import {FlatList} from 'native-base';
import { connect } from 'react-redux';
import ItemList from './ItemList';
import { FontAwesome } from '@expo/vector-icons';


class Items extends React.Component {


    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Food List',
            headerRight:
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddItem')}
                    style={{ marginHorizontal: 20 }}
                >
                    <FontAwesome
                        name="plus"
                        size={25}
                        color="#fff"
                    />
                </TouchableOpacity>

        }
    }



    render() {
        return (

            <View style={styles.container}>

                <FlatList
                    data={this.props.itemList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return <ItemList
                            item={item}
                            navigation={this.props.navigation}
                            key={item.id} />
                    }}
                >

                </FlatList>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        itemList: state.calorie.itemList
    }
}

export default connect(mapStateToProps)(Items)




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAF0F1',
        marginTop: 20

    },
});
