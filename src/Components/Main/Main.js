import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions,FlatList, SafeAreaView, Image } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Button, Item, Icon, Input } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import APIServices from '../../Services/APIServices';
import AsyncStorageServices from '../../Services/AsyncStorageService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

const MainView = () => {
    const [pokemons, setPokemons] = useState([]);
    const [pokemonsFiltered, setPokemonsFiltered] = useState([]);
    const [search, setSearch] = useState ("");
    const [page, setPage] = useState (1);
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(1);
    const [buttonPages, setButtonPages] = useState([]);
    const [loadingText, setLoadingText] = useState("Loading")

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', item)} style={styles.box} key={item.mumber}>
            
            {item.image && <Image style={styles.img} source={{uri: item.image}} />}
            <Text>{item.name[0].toUpperCase() + item.name.slice(1)}</Text>
        </TouchableOpacity>
    );

    navigation = useNavigation();

    const addData = async (pokemonArray, pokemon, chars) => {
        await pokemonArray.map(poke => {
            
            if (parseInt(poke.number) === parseInt(pokemon.id)) {
                let descriptions = [];
                for (let i in chars.descriptions) {
                    descriptions[i] = { language: chars.descriptions[i].language.name, description: chars.descriptions[i].description };   
                }
                let stats = [];
                for (let i in pokemon.stats) {
                    stats[i] = { name: pokemon.stats[i].stat.name, stat: pokemon.stats[i].base_stat };   
                }
                poke.image = pokemon.sprites.front_default;
                poke.stats = stats;
                poke.height = pokemon.height;
                poke.weight = pokemon.weight;
                poke.characteristic = descriptions;
            }
        });
        await setPokemonsFiltered(pokemonArray);
        return pokemonArray;
    }

    const getPokemonData = async () => {
        setIsLoading(true);
        let newPokemonsFiltered = pokemonsFiltered;
        for (let i in pokemonsFiltered) {
            if (pokemonsFiltered[i].image === undefined) {
                setLoadingText("Loading " + pokemonsFiltered[i].name)
                let pokemon = await APIServices.getPokemonData(pokemonsFiltered[i].number);
                let chars = await APIServices.getPokemoncharacteristic(pokemonsFiltered[i].number);
                newPokemonsFiltered = await addData(newPokemonsFiltered, pokemon, chars);
            }
        }
        await AsyncStorageServices.storeData('pokemons',JSON.stringify(pokemons));
        setIsLoading(false);
    }

    const filterPokemons = async () => {
        let init = (page - 1) * 50;
        let end = page * 50;
        var temp = pokemons;
        if (search) {
            temp = pokemons.filter(item => item.name.includes(search) || item.number.includes(search));
        }
        let pages = [];
        for ( let i = 1; i <= temp.length / 50; i++) {
            pages.push(i);
        }
        setButtonPages(pages);
        await setPokemonsFiltered(temp.slice(init, end));
    }

    const getPokemons = async () => {
        var pokemonsStore = await AsyncStorageServices.getData('pokemons');
        if (pokemonsStore) {
            await setIsLoading(false);
            setPokemons (JSON.parse(pokemonsStore));
        } else {
            pokemonsStore = await APIServices.getPokemonNames();
            pokemonsStore.data.results.map(item => {
                var aux = item.url.split("/");
                let number = aux[aux.length - 2];
                item.number = number;
                delete item['url'];
            });
            await setIsLoading(false);
            await setPokemons(pokemonsStore.data.results);
        }
    }

    useEffect(() => {
        getPokemons();
    }, []);

    useEffect(() => {
        if (pokemons.length > 0) {
            filterPokemons();
        }
    }, [pokemons, page, search]);

    useEffect(() => {
        if (!isLoading) {
            getPokemonData();
        }
    }, [pokemonsFiltered]);

    return (
        <Container>
            <Header>
                <Left/>
                <Body>
                    <Title>Pokedex</Title>
                </Body>
                <Right />
            </Header>
            <Spinner
              visible={isLoading}
              textContent={loadingText}
            />
            <View style={{backgroundColor: '#ddd'}}>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="search" />
                        <Input placeholder="Search"
                        onChangeText={text => setSearch(text)}
                        autoCapitalize = 'none'
                         />
                        {/* <Icon name="ios-mic" /> */}
                    </Item>
                </Header>
                <SafeAreaView>
                    <FlatList
                        data={pokemonsFiltered}
                        renderItem={renderItem}
                        keyExtractor={item => item.number}
                        numColumns={3}
                        style={styles.grid}
                    />
                </SafeAreaView>
                <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
                    
                    { buttonPages.map(item => (
                        <View key={item} style={{margin: 5, width: 25}}>
                            <Button full bordered
                                onPress={() => setPage(item)}
                                style={{width: 30, alignContent: 'center'}}>
                                <Text style={{textAlign: 'center'}}>{item}</Text>
                            </Button>
                        </View>
                        
                    )) }
                    {/* <Button onPress={() => console.log(pokemons)}><Text>ver</Text></Button>
                    <Button full onPress={async () => console.log(await AsyncStorageServices.getData('pokemons'))}><Text>VerStorage</Text></Button> */}
                    {/* <Button full onPress={() => AsyncStorageServices.removeData('pokemons')}><Text>borrar</Text></Button> */}
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    grid: {
      height: "70%",
    },
    box: {
        margin: 5,
        width: Dimensions.get('window').width / 3.3,
        height: Dimensions.get('window').width / 3.3,
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'white'
    },
    img: {
        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width / 4,
    }
});

export default MainView;