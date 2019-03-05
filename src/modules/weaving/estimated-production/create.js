import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  ePNumberVisibility = false;
  searchButton = true;
  createOnly = false;
  error = {};

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    // this.error = { orderProductionsDocument: [] };
  }

  activate(params) {}

  //Dipanggil ketika tombol "Kembali" ditekan
  list() {
    this.router.navigateToRoute("list");
  }

  //Tombol "Kembali", panggil list()
  cancelCallback(event) {
    this.list();
  }

  //Tombol "Simpan", membuat data, redirect ke create
  saveCallback(event) {
    console.log(this.data);
    // debugger;
    // var summedUpGradeAlert =
    //   "- Jumlah Seluruh Grade Tidak Boleh Lebih Dari 100\n- Jumlah Seluruh Grade Tidak Boleh Kurang Dari 100\n- Jumlah Seluruh Grade Harus Tepat 100";
    var emptyGrade =
      "- GradeA Perintah Produksi Harus Diisi\n- GradeB Perintah Produksi Harus Diisi\n- GradeC Perintah Produksi Harus Diisi";
    var orderProductionsDocumentError = [];
    this.data.estimationProducts.forEach(datum => {
      var errorIndex = 0;
      var errorCollection = {};
      if (
        datum.gradeA == undefined ||
        datum.gradeA == null ||
        datum.gradeA == "" ||
        datum.gradeA == 0
      ) {
        errorIndex++;
        errorCollection.gradeA = "Grade A Harus Diisi";
      }
      if (
        datum.gradeB == undefined ||
        datum.gradeB == null ||
        datum.gradeB == "" ||
        datum.gradeB == 0
      ) {
        errorIndex++;
        errorCollection.gradeB = "Grade B Harus Diisi";
      }
      if (
        datum.gradeC == undefined ||
        datum.gradeC == null ||
        datum.gradeC == "" ||
        datum.gradeC == 0
      ) {
        errorIndex++;
        errorCollection.gradeC = "Grade C Harus Diisi";
      }
      if (errorIndex > 0) {
        window.alert(emptyGrade);
        orderProductionsDocumentError.push(errorCollection);
      }
    });
    debugger;
    if (orderProductionsDocumentError.length > 0) {
      this.error.orderProductionsDocument = orderProductionsDocumentError;
    } else {
      this.service
        .create(this.data)
        .then(result => {
          this.list();
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
}
