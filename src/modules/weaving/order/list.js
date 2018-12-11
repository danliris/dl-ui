import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
// import moment from 'moment';

@inject(Router, Service)
export class List{
    context = ["detail", "edit"];

    columns = [
        { field: "", title: "No SOP" },
        {
            field: "", title: "Tanggal SOP", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "", title: "Unit" },
        { field: "", title: "Mesin" },
        { field: "", title: "Konstruksi" },
        { field: "", title: "Blended (%)" }

    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
          order[info.sort] = info.order;
    
        var arg = {
          page: parseInt(info.offset / info.limit, 10) + 1,
          size: info.limit,
          keyword: info.search,
          select: ["", "", "", "", "", ""],
          order: order
        }

        return {
            total: result.info.total,
            data: []
          }
    
        // return this.service.search(arg)
        //   .then(result => {
        //     return {
        //       total: result.info.total,
        //       data: result.data
        //     }
        //     // .catch(error=>{
        //     //     console.log(error);
        //     // })
        //   });
      }

      constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data._id });
                break;
            case "edit":
                this.router.navigateToRoute('edit', {id: data._id});
                break;
        }
      }
    
      create() {
        this.router.navigateToRoute('create');
      }
}