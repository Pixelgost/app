import * as React from 'react';
import * as FileSystem from 'expo-file-system';
import { Text, View, StyleSheet, Pressable, Alert, TextInput } from 'react-native';
const { StorageAccessFramework } = FileSystem;
login_info = { username: '', password: '', userType: 'Buyer' };
var confirmPass = '';
const title = 'Submit';
const title_new = 'Back';

export default class Page5 extends React.Component {
    render() {
        login_info = { username: '', password: '', userType: 'Buyer' };
        setUser = (text) => {
            login_info.username = text;
        }
        setPass = (text) => {
            login_info.password = text;
        }
        return (
            <View style={styles.container}>
                <Text>Welcome to the log in page!</Text>
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
                <Pressable style={styles.button} onPress={() => {
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
                            if (new_new_data[i].username === login_info.username && new_new_data[i].password === login_info.password) {
                                used = true;
                                login_info.userType = new_new_data[i].userType;
                            }
                        }
                        if (!used) {
                            Alert.alert("That username/password combination does not match our records");
                        } else {
                            Alert.alert("Success!");
                            fileUri = FileSystem.documentDirectory + 'currentUser.json';
                            FileSystem.writeAsStringAsync(fileUri, JSON.stringify(login_info), {
                                encoding: FileSystem.EncodingType.UTF8,
                            }).then(result => { this.props.pageChange(4) });
                        }
                    })
                }}>
                    <Text style={styles.text}>{title}</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => {
                    this.props.pageChange(1);
                }}>
                    <Text style={styles.text}>{title_new}</Text>
                </Pressable>
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
