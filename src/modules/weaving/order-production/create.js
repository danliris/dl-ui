import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Create {
  createOnly = false;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    // this.error = {};
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

  //Tombol "Simpan", menyimpan nilai masukan
  saveCallback(event) {
    var numberOnly = new RegExp("[0-9]");
    var regExNotMatchOrEmptyField;
    var alert =
      "- Terdapat Field yang Belum Diisi\n- Blended Harus Berupa Angka\n- All Grade Harus Berupa Angka";

    //Periksa Field Kosong atau Terisi
    //Cek Tanggal SPP
    if (this.data.dateOrdered == null || this.data.dateOrdered == undefined) {
      this.regExNotMatchOrEmptyField = true;
    } else {
      this.regExNotMatchOrEmptyField = false;
    }

    //Cek Periode Bulan
    if (
      this.data.period.month == null ||
      this.data.period.month == undefined ||
      this.data.period.month == ""
    ) {
      this.regExNotMatchOrEmptyField = true;
    } else {
      this.regExNotMatchOrEmptyField = false;
    }

    //Cek Periode Tahun
    if (this.data.period.year == null || this.data.period.year == undefined) {
      this.regExNotMatchOrEmptyField = true;
    } else {
      this.regExNotMatchOrEmptyField = false;
    }

    //Cek Konstruksi
    if (this.data.fabricConstructionDocument) {
      if (
        this.data.fabricConstructionDocument.id == null ||
        this.data.fabricConstructionDocument.id == undefined ||
        this.data.fabricConstructionDocument.id == ""
      ) {
        this.regExNotMatchOrEmptyField = true;
      } else {
        this.regExNotMatchOrEmptyField = false;
      }
    } else {
      this.regExNotMatchOrEmptyField = true;
    }

    //Cek Asal Lusi
    if (this.data.warpOrigin == null || this.data.warpOrigin == undefined) {
      this.regExNotMatchOrEmptyField = true;
    } else {
      this.regExNotMatchOrEmptyField = false;
    }

    //Cek Asal Pakan
    if (this.data.weftOrigin == null || this.data.weftOrigin == undefined) {
      this.regExNotMatchOrEmptyField = true;
    } else {
      this.regExNotMatchOrEmptyField = false;
    }

    //Cek Komposisi/ Blended(%)
    if (this.data.composition == null || this.data.composition == undefined) {
      this.regExNotMatchOrEmptyField = true;
    } else {
      //Periksa Properties Komposisi Sesuai dengan RegEx
      //Cek Komposisi Poly sesuai RegEx
      if (
        this.data.composition.compositionOfPoly == null ||
        this.data.composition.compositionOfPoly == undefined
      ) {
        this.regExNotMatchOrEmptyField = true;
      } else {
        if (!numberOnly.test(this.data.composition.compositionOfPoly)) {
          this.regExNotMatchOrEmptyField = true;
        } else {
          this.regExNotMatchOrEmptyField = false;
        }
      }

      //Cek Komposisi Cotton sesuai RegEx
      if (
        this.data.composition.compositionOfCotton == null ||
        this.data.composition.compositionOfCotton == undefined
      ) {
        this.regExNotMatchOrEmptyField = true;
      } else {
        if (!numberOnly.test(this.data.composition.compositionOfCotton)) {
          this.regExNotMatchOrEmptyField = true;
        } else {
          this.regExNotMatchOrEmptyField = false;
        }
      }

      //Cek Komposisi Lainnya sesuai RegEx
      if (
        this.data.composition.otherComposition == null ||
        this.data.composition.otherComposition == undefined
      ) {
        this.regExNotMatchOrEmptyField = true;
      } else {
        if (!numberOnly.test(this.data.composition.otherComposition)) {
          this.regExNotMatchOrEmptyField = true;
        } else {
          this.regExNotMatchOrEmptyField = false;
        }
      }
    }

    //Cek Jenis Benang
    if (this.data.yarnType == null || this.data.yarnType == undefined) {
      this.regExNotMatchOrEmptyField = true;
    } else {
      this.regExNotMatchOrEmptyField = false;
    }

    //Cek All Grade
    if (this.data.wholeGrade == null || this.data.wholeGrade == undefined) {
      this.regExNotMatchOrEmptyField = true;
    } else {
      if (!numberOnly.test(this.data.wholeGrade)) {
        this.regExNotMatchOrEmptyField = true;
      } else {
        this.regExNotMatchOrEmptyField = false;
      }
    }

    //Cek Weaving Unit
    if (this.data.weavingUnit == null || this.data.weavingUnit == undefined) {
      this.regExNotMatchOrEmptyField = true;
    } else {
      this.regExNotMatchOrEmptyField = false;
    }

    //Periksa apakah seluruh kondisi di atas terpenuhi
    if (this.regExNotMatchOrEmptyField == true) {
      window.alert(alert);
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
