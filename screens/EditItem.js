import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { Form, Item, Input, Label, Button, Container, Header, Content, Icon, Picker } from 'native-base';
import { editItemAction } from '../redux/calorieActions';
import { connect } from 'react-redux';




class EditItem extends React.Component {


    state = {
        itemName: '',
        totalGrams: '',
        protein: '',
        carbs: '',
        fats: '',
        note: null
    }

    static navigationOptions = {
        title: 'Edit Items'
    }


    componentWillMount() {
        const { navigation } = this.props;



        navigation.addListener('willFocus', () => {
            const item = navigation.getParam('item');
            this.updateState(item)
        }

        )
    }


    updateState = (item) => {
        const { itemName, totalGrams, protein, carbs, fats } = item

        this.setState({ itemName, totalGrams, protein, carbs, fats })
    }


    editItemHandler = () => {
        const itemID = this.props.navigation.getParam('item');
        const { itemName, totalGrams, protein, carbs, fats } = this.state

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




        const item = { id: itemID.id, itemName, totalGrams, protein, carbs, fats }
        this.props.editItemAction(item)

        this.setState({ note: null }, () => {
            Alert.alert(
                'Done!',
                'Changes Saved',
                [
                    { text: 'Back', onPress: () => this.props.navigation.navigate('Items') },
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
                            <Label
                                style={{ flex: 1 }}
                            >Add Item</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="default"
                                value={this.state.itemName}
                                style={{ flex: 1 }}
                                onChangeText={(itemName) => this.setState({ itemName })}
                            />
                        </Item>
                        <Item inlineLabel last
                            style={{ flexDirection: 'row' }}
                        >
                            <Label style={{ flex: 1 }}>total grams</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                style={{ flex: 1 }}
                                value={this.state.totalGrams}
                                onChangeText={(totalGrams) => this.setState({ totalGrams })}
                            />
                        </Item>

                        <Item inlineLabel last
                            style={{ flexDirection: 'row' }}
                        >
                            <Label style={{ flex: 1 }}>Protein(in gms)</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                style={{ flex: 1 }}
                                value={this.state.protein}
                                onChangeText={(protein) => this.setState({ protein })}
                            />
                        </Item>

                        <Item inlineLabel last
                            style={{ flexDirection: 'row' }}
                        >
                            <Label style={{ flex: 1 }}>Carbs(in gms)</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                style={{ flex: 1 }}
                                value={this.state.carbs}
                                onChangeText={(carbs) => this.setState({ carbs })}
                            />
                        </Item>

                        <Item inlineLabel last style={{ flexDirection: 'row' }}>
                            <Label style={{ flex: 1 }}>Fats(in gms)</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                style={{ flex: 1 }}
                                value={this.state.fats}
                                onChangeText={(fats) => this.setState({ fats })}
                            />
                        </Item>

                    </Form>

                    <Text style={styles.noteText}>{this.state.note}</Text>
                    <TouchableOpacity
                        style={{ margin: 20 }}

                    >
                        <Button full rounded primary
                            onPress={this.editItemHandler}
                        >
                            <Text style={{ color: '#fff' }}>Edit Item</Text>
                        </Button>
                    </TouchableOpacity>
                    <View style={{ height: 600 }}></View>
                </ScrollView>
            </TouchableWithoutFeedback>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        itemList: state.calorie.itemList
    }
}


export default connect(mapStateToProps, { editItemAction })(EditItem)



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
        marginTop: 20
    },
    noteText: {
        marginTop: 10,
        textAlign: 'center',
        color: 'red'
    }
})




