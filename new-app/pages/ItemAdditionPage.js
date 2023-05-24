import * as React from 'react';
import * as FileSystem from 'expo-file-system';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Text, View, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView, Dimensions } from 'react-native';
var myArray = [];
var userType = '';
for (var i = 0; i < 100; i++) {
    myArray.push(i);
}
var done = false;
var item = { name: '', image_src: '', desc: '', price: 0.0, allergens: '', ingredients: '', seller: '' }
export default class Page7 extends React.Component {
    done = false;
    setName = (text) => {
        item.name = text;
    }
    setDesc = (text) => {
        item.desc = text;
    }
    setPrice = (text) => {
        if (parseFloat(text) == +text) {
            item.price = parseFloat(text);
        } else {
            Alert.alert("That's not a valid number!");
        }
    }
    setAllergies = (text) => {
        item.allergens = text;
    }
    setIngredients = (text) => {
        item.ingredients = text;
    }
    addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!_image.canceled) {
            item.image_src = _image.assets[0].uri;
        }
    };
    render() {
        if (!done) {
            const fileUri = FileSystem.documentDirectory + 'currentUser.json';
            FileSystem.readAsStringAsync(fileUri, {
                encoding: FileSystem.EncodingType.UTF8,
            }).then(result => {
                const new_result = JSON.parse(result);
                userType = new_result.userType;
                item.seller = new_result.username;
                done = true;
                this.props.pageChange(7);
            });
        } else if (userType === 'Seller') {
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
                    <TextInput
                        style={styles.nameInput}
                        placeholder="Enter item name"
                        onChangeText={this.setName}
                        placeholderTextColor={'white'}
                    />
                    <TextInput
                        style={styles.passInput}
                        placeholder="Enter item description"
                        onChangeText={this.setDesc}
                        placeholderTextColor={'white'}
                    />
                    <TextInput
                        style={styles.nextInput}
                        placeholder="Enter price"
                        onChangeText={this.setPrice}
                        placeholderTextColor={'white'}

                    />
                    <TextInput
                        style={styles.passInput}
                        placeholder="Enter any allergy concerns"
                        onChangeText={this.setAllergies}
                        placeholderTextColor={'white'}
                    />
                    <TextInput
                        style={styles.nextInput}
                        placeholder="Enter ingredients used"
                        onChangeText={this.setIngredients}
                        placeholderTextColor={'white'}
                    />
                    <TouchableOpacity style={styles.camera_button} onPress={() => { this.addImage() }}>
                        <AntDesign style={styles.icon} name="camera" size={20} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submit_button} onPress={() => {
                        if (item.ingredients != '' && item.allergens != '' && item.desc != '' && item.name != '' && item.desc != '' && item.image_src != '') {
                            let fileUri = FileSystem.documentDirectory + 'items.json';
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
                                Alert.alert('Success!');
                                new_new_data.push(item);
                                console.log(new_new_data);
                                FileSystem.writeAsStringAsync(fileUri, JSON.stringify(new_new_data), {
                                    encoding: FileSystem.EncodingType.UTF8,
                                });
                            }).catch(error => {
                                console.log(error);
                                let new_new_data = [];
                                Alert.alert('Success!');
                                new_new_data.push(item);
                                console.log(new_new_data);
                                FileSystem.writeAsStringAsync(fileUri, JSON.stringify(new_new_data), {
                                    encoding: FileSystem.EncodingType.UTF8,
                                });
                            });
                        } else {
                            Alert.alert("No field can be left blank!")
                        }
                    }}>
                        <Text style={styles.second_text}>Submit</Text>
                    </TouchableOpacity>
                </View >
            )
        } else {
            return (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.new_button} onPress={() => { this.props.pageChange(4) }}>
                        <Ionicons name="grid" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.second_button} onPress={() => { this.props.pageChange(6) }}>
                        <MaterialIcons name="account-circle" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.third_button} onPress={() => { this.props.pageChange(7) }}>
                        <AntDesign name="pluscircle" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.first_text}>You must be a Seller to use this page!</Text>
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
    submit_button: {
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        alignSelf: 'center',
        backgroundColor: '#000000',
        marginTop: 25,
        width: 100,
        height: 20
    },
    icon: {
        alignSelf: 'center'
    },
    camera_button: {
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        alignSelf: 'center',
        backgroundColor: '#D2AC47',
        marginTop: 25,
        width: 100,
        height: 20
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
        color: '#FFFFFF',
        alignSelf: 'center',

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    nameInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginTop: 35,
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
    nextInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#D2AC47',
        fontStyle: 'italic',
        color: 'white',
    },
});

export { Page7 };
