import {Cookie} from 'aurelia-cookie';

export class Session {
    cookieOption = {
        expiry: 8, // Expiry in hours, -1 for never expires or minimum 1 for one hour, 2 for two hours and so
        path: '', // Specify cookie path
        domain: '', // Domain restricted cookie
        secure: false // Either true or false
    };

    get token() {
        if (!Cookie.get('__jwt'))
            Cookie.set('__jwt', JSON.stringify({}), this.cookieOption);
        var json = Cookie.get('__jwt');
        return JSON.parse(json);
    }
    set token(value) {
        Cookie.set('__jwt', JSON.stringify(value), this.cookieOption);
    }

    get data() {
        if (!Cookie.get('__user'))
            Cookie.set('__user', JSON.stringify({}), this.cookieOption);
        var json = Cookie.get('__user');
        return JSON.parse(json);
    }
    set data(value) {
        Cookie.set('__user', JSON.stringify(value), this.cookieOption);
    }

    get isAuthenticated() {
        return (this.data.username || '').toString().length > 0;
    }

    get username() {
        return (this.data.username || '').toString();
    }
    set username(value) {
        var data = this.data;
        data.username = value;
        this.data = data;
    }
    get profile() {
        return this.data.profile || {};
    }
    set profile(value) {
        var data = this.data;
        data.profile = value;
        this.data = data;
    }
    get roles() {
        return this.data.roles || [];
    }
    set roles(value) {
        var data = this.data;
        data.roles = value;
        this.data = data;
    }

    remove() {
        Cookie.delete('__jwt'); // Delete a cookie by name
        Cookie.delete('__user'); // Delete a cookie by name
    }
} 