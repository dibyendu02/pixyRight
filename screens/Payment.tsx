import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icons from '../Icons';
import {useNavigation} from '@react-navigation/native';

const Payment = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#222222'}}>
      <View
        style={{
          height: 60,
          width: '100%',
          borderBlockColor: 'white',
          borderBottomWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          backgroundColor: 'black',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icons.AntDesign name="arrowleft" color="white" size={28} />
        </TouchableOpacity>
        <Text style={{color: 'white', fontSize: 24, fontWeight: '600'}}>
          PixyRight
        </Text>
        <View style={{width: 40}}></View>
      </View>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Text style={{fontSize: 24, fontWeight: '600', marginTop: 20}}>
          Free Member
        </Text>
        <Text style={{fontSize: 14, textAlign: 'center', marginVertical: 20}}>
          You are a free member. We are offering you a trial version of this
          app. Your trial would expire in 3 days.
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            width: '90%',
            padding: 10,
            borderRadius: 12,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>Unlimited watermarks for $0.99 /month</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            width: '90%',
            padding: 10,
            borderRadius: 12,
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <Text>Unlimited watermarks for $0.99 /month</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            width: '90%',
            padding: 10,
            borderRadius: 12,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>Unlimited watermarks for $0.99 /month</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({});
