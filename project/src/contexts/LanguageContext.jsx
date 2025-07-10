import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Common
    'app.title': 'Green Yathra',
    'app.subtitle': 'Your Journey to Sustainability',
    'welcome': 'Welcome',
    'login': 'Login',
    'logout': 'Logout',
    'dashboard': 'Dashboard',
    'profile': 'Profile',
    'settings': 'Settings',
    'upload': 'Upload',
    'submit': 'Submit',
    'cancel': 'Cancel',
    'save': 'Save',
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.role': 'Select Role',
    'auth.family': 'Family',
    'auth.haritha': 'Haritha Karma Sena',
    'auth.login.button': 'Sign In',
    'auth.welcome.back': 'Welcome Back',
    'auth.subtitle': 'Sign in to continue your sustainability journey',
    
    // Family Dashboard
    'family.dashboard': 'Family Dashboard',
    'family.eco.points': 'Eco Points',
    'family.badges': 'Badges',
    'family.monthly.savings': 'Monthly Savings',
    'family.upload.bills': 'Upload Bills',
    'family.waste.segregation': 'Waste Segregation',
    'family.education': 'Educational Content',
    'family.leaderboard': 'Monthly Leaderboard',
    'family.quick.actions': 'Quick Actions',
    
    // Haritha Karma Sena Dashboard
    'haritha.dashboard': 'Haritha Karma Sena Dashboard',
    'haritha.pickup.queue': 'Pickup Queue',
    'haritha.map': 'Location Map',
    'haritha.status': 'Update Status',
    'haritha.employment': 'Employment Form',
    'haritha.pending.pickups': 'Pending Pickups',
    'haritha.completed.today': 'Completed Today',
    
    // Community Dashboard
    'community.dashboard': 'Community Dashboard',
    'community.leaderboard': 'Community Leaderboard',
    'community.feedback': 'Community Feedback',
    'community.usage.trends': 'Usage Trends',
    'community.waste.distribution': 'Waste Distribution',
    
    // Navigation
    'nav.home': 'Home',
    'nav.community': 'Community',
    'nav.education': 'Education',
    'nav.profile': 'Profile',
    
    // Footer
    'footer.description': 'Green Yathra - Your Journey to Sustainability. Making Kerala greener, one step at a time.',
    'footer.quick.links': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.about': 'About Us',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  ml: {
    // Common
    'app.title': 'ഗ്രീൻ യാത്ര',
    'app.subtitle': 'സുസ്ഥിരതയിലേക്കുള്ള നിങ്ങളുടെ യാത്ര',
    'welcome': 'സ്വാഗതം',
    'login': 'ലോഗിൻ',
    'logout': 'ലോഗൗട്ട്',
    'dashboard': 'ഡാഷ്ബോർഡ്',
    'profile': 'പ്രൊഫൈൽ',
    'settings': 'സെറ്റിങ്ങുകൾ',
    'upload': 'അപ്ലോഡ്',
    'submit': 'സമർപ്പിക്കുക',
    'cancel': 'റദ്ദാക്കുക',
    'save': 'സേവ് ചെയ്യുക',
    'loading': 'ലോഡിംഗ്...',
    'error': 'പിശക്',
    'success': 'വിജയം',
    
    // Auth
    'auth.email': 'ഇമെയിൽ',
    'auth.password': 'പാസ്വേഡ്',
    'auth.role': 'റോൾ തിരഞ്ഞെടുക്കുക',
    'auth.family': 'കുടുംബം',
    'auth.haritha': 'ഹരിത കർമ്മ സേന',
    'auth.login.button': 'സൈൻ ഇൻ',
    'auth.welcome.back': 'തിരികെ സ്വാഗതം',
    'auth.subtitle': 'നിങ്ങളുടെ സുസ്ഥിരതാ യാത്ര തുടരാൻ സൈൻ ഇൻ ചെയ്യുക',
    
    // Family Dashboard
    'family.dashboard': 'കുടുംബ ഡാഷ്ബോർഡ്',
    'family.eco.points': 'ഇക്കോ പോയിന്റുകൾ',
    'family.badges': 'ബാഡ്ജുകൾ',
    'family.monthly.savings': 'മാസിക സമ്പാദ്യം',
    'family.upload.bills': 'ബില്ലുകൾ അപ്ലോഡ് ചെയ്യുക',
    'family.waste.segregation': 'മാലിന്യ വേർതിരിവ്',
    'family.education': 'വിദ്യാഭ്യാസ ഉള്ളടക്കം',
    'family.leaderboard': 'മാസിക ലീഡർബോർഡ്',
    'family.quick.actions': 'ദ്രുത പ്രവർത്തനങ്ങൾ',
    
    // Haritha Karma Sena Dashboard
    'haritha.dashboard': 'ഹരിത കർമ്മ സേന ഡാഷ്ബോർഡ്',
    'haritha.pickup.queue': 'പിക്കപ്പ് ക്യൂ',
    'haritha.map': 'ലൊക്കേഷൻ മാപ്',
    'haritha.status': 'സ്റ്റാറ്റസ് അപ്ഡേറ്റ്',
    'haritha.employment': 'തൊഴിൽ ഫോം',
    'haritha.pending.pickups': 'കാത്തിരിക്കുന്ന പിക്കപ്പുകൾ',
    'haritha.completed.today': 'ഇന്ന് പൂർത്തിയാക്കിയത്',
    
    // Community Dashboard
    'community.dashboard': 'കമ്മ്യൂണിറ്റി ഡാഷ്ബോർഡ്',
    'community.leaderboard': 'കമ്മ്യൂണിറ്റി ലീഡർബോർഡ്',
    'community.feedback': 'കമ്മ്യൂണിറ്റി ഫീഡ്ബാക്ക്',
    'community.usage.trends': 'ഉപയോഗ ട്രെൻഡുകൾ',
    'community.waste.distribution': 'മാലിന്യ വിതരണം',
    
    // Navigation
    'nav.home': 'ഹോം',
    'nav.community': 'കമ്മ്യൂണിറ്റി',
    'nav.education': 'വിദ്യാഭ്യാസം',
    'nav.profile': 'പ്രൊഫൈൽ',
    
    // Footer
    'footer.description': 'ഗ്രീൻ യാത്ര - സുസ്ഥിരതയിലേക്കുള്ള നിങ്ങളുടെ യാത്ര. ഓരോ ചുവടിലും കേരളത്തെ പച്ചയാക്കുന്നു.',
    'footer.quick.links': 'ക്വിക്ക് ലിങ്കുകൾ',
    'footer.contact': 'ഞങ്ങളെ ബന്ധപ്പെടുക',
    'footer.about': 'ഞങ്ങളെ കുറിച്ച്',
    'footer.privacy': 'പ്രൈവസി പോളിസി',
    'footer.terms': 'സേവന നിബന്ധനകൾ',
  }
};

const LanguageContext = createContext(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ml' : 'en');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};