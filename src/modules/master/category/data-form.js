import { inject, bindable, computedFrom } from "aurelia-framework";
import { PermissionHelper } from "../../../utils/permission-helper";
var AccountingCategoryLoader = require("../../../loader/accounting-category-loader");

@inject(PermissionHelper)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable CodeD365;
  @bindable CodeD365List = [
  { Code: "", Name: "" },
  { Code: "AGX-ALKES", Name: "AGX-ALKES - ALAT KESEHATAN" },
  { Code: "AGXATK", Name: "AGXATK - ALAT TULIS KANTOR" },
  { Code: "AGX-BBM", Name: "AGX-BBM - KENDARAAN - BBM" },
  { Code: "AGXCTKAN", Name: "AGXCTKAN - CETAKAN" },
  { Code: "AGXF&B", Name: "AGXF&B - F&B" },
  { Code: "AGXINTRNT", Name: "AGXINTRNT - INTERNET" },
  { Code: "AGXIT", Name: "AGXIT - IT-JASA" },
  { Code: "AGXJASA", Name: "AGXJASA - AGXJASA" },
  { Code: "AGXLAIN", Name: "AGXLAIN - BEBAN UMUM ADM LAIN" },
  { Code: "AGXNTRKNST", Name: "AGXNTRKNST - NOTARIS / KONSULTAN" },
  { Code: "AGXPEMEL", Name: "AGXPEMEL - PEMELIHARAAN ASET UMUM" },
  { Code: "AGX-SVC", Name: "AGX-SVC - KENDARAAN-SERVICE" },
  { Code: "AGXTAMU", Name: "AGXTAMU - TAMU" },
  { Code: "AGXTRAIN", Name: "AGXTRAIN - TRAINING DAN PENDIDIKAN" },
  { Code: "AGXURTP", Name: "AGXURTP - URTP" },
  { Code: "AVAL", Name: "AVAL - AVAL PRODUKSI" },
  { Code: "AVAL-UMUM", Name: "AVAL-UMUM - AVAL UMUM" },
  { Code: "EXTFD", Name: "EXTFD - EXTRAFOOD" },
  { Code: "INVTRS", Name: "INVTRS - INVENTARIS KANTOR" },
  { Code: "IT-ASET", Name: "IT-ASET - IT-ASET" },
  { Code: "IT-INVTRS", Name: "IT-INVTRS - IT-INVENTARIS" },
  { Code: "LAB", Name: "LAB - BARANG LAIN-LABORAT" },
  { Code: "LIMBAH", Name: "LIMBAH - LIMBAH" },
  { Code: "LISENSI", Name: "LISENSI - IT-LICENSE" },
  { Code: "MESIN", Name: "MESIN - MESIN" },
  { Code: "MTRBGN", Name: "MTRBGN - MATERIAL BANGUNAN" },
  { Code: "OBAT", Name: "OBAT - BARANG LAIN-OBAT" },
  { Code: "PLMS", Name: "PLMS - PELUMAS" },
  { Code: "PMLGDPB", Name: "PMLGDPB - PEMELIHARAAN GEDUNG" },
  { Code: "PMLMSIN", Name: "PMLMSIN - PEMELIHARAAN MESIN / KALIBRASI" },
  { Code: "PPN-M", Name: "PPN-M - PPN MASUKAN" },
  { Code: "PROYEK", Name: "PROYEK - PROYEK" },
  { Code: "PRWTMSN", Name: "PRWTMSN - PERAWATAN MESIN" },
  { Code: "SLXIKLAN", Name: "SLXIKLAN - IKLAN" },
  { Code: "SPAREPART", Name: "SPAREPART - SPAREPART" },
  { Code: "SP-EL", Name: "SP-EL - SPAREPART-ELECTRIC" },
  { Code: "SP-MC", Name: "SP-MC - SPAREPART-MECHANIC" },
  { Code: "SP-MSN", Name: "SP-MSN - SPAREPART-MESIN" },
  { Code: "SWMSN", Name: "SWMSN - SEWA MESIN" },
  { Code: "TOOLS", Name: "TOOLS - TOOLS" },
  { Code: "TRNSPORT", Name: "TRNSPORT - JASA-ANGKUTAN BARANG MASUK" },
  { Code: "UJISTDR", Name: "UJISTDR - JASA-PENGUJIAN STANDAR" }
];

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };
  @computedFrom("data._id")
  get isEdit() {
    return (this.data._id || "").toString() != "";
  }

  constructor(permissionHelper) {
    this.permissions = permissionHelper.getUserPermissions();
    this.isPermitted = this.isPermittedRole();
  }

  isPermittedRole() {
    // this.roles = [VERIFICATION, CASHIER, ACCOUNTING];
    let roleRules = ["C9", "B1"];

    for (var key in this.permissions) {
      let hasPermittedRole = roleRules.find((roleRule) => roleRule == key);
      if (hasPermittedRole) return true;
    }

    return false;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.CodeD365 = this.CodeD365List.find(
        item => item.Code === this.data.CodeD365
    );
    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  CodeD365Changed(newValue, oldValue) {
    if (!newValue) return;
    if (!newValue.Code) return;
   this.data.CodeD365 = newValue.Code;
  }
  get accountingCategoryLoader() {
    return AccountingCategoryLoader;
  }

  accountingCategoryChanged(e) {
    this.data.AccountingCategoryId =
      this.data.AccountingCategoryId !== this.context.accountingCategory.Name.Id
        ? this.context.accountingCategory.Name.Id
        : this.data.AccountingCategoryId;
  }
}
