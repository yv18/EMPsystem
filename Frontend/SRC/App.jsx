import React from 'react';
import ReactDOM from 'react-dom';
import {Route, HashRouter as Router } from 'react-router-dom';
import LinksSetup from './Route.jsx';

const element = (
        <LinksSetup/>
);

ReactDOM.render( element,document.getElementById('emp-Data'));