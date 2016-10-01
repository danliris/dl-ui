import {Session} from './session';
import {RestService} from '../rest-service';

const authUri = require('../host').auth + '/v1/authenticate';
const meUri = require('../host').auth + '/v1/me';

export class AuthService extends RestService {
    constructor(http, aggregator) {
        super(http, aggregator);
    }

    authenticate(username, password) {
        var endpoint = `${authUri}`;
        var header = {
            "Content-Type": "multipart/form-data"
        }
        return super.post(endpoint, { username: username, password: password });
    }

    me(token) {
        var endpoint = `${meUri}`;
        var header = {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": `JWT ${token}`
        }
        return super.get(endpoint, header);
    }
}