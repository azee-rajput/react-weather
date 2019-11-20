import React from 'react';
import './App.css';

import Routing from './components/routing';
import Footer from './components/footer';

function App() {
  return (
    <div className="mainBg">
      <Routing/>
      <Footer/>
    </div>
  );
}

export default App;
