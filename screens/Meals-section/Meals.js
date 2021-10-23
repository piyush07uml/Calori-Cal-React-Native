import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { addItemToMealAction, removeItemFromMealAction } from '../../redux/calorieActions';
import { Card, CardItem, Form, Item, Label } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';







class Meals extends React.Component {

    constructor(props) {
        super(props);
        this.inputRefs = {};
        this.state = {
            foodItem: null,
            items: [
                {
                    label: 'Red',
                    value: 'red',
                },
                {
                    label: 'Orange',
                    value: 'orange',
                },
                {
                    label: 'Blue',
                    value: 'blue',
                },
            ]
        }
    }



    static getDerivedStateFromProps(props, state) {

        let newItems = []
        let itemObj = {}

        props.itemList.map((items) => {
            itemObj = {
                label: items.itemName,
                value: items
            };
            newItems = [...newItems, itemObj];
            return items;
        });

        return {
            items: newItems
        }

    }


    deleteHandler = (item) => {
        const { id } = this.props.mealItem;
        this.props.removeItemFromMealAction(item, id)
    }

    addItem = () => {
        if (this.state.foodItem === null) {
            return;
        }
        const { carbs, protein, fats, itemName, totalGrams, id } = this.state.foodItem

        const newItem = { carbs, protein, fats, itemName, totalGrams, id: uuid(), uid: id }
        this.props.addItemToMealAction(newItem, this.props.mealItem.id)
    }



    render() {

        const { mealItem } = this.props

        const calCount = (item) => {
            const count = (parseFloat(item.protein) * 4) + (parseFloat(item.carbs) * 4) + (parseFloat(item.fats) * 9);


        }

        return (
            <View style={styles.container}>
                <Card style={styles.card}>

                    <CardItem borederd>
                        <Text style={styles.mealTitle}>{mealItem.title}</Text>

                    </CardItem>




                    <RNPickerSelect
                        placeholder={{
                            label: 'Add Item',
                            value: null,
                        }}
                        items={this.state.items}
                        onValueChange={(value) => {
                            this.setState({
                                foodItem: value,
                            });
                        }}
                        onUpArrow={() => {
                            this.inputRefs.picker.togglePicker();
                        }}
                        onDownArrow={() => {
                            this.inputRefs.company.focus();
                        }}
                        style={{ ...pickerSelectStyles }}
                        value={this.state.foodItem}
                        ref={(el) => {
                            this.inputRefs.picker2 = el;
                        }}
                    />


                    <Button title="add" onPress={this.addItem} style={styles.btn} />



                    <View style={styles.itemsContainer}>

                        {mealItem.dietList.length == 0 ? null :

                            <FlatList
                                data={mealItem.dietList}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item, i }) => {
                                    return (
                                        <View style={styles.flatListContainer}>

                                            <View style={{ flex: 1 }}>
                                                <FontAwesome
                                                    name="check-circle"
                                                    size={23}
                                                    color="green"
                                                />
                                            </View>


                                            <View style={{ flex: 3 }}>
                                                <Text style={styles.dietList}>
                                                    {item.itemName}
                                                </Text>
                                            </View>


                                            <View style={{ flex: 2 }}>
                                                <Text style={[styles.dietList, { color: '#EA7773' }]}> Cal:
                                                    {(parseFloat(item.protein) * 4) + (parseFloat(item.carbs) * 4) + (parseFloat(item.fats) * 9)}
                                                </Text>
                                            </View>


                                            <View style={{ flex: 1, marginLeft: 12 }}>
                                                <TouchableOpacity
                                                    onPress={() => this.deleteHandler(item)}

                                                >
                                                    <FontAwesome
                                                        name="remove"
                                                        size={25}
                                                        color="gray"
                                                    >

                                                    </FontAwesome>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }}
                            ></FlatList>}
                    </View>

                    <CardItem bordered>

                        <Text style={styles.mealCal}> Calories In Meal:- {mealItem.totalCal} Calories</Text>
                    </CardItem>

                </Card >



            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        itemList: state.calorie.itemList,
        mealDietList: state.calorie.mealDietList
    }
}

export default connect(mapStateToProps, { addItemToMealAction, removeItemFromMealAction })(Meals);



const styles = StyleSheet.create({

    container: {
        marginHorizontal: 20,
        marginVertical: 20
    },
    itemsContainer: {
        marginTop: 30,
        marginHorizontal: 10,
        padding: 10
    },
    card: { flexDirection: 'column' },

    btn: {
        padding: 0,
        width: 50,
        marginHorizontal: 20
    },

    mealTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0677A1',
        textAlign: "center",
        borderBottomWidth: 1,
        borderBottomColor: '#EAF0F1',
        paddingBottom: 10
    },
    flatListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        marginHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EAF0F1',
        paddingBottom: 10,

    },
    dietList: {
        fontSize: 17,

        textAlign: 'left',
        color: '#0677A1'
    },
    mealCal: {
        fontSize: 18,
        textAlign: 'center',
        color: '#EA7773',
        fontWeight: 'bold'
    }
})


const pickerSelectStyles = StyleSheet.create({

    inputAndroid: {

        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#EAF0F1',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        marginHorizontal: 50
    },
});