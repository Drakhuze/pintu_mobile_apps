import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { Feather } from '@expo/vector-icons';

interface Props {
  data: any;
  setSelectedKey: React.Dispatch<React.SetStateAction<string>>;
  sortDirection: string;
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
}

const styles = StyleSheet.create({
  modalButton: {
    flexDirection: 'row',
  },
  modalText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  overLayStyle: {
    flex: 1,
  },
});

const ModalPicker = ({
  data, setSelectedKey, sortDirection, setSortDirection,
}: Props) => {
  const [selectedItem, setSelectedItem] = useState(data[0]);

  const handleOnSelect = (option: any) => {
    if (option.key === undefined) {
      return;
    }

    if (sortDirection !== undefined && setSortDirection !== undefined) {
      if (selectedItem.key === option.key) {
        if (sortDirection === 'desc') setSortDirection('asc');
        else setSortDirection('desc');
      } else {
        setSortDirection('desc');
      }
    }
    setSelectedKey(option.key);
    setSelectedItem(option);
  };

  return (
    <View>
      <ModalSelector
        data={data}
        initValue={selectedItem.label}
        onModalClose={handleOnSelect}
      >
        <View style={styles.modalButton}>
          <Text style={styles.modalText}>
            {selectedItem.label}
          </Text>
          {sortDirection === 'desc'
            ? <Feather name="chevron-down" size={18} color="black" />
            : <Feather name="chevron-up" size={18} color="black" />}
        </View>
      </ModalSelector>
    </View>
  );
};

export default ModalPicker;
