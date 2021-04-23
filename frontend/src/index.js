import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PnewsModel } from "./model";

const pnModel = new PnewsModel();
ReactDOM.render(
    <App model={pnModel}/>,
  document.getElementById('root')
);
