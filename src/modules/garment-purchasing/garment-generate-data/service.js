import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUriInternNote = 'generate-data/garment-intern-note';
const serviceUriCorrectionNote = 'generate-data/garment-correction-note';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    generateInternNote(dateFrom, dateTo) {
        var endpoint;
        if (dateFrom && dateTo) {
            endpoint = `${serviceUriInternNote}/download?dateFrom=${dateFrom}&dateTo=${dateTo}`;
        } else {
            endpoint = `${serviceUriInternNote}`;
        }
        return super.getXls(endpoint);
    }

    generateCorrectionNote(dateFrom, dateTo) {
        var endpoint;
        if (dateFrom && dateTo) {
            endpoint = `${serviceUriCorrectionNote}/download?dateFrom=${dateFrom}&dateTo=${dateTo}`;
        } else {
            endpoint = `${serviceUriCorrectionNote}`;
        }
        return super.getXls(endpoint);
    }

    exportData(dateFrom, dateTo) {
        return new Promise((resolve, reject) => {
            var tasks = [];
            tasks.push(this.generateInternNote(dateFrom, dateTo));
            tasks.push(this.generateCorrectionNote(dateFrom, dateTo));

            Promise.all(tasks)
                .then(result => {
                    resolve(true);
                })
                .catch(e => {
                    reject(e);
                })
        });
    }

}
