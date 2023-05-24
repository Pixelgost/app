import * as React from 'react';
import * as FileSystem from 'expo-file-system';
import { Text, View, StyleSheet, TouchableOpacity, Pressable, Alert, TextInput, ScrollView, Dimensions } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';

var myArray = [];
var userTitle = 'Username: ';
var userType = 'Account type: ';
for (var i = 0; i < 100; i++) {
    myArray.push(i);
}
var done = false;
export default class Page6 extends React.Component {
    render() {
        if (!done) {
            const fileUri = FileSystem.documentDirectory + 'currentUser.json';
            FileSystem.readAsStringAsync(fileUri, {
                encoding: FileSystem.EncodingType.UTF8,
            }).then(result => {
                const new_result = JSON.parse(result);
                userTitle = 'Username: ' + new_result.username;
                userType = 'Account type: ' + new_result.userType;
                done = true;
                this.props.pageChange(6);
            });
        } else {
            return (
                    <View style={styles.content_container}>
                        <TouchableOpacity style={styles.new_button} onPress={() => { this.props.pageChange(4) }}>
                        <Ionicons name="grid" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.second_button} onPress={() => { this.props.pageChange(6) }}>
                        <MaterialIcons name="account-circle" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.third_button} onPress={() => { this.props.pageChange(7) }}>
                        <AntDesign name="pluscircle" size={24} color="black" />
                    </TouchableOpacity>
                        <Text style={styles.first_text}>{userTitle}</Text>
                        <Text style={styles.second_text}>{userType}</Text>
                        <TouchableOpacity style={styles.second_text} onPress={() => {
                            done = false;
                            this.props.pageChange(1);
                        }}>
                            <Text>Log out</Text>
                        </TouchableOpacity>
                    </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    new_button: {
        justifyContent: 'center',
        alignContent: 'center',
        position: 'absolute',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#808080',
        alignSelf: 'baseline',
        marginLeft: 15,
        width: 25,
        height: 25,
    },
    second_button: {
        justifyContent: 'center',
        position: 'absolute',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#808080',
        alignSelf: 'baseline',
        marginLeft: 42,
        width: 25,
        height: 25,
    },
    third_button: {
        justifyContent: 'center',
        position: 'absolute',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#D2AC47',
        alignSelf: 'baseline',
        marginLeft: 69,
        width: 25,
        height: 25,
    },
    pressed_button: {
        justifyContent: 'center',
        position: 'absolute',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#D2AC47',
        alignSelf: 'baseline',
        marginLeft: 65,
    },
    content_container: {
        flex: 1,
        marginTop: 15,
    },
    first_text: {
        color: '#808080',
        alignSelf: 'baseline',
        marginTop: 25,
        marginLeft: 15,
    },
    second_text: {
        color: '#808080',
        alignSelf: 'baseline',
        marginTop: 5,
        marginLeft: 15,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
}); 
