import axios from "axios";

export const fakeAuthProvider = {
    isAuthenticated: false,
    username: null,
    accessToken: String,

    async signIn(username, password) {
        const signInUrl = 'http://127.0.0.1:8000/api/token/';

        try {
            const response = await axios.post(signInUrl, {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response || !response.data || !response.data.access) {
                throw new Error('Authentication failed');
            }

            const accessToken = response.data.access;

            fakeAuthProvider.isAuthenticated = true;
            fakeAuthProvider.username = username;
            fakeAuthProvider.accessToken = accessToken;

            return {success: true};
        } catch (error) {
            console.error('Authentication failed:', error);
            return {success: false, error: error.message};
        }
    },

    async register(username, password, email) {
        const registerUrl = 'http://127.0.0.1:8000/api/register/';

        try {
            const response = await axios.post(registerUrl, {
                username,
                password,
                email
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response)
            if (!response || !response.data) {
                throw new Error('Authentication failed');
            }

            return {success: true};
        } catch (error) {
            console.error('Authentication failed:', error);
            return {success: false, error: error.message};
        }
    },

    async signOut() {
        await new Promise((r) => setTimeout(r, 500));

        fakeAuthProvider.isAuthenticated = false;
        fakeAuthProvider.username = null;
        fakeAuthProvider.accessToken = null
    },

    async getUser() {
        const apiUrl = 'http://127.0.0.1:8000/api/user/';

        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${fakeAuthProvider.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
        }
    }
};