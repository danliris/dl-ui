import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {
  // context = ["detail"];
  columns = [
    { field: "Code", title: "Kode" },
    { field: "Name", title: "Nama" },
    { field: "Nature", title: "Nature" },
    { field: "ReportType", title: "Report Type" }
  ];

  headerData;
  data = [];
  items = [];
  async bind() {

    var arg = {
      size: Number.MAX_SAFE_INTEGER,
    }
    let headerDataPromise = this.service.searchHeader(arg)
      .then(result => {
        return result;
      });

    var ledgerArg = {
      size: Number.MAX_SAFE_INTEGER,
      order: {
        Code: "asc"
      }
    }
    let ledgerDataPromise = this.service.searchAll(ledgerArg)
      .then(result => {
        return result.data;
      });

    let searchResult = await Promise.all([headerDataPromise, ledgerDataPromise]);

    // console.log(searchResult);

    let headerData = searchResult[0];
    let ledgerData = searchResult[1];

    let items = [];
    for (let header of headerData) {
      let splittedHeaderCodes = header.Code.split("");

      if (splittedHeaderCodes.length > 1) {
        let itemIndex = items.findIndex((item) => item.code == splittedHeaderCodes[0]);
        let subHeader = {
          name: header.Name,
          code: header.Code,
          ledgers: ledgerData.filter((ledger) => {
            let splittedLedgerCode = ledger.Code.split(".");
            let subHeaderCode = splittedLedgerCode[0].slice(0, 2);

            return header.Code == subHeaderCode;
          })
        }
        items[itemIndex].subHeaders.push(subHeader);

      } else {
        let item = {
          name: header.Name,
          code: header.Code,
          subHeaders: []
        }
        items.push(item);
      }
    }

    this.items = items;
  }

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    }

    return this.service.searchAll(arg)
      .then(result => {
        return {
          total: result.info.total,
          data: result.data
        }
      });
  }

  constructor(router, service) {
    this.service = service;
    this.router = router;
    this.buyerId = "";
    this.buyers = [];
  }

  contextCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "detail":
        this.router.navigateToRoute('view', { id: data._id });
        break;
    }
  }

  create() {
    // this.router.navigateToRoute('create');
  }

  upload() {
    this.router.navigateToRoute('upload');
  }

  download() {
    var endpoint = 'master/chart-of-accounts/download';
    var request = {
      method: 'GET'
    };

    var getRequest = this.service.endpoint.client.fetch(endpoint, request);
    this.service._downloadFile(getRequest);
    this.service.publish(getRequest);
  }

  // closeOthers = true;

  deleteItem() {
    alert('Deleting item');
  }

  delete(id) {
    console.log(id);
  }

  // items = [{
  //   header: "Header 1",
  //   headerCode: "01",
  //   subHeaders: [{
  //     subHeader: "SubHeader",
  //     ledgers: [{
  //       code: "code",
  //       name: "name"
  //     }, {
  //       code: "code",
  //       name: "name"
  //     }, {
  //       code: "code",
  //       name: "name"
  //     }]
  //   }, {
  //     subHeader: "SubHeader",
  //     ledgers: [{
  //       code: "code",
  //       name: "name"
  //     }, {
  //       code: "code",
  //       name: "name"
  //     }, {
  //       code: "code",
  //       name: "name"
  //     }]
  //   }]
  // }, {
  //   header: "Header 2",
  //   headerCode: "02",
  //   subHeaders: [{
  //     subHeader: "SubHeader",
  //     ledgers: [{
  //       code: "code",
  //       name: "name"
  //     }, {
  //       code: "code",
  //       name: "name"
  //     }, {
  //       code: "code",
  //       name: "name"
  //     }]
  //   }, {
  //     subHeader: "SubHeader",
  //     ledgers: [{
  //       code: "code",
  //       name: "name"
  //     }, {
  //       code: "code",
  //       name: "name"
  //     }, {
  //       code: "code",
  //       name: "name"
  //     }]
  //   }]
  // }, {
  //   header: "Header 3",
  //   headerCode: "03",
  //   subHeaders: [{
  //     subHeader: "SubHeader",
  //     ledgers: [{
  //       code: "code",
  //       name: "name"
  //     }, {
  //       code: "code",
  //       name: "name"
  //     }, {
  //       code: "code",
  //       name: "name"
  //     }]
  //   }, {
  //     subHeader: "SubHeader",
  //     ledgers: [{
  //       code: "code",
  //       name: "name"
  //     }, {
  //       code: "code",
  //       name: "name"
  //     }, {
  //       code: "code",
  //       name: "name"
  //     }]
  //   }]
  // }]

}
