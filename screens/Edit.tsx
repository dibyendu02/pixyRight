import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import VideoPlayer from 'react-native-video';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useSections} from '../context/SectionsContext';
import Icons from '../Icons';
import Sticker from '../components/Sticker';
import DisplaySticker from '../components/DisplaySticker';
import {useSharedValue} from 'react-native-reanimated';

const Edit = ({route}) => {
  const {mediaUri} = route.params;
  const {sections} = useSections();
  const [stickers, setStickers] = useState([]); // Stickers state
  const [showStickers, setShowStickers] = useState(false);

  const translateX = stickers.map(() => useSharedValue(0));
  const translateY = stickers.map(() => useSharedValue(0));

  console.log(stickers);

  const images = [{url: mediaUri}];

  // Handle adding stickers
  const handleAddSticker = sticker => {
    setStickers([...stickers, sticker]);
  };

  // Handle removing stickers
  const handleRemoveSticker = index => {
    const updatedStickers = [...stickers];
    updatedStickers.splice(index, 1);
    setStickers(updatedStickers);
  };

  const handleCloseStickers = () => {
    setShowStickers(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View
        style={{
          height: '8%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingRight: 20,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 60,
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 12,
            paddingVertical: 5,
            borderRadius: 8,
          }}>
          <Text style={{color: 'black'}}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        {mediaUri && mediaUri.endsWith('.jpg') ? (
          <ImageViewer
            imageUrls={images}
            enableSwipeDown={false}
            onSwipeDown={() => {}}
            renderIndicator={() => null}
            style={styles.imageViewer}
          />
        ) : mediaUri && mediaUri.endsWith('.mp4') ? (
          <VideoPlayer
            source={{uri: mediaUri}}
            style={{flex: 1, backgroundColor: 'black'}}
            controls={true}
            paused={true}
            resizeMode="contain"
          />
        ) : (
          <Text>No media selected</Text>
        )}

        {/* Render selected stickers */}
        {stickers.map((sticker, index) => (
          <Animated.View
            key={index}
            style={[
              styles.sticker,
              {left: translateX[index].value, top: translateY[index].value},
            ]}>
            <DisplaySticker
              key={index}
              field={sticker}
              onPress={() => handleRemoveSticker(index)}
            />
            <Text style={{color: 'black', minWidth: 60}}>{sticker.value}</Text>
            {/* Render sticker image here if applicable */}
          </Animated.View>
        ))}
      </View>

      <View
        style={{
          height: '42%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 30,
        }}>
        <View
          style={{
            width: '90%',
            height: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'gray',
            borderWidth: 1,
            marginVertical: 10,
          }}>
          <Text>PINCH WITH TWO FINGERS TO ZOOM IN-OUT</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#333333',
              width: 60,
              height: 60,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
            }}
            onPress={() => setShowStickers(true)}>
            <Icons.Entypo name="dots-three-horizontal" size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#333333',
              width: 60,
              height: 60,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
            }}>
            <Icons.MaterialCommunityIcons name="format-text" size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#333333',
              width: 60,
              height: 60,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
            }}>
            <Icons.Feather name="sun" size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#333333',
              width: 60,
              height: 60,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
            }}>
            <Icons.Ionicons name="color-fill-outline" size={28} />
          </TouchableOpacity>
        </View>
      </View>

      {/* sticker palette */}
      {showStickers && (
        <View style={styles.stickerPalette}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseStickers}>
            <Icons.AntDesign name="closecircle" color={'white'} size={30} />
          </TouchableOpacity>
          {sections.map((section, sectionIndex) => (
            <View key={sectionIndex}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.stickerContainer}>
                {section.fields.map((field, index) => (
                  <Sticker
                    key={index}
                    field={field}
                    onPress={() => {
                      handleAddSticker(field);
                      setShowStickers(false);
                    }}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  imageViewer: {
    flex: 1,
    maxHeight: '100%',
  },
  sticker: {
    position: 'absolute',
    paddingHorizontal: 10,
    backgroundColor: 'yellow', // Change to sticker background color
    borderWidth: 1,
    borderColor: 'black', // Change to sticker border color
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 15,
    paddingVertical: 5,
  },
  stickerPalette: {
    flex: 1,
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
    color: 'white',
  },
  stickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
});

export default Edit;
