import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";

var UnitLoader = require("../../../../loader/unit-loader");

@inject(Router, Service)
export class List {
  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 5,
    },
  };

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.isEmpty = true;
    this.data = [];

    this.report = {
      unit: "Spinning 1",
      items: [
        {
          title: "OPERATING ACTIVITIES",
          cashIn: [
            {
              title: "Penjualan Export",
              currencies: [
                { code: "SGD", nominalValas: 1, nominalIDR: 100, actual: 111 },
                { code: "USD", nominalValas: 2, nominalIDR: 200, actual: 111 },
                { code: "EUR", nominalValas: 3, nominalIDR: 300, actual: 111 },
              ],
              span() {
                return this.currencies.length;
              },
            },
            {
              title: "Penjualan Lokal",
              currencies: [
                { code: "USD", nominalValas: 4, nominalIDR: 400, actual: 111 },
                { code: "EUR", nominalValas: 5, nominalIDR: 500, actual: 111 },
              ],
              span() {
                return this.currencies.length;
              },
            },
            {
              title: "Penjualan Tunai",
              currencies: [
                { code: "USD", nominalValas: 4, nominalIDR: 400, actual: 111 },
              ],
              span() {
                return this.currencies.length;
              },
            },
            {
              title: "Penjualan Intern (Antar Divisi)",
              currencies: [
                { code: "USD", nominalValas: 4, nominalIDR: 400, actual: 111 },
              ],
              span() {
                return this.currencies.length;
              },
            },
            {
              title: "Penjualan Intern (Antar Unit Satu Divisi)",
              currencies: [
                { code: "USD", nominalValas: 4, nominalIDR: 400, actual: 111 },
              ],
              span() {
                return this.currencies.length;
              },
            },
            {
              title: "PPN Masukan Intern (Perhitungan)",
              currencies: [
                { code: "USD", nominalValas: 4, nominalIDR: 400, actual: 111 },
              ],
              span() {
                return this.currencies.length;
              },
            },
            {
              title: "Penjualan Lain-lain",
              currencies: [
                { code: "USD", nominalValas: 4, nominalIDR: 400, actual: 111 },
              ],
              span() {
                return this.currencies.length;
              },
            },
            {
              title: "PPN Masukan Extern (Pembelian Lokal)",
              currencies: [
                { code: "USD", nominalValas: 4, nominalIDR: 400, actual: 111 },
              ],
              span() {
                return this.currencies.length;
              },
            },
            {
              title: "Total",
              currencies: [
                { code: "USD", nominalValas: 4, nominalIDR: 400, actual: 111 },
              ],
              span() {
                return this.currencies.length;
              },
            },
          ],
          cashOut: [
            {
              title: "Bahan Baku Import",
              currencies: [
                { code: "USD", nominalValas: 4, nominalIDR: 400, actual: 111 },
              ],
              span() {
                return this.currencies.length;
              },
            },
          ],
        },
        {
          title: "INVESTING ACTIVITIES",
          cashIn: [],
          cashOut: [],
        },
        {
          title: "FINANCING ACTIVITIES",
          cashIn: [],
          cashOut: [],
        },
      ],
    };
  }

  // Unit loader
  get unitLoader() {
    return UnitLoader;
  }

  async search() {
    alert("ok");
  }

  reset() {
    this.isEmpty = true;
    this.data = [];
    this.unit = null;
    this.dateTo = null;
  }
}
