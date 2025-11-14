import App from './App';
import { AppRegistry, View, Text, ActivityIndicator } from 'react-native';
import bootstrap from './core/bootstrap';
import { name as appName } from './app.json';
import React, { useState, useEffect } from 'react';
let appInitialized = false;
async function initializeApp() {
  if (appInitialized) {
    return;
  }
  appInitialized = true;
  try {
    await bootstrap();
    AppRegistry.registerComponent(appName, () => App);
  } catch (error) {}
}
function AppWrapper() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    initializeApp().then(() => {
      setIsReady(true);
    });
  }, []);
  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F1F3F6',
        }}>
        <ActivityIndicator size="large" color="#0A3D62" />
        <Text style={{ marginTop: 10, fontSize: 16, color: '#0A3D62' }}>
          Inicializando Aplicação...
        </Text>
      </View>
    );
  }
  return <App />;
}
export default AppWrapper;
