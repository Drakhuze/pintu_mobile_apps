import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [animation] = useState(new Animated.Value(0));

  const toggleSearchBar = () => {
    setIsSearchOpen(!isSearchOpen);

    Animated.timing(animation, {
      toValue: isSearchOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: false
    }).start();
  };

  const closeSearchBar = () => {
    setIsSearchOpen(false);

    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  };

  const animatedStyle = {
    width: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['30%', '80%']
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} style={styles.searchIcon} />
        <Animated.View style={[styles.searchInput, animatedStyle]}>
          <TextInput
            placeholder="Search"
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={styles.searchTextInput}
          />
          <TouchableOpacity onPress={closeSearchBar} style={styles.closeButton}>
            <Feather name="x" size={20} style={styles.closeIcon} />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <TouchableOpacity onPress={toggleSearchBar} style={styles.searchButton}>
        <Feather name="search" size={20} style={styles.searchIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchIcon: {
    color: 'grey',
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  searchTextInput: {
    flex: 1,
    padding: 10
  },
  closeButton: {
    padding: 10
  },
  closeIcon: {
    color: 'grey'
  },
  searchButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  }
});

export default SearchBar;