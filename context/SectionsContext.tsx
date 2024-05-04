import React, {createContext, useState, useContext} from 'react';

// Create the context
const SectionsContext = createContext({});

// Create the provider component
export const SectionsProvider = ({children}: {children: any}) => {
  const [sections, setSections] = useState([
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

  return (
    <SectionsContext.Provider value={{sections, setSections}}>
      {children}
    </SectionsContext.Provider>
  );
};

// Create a custom hook for using the sections context
export const useSections = () => useContext(SectionsContext);
