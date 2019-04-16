import App from './Component/App.jsx';
import { render } from 'react-dom';
import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './style/myStyle.css';



function renderApp() {
    render(
        <App />,
        document.getElementById("root")
    );
}
renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept();
    //module.hot.accept('./routes', () => { const NextApp = require('./routes').default; renderApp(); });
}