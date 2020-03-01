import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUserAPI } from '../../../config/redux/action';
import Button from '../../../components/atoms/Button';
import { Link } from 'react-router-dom';


class Login extends Component {

    // changeUser = () => {
    //     // changeUserName dari key di dalam dispatch yng valuenya berisi action
    //     this.props.changeUserName();
    // }

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

    handleLoginSubmit= async ()=>{

        const {history} = this.props;
        //setelah pakai redux dan thunk 
        const {email, password} = this.state;
        console.log('data berfore send ', email, password);
        // await -> menunggu pemnaggilan api dan menangkkap pesan eror jika eror
        const res = await this.props.loginAPI({email: email, password: password}).catch(err => err);

        //jika pemanggilan sukses kosongkan state dan pindah ke halaman dashboard
        if(res){
            console.log('login suksess',res);
            /**
             * localStorage.setItem('userData', res) ->
             * simpan data di local storage paramter 1 nama localStorage paramter 2 data yg ingin disimpan
             * namun bentuk dari localStorage trsbt [object Object] (tidak bisa di konsumsi)
             * kita hrus mrubah data nya dlu ke string agar bentuknya tidak [object Object] ->
             * localStorage.setItem('userData', JSON.stringify(res)) 
             */
            localStorage.setItem('userData', JSON.stringify(res)) 
            this.setState({
                email:'',
                password: ''
            })
            history.push('/dashboard');
            
        }else{
            console.log('login filed');
        }
        
        
    }


    render() {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Login Page</p>
                    <input className="input" id="email" type="text" placeholder="email" onChange={this.handleChangeText} value={this.state.email} />
                    <input className="input" id="password" type="password" placeholder="password" onChange={this.handleChangeText} value={this.state.password} />
                    <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading} />
                    <br/>
                    <Link to="/register">Registrasi ?</Link>
                </div>
            </div>
        )
    }
}

// //--------merubah state yang ada di initialState menjadi props---
// const reduxState = (state) => ({
//     //state.popup dari initialState redux
//     popupProps: state.popup,
//     username: state.user
// });
// //----------------------------------------------------------------

// //---------dispatch-------------------
// const reduxDispatch = (dispatch) => ({
//     //actionUsername berasal dari action yng akan di rubah kedalam props
//     changeUserName: () => dispatch(actionUsername())
// })
// //----------------------------------

const reduxState=(state)=>({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch)=>({
    loginAPI: (data)=>dispatch(loginUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Login);