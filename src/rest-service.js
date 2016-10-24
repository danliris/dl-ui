import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator)
export class RestService {

    constructor(HttpClient, EventAggregator) {
        this.http = HttpClient;
        this.http.configure(config => {
            config
                .withDefaults({
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json; charset=UTF-0"
                    }
                })
                .withInterceptor({
                    request(request) {
                        // console.log(`Requesting ${request.method} ${request.url}`);
                        return request; // you can return a modified Request, or you can short-circuit the request by returning a Response
                    },
                    requestError(e) {
                        console.log(e);
                    },
                    response(response) {
                        // console.log(`Received ${response.status} ${response.url}`);
                        // if (response.headers.get("Content-Type") == "application/json") {
                        //     var init = { status: response.status, statusText: response.statusText, headers: response.headers };
                        //     var data = data;
                        //     var r = new Response(data, init);
                        // }
                        return response; // you can return a modified Response
                    },
                    responseError(e) {
                        console.log(e);
                    }
                });
        });

        this.eventAggregator = EventAggregator;
    }

    publish(promise) {
        this.eventAggregator.publish('httpRequest', promise);
    }

    parseResult(result) {
        return new Promise((resolve, reject) => {
            if (result.error)
                reject(result.error);
            else {
                resolve(result.data)
            }
        });
    }

    list(endpoint, info, header) {

        var params = [];
        // if (!info.keyword)
        //     delete info.keyword;

        for (var key in info) { 
            if(info[key])
                params.push(`${encodeURIComponent(key)}=${encodeURIComponent(info[key])}`)
        } 

        var request = {
            method: 'GET',
            headers: new Headers(Object.assign({}, this.header, header))
        };

        var getRequest = this.http.fetch(`${endpoint}?${params.join("&")}`, request);
        this.publish(getRequest);
        return getRequest
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.publish(getRequest);
                return result;
            });
    }

    get(endpoint, header) {
        var request = {
            method: 'GET',
            headers: new Headers(Object.assign({}, this.header, header))
        };
        var getRequest = this.http.fetch(endpoint, request)
        this.publish(getRequest);
        return getRequest
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.publish(getRequest);
                return this.parseResult(result);
            });

    }

    getXls(endpoint, header) {
        var request = {
            method: 'GET',
            headers: new Headers(Object.assign({}, this.header, header, { "Accept": "application/xls" }))
        };
        var getRequest = this.http.fetch(endpoint, request)
        this.publish(getRequest);

        return this._downloadFile(getRequest);
    }

    getPdf(endpoint, header) {
        var request = {
            method: 'GET',
            headers: new Headers(Object.assign({}, this.header, header, { "Accept": "application/pdf" }))
        };
        var getRequest = this.http.fetch(endpoint, request)
        this.publish(getRequest);
        return this._downloadFile(getRequest);

    }

    _downloadFile(request) {
        return request
            .then(response => {
                if (response.status == 200)
                    return Promise.resolve(response);
                else
                    return Promise.reject(new Error('Error downloading file'));
            })
            .then(response => {
                return new Promise((resolve, reject) => {
                    response.blob()
                        .then(blob => {
                            var filename = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(response.headers.get("Content-Disposition"))[1];
                            filename = filename.replace(/"/g, '');
                            var fileSaver = require('file-saver');
                            fileSaver.saveAs(blob, filename);
                            this.publish(request);
                            resolve(true);
                        })
                        .catch(e => reject(e));
                })
            });
    }

    post(endpoint, data, header) {
        var request = {
            method: 'POST',
            headers: new Headers(Object.assign({}, this.header, header)),
            body: JSON.stringify(data)
        };
        var postRequest = this.http.fetch(endpoint, request);
        this.publish(postRequest);
        return postRequest
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.publish(postRequest);
                return this.parseResult(result);
            });
    }

    put(endpoint, data, header) {
        var request = {
            method: 'PUT',
            headers: new Headers(Object.assign({}, this.header, header)),
            body: JSON.stringify(data)
        };

        var putRequest = this.http.fetch(endpoint, request)
        this.publish(putRequest);
        return putRequest
            .then(response => {
                if (response.status != 204)
                    return response.json();
                else
                    return new Promise((resolve, reject) => {
                        resolve({});
                    });
            })
            .then(result => {
                this.publish(putRequest);
                return this.parseResult(result);
            });
    }

    delete(endpoint, data, header) {
        var request = {
            method: 'DELETE',
            headers: new Headers(Object.assign({}, this.header, header)),
            body: JSON.stringify(data)
        };
        var deleteRequest = this.http.fetch(endpoint, request)
        this.publish(deleteRequest);
        return deleteRequest
            .then(response => {
                if (response.status != 204)
                    return response.json();
                else
                    return new Promise((resolve, reject) => {
                        resolve({});
                    });
            })
            .then(result => {
                this.publish(deleteRequest);
                return this.parseResult(result);
            });
    }
}