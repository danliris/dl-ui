import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'article-colors';

module.exports = function(keyword, filter) {
    let config = Container.instance.get(Config);
    let endpoint = config.getEndpoint("merchandiser");

    return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
        .then(results => {
            return results.data
        });
}