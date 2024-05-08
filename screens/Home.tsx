import {Share, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icons from '../Icons';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

const Home = () => {
  const navigation = useNavigation();
  const [openDialog, setOpenDialog] = useState(false);

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel) {
        // Navigate to Edit page with the selected image URI
        navigation.navigate('Edit', {mediaUri: response?.assets[0]?.uri});
        // console.log(response?.assets[0]?.uri);
      }
    });
  };

  const pickVideo = () => {
    launchImageLibrary({mediaType: 'video'}, response => {
      if (!response.didCancel) {
        // Navigate to Edit page with the selected image URI
        navigation.navigate('Edit', {mediaUri: response?.assets[0]?.uri});
      }
    });
  };

  const shareMessage = () => {
    Share.share({
      message: 'Check out this amazing app - PixyRight!',
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    setOpenDialog(false);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#222222'}}>
      <View
        style={{
          width: '100%',
          backgroundColor: 'black',
          height: '5%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 600}}>
          PixyRight
        </Text>
      </View>
      <View
        style={{
          height: '95%',
          width: '100%',
          // backgroundColor: 'yellow',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
        <View
          style={{
            // width: '95%',
            height: '50%',
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: 15,
            marginBottom: 15,
            marginHorizontal: 20,
            // backgroundColor: 'blue',
            // position: 'relative',
          }}>
          <TouchableOpacity
            style={{
              height: '60%',
              width: '50%',
              backgroundColor: '#111111',
              borderWidth: 8,
              borderBlockColor: 'black',
              flexDirection: 'column',
              gap: 10,
              // justifyContent: 'flex-start',
              alignItems: 'center',
              paddingTop: 15,
            }}
            onPress={() => {
              navigation.navigate('SavedText');
            }}>
            <Text style={{color: 'white', fontWeight: 600, fontSize: 20}}>
              SETUP
            </Text>
            <View
              style={{
                padding: 7,
                backgroundColor: 'white',
                borderRadius: 25,
              }}>
              <Icons.Fontisto name="player-settings" color="black" size={40} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '60%',
              width: '50%',
              backgroundColor: '#111111',
              borderWidth: 8,
              borderBlockColor: 'black',
              flexDirection: 'column',
              gap: 10,
              // justifyContent: 'flex-start',
              alignItems: 'center',
              paddingTop: 15,
            }}
            onPress={() => {
              navigation.navigate('Payment');
            }}>
            <Text style={{color: 'white', fontWeight: 600, fontSize: 20}}>
              PAYMENT
            </Text>
            <View
              style={{
                padding: 7,
                backgroundColor: 'white',
                borderRadius: 25,
              }}>
              <Icons.FontAwesome name="credit-card" color="black" size={40} />
            </View>
          </TouchableOpacity>
        </View>

        {/* circle */}

        <TouchableOpacity
          style={{
            position: 'absolute',
            width: '60%',
            height: '30%',
            backgroundColor: '#222222',
            left: '20%',
            bottom: '35%',
            zIndex: 10,
            borderRadius: 200,
            borderWidth: 8,
            borderBlockColor: 'black',
          }}
          onPress={() => {
            // navigation.navigate('Edit');
            setOpenDialog(true);
          }}>
          <View
            style={{
              backgroundColor: '#111111',
              margin: 'auto',
              height: '90%',
              width: '90%',
              borderRadius: 200,
              borderWidth: 8,
              borderBlockColor: 'black',
            }}>
            <View
              style={{
                width: '70%',
                height: '70%',
                backgroundColor: 'white',
                margin: 'auto',
                borderRadius: 200,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icons.FontAwesome name="image" color="black" size={70} />
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            // width: '100%',
            height: '50%',
            flexDirection: 'row',
            gap: 15,
            // backgroundColor: 'blue',
            marginBottom: 15,
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            style={{
              height: '60%',
              width: '50%',
              backgroundColor: '#111111',
              borderWidth: 8,
              borderBlockColor: 'black',
              flexDirection: 'column',
              gap: 10,
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: 15,
            }}
            onPress={shareMessage}>
            <View
              style={{
                padding: 7,
                backgroundColor: 'white',
                borderRadius: 25,
              }}>
              <Icons.MaterialCommunityIcons
                name="email-outline"
                color="black"
                size={40}
              />
            </View>
            <Text style={{color: 'white', fontWeight: 600, fontSize: 20}}>
              INVITE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '60%',
              width: '50%',
              backgroundColor: '#111111',
              borderWidth: 8,
              borderBlockColor: 'black',
              flexDirection: 'column',
              gap: 10,
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: 15,
            }}
            onPress={() => {
              navigation.navigate('Feature');
            }}>
            <View
              style={{
                padding: 7,
                backgroundColor: 'white',
                borderRadius: 25,
              }}>
              <Icons.MaterialCommunityIcons
                name="head-alert-outline"
                color="black"
                size={40}
              />
            </View>
            <Text style={{color: 'white', fontWeight: 600, fontSize: 20}}>
              IDEAS
            </Text>
          </TouchableOpacity>
        </View>
        {openDialog && (
          <View
            style={{
              width: '100%',
              height: '30%',
              backgroundColor: 'white',
              position: 'absolute',
              bottom: 0,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: 10,
            }}>
            <Text style={{color: 'gray', fontWeight: '600', fontSize: 18}}>
              Select Media Type
            </Text>
            <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>
              What type of item you want to edit ?
            </Text>
            <TouchableOpacity
              style={{
                width: '100%',
                borderBlockColor: 'gray',
                borderTopWidth: 1,
                flexDirection: 'row',
                paddingVertical: 10,
                justifyContent: 'center',
                marginTop: 20,
              }}
              onPress={pickImage}>
              <Text style={{color: 'blue', fontSize: 16}}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                borderBlockColor: 'gray',
                borderTopWidth: 1,
                flexDirection: 'row',
                paddingVertical: 10,
                justifyContent: 'center',
              }}
              onPress={pickVideo}>
              <Text style={{color: 'blue', fontSize: 16}}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                borderBlockColor: 'gray',
                borderTopWidth: 1,
                flexDirection: 'row',
                paddingVertical: 10,
                justifyContent: 'center',
              }}
              onPress={() => {
                setOpenDialog(false);
              }}>
              <Text style={{color: 'blue', fontSize: 16}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
