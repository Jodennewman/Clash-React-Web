import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import our image utilities
import { addPublicImage } from './utils/imageMap';
import { registerWithImageMapper } from './utils/importImages';

// Register explicit image imports with the image mapper
registerWithImageMapper(addPublicImage);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 