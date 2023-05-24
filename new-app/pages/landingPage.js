import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
const options = ['Buyer', 'Seller'];
var selectedOption = -1;
const title = 'Sign Up';
const title_new = 'Log In';
export default class Page1 extends React.Component {
    //pageChange prop from App.js
    render() {
        selectedOption = -1;
        return (
            <View style={styles.container}>
                <Text>Welcome to the app!</Text>
                <TouchableOpacity style = {styles.button} onPress={() => {
                        if (selectedOption === -1) {
                            Alert.alert('You must select an option below!');
                        } else {
                            Alert.alert('You have picked: ' + options[selectedOption]);
                            this.props.pageChange(2 + selectedOption);
                        }
                }}>
                    <Text style={styles.text}>{title}</Text>
                </TouchableOpacity>
                <SelectDropdown
                    buttonStyle = {styles.dropdownButton}
                    buttonTextStyle= {styles.text}
                    data={options}
                    onSelect={(selectedItem, index) => {
                        selectedOption = index;
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                />
                <TouchableOpacity style = {styles.button} onPress={() => {
                    this.props.pageChange(5);
                }}>
                    <Text style={styles.text}>{title_new}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#D2AC47',
        margin: 8,
    },
    dropdownButton: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000000',
        width: 200,
        height: 50,
        paddingHorizontal: 8,
        overflow: 'hidden',
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        paddingHorizontal: 8,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

