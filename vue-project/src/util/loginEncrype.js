
import * as CryptoJS from 'crypto-js/crypto-js';
/**
     * CBC模式
     * @param data 加密内容
     */
function encryptByDESModeCBC(data) {
    data = `${data.userName.toString().trim()}:${data.passWord}`;
    const keyHex = CryptoJS.enc.Utf8.parse(
        'test-vue'
    );
    // 模式为ECB padding为Pkcs7
    const encrypted = CryptoJS.DES.encrypt(data, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.ciphertext.toString();
}
export default encryptByDESModeCBC;