import * as React from 'react';
import * as FileSystem from 'expo-file-system';
import { Text, View, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
login_info = { username: '', password: '', userType: 'Seller' };
const { StorageAccessFramework } = FileSystem;
var confirmPass = '';
const title = 'Submit';
const title_new = 'Back';

export default class Page2 extends React.Component {
    render() {
        login_info = { username: '', password: '', userType: 'Seller' };
        setUser = (text) => {
            login_info.username = text;
        }
        setPass = (text) => {
            login_info.password = text;
        }
        setConfirmPass = (text) => {
            confirmPass = text;
        }
        return (
            <View style={styles.container}>
                <Text>Welcome to the sign up for Sellers!</Text>
                <TextInput
                    style={styles.nameInput}
                    placeholder="Enter email"
                    onChangeText={setUser}
                    placeholderTextColor={'white'}

                />
                <TextInput
                    style={styles.passInput}
                    placeholder="Enter password"
                    onChangeText={setPass}
                    secureTextEntry={true}
                    placeholderTextColor={'white'}
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.passInput}
                    placeholder="Confirm password"
                    onChangeText={setConfirmPass}
                    placeholderTextColor={'white'}
                />
                <TouchableOpacity style={styles.button} onPress={() => {
                    if (!login_info.username.includes('@') || !login_info.username.includes('.')) {
                        Alert.alert('You must enter a valid email address!');
                    } else {
                        if (login_info.password === confirmPass && login_info.password != '') {
                            login_info.userType = 'Seller';
                            let fileUri = FileSystem.documentDirectory + 'database.json';
                            FileSystem.readAsStringAsync(fileUri, {
                                encoding: FileSystem.EncodingType.UTF8,
                            }).then(result => {
                                let new_new_data = [];
                                if (result != null && result != '' && result != ' ') {
                                    let new_data = JSON.parse(result);
                                    for (let i = 0; i < new_data.length; i++) {
                                        new_new_data.push(new_data[i]);
                                    }
                                }
                                let used = false;
                                for (let i = 0; i < new_new_data.length; i++) {
                                    if (new_new_data[i].username === login_info.username) {
                                        used = true;
                                    }
                                }
                                if (used) {
                                    Alert.alert('That email is already in use!');
                                } else {
                                    Alert.alert('Success!');
                                    new_new_data.push(login_info);
                                    FileSystem.writeAsStringAsync(fileUri, JSON.stringify(new_new_data), {
                                        encoding: FileSystem.EncodingType.UTF8,
                                    }).then(result => {
                                        fileUri = FileSystem.documentDirectory + 'currentUser.json';
                                        FileSystem.writeAsStringAsync(fileUri, JSON.stringify(login_info), {
                                            encoding: FileSystem.EncodingType.UTF8,
                                        }).then(result => { this.props.pageChange(4) });
                                    });

                                }
                            });

                        } else {
                            Alert.alert('Either the passwords do not match or you have not entered one in!');
                        }
                    }
                }}>
                    <Text style={styles.text}>{title}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    this.props.pageChange(1);
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#D2AC47',
        fontStyle: 'italic',
        color: 'white',
    },
    passInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#000000',
        fontStyle: 'italic',
        color: 'white',
    },
}); 
