import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icons from '../Icons';

const MailScreen = () => {
  const navigation = useNavigation();
  const [subject, setSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');

  const recipientEmail = 'info.pixyright@gmail.com';

  const sendEmail = () => {
    const email = {
      to: recipientEmail,
      subject: subject,
      body: emailContent,
    };
    // Logic to send email with email object
    console.log('Email sent:', email);
    // Clear the input fields after sending email
    setSubject('');
    setEmailContent('');
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons.AntDesign name="arrowleft" color="white" size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>PixyRight</Text>
        <View style={{width: 40}}></View>
      </View>

      <View style={styles.container}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 20,
            marginVertical: 20,
          }}>
          I've an idea! PixyRight
        </Text>
        <Text style={styles.recipient}>To: {recipientEmail}</Text>
        <TextInput
          style={styles.input}
          placeholder="Subject"
          value={subject}
          onChangeText={text => setSubject(text)}
          placeholderTextColor={'gray'}
        />
        <TextInput
          style={[styles.input, {height: 200, textAlignVertical: 'top'}]}
          multiline
          placeholder="Write your email here..."
          value={emailContent}
          onChangeText={text => setEmailContent(text)}
          placeholderTextColor={'gray'}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendEmail}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#222222',
  },
  recipient: {
    color: 'white',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: 'black',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MailScreen;
