import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service, ProductionService } from "./service";
import { Base64Helper } from '../../../utils/base-64-coded-helper';

@inject(Router, Service, ProductionService)
export class View {
  hasCancel = true;
  hasEdit = true;
  hasDelete = true;

  constructor(router, service, productionService) {
    this.router = router;
    this.service = service;
    this.productionService = productionService;
  }
  async activate(params) {
    var id = params.id;
    let decoded = Base64Helper.decode(id);
    id = decoded;
    this.data = await this.service.getById(id);
    this.dataUnitDO = await this.service.getUnitDOId(this.data.UnitDOId);
    this.data.RoJob = this.dataUnitDO.RONo;
    this.unitDeliveryOrder = { UnitDONo: this.data.UnitDONo };
    this.data.Storage.toString = function () {
      return [this.code, this.name]
        .filter((item, index) => {
          return item && item.toString().trim().length > 0;
        })
        .join(" - ");
    };

    this.data.StorageRequest.toString = function () {
      return [this.code, this.name]
        .filter((item, index) => {
          return item && item.toString().trim().length > 0;
        })
        .join(" - ");
    };

    this.data.UnitRequest.toString = function () {
      return [this.Code, this.Name]
        .filter((item, index) => {
          return item && item.toString().trim().length > 0;
        })
        .join(" - ");
    };

    this.data.UnitSender.toString = function () {
      return [this.Code, this.Name]
        .filter((item, index) => {
          return item && item.toString().trim().length > 0;
        })
        .join(" - ");
    };

    if (this.data.Items) {
      for (let item of this.data.Items) {
        item.IsSave = true;
      }
    }
    if (this.data.ExpenditureType === "EXTERNAL") {
      // if (this.data.ExpenditureTo != "PENJUALAN") {
      //   this.hasDelete = false;
      // }
      console.log(this.data.DOQuantity);
          console.log(this.data.IsDeletedCount);
      if (this.data.ExpenditureTo == "PENJUALAN") {
        this.hasDelete = true;
      }else if (this.data.ExpenditureTo == "PEMBELIAN")
      {
        // if(this.data.IsDeletedCount > 0 ){
        //   this.hasDelete = false;
        // }else 
          
          if (this.data.IsDeletedCount == 0 && this.data.DOQuantity > 0){

          
          this.hasDelete = false;
        }else{
          this.hasDelete = true;
        }
      }
      this.hasEdit = false;
    }

    // if(this.data.ExpenditureType === "PROSES"){
    //   const result = await this.productionService.getPreparingById(this.data.Id);

    //   let allValid = false;

    //   if (result && result[0].Items && result[0].Items.length > 0) {
    //     allValid = true;

    //     for (const item of result[0].Items) {
    //       if (item.RemainingQuantity !== item.Quantity) {
    //         allValid = false;
    //         break;
    //       }
    //     }
    //   }

    //   this.hasEdit = allValid;
    //   this.hasDelete = allValid;
    // }

    if (this.data.ExpenditureType === "PROSES") {
      const result = await this.productionService.getPreparingById(this.data.Id);

      console.log("getPreparingById result:", result);

      let allValid = false;

      if (
        result &&
        result.length > 0 &&
        result[0] &&
        result[0].Items &&
        result[0].Items.length > 0
      ) {
        allValid = true;

        for (const item of result[0].Items) {
          if (item.RemainingQuantity !== item.Quantity) {
            allValid = false;
            break;
          }
        }
      }

      this.hasEdit = allValid;
      this.hasDelete = allValid;
    }

    // if (this.data.IsPreparing) {
    //   this.hasDelete = false;
    //   this.hasEdit = false;
    // }

    if (this.data.IsTransfered) {
      this.hasEdit = false;
      this.hasDelete = false;
    } else if (
      !this.data.IsTransfered &&
      this.data.ExpenditureType === "TRANSFER"
    ) {
      var uen = await this.service.getUENById(this.data.Id);
      if (!uen.IsPreparing) {
        this.hasEdit = false;
        this.hasDelete = true;
      } else {
        this.hasEdit = false;
        this.hasDelete = false;
      }
    }

    if (this.data.ExpenditureType === "TRANSFER") {
      let unitDOResult = await this.service.searchUnitDO({
        size: 1,
        filter: JSON.stringify({ UENFromId: this.data.Id }),
      });
      let unitDO = unitDOResult.data[0];
      if (unitDO) {
        let DRResult = await this.productionService.getGarmentDR({
          size: 1,
          filter: JSON.stringify({ UnitDOId: unitDO.Id }),
        });
        let DR = DRResult.data[0];
        if (DR) {
          this.hasEdit = false;
          this.hasDelete = false;
        }
      }
    }

    if (this.data.ExpenditureType === "TRANSFER SUBCON") {
      let unitDOResult = await this.service.searchUnitDO({
        size: 1,
        filter: JSON.stringify({ UENFromId: this.data.Id }),
      });
      let unitDO = unitDOResult.data[0];
      if (unitDO) {
        let UENResult = await this.service.search({
          size: 1,
          filter: JSON.stringify({ UnitDOId: unitDO.Id }),
        });

        let UEN = UENResult.data[0];
        if (UEN) {
          if (UEN.IsPreparing) {
            this.hasEdit = false;
            this.hasDelete = false;
          }
        }
      }
    }

    if (this.data.IsReceived) {
      this.hasEdit = false;
      this.hasDelete = false;
    }
  }

  cancel(event) {
    var r = confirm("Apakah anda yakin akan keluar?");
    if (r == true) {
      this.router.navigateToRoute("list");
    }
  }

  edit(event) {
    const encoded = Base64Helper.encode(this.data.Id);
    var r = confirm("Apakah anda yakin akan mengubah data ini?");
    if (r == true) {
      this.router.navigateToRoute("edit", { id: encoded });
    }
  }

  delete(event) {
    var r = confirm("Apakah anda yakin akan menghapus data ini?");
    if (r == true) {
      this.service.delete(this.data).then((result) => {
        this.cancel();
      });
    }
  }
}
