import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  ePNumberVisibility = true;
  searchButton = true;
  // readOnly = true;
  createOnly = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  async activate(params) {
    var Id = params.Id;
    var dataResult;
    this.data = await this.service
      .getById(Id)
      .then(result => {
        dataResult = result;
        return this.service.getUnitById(result.Unit);
      })
      .then(unit => {
        dataResult.Unit = unit;
        return dataResult;
      });
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { Id: this.data.Id });
  }

  saveCallback(event) {
    var summedUpGradeAlert =
      "- Jumlah Seluruh Grade Tidak Boleh Lebih Dari 100\n- Jumlah Seluruh Grade Tidak Boleh Kurang Dari 100\n- Jumlah Seluruh Grade Harus Tepat 100";
    var emptyGrade =
      "- GradeA Perintah Produksi Harus Diisi\n- GradeB Perintah Produksi Harus Diisi\n- GradeC Perintah Produksi Harus Diisi";
    var orderProductionsDocumentError = [];
    var summedUpGrade = 0;

    this.data.EstimationProducts.forEach(datum => {
      var errorEmptyIndex = 0;
      var errorCollection = {};
      if (
        datum.GradeA == undefined ||
        datum.GradeA == null ||
        datum.GradeA == "" ||
        datum.GradeA == 0
      ) {
        errorEmptyIndex++;
        errorCollection.GradeA = "Grade A Harus Diisi";
      }
      if (
        datum.GradeB == undefined ||
        datum.GradeB == null ||
        datum.GradeB == "" ||
        datum.GradeB == 0
      ) {
        errorEmptyIndex++;
        errorCollection.GradeB = "Grade B Harus Diisi";
      }
      if (
        datum.GradeC == undefined ||
        datum.GradeC == null ||
        datum.GradeC == "" ||
        datum.GradeC == 0
      ) {
        errorEmptyIndex++;
        errorCollection.GradeC = "Grade C Harus Diisi";
      }
      if (errorEmptyIndex > 0) {
        window.alert(emptyGrade);
        orderProductionsDocumentError.push(errorCollection);
      }
    });

    this.data.EstimationProducts.forEach(datum => {
      var gradeANum = parseInt(datum.GradeA) ? parseInt(datum.GradeA) : 0;
      var gradeBNum = parseInt(datum.GradeB) ? parseInt(datum.GradeB) : 0;
      var gradeCNum = parseInt(datum.GradeC) ? parseInt(datum.GradeC) : 0;
      var gradeDNum = parseInt(datum.GradeD) ? parseInt(datum.GradeD) : 0;
      summedUpGrade = 0;

      summedUpGrade =
        summedUpGrade + gradeANum + gradeBNum + gradeCNum + gradeDNum;
    });

    if (orderProductionsDocumentError.length > 0) {
      this.error.EstimationProducts = orderProductionsDocumentError;
    } else {
      if (summedUpGrade != 100) {
        window.alert(summedUpGradeAlert);
      } else {
        this.service
          .update(this.data)
          .then(result => {
            this.router.navigateToRoute("view", { Id: this.data.Id });
          })
          .catch(e => {
            this.error = e;
          });
      }
    }
  }
}
