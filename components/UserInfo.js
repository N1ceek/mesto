export default class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(aboutSelector);
    }
    getUserInfo() {
        const userInfo = {
            fullName: this._name.textContent,
            workplace: this._job.textContent,
        }
        return userInfo
    }
    setUserInfo(data) {
        if (data.name) this._name.textContent = data.name;
        if (data.about) this._job.textContent = data.about;
    }
}