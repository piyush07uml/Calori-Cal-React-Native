import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
// import {FlatList} from 'native-base';
import { connect } from 'react-redux';
import { Card, CardItem, Form, Item, Picker, Icon } from 'native-base';
import { deleteItemAction } from '../redux/calorieActions';
import { FontAwesome } from '@expo/vector-icons';


class ItemList extends React.Component {


    state = {
        selected: undefined
    }





    onValueChange = (value) => {
        this.setState({ selected: value })
    }


    render() {
        const { item } = this.props

        return (


            <View style={{ marginHorizontal: 20 }}>
                <Card>

                    <CardItem borederd>
                        <Text style={styles.itemName}>{item.itemName}</Text>

                        <View style={styles.iconContainer}>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('EditItem', { item })}
                            >
                                <FontAwesome
                                    name="pencil"
                                    size={25}
                                    color="gray"

                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.props.deleteItemAction(item.id)}
                            >
                                <FontAwesome
                                    name="trash"
                                    size={25}
                                    color="gray"
                                />
                            </TouchableOpacity>

                        </View>


                    </CardItem>

                </Card >

            </View>
        );
    }
}




const mapStateToProps = (state) => {
    return {
        itemList: state.calorie.itemList
    }
}

export default connect(mapStateToProps, { deleteItemAction })(ItemList)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'

    },
    itemName: {
        flex: 3,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0677A1'
    },
    iconContainer: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between"
    }
});
