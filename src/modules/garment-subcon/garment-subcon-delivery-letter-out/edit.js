import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service, PurchasingService } from "./service";

@inject(Router, Service, PurchasingService)
export class View {
  constructor(router, service, purchasingService) {
    this.router = router;
    this.service = service;
    this.purchasingService = purchasingService;
  }
  isEdit = true;
  async activate(params) {
    let id = params.id;
    this.data = await this.service.read(id);

    if (this.data) {
      this.selectedDLType = this.data.DLType;
      this.selectedContract = {
        ContractNo: this.data.ContractNo,
        Id: this.data.SubconContractId,
      };

      this.selectedContractType = this.data.ContractType;
      this.selectedSubconCategory = this.data.SubconCategory;
    }
    this.getContractQty();
    await this.GetUEN();
  }

  async getContractQty() {
    var subconContract = await this.service.readSubconContractById(
      this.data.SubconContractId
    );
    if (
      this.data.SubconCategory == "SUBCON SEWING" ||
      this.data.ContractType == "SUBCON JASA" ||
      this.data.ContractType == "SUBCON BAHAN BAKU"
    ) {
      this.service
        .searchComplete({
          filter: JSON.stringify({ ContractNo: this.data.ContractNo }),
        })
        .then((contract) => {
          console.log(contract);
          var usedQty = 0;
          if (contract.data.length > 0) {
            for (var subcon of contract.data) {
              if (subcon.Id != this.data.Id) {
                for (var subconItem of subcon.Items) {
                  usedQty += subconItem.Quantity;
                }
              } else {
                this.data.savedItems = subcon.Items;
              }
            }
          }
          this.data.QtyUsed = usedQty;
        });
    }
    this.data.ContractQty = subconContract.Quantity;
  }

  async GetUEN() {
    if (
      (this.data.SubconCategory == "SUBCON JASA KOMPONEN" ||
        this.data.SubconCategory == "SUBCON SEWING") &&
      this.data.Items[0].Details != null
    ) {
      this.purchasingService
        .getUENById(this.data.Items[0].Details[0].UENId)
        .then((uen) => {
          this.purchasingService
            .getUnitDeliveryOrderById(uen.UnitDOId)
            .then((deliveryOrder) => {
              this.service
                .searchComplete({
                  filter: JSON.stringify({ ContractNo: this.data.ContractNo }),
                })
                .then((contract) => {
                  var usedQty = 0;
                  if (contract.data.length > 0) {
                    for (var subcon of contract.data) {
                      if (subcon.Id != this.data.Id) {
                        for (var subconItem of subcon.Items) {
                          usedQty += subconItem.Quantity;
                        }
                      } else {
                        this.data.savedItems = subcon.Items;
                      }
                    }
                  }
                  this.data.QtyUsed = usedQty;
                  if (deliveryOrder) {
                    var newDetails = [];

                    for (var uenItem of uen.Items) {
                      var detail = {};
                      detail.UENItemId = uenItem._id || uenItem.Id;
                      if (this.data.savedItems) {
                        var qty = this.data.savedItems[0].Details.find(
                          (a) => a.UENItemId == uenItem.Id
                        );

                        if (qty) {
                          detail.Id = qty.Id;
                          detail.Quantity = qty.Quantity;
                        }
                      }
                      //detail.UENItemId=uenItem.Id;
                      detail.Product = {
                        Name: uenItem.ProductName,
                        Code: uenItem.ProductCode,
                        Id: uenItem.ProductId,
                      };
                      detail.Uom = {
                        Id: uenItem.UomId,
                        Unit: uenItem.UomUnit,
                      };

                      if (uenItem.ProductName == "FABRIC") {
                        detail.UomOut = {
                          Id: 43,
                          Unit: "PCS",
                        };
                      } else {
                        detail.UomOut = {
                          Id: uenItem.UomId,
                          Unit: uenItem.UomUnit,
                        };
                      }

                      detail.ProductRemark = uenItem.ProductRemark;
                      var doItem = deliveryOrder.Items.find(
                        (a) => a._id == uenItem.UnitDOItemId
                      );

                      if (doItem) {
                        detail.DesignColor = doItem.DesignColor;
                      }
                      detail.FabricType = uenItem.FabricType;
                      detail.ContractQuantity = uenItem.Quantity;
                      detail.UENNo = uen.UENNo;
                      detail.UENId = uen.Id;

                      newDetails.push(detail);
                    }

                    this.data.Items[0].Details = newDetails;
                  }
                });
            });
        });
    }
  }

  bind() {
    this.error = {};
    this.checkedAll = true;
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { id: this.data.Id });
  }

  saveCallback(event) {
    if (this.data.SubconCategory == "SUBCON CUTTING SEWING")
      this.data.UsedQty = this.data.ContractQty - this.data.QtyUsed;
    else {
      this.data.UENId = 0;
      //this.data.UsedQty=this.data.ContractQty;
      if (this.data.Items.length > 0) {
        this.data.UsedQty = this.data.ContractQty - this.data.QtyUsed;
        for (var item of this.data.Items) {
          item.Product = {
            Id: 0,
          };
          item.Uom = {
            Id: 0,
          };
          item.UomOut = {
            Id: 0,
          };
        }
      }
    }
    this.service
      .update(this.data)
      .then((result) => {
        this.cancelCallback();
      })
      .catch((e) => {
        this.error = e;
        if (typeof this.error == "string") {
          alert(this.error);
        } else {
          alert("Missing Some Data");
        }
      });
  }
}
