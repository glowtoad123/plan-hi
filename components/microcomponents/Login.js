import React from 'react'

export default function Login(props) {
    return(
        <div className="signbox">
                <input 
                    onChange={props.settingEmail}
                    value={props.email}
                    type="email"    
                    name="email" 
                    placeholder="email" 
                    className="signfield"
                />
                <input
                    onChange={props.settingPassword}  
                    value={props.password}    
                    type="password" 
                    name="password"    
                    placeholder="password" 
                    className="signfield"
                />
                <button 
                        onClick={props.authenticate}
                        className="submit"
                >Login
                </button>
        </div>
    )
}
