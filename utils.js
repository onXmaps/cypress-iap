const { GoogleAuth } = require('google-auth-library');

module.exports = async function getIAPToken({ url, cid }) {
    debugger
    const auth = new GoogleAuth();
    const client = await auth.getIdTokenClient(cid);
    const res = await client.request({ url });
    //return res.config.headers.Authorization.split(" ")[1]
    return new Promise((resolve, reject) => {
        resolve(res.config.headers.Authorization.split(" ")[1])
    }) 
    
}
// export async function getIAPToken({ url, cid }) {
//     debugger
//     const auth = new GoogleAuth();
//     const client = await auth.getIdTokenClient(cid);
//     const res = await client.request({ url });
//     return res.config.headers.Authorization.split(" ")[1]
// }