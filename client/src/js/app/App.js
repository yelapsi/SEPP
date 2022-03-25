import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButtion';
import UserStore from '../../stores/UserStore';
import AccountStore from "../../stores/AccountStore";
import LoginStore from "../../stores/LoginStore";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            isManager: LoginStore.getAuth(),
            buttonDisabled: false,
        }
    }

    setInputValue(property, val){
        val = val.trim();
        if(val.length > 12){
            return;
        }
        this.setState({
            [property]: val
        })
    }
    
    resetForm(){
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }

    async doLogin(){
        if(!this.state.username){
            return;
        }
        if(!this.state.password){
            return;
        }

        this.setState({
            buttonDisabled: true
        })

        try {
            let res = await fetch('http://localhost:4443/v1/login2', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    isManager: LoginStore.isManager
                })
            });
            
            let result = await res.json();
            if(result && result.success){
                UserStore.isLoggedIn = true;
                this.forceUpdate();
            }else if(result && result.success === false){
                this.resetForm();
            }
        } catch(e){
            console.log(e);
            this.resetForm();
        }
    }

    doRegister(){
        this.props.history.push('/register');
    }

    render() {
        console.log("isManager: " + LoginStore.isManager);
        if(!UserStore.isLoggedIn){
            return (
                <div className='loginForm'>
                    <div class='loginTitle'>SEPP Login</div>
                    <InputField
                        type='text'
                        placeholder='Username'
                        value={this.state.username ? this.state.username : ''}
                        onChange={ (val) => this.setInputValue('username', val)}
                    />
                    <InputField
                        type='password'
                        placeholder='Password'
                        value={this.state.password ? this.state.password : ''}
                        onChange={ (val) => this.setInputValue('password', val)}
                    />
    
                    <SubmitButton
                        text={'Login'}
                        disabled={this.state.buttonDisabled}
                        onClick={()=>this.doLogin()}
                    />

                    <SubmitButton
                        text={'Register'}
                        disabled={this.state.buttonDisabled}
                        onClick={()=>this.doRegister()}
                    />
                </div>
            );
        }else{
            if(LoginStore.isManager){
                return (
                    <div className='loginForm'>
                        <div class='loginTitle'>Your UserID: {AccountStore.getUserId()}</div>
                        <br/>
                        <br/>
                        <Link to="/search2/" style={{color:'black'}}>
                            <button type="button" className='btnMe'>Go to Search</button>
                        </Link>
                        <br/>
                        <br/>
                        <Link to="/loguiData/" style={{color:'black'}}>
                            <button type="button" className='btnMe'>Go to LogUI</button>
                        </Link>
                        <br/>
                        <br/>
                    </div>
                );
            } else {
                return (
                    <div className='loginForm'>
                        <div class='loginTitle'>Your UserID: {AccountStore.getUserId()}</div>
                        <br/>
                        <br/>
                        <Link to="/search2/" style={{color:'black'}}>
                            <button type="button" className='btnMe'>Go to Search</button>
                        </Link>
                        <br/>
                        <br/>
                    </div>
                );
            }
        }
        
    }
}

export default LoginForm;
