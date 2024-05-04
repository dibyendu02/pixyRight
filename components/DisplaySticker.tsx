import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icons from '../Icons';

const DisplaySticker = ({field, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.stickerIcon}>
      {/* Render sticker icon */}
      {field.icon === 'web' ||
      field.icon === 'email' ||
      field.icon === 'format-text' ? (
        <Icons.MaterialCommunityIcons
          name={`${field.icon}`}
          size={20}
          color="black"
        />
      ) : field.icon === 'tiktok' || field.icon === 'ebay' ? (
        <Icons.FontAwesome5 name={`${field.icon}`} size={20} color="black" />
      ) : field.icon === 'signature' ? (
        <Icons.FontAwesome5 name={`${field.icon}`} size={20} color="black" />
      ) : (
        <Icons.FontAwesome name={`${field.icon}`} size={20} color="black" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  stickerIcon: {
    backgroundColor: 'yellow',
    width: 20,
    height: 20,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DisplaySticker;
