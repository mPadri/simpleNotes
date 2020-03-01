/**
 * dokumentasi register email&password
 * --> https://firebase.google.com/docs/auth/web/
 */

import React, {Component} from 'react';
import './Register.scss';
// import firebase from '../../../config/firebase';
import Button from '../../../components/atoms/Button';
import { connect } from 'react-redux';
import { registerUserAPI } from '../../../config/redux/action';
import { Link } from 'react-router-dom';

class Register extends Component{

    state={
        email: '',
        password: ''
    }

    handleChangeText = (e)=>{
        // console.log(e.target.id);

        this.setState({
            [e.target.id]: e.target.value
        })

    }

    handleRegsiterSubmit= async ()=>{
        // console.log('email', this.state.email);
        // console.log('password', this.state.password);

        // const {email, password} = this.state;
        // console.log('data berfore send ', email, password);
        // // task ini copy dari dokumentasi
        // firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        // .then(res=>{
        //     console.log('suksess', res);
        // })
        // .catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // ...
        //     console.log(errorCode,errorMessage)
        //   })

        //setelah pakai redux dan thunk 
        const {email, password} = this.state;
        console.log('data berfore send ', email, password);
        const res = await this.props.registerAPI({email: email, password: password})
        .catch(err=>err);
        
        if(res){            
           this.setState({
                email:'',
                password: ''
            })
            alert('Registrasi Berhasil ! Silahkan ke halaman Login')
        }
    }

    render(){
        return(
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Register Page</p>
                    <input className="input" id="email" type="text" placeholder="email" onChange={this.handleChangeText} value={this.state.email}/>
                    <input className="input" id="password" type="password" placeholder="password" onChange={this.handleChangeText} value={this.state.password}/>
                    <Button onClick={this.handleRegsiterSubmit} title="Register" loading={this.props.isLoading} />
                    <Link to="/">Login</Link>
                </div>            
            </div>
        )
    }
}

const reduxState=(state)=>({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch)=>({
    registerAPI: (data)=>dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);