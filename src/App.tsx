import * as React from 'react';
import './App.css';

// Components
import AudioSine from './components/AudioSine/AudioSine';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AudioSine
          sources={[
            'https://websiteaquest-demo.azurewebsites.net/public/gallery/items/1122/feudi_5.mp3',
            'https://websiteaquest-demo.azurewebsites.net/public/gallery/items/1130/campo-alle-comete-theme.mp3',
          ]}
          appState={{
            width: window.innerWidth,
            height: window.innerHeight,
          }}
        />
      </div>
    );
  }
}

export default App;
