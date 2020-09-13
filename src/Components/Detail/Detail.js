import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Text,StyleSheet, Image } from 'react-native';
import Divider from 'react-native-divider';
import { Slider } from "@miblanchard/react-native-slider";

const Detail = (route) => {
    navigation = useNavigation();
    var pokemon = route.route.params;
    
    function PadLeft(value, length) {
        return (value.toString().length < length) ? PadLeft("0" + value, length) : 
        value;
    }

    var description = '';

    for (let i in pokemon.characteristic) {
        if (pokemon.characteristic[i].language === 'en' ) {
            description = pokemon.characteristic[i].description;
        }
    }

    const CustomThumb = (value) => {
        return (
        <View style={{alignItems: "center",
        backgroundColor: "white",
        height: 30,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center",
        width: 50,}}>
            <Text>{value}</Text>
        </View>
        );
    };

    return (
        <Container>
            <Header>
            <Left>
                <Button onPress={() => navigation.goBack()} transparent>
                
                <Text>Back</Text>
                </Button>
            </Left>
            <Body>
                <Title>Poke</Title>
            </Body>
            <Right />
            </Header>
            <View style={styles.pokemonView}>
                <View style={styles.pokemonDetail}>
                    <Image style={styles.img} source={{uri: pokemon.image}} />
                    <View style={styles.txtDetail}>
                        <Text style={styles.txtDetail}>#{PadLeft(pokemon.number, 3)}</Text>
                        <Text style={styles.txtName}>{!!pokemon && pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</Text>
                        
                        <Text style={styles.txtDetail}>Height: {pokemon.height}</Text>
                        <Text style={styles.txtDetail}>Weight: {pokemon.weight}</Text>
                    </View>
                    
                </View>
                <View>
                    <Text style={styles.txtDescription}>{description}</Text>
                </View>
                <Divider orientation="center">Statistics</Divider>
                

                {pokemon.stats.map(item => (
                    
                    <View style={{flexDirection: 'row', height: 30, marginTop: 20, alignItems: 'center'}} key={item.stat.name}>
                        <View style={{ width: 120}}>
                            <Text>{item.name}</Text>
                        </View>
                        <Text>{item.stat}</Text>
                        <View style={{ width: 250,}}>
                            
                        <Slider
                            value={item.stat}
                            maximumValue={100}
                            minimumTrackTintColor={'#3385ff'}
                            renderThumbComponent={CustomThumb}
                            disabled={true}
                            trackStyle={{ height: 20, borderRadius:3}}
                            />

                        </View>
                    </View>
                ))}
                {/* <View style={{flexDirection: 'row'}}>
                    
                </View> */}
                
                
                
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    pokemonView: {
      alignItems: 'center'
      
    },
    pokemonDetail: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    img: {
        height: 120,
        width: 120,
    },
    txtName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    txtDetail: {
        fontSize: 14,
    },
    txtDescription: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
    },
});

export default Detail;