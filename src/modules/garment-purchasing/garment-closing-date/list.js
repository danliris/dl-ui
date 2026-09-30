import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

  maxId = null;

  columns = [
    {
      field: "CloseDate",
      title: "Close Date",
      formatter: (value, data) => {
        return moment(value).format("DD-MMM-YYYY");
      },
      sortable: false
    },
    {
      field: "Action",
      title: "Action",
      width: "500px",
      formatter: (value, data) => {

        if (data.Id !== this.maxId) {
          return "";
        }

        return `
          <button
            type="button"
            class="btn btn-danger btn-sm btn-cancel"
            data-id="${data.Id}">
            Cancel Close Date
          </button>
        `;
      },
      sortable: false
    }
  ];

  constructor(router, service) {
    this.service = service;
    this.router = router;
    this.cancelClickHandler = null;
  }

  loader = (info) => {
    const order = {};
    if (info.sort) {
      order[info.sort] = info.order;
    }

    const listArg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      select: ['Unit'],
      order: order
    };
    const maxIdArg = {
      page: 1,
      size: 1,
      order: {
        Id: "desc"
      }
    };

    return Promise.all([
      this.service.search(listArg),
      this.service.search(maxIdArg)
    ])
      .then(([listResult, maxIdResult]) => {
        if (
          maxIdResult &&
          maxIdResult.data &&
          maxIdResult.data.length > 0
        ) {
          this.maxId = maxIdResult.data[0].Id;
        } else {
          this.maxId = null;
        }
        const allData = listResult.data || [];

        const activeData = allData.filter(item =>
          item.IsDeleted === false
        );

        return {
          total: activeData.length,
          data: activeData
        };
      })
      .catch(error => {
        this.maxId = null;

        return {
          total: 0,
          data: []
        };
      });
  };

  attached() {

    this.cancelClickHandler = (event) => {
      if (!event.target || !event.target.closest) {
        return;
      }
      const button = event.target.closest(".btn-cancel");
      if (!button) {
        return;
      }

      const id = parseInt(
        button.getAttribute("data-id"),
        10
      );

      if (isNaN(id)) {
        return;
      }

      if (id !== this.maxId) {
        return;
      }

      const isConfirmed = window.confirm(
        "Apakah Anda yakin ingin membatalkan data ini?"
      );

      if (!isConfirmed) {
        return;
      }

      this.cancel(id);
    };

    document.addEventListener(
      "click",
      this.cancelClickHandler
    );
  }

  detached() {

    if (this.cancelClickHandler) {

      document.removeEventListener(
        "click",
        this.cancelClickHandler
      );

      this.cancelClickHandler = null;
    }
  }

  cancel(id) {
  return this.service.cancel(id)
    .then(result => {
      if (this.table && typeof this.table.refresh === "function") {
        return this.table.refresh();
      }
    })
    .catch(error => {
    });
}

  create() {
    this.router.navigateToRoute('create');
  }
}