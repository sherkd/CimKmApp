import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native'
import Navigator from './routes/App-navigator.js'
import { registerRootComponent, AppLoading } from 'expo';
import * as Font from 'expo-font';

class App extends Component {
  state = {
    isLoadingComplete: false,
  };

  loadResourcesAsync = async () => Promise.all([
    Font.loadAsync({
      'custom-icons': require('./assets/fonts/custom-icons.ttf'),
    }),
  ]);

  handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
  
  componentDidMount = () => {
    
  }

  render() {
    const { isLoadingComplete } = this.state;

    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }

    return (
      <Navigator />
    );
  }
}
registerRootComponent(App);

// Export the App component for unit testing purposes. Expo handles rendering
// via the "registerRootComponent" call above and does not require an export.
export default App;

