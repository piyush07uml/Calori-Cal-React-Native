import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { addItemAction } from '../redux/calorieActions';

class AddItem extends React.Component {

    state = {
        itemName: '',
        totalGrams: '',
        protein: '',
        carbs: '',
        fats: '',
        note: null
    }

    static navigationOptions = {
        title: 'Add Items'
    }


    addItemHandler = () => {
        const { itemName, totalGrams, protein, carbs, fats } = this.state;


        //validation for empty field

        if (itemName === '' || totalGrams === '' || protein === '' || carbs === '' || fats === '') {

            this.setState({ note: 'All Fields Are Required' });
            return;
        }

        // validation for not a number field

        const numTotalGrams = Number(totalGrams);
        const numProtein = Number(protein);
        const numCarbs = Number(carbs);
        const numFats = Number(fats);



        if (isNaN(numTotalGrams) || isNaN(numProtein) || isNaN(numCarbs) || isNaN(numFats)) {

            this.setState({ note: 'Invalid Fields' })
            return;

        }


        const item = {
            id: uuid(),
            itemName,
            totalGrams,
            protein,
            carbs,
            fats
        }


        this.props.addItemAction(item)

        this.setState({ note: null }, () => {
            Alert.alert(
                'Done!',
                'Item Is Added',
                [
                    { text: 'Back', onPress: () => this.props.navigation.navigate('Meals') },
                    { text: 'OK' }
                ]
            )
        })


    }




    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
            >
                <ScrollView style={styles.container}>
                    <Form>
                        <Item inlineLabel
                            style={{ flexDirection: 'row' }}
                        >
                            <Label style={{ flex: 1, color: 'black' }}> Add Item</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="default"
                                style={{ flex: 1 }}
                                placeholder="Type Here..."
                                placeholderTextColor="#A4B0BD"
                                onChangeText={(itemName) => this.setState({ itemName })}
                            />
                        </Item>
                        <Item inlineLabel style={{ flexDirection: 'row' }}>
                            <Label style={{ flex: 1, color: 'black' }}>Total Grams</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="number-pad"
                                style={{ flex: 1 }}
                                placeholder="Type Here..."
                                placeholderTextColor="#A4B0BD"
                                onChangeText={(totalGrams) => this.setState({ totalGrams })}
                            />
                        </Item>

                        <Item inlineLabel style={{ flexDirection: 'row' }}>
                            <Label style={{ flex: 1, color: 'black' }}>Protein(in gms)</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="number-pad"
                                style={{ flex: 1 }}
                                placeholder="Type Here..."
                                placeholderTextColor="#A4B0BD"
                                onChangeText={(protein) => this.setState({ protein })}
                            />
                        </Item>

                        <Item inlineLabel style={{ flexDirection: 'row' }}>
                            <Label style={{ flex: 1, color: 'black' }}>Carbs(in gms)</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="number-pad"
                                style={{ flex: 1 }}
                                placeholder="Type Here..."
                                placeholderTextColor="#A4B0BD"
                                onChangeText={(carbs) => this.setState({ carbs })}
                            />
                        </Item>

                        <Item inlineLabel style={{ flexDirection: 'row' }}>
                            <Label style={{ flex: 1, color: 'black' }}>Fats(in gms)</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="number-pad"
                                style={{ flex: 1 }}
                                placeholder="Type Here..."
                                placeholderTextColor="#A4B0BD"
                                onChangeText={(fats) => this.setState({ fats })}
                            />
                        </Item>
                    </Form>

                    <Text style={styles.noteText}>{this.state.note}</Text>

                    <TouchableOpacity
                        style={{ margin: 20 }}

                    >
                        <Button full rounded primary
                            onPress={this.addItemHandler}
                        >
                            <Text style={{ color: '#fff' }}>Add Item</Text>
                        </Button>
                    </TouchableOpacity>

                    <View style={{ height: 600 }}></View>
                </ScrollView>

            </TouchableWithoutFeedback>
        );
    }
}




const mapStateToProps = (state) => {
    return {
        itemList: state.calorie.itemList
    }
}

export default connect(mapStateToProps, { addItemAction })(AddItem)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10

    },
    noteText: {
        marginTop: 10,
        textAlign: 'center',
        color: 'red'
    }
});
