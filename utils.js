module.exports = (on, config) => {
    on('task', {
        async getIAPAuthorization({ url, cid }) {
            const { GoogleAuth } = require('google-auth-library');
            const auth = new GoogleAuth();
            const client = await auth.getIdTokenClient(cid);
            const res = await client.request({ url });
            return res.config.headers.Authorization
        }
    })
    return config
}