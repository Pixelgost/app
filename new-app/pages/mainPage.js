import * as React from 'react';
import * as FileSystem from 'expo-file-system';
import { Image } from 'expo-image';
import { Text, View, StyleSheet, Pressable, Alert, TextInput, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';

var myArray = [];
let bool = true;
export default class Page4 extends React.Component {
    render() {
        if (bool) {
            let fileUri = FileSystem.documentDirectory + 'items.json';
            FileSystem.readAsStringAsync(fileUri, {
                encoding: FileSystem.EncodingType.UTF8,
            }).then(result => {
                myArray = JSON.parse(result);
                bool = false;
                this.props.pageChange(4);
            }).catch(error => {
                myArray = []
                bool = false;
                this.props.pageChange(4);
            });
        } else {
            if (myArray.length === 0) {
                return (
                    <View style={styles.content_container}>
                        <Text style={styles.text}>No items to buy!</Text>
                        <TouchableOpacity style={styles.new_button} onPress={() => { this.props.pageChange(4) }}>
                        <Ionicons name="grid" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.second_button} onPress={() => { this.props.pageChange(6) }}>
                        <MaterialIcons name="account-circle" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.third_button} onPress={() => { this.props.pageChange(7) }}>
                        <AntDesign name="pluscircle" size={24} color="black" />
                    </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                    <View style={styles.content_container}>
                        <ScrollView style={styles.container}>
                            
                            {this.renderButtons()}
                            <TouchableOpacity style={styles.button} onPress={() => {
                                bool = true;
                                this.props.pageChange(4);
                            }}>
                                <Text style={styles.text}>Refresh</Text>
                            </TouchableOpacity>
                        </ScrollView>
                        <TouchableOpacity style={styles.new_button} onPress={() => { this.props.pageChange(4) }}>
                        <Ionicons name="grid" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.second_button} onPress={() => { this.props.pageChange(6) }}>
                        <MaterialIcons name="account-circle" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.third_button} onPress={() => { this.props.pageChange(7) }}>
                        <AntDesign name="pluscircle" size={24} color="black" />
                    </TouchableOpacity>
                    </View>
                )
            }
        }
    }
    renderButtons() {

        var list = myArray.map((item, index) => {
            let price = '$' + item.price;
            return (
                <View key={index}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        console.log(item);
                    }}>
                        <Image style={styles.image}
                            source={{ uri: item.image_src }}
                        />
                        <Text>{item.name}</Text>
                        <Text>{price}</Text>
                    </TouchableOpacity>
                </View>
            )
        })
        return list;
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
        width: 150,
        justifyContent: 'center',
        marginLeft: ((Dimensions.get("window").width - 150) /2),

    },
    image: {
        height: 100,
        width: 100,
    },
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
    content_container: {
        flex: 1,
        marginTop: 15,
    },
    container: {
        flex: 1,
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    text: {
        color: '#808080',
        marginTop: 25,
        marginLeft: 15,
    }

}); 
