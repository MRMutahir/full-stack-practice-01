

const setLocalAccessToken = async (token: string) => {
    if (!token || token == null) return localStorage.removeItem("token")
    localStorage.setItem('token', token);
}

const getLocalAccessToken = () => {
    const token = localStorage.getItem('token') || null;
    return token;
};


const removeLocalAccessToken = () => {
    setLocalAccessToken(null);
    setUser(null);
};

export {
    setLocalAccessToken,
    getLocalAccessToken,
    removeLocalAccessToken
}