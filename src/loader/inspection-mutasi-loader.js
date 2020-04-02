import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

module.exports = function(keyword, filter) {
    var data = [
        {"MutasiText":"Awal","MutasiValue":"Awal"},
        {"MutasiText":"Masuk","MutasiValue":"Masuk"},
        {"MutasiText":"Keluar","MutasiValue":"Keluar"}
    ]
    return Promise.resolve().then(result => {return data;});
}
