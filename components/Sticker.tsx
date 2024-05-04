import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icons from '../Icons';

const Sticker = ({field, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.stickerIcon}>
      {/* Render sticker icon */}
      {field.icon === 'web' ||
      field.icon === 'email' ||
      field.icon === 'format-text' ? (
        <Icons.MaterialCommunityIcons
          name={`${field.icon}`}
          size={25}
          color="black"
        />
      ) : field.icon === 'tiktok' || field.icon === 'ebay' ? (
        <Icons.FontAwesome5 name={`${field.icon}`} size={25} color="black" />
      ) : field.icon === 'signature' ? (
        <Icons.FontAwesome5 name={`${field.icon}`} size={25} color="black" />
      ) : (
        <Icons.FontAwesome name={`${field.icon}`} size={25} color="black" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  stickerIcon: {
    padding: 10,
    backgroundColor: 'yellow',
    width: 60,
    height: 60,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Sticker;
