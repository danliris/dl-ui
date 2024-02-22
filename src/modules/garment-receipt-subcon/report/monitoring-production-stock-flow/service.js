
import { RestService } from '../../../../utils/rest-service';


const serviceUri = "monitoringFlowSubconProduction";
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        var endpoint = `${serviceUri}/stocks`;
        var query = '';

        if (info.dateFrom && info.dateFrom !== "") {
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;
        }
        if (info.dateTo && info.dateTo !== "") {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }
        
        if (info.unit && info.unit !== "") {
            if (query === '') query = `unit=${info.unit}`;
            else query = `${query}&unit=${info.unit}`;
        } else
        {
            query = `${query}&unit=0`;
        }

        if (info.ro && info.ro !== "") {
            if (query === '') query = `ro=${info.ro}`;
            else query = `${query}&ro=${info.ro}`;
        }
        if (query !== '')
        endpoint = `${serviceUri}/stocks?${query}`;
        console.log(endpoint);
        return super.get(endpoint);

    }

    generateExcel(info) {
        var endpoint = `${serviceUri}/stocksdownload?unit=${info.unit}&date=${info.date}`;
        var query = '';
        
        if (info.dateFrom && info.dateFrom !== "") {
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;
        }
        if (info.dateTo && info.dateTo !== "") {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }
        if (info.unit && info.unit !== "") {
            if (query === '') query = `unit=${info.unit}`;
            else query = `${query}&unit=${info.unit}`;
        } else
        {
            query = `${query}&unit=0`;
        }
        if (info.ro && info.ro !== "") {
            if (query === '') query = `ro=${info.ro}`;
            else query = `${query}&ro=${info.ro}`;
        }
        if (query !== '')
        endpoint = `${serviceUri}/stocksdownload?${query}`;

    return super.getXls(endpoint);
    }
    generateExcelMII(info) {
        var endpoint = `${serviceUri}/stocksdownloadMII?unit=${info.unit}&date=${info.date}`;
        console.log(endpoint);
        var query = '';
        
        if (info.dateFrom && info.dateFrom !== "") {
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;
        }
        if (info.dateTo && info.dateTo !== "") {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }
        if (info.unit && info.unit !== "") {
            if (query === '') query = `unit=${info.unit}`;
            else query = `${query}&unit=${info.unit}`;
        } else
        {
            query = `${query}&unit=0`;
        }
        if (info.ro && info.ro !== "") {
            if (query === '') query = `ro=${info.ro}`;
            else query = `${query}&ro=${info.ro}`;
        }
        if (query !== '')
        endpoint = `${serviceUri}/stocksdownloadMII?${query}`;

    return super.getXls(endpoint);
    }
}
