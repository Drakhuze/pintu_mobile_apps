import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  value: string;
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    marginLeft: 5,
  },
  searchIcon: {
    marginRight: 5,
  },
});

const SearchBar = ({ value, setSearchKey }: Props) => (
  <View style={styles.searchBar}>
    <Ionicons name="search" size={24} color="#9ca3af" style={styles.searchIcon} />
    <TextInput
      style={styles.searchInput}
      placeholder="Search asset"
      placeholderTextColor="gray"
      onChangeText={(e) => setSearchKey(e)}
      value={value}
    />
  </View>
);

export default SearchBar;
