import React, {useState, useEffect} from "react";
import { Redirect, Route } from "react-router-dom";
 
import { useAuthState, useAuthDispatch } from '../context/context'
import {checkToken} from "../context/actions"
 
const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
 
    // const [tokenStatus, setTokenStatus] = useState('');
    // const [isLoading, setLoading] = useState(true);

    const userDetails = useAuthState()
    const dispatch = useAuthDispatch();

    // useEffect(() => {
    //     (async function() {
    //         dispatch({ type: 'VERIFY_TOKEN' });
    //         console.log("HERE")
    //         const tokenStatus = await checkToken(dispatch, userDetails.token);
          
    //         if(tokenStatus === "success") {
    //             const payload = {
    //                 auth_token: userDetails.token
    //             }
    //             dispatch({ type: 'TOKEN_VERIFIED', payload: payload})
    //             console.log("HERE 2")
    //         }
    //         else {
    //             dispatch({ type: 'TOKEN_EXPIRED'})
    //             console.log("HERE 3")
    //         }
    //     })();
    // }, [])

    // if(isLoading) {
    //     return <div className="App">Loading...</div>;
    // }

    return (
        <Route
            path={path}
            render={props =>
                // isPrivate && (tokenStatus !== "success") ? (
                isPrivate && !Boolean(userDetails.token) ? (
                    <Redirect
                        to={{ pathname: "/" }}
                    />
                ) : (
                        <Component {...props} />
                    )
            }
            {...rest}
        />
    )
}
 
export default AppRoutes