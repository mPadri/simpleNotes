import React, {Component} from 'react';
// import logo from '../../../assets/img/logo/logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';

//----redux-------------------------
import {Provider} from 'react-redux';
import {store} from '../../../config/redux';
//----------------------------------


class App extends Component {
  render(){
   
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Login}/>
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />
          </div>
        </Router>
      </Provider>
    );
  }
}


export default App;
