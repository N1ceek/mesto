export default class UserInfo {
    constructor(nameSelector, aboutSelector, avatarSelector) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatarSelector)
    }
    getUserInfo() {
        const userInfo = {
            fullName: this._name.textContent,
            workplace: this._job.textContent,
            avatar: this._avatar.src,
        }
        return userInfo
    }
    setUserInfo(data) {
        if (data.name) this._name.textContent = data.name;
        if (data.about) this._job.textContent = data.about;
        if(data) {
            this.setAvatar(data);
          }  
    }
    setAvatar(data) {
        if(data.avatar) {
            this._avatar.src = data.avatar;
          }
        console.log('!!!')
        console.log(data)
        console.log('!!!')
    }
}