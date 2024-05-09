import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the context
const SectionsContext = createContext({});

// Create the provider component
export const SectionsProvider = ({children}: {children: any}) => {
  const [sections, setSections] = useState<any[]>([]);

  // Fetch data from AsyncStorage on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedSections = await AsyncStorage.getItem('sections');

        console.log(savedSections);
        if (savedSections !== null) {
          setSections(JSON.parse(savedSections));
        } else {
          // If no data found in AsyncStorage, initialize with default data
          setSections([
            {
              title: 'SOCIAL',
              fields: [
                {label: 'Facebook', value: '', icon: 'facebook'},
                {label: 'Instagram', value: '', icon: 'instagram'},
                {label: 'Twitter', value: '', icon: 'twitter'},
                {label: 'Linkedin', value: '', icon: 'linkedin'},
                {label: 'Pinterest', value: '', icon: 'pinterest'},
                {label: 'Youtube', value: '', icon: 'youtube'},
                {label: 'Tiktok', value: '', icon: 'tiktok'},
                {label: 'Whatsapp', value: '', icon: 'whatsapp'},
                {label: 'Amazon', value: '', icon: 'amazon'},
                {label: 'Tumblr', value: '', icon: 'tumblr'},
                {label: 'SnapChat', value: '', icon: 'snapchat'},
                {label: 'Ebay', value: '', icon: 'ebay'},
                {label: 'Behance', value: '', icon: 'behance'},
                {label: 'flickr', value: '', icon: 'flickr'},
              ],
            },
            {
              title: 'LOGO',
              fields: [{label: 'Logo', value: '', icon: 'file-image-o'}],
            },
            {
              title: 'BUSINESS',
              fields: [
                {label: 'Email', value: '', icon: 'email'},
                {label: 'Website', value: '', icon: 'web'},
                {label: 'Phone Number', value: '', icon: 'phone'},
              ],
            },
            {
              title: 'BRANDING',
              fields: [
                {label: 'Copyright Name', value: '', icon: 'copyright'},
                {label: 'By Name', value: '', icon: 'copyright'},
                {label: 'Text', value: '', icon: 'format-text'},
                {label: 'Signature Text', value: '', icon: 'signature'},
              ],
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Update AsyncStorage on sections change
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('sections', JSON.stringify(sections));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

    saveData();
  }, [sections]);

  return (
    <SectionsContext.Provider value={{sections, setSections}}>
      {children}
    </SectionsContext.Provider>
  );
};

// Create a custom hook for using the sections context
export const useSections = () => useContext(SectionsContext);
