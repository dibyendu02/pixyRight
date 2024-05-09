import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import VideoPlayer from 'react-native-video';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useSections} from '../context/SectionsContext';
import Icons from '../Icons';
import Sticker from '../components/Sticker';
import DisplaySticker from '../components/DisplaySticker';
import {useSharedValue} from 'react-native-reanimated';
import Draggable from 'react-native-draggable';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {PERMISSIONS, request} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import ColorPicker from 'react-native-wheel-color-picker';

const Edit = ({route}) => {
  const {mediaUri} = route.params;
  const {sections} = useSections();
  const [stickers, setStickers] = useState([]); // Stickers state
  const [showStickers, setShowStickers] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const [brightness, setBrightness] = useState(1);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [textColor, setTextColor] = useState('white');
  const [showFontPicker, setShowFontPicker] = useState(false);

  const fonts = [
    'Arial',
    'Times New Roman',
    'Georgia',
    'Courier',
    'Spacemono',
    'Poppins',
    'Raleway',
    'Montserrant',
    'MarckScript',
    'SeaweedScript',
    'PiyonScript',
    'KaushanScript',
    'StyleScript',
    'DancingScript',
  ];

  const imageViewRef = useRef();
  const colorPickerRef = useRef();

  useEffect(() => {
    setShowColorPicker(false);
  }, [textColor]);

  console.log(textColor);

  // const translateX = stickers.map(() => useSharedValue(0));
  // const translateY = stickers.map(() => useSharedValue(0));

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

  // Handle permission request for WRITE_EXTERNAL_STORAGE
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'File and Media Permission',
          message: 'so you can save it.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can save it');
        saveScreenshot();
      } else {
        console.log('permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const saveScreenshot = async () => {
    try {
      const uri = await captureRef(imageViewRef, {
        format: 'png',
        quality: 0.8,
      });

      if (mediaUri.endsWith('.mp4')) {
        await CameraRoll.save(mediaUri, {type: 'video', album: 'PixyRight'});
      } else await CameraRoll.save(uri, {type: 'photo', album: 'PixyRight'});

      Alert.alert('Saved to the gallery');

      console.log('Screenshot saved to internal storage:', uri);
    } catch (error) {
      console.error('Error saving screenshot:', error);
    }
  };

  const renderDraggable = (sticker, index) => (
    <Draggable key={index} x={10} y={10} renderSize={80} renderColor="black">
      <LinearGradient
        colors={['#CB9D06', '#FFC300', '#CB9D06']}
        style={[styles.sticker]}>
        <DisplaySticker
          key={index}
          field={sticker}
          onPress={() => handleRemoveSticker(index)}
        />
        <Text
          style={{
            color: textColor,
            minWidth: 60,
            fontWeight: '800',
            opacity: brightness,
          }}>
          {sticker.value}
        </Text>
      </LinearGradient>
    </Draggable>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        position: 'relative',
        zIndex: 1,
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
          }}
          onPress={requestStoragePermission}>
          <Text style={{color: 'black'}}>Save</Text>
        </TouchableOpacity>
      </View>
      <ViewShot ref={imageViewRef} style={{flex: 1}}>
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
        {stickers.map((sticker, index) =>
          // <Draggable
          //   key={index}
          //   x={10}
          //   y={10}
          //   renderSize={80}
          //   renderColor="black">
          //   <LinearGradient
          //     colors={['#CB9D06', '#FFC300', '#CB9D06']}
          //     style={[styles.sticker]}>
          //     <DisplaySticker
          //       key={index}
          //       field={sticker}
          //       onPress={() => handleRemoveSticker(index)}
          //     />
          //     <Text style={{color: 'black', minWidth: 60}}>
          //       {sticker.value}
          //     </Text>
          //   </LinearGradient>
          // </Draggable>
          renderDraggable(sticker, index),
        )}
      </ViewShot>

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
            }}
            onPress={() => {
              setShowFontPicker(true);
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
            }}
            onPress={() => {
              setShowSlider(true);
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
            }}
            onPress={() => {
              setShowColorPicker(true);
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
      {showSlider && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.1)',
            zIndex: 10,
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* Slider for brightness adjustment */}
          <Slider
            style={styles.slider}
            minimumValue={0} // Minimum brightness
            maximumValue={1} // Maximum brightness
            step={0.1} // Step size
            value={brightness} // Current brightness level
            onValueChange={value => setBrightness(value)} // Update brightness on change
            onSlidingComplete={() => setShowSlider(false)}
          />
        </View>
      )}
      {showColorPicker && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.1)',
            zIndex: 10,
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <ColorPicker
            ref={colorPickerRef}
            color={textColor}
            onColorChange={color => setTextColor(color)}
            style={styles.colorPicker}
            // onColorChangeComplete={color => {
            //   setTextColor(color);
            //   setShowColorPicker(false); // Close color picker when picking is complete
            // }}
          />
        </View>
      )}

      {showFontPicker && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#333333',
            zIndex: 10,
            height: '60%',
            width: '100%',
            flexDirection: 'column',
            bottom: 0,
            // justifyContent: 'center',
            // alignItems: 'center',
            padding: 20,
            gap: 10,
            paddingTop: 30,
            borderTopRightRadius: 18,
            borderTopLeftRadius: 18,
          }}>
          {fonts.map((font, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setShowFontPicker(false);
              }}>
              <Text style={{color: 'white', fontSize: 14}}>{font}</Text>
            </TouchableOpacity>
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
    // backgroundColor: '#CB9D06', // Change to sticker background color
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
  slider: {
    width: '80%',
    backgroundColor: '#333333',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  colorPicker: {
    position: 'absolute',
    top: '25%',
    height: 200, // Set the desired height of the color picker
  },
});

export default Edit;
