export const login = payload => {
    return {
        type: 'login',
        payload: payload
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    return {
        type: 'logout'
    }
}

export const setloggedin = payload => {
    return {
        type: 'setLoggedIn',
        payload: payload
    }
}

export const updateToken = payload => {
    return {
        type: 'updateToken',
        payload: payload
    }
}

export const updateProfile = payload => {
    return {
        type: 'updateProfile',
        payload: payload
    }
}
