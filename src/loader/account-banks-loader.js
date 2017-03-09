import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'master/account-banks';

module.exports = function(keyword, filter) {

    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("core");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
        .then(results => {
            return results.data.map(bank => {
                bank.toString = function () {
                    return [this.accountName, this.bankName,this.accountNumber,this.currency.code]
                        .filter((item, index) => {
                            return item && item.toString().trim().length > 0;
                        }).join(" - ");
                }
                return bank;
            })
        });
}