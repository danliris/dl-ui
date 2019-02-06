import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  onViewEdit = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  async activate(params) {
    var id = params.id;
    // this.data = await this.service.getById(id).then(()=>{
    //   if (this.data) {
    //     //Mapping API Properties vs Form Properties
    //     this.constructionNumber = this.data.constructionNumber;
    //     this.materialTypeDocument = this.data.materialType.name;
    //     this.wovenType = this.data.wovenType;
    //     this.warpTypeForm = this.data.warpType;
    //     this.weftTypeForm = this.data.weftType;
    //     this.totalYarn = this.data.totalYarn;

    //     console.log(this.data.warps);
    //     this.ItemsWarp = [];
    //     for(var warp of this.data.warps){
    //       var warpData = await this.service.getYarnById(warp.yarn.id);
    //       this.ItemsWarp.push(warpData);
    //     }
    //     // this.data.warps.forEach(function(element) {
    //     //   console.log(element);
    //     //   var warpData = await this.service.getYarnById(element.yarn.id);
    //     //   this.ItemsWarp.push(warpData);
    //     // });
    //   }
    // });

    this.data = await this.service.getById(id);
    console.log(this.data);
    // if (this.data) {
    //   //Mapping API Properties vs Form Properties
    //   this.constructionNumber = this.data.constructionNumber;
    //   //Di Swagger materialType bukan materialTypeId
    //   this.materialTypeDocument = this.data.materialTypeId.name;
    //   this.wovenType = this.data.wovenType;
    //   this.warpTypeForm = this.data.warpType;
    //   this.weftTypeForm = this.data.weftType;
    //   this.totalYarn = this.data.totalYarn;

    //   this.data.ItemsWarp = [];
    //   for (var warp of this.data.warps) {
    //     var warpData = await this.service.getYarnById(warp.yarn.id);
    //     // this.warpType = this.warpData.name;
    //     // this.data.quantity = this.warpData.quantity;
    //     // this.data.information = this.warpData.information;
    //     this.data.ItemsWarp.push(warpData);
    //     console.log(warpData);
    //   }

    //   this.data.ItemsWeft = [];
    //   for (var weft of this.data.wefts) {
    //     var weftData = await this.service.getYarnById(weft.yarn.id);
    //     this.data.ItemsWeft.push(weftData);
    //     console.log(weftData);
    //   }
    //   // this.data.warps.forEach(function(element) {
    //   //   console.log(element);
    //   //   var warpData = await this.service.getYarnById(element.yarn.id);
    //   //   this.ItemsWarp.push(warpData);
    //   // });
    // }

    // this.data = await this.service.getById(id);

    // this.data.ItemsWarp = [];
    // for (var warp of this.data.warps) {
    //   var warpData = await this.service.getYarnById(warp.yarn.id);
    //   this.data.ItemsWarp.push(warpData);
    // }

    // console.log(this.ItemsWarp);

    // console.log(this.data);
    // debugger;
  }

  //Dipanggil ketika tombol "Kembali" ditekan
  list() {
    this.router.navigateToRoute("list");
  }

  //Tombol "Kembali", panggil list()
  cancelCallback(event) {
    this.list();
  }

  //Tombol "Ubah", routing ke 'edit'
  editCallback(event) {
    this.router.navigateToRoute("edit", { id: this.data.id });
  }

  //Tombol "Hapus", hapus this.data, redirect ke list
  deleteCallback(event) {
    this.service.delete(this.data).then(result => {
      this.list();
    });
  }
}
