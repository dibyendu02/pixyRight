import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icons from '../Icons';
import {useSections} from '../context/SectionsContext';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const SavedTexts = () => {
  const {sections, setSections} = useSections();

  const navigation = useNavigation();

  const [tempSections, setTempSections] = useState([...sections]);

  const handleInputChange = (
    sectionIndex: number,
    fieldIndex: number,
    text: string,
  ) => {
    const newTempSections = [...tempSections];
    newTempSections[sectionIndex].fields[fieldIndex].value = text;
    setTempSections(newTempSections);

    console.log(sections[0].fields);
    console.log(tempSections[0].fields);
  };

  const handleSaveField = (sectionIndex: number, fieldIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].fields[fieldIndex].value =
      tempSections[sectionIndex].fields[fieldIndex].value;
    setSections(newSections);
    Alert.alert('Done');

    console.log(sections);
    console.log(tempSections);
  };

  const handleSaveAll = () => {
    setSections([...tempSections]); // Update all fields in sections state
    navigation.goBack(); // Navigate back in the navigation stack
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
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
        <TouchableOpacity onPress={handleSaveAll}>
          <Icons.Fontisto name="save" color="white" size={28} />
        </TouchableOpacity>
      </View>

      {/* Input sections */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {tempSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.fields.map((field, fieldIndex) => (
              <View key={fieldIndex} style={styles.inputRow}>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <LinearGradient
                    colors={['#CB9D06', 'white', '#CB9D06']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {field.icon === 'web' ||
                    field.icon === 'email' ||
                    field.icon === 'format-text' ? (
                      <Icons.MaterialCommunityIcons
                        name={`${field.icon}`}
                        size={25}
                        color="black"
                      />
                    ) : field.icon === 'tiktok' || field.icon === 'ebay' ? (
                      <Icons.FontAwesome5
                        name={`${field.icon}`}
                        size={25}
                        color="black"
                      />
                    ) : field.icon === 'signature' ? (
                      <Icons.FontAwesome5
                        name={`${field.icon}`}
                        size={25}
                        color="black"
                      />
                    ) : (
                      <Icons.FontAwesome
                        name={`${field.icon}`}
                        size={25}
                        color="black"
                      />
                    )}
                  </LinearGradient>
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={text =>
                    handleInputChange(sectionIndex, fieldIndex, text)
                  }
                  value={field.value}
                  placeholder={`Enter ${field.label}`}
                  placeholderTextColor={'black'}
                />
                <TouchableOpacity
                  onPress={() => handleSaveField(sectionIndex, fieldIndex)}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icons.Entypo name="check" size={25} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SavedTexts;

const styles = StyleSheet.create({
  // input: {
  //   // width: '100%',
  //   width: '70%',
  //   height: 40,
  //   paddingHorizontal: 10,
  //   color: 'black',
  //   backgroundColor: 'white',
  // },

  sectionContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#5C5C5C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
