import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  detailEditOnly = true;
  createOnly = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.error = {};
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { id: this.data.id });
  }

  saveCallback(event) {
    this.error = {};
    var numberOnly = new RegExp("[0-9]");
    var index = 0;
    var emptyFieldName =
      "- Semua Field Harus Diisi\n- Blended(%) Harus Berupa Angka\n- All Grade Harus Berupa Angka";

    //Periksa Field Kosong atau Terisi
    //Cek Tanggal SPP
    if (this.data.dateOrdered == null || this.data.dateOrdered == undefined) {
      this.error.dateOrdered = "Tanggal SPP Tidak Boleh Kosong";
      index++;
    }

    if (this.data.period) {
      //Cek Periode Bulan
      if (
        this.data.period.month == null ||
        this.data.period.month == undefined ||
        this.data.period.month == ""
      ) {
        this.error.periodmonth = "Bulan Periode Tidak Boleh Kosong";
        index++;
      }

      //Cek Periode Tahun
      if (
        this.data.period.year == null ||
        this.data.period.year == undefined ||
        this.data.period.year == ""
      ) {
        this.error.periodyear = "Tahun Periode Tidak Boleh Kosong";
        index++;
      }
    }

    //Cek Konstruksi
    if (this.data.fabricConstructionDocument) {
      if (
        this.data.fabricConstructionDocument.id == null ||
        this.data.fabricConstructionDocument.id == undefined ||
        this.data.fabricConstructionDocument.id == ""
      ) {
        this.error.constructionNumber = "Konstruksi Tidak Boleh Kosong";
        index++;
      }
    }

    //Cek Asal Lusi
    if (
      this.data.warpOrigin == null ||
      this.data.warpOrigin == undefined ||
      this.data.warpOrigin == ""
    ) {
      this.error.warpOrigin = "Asal Lusi Tidak Boleh Kosong";
      index++;
    }

    //Cek Asal Pakan
    if (
      this.data.weftOrigin == null ||
      this.data.weftOrigin == undefined ||
      this.data.weftOrigin == ""
    ) {
      this.error.weftOrigin = "Asal Pakan Tidak Boleh Kosong";
      index++;
    }

    //Cek Komposisi/ Blended(%)
    if (this.data.composition == null || this.data.composition == undefined) {
      this.error.compositionOfPoly = "Komposisi Poly Tidak Boleh Kosong";
      this.error.compositionOfCotton = "Komposisi Cotton Tidak Boleh Kosong";
      this.error.otherComposition = "Komposisi Lainnya Tidak Boleh Kosong";
      index++;
    } else {
      //Periksa Properties Komposisi Sesuai dengan RegEx
      //Cek Komposisi Poly sesuai RegEx
      if (
        this.data.composition.compositionOfPoly == null ||
        this.data.composition.compositionOfPoly == undefined ||
        this.data.composition.compositionOfPoly == ""
      ) {
        this.error.compositionOfPoly = "Komposisi Poly Tidak Boleh Kosong";
        index++;
      } else {
        if (!numberOnly.test(this.data.composition.compositionOfPoly)) {
          this.error.compositionOfPoly = "Komposisi Poly Harus Berupa Angka";
          index++;
        }
      }

      //Cek Komposisi Cotton sesuai RegEx
      if (
        this.data.composition.compositionOfCotton == null ||
        this.data.composition.compositionOfCotton == undefined ||
        this.data.composition.compositionOfCotton == ""
      ) {
        this.error.compositionOfCotton = "Komposisi Cotton Tidak Boleh Kosong";
        index++;
      } else {
        if (!numberOnly.test(this.data.composition.compositionOfCotton)) {
          this.error.compositionOfCotton =
            "Komposisi Cotton Harus Berupa Angka";
          index++;
        }
      }

      //Cek Komposisi Lainnya sesuai RegEx
      if (
        this.data.composition.otherComposition == null ||
        this.data.composition.otherComposition == undefined ||
        this.data.composition.otherComposition == ""
      ) {
        this.error.otherComposition = "Komposisi Lainnya Tidak Boleh Kosong";
        index++;
      } else {
        if (!numberOnly.test(this.data.composition.otherComposition)) {
          this.error.otherComposition = "Komposisi Lainnya Harus Berupa Angka";
          index++;
        }
      }
    }

    //Cek Jenis Benang
    if (this.data.yarnType == null || this.data.yarnType == undefined) {
      this.error.yarnType = "Jenis Benang Tidak Boleh Kosong";
      index++;
    }

    //Cek All Grade
    if (this.data.wholeGrade == null || this.data.wholeGrade == undefined) {
      this.error.wholeGrade = "All Grade Tidak Boleh Kosong";
      index++;
    } else {
      if (!numberOnly.test(this.data.wholeGrade)) {
        this.error.wholeGrade = "All Grade Harus Berupa Angka";
        index++;
      }
    }

    //Cek Weaving Unit
    if (this.data.weavingUnit == null || this.data.weavingUnit == undefined) {
      this.error.weavingUnitName = "Unit Weaving Tidak Boleh Kosong";
      index++;
    }

    //Periksa apakah seluruh kondisi di atas terpenuhi
    if (index > 0) {
      window.alert(emptyFieldName);
    } else {
      this.service
        .update(this.data)
        .then(result => {
          this.router.navigateToRoute("view", { id: this.data.id });
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
}
