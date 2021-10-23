import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Meals from './Meals';
import { FontAwesome } from '@expo/vector-icons'








class MealsContainer extends React.Component {



    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Design Meal',
            headerRight: <TouchableOpacity
                onPress={() => navigation.navigate('Items')}
                style={{ marginHorizontal: 10 }}
            >
                <Text style={styles.navFoodList}>Food List <FontAwesome
                    name="arrow-circle-right"
                    size={20}
                /></Text>
            </TouchableOpacity>

        }
    }



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.totalCal}>Total Calories : {this.props.Cal} Cal</Text>
                <FlatList
                    data={this.props.mealDietList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, i }) => {
                        return <Meals mealItem={item} key={item.id} />
                    }}
                >

                </FlatList>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        mealDietList: state.calorie.mealDietList,
        Cal: state.calorie.Cal
    }
}

export default connect(mapStateToProps)(MealsContainer)




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAF0F1',
    },
    navFoodList: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10
    },
    totalCal: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#6AB04A',
        color: "#fff",
        paddingVertical: 10
    }
})



//'#d65a31'