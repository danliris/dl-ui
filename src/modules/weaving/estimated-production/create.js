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
    // console.log(this.data.Items);
    debugger;

    var index = 0;
    var summedUpGradeAlert =
      "- Jumlah Seluruh Grade Tidak Boleh Lebih Dari 100\n- Jumlah Seluruh Grade Tidak Boleh Kurang Dari 100\n- Jumlah Seluruh Grade Harus Tepat 100";
    var emptyFieldName =
      "- GradeA Perintah Produksi Harus Diisi\n- GradeB Perintah Produksi Harus Diisi\n- GradeC Perintah Produksi Harus Diisi";

    var summedUpGrade = 0;
    // console.log(this.data);
    this.data.Items.forEach(datum => {
      // console.log(datum);
      var gradeANum = parseInt(datum.gradeA) ? parseInt(datum.gradeA) : 0;
      var gradeBNum = parseInt(datum.gradeB) ? parseInt(datum.gradeB) : 0;
      var gradeCNum = parseInt(datum.gradeC) ? parseInt(datum.gradeC) : 0;
      var gradeDNum = parseInt(datum.gradeD) ? parseInt(datum.gradeD) : 0;

      summedUpGrade =
        summedUpGrade + gradeANum + gradeBNum + gradeCNum + gradeDNum;
      // console.log(gradeANum);
      // console.log(gradeBNum);
      // console.log(gradeCNum);
      // console.log(gradeDNum);
      // console.log(summedUpGrade);
      if (
        datum.gradeA == undefined ||
        datum.gradeA == null ||
        datum.gradeA == ""
      ) {
        index++;
      }
      console.log(index);
      if (
        datum.gradeB == undefined ||
        datum.gradeB == null ||
        datum.gradeB == ""
      ) {
        index++;
      }
      console.log(index);
      if (
        datum.gradeC == undefined ||
        datum.gradeC == null ||
        datum.gradeC == ""
      ) {
        index++;
      }
      console.log(index);
    });
    if (index > 0) {
      window.alert(emptyFieldName);
    } else {
      // console.log(summedUpGrade);
      if (summedUpGrade != 100) {
        window.alert(summedUpGradeAlert);
      } else {
        console.log(this.data);
        this.service
          .create(this.data)
          .then(result => {
            // alert("Data berhasil dibuat");
            this.router.navigateToRoute(
              "create",
              {},
              { replace: true, trigger: true }
            );
          })
          .catch(e => {
            this.error = e;
          });
      }
    }
    debugger;
  }
}
