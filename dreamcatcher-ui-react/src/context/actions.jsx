import { auth, createUserProfileDocument } from '../components/firebase'

export async function signUpUser(dispatch, signUpPayload, additionalData) {
    try {
        let response = await auth.createUserWithEmailAndPassword(signUpPayload.email, signUpPayload.password)
        if(response) {
            // alert('You have successfully signed up!');

            await createUserProfileDocument(response, additionalData);

            try {
                let idToken = await auth.currentUser.getIdToken();

                const data = {
                    user: signUpPayload.email,
                    auth_token: idToken
                }

                localStorage.setItem('currentUser', JSON.stringify(data));
                return data;

            } catch(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
    
                alert(errorMessage);    
    
                console.log(errorCode);
                console.log(errorMessage);
                console.log(error);
                return;
            }
        }
    } catch(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
    }
}

export async function loginUser(dispatch, loginPayload) {
    dispatch({ type: 'REQUEST_LOGIN'});
    try {
        let response = await auth.signInWithEmailAndPassword(loginPayload.email, loginPayload.password);
        if(response) {
            try {
                let idToken = await auth.currentUser.getIdToken();

                const data = {
                    user: loginPayload.email,
                    auth_token: idToken
                }

                dispatch({ type: 'LOGIN_SUCCESS' , payload: data});
                localStorage.setItem('currentUser', JSON.stringify(data));
                return data;

            } catch(error) {
                dispatch({ type: 'LOGIN_ERROR', error: error});
                var errorCode = error.code;
                var errorMessage = error.message;
    
                alert(errorMessage);    
    
                console.log(errorCode);
                console.log(errorMessage);
                console.log(error);
                return;
            }
        }
    } catch(error) {
        dispatch({ type: 'LOGIN_ERROR', error: error});
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(errorMessage);    

        console.log(errorCode);
        console.log(errorMessage);
        console.log(error);
        return;
    }
}

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' });

    try {
        let response = auth.signOut();
        if(response) {  
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
        }
    } catch (error) {
        console.log(error);
    }
}

