import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  ePNumberVisibility = false;
  searchButton = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
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
    var index = 0;
    var summedUpGradeAlert =
      "- Jumlah Seluruh Grade Tidak Boleh Lebih Dari 100\n- Jumlah Seluruh Grade Tidak Boleh Kurang Dari 100\n- Jumlah Seluruh Grade Harus Tepat 100";
    var emptyFieldName =
      "- GradeA Perintah Produksi Harus Diisi\n- GradeB Perintah Produksi Harus Diisi\n- GradeC Perintah Produksi Harus Diisi";

    var summedUpGrade = 0;
    this.data.estimationProducts.forEach(datum => {
      var gradeANum = parseInt(datum.gradeA) ? parseInt(datum.gradeA) : 0;
      var gradeBNum = parseInt(datum.gradeB) ? parseInt(datum.gradeB) : 0;
      var gradeCNum = parseInt(datum.gradeC) ? parseInt(datum.gradeC) : 0;
      var gradeDNum = parseInt(datum.gradeD) ? parseInt(datum.gradeD) : 0;

      summedUpGrade =
        summedUpGrade + gradeANum + gradeBNum + gradeCNum + gradeDNum;
      if (
        datum.gradeA == undefined ||
        datum.gradeA == null ||
        datum.gradeA == ""
      ) {
        index++;
      }
      if (
        datum.gradeB == undefined ||
        datum.gradeB == null ||
        datum.gradeB == ""
      ) {
        index++;
      }
      if (
        datum.gradeC == undefined ||
        datum.gradeC == null ||
        datum.gradeC == ""
      ) {
        index++;
      }
    });
    if (index > 0) {
      window.alert(emptyFieldName);
    } else {
      if (summedUpGrade != 100) {
        window.alert(summedUpGradeAlert);
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
}
