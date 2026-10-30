import { inject, bindable } from "aurelia-framework";
import { Service, GarmentService } from "./service";
import * as XLSX from "xlsx";
@inject(Service, GarmentService)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable show;
  @bindable isUploadVisible;
  

  formOptions = {
    cancelText: "Kembali",
    saveText: "Close Order",
    deleteText: "Hapus",
    //editText: "Ubah"
  };
  inputOptions = {
    label: {
      length: 2
    },
    control: {
      length: 7
    }
  };

  constructor(service, garmentService) {
    this.service = service;
    this.garmentService = garmentService;

    this.showDetail = false;
    this.isSearching = false;

    this.dataError = [];
    this.ROList = [];
    this.isUploadVisible = false;
    this.isErrorListVisible = false;
  }

  formatDate(value) {
  if (!value) {
      return null;
    }
    return String(value).split("T")[0];
  }

  bind(context) {
    this.context = context || {};

    this.data = this.context.data || {};
    this.error = this.context.error || {};
    this.context.data = this.data;
    this.context.error = this.error;
    this.data.DeliveryDate = this.formatDate(this.data.DeliveryDate);
    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    this.showDetail = Boolean(
      this.data.RoNo &&
      (
        this.data.Article ||
        this.data.Comodity ||
        this.data.Buyer ||
        this.data.Quantity !== null &&
        this.data.Quantity !== undefined ||
        this.data.DeliveryDate
      )
    );
  }

  async searching() {
    if (this.isSearching) {
      return;
    }

    const roNo = String(this.data.RoNo || "").trim();

    this.clearError();
    this.clearDetail();

    if (!roNo) {
      this.error.RoNo = "No. RO wajib diisi.";
      return;
    }
    this.data.RoNo = roNo;
    this.isSearching = true;

    try {
      const cuttingResult = await this.garmentService.searchCutting({
        page: 1,
        size: 10,
        filter: JSON.stringify({
          RONo: roNo
        })
      });

      const cuttingData = (cuttingResult.data || []).find(item =>
        this.normalize(item.RONo) === this.normalize(roNo)
      );

      if (!cuttingData) {
        this.error.RoNo =
          `No. RO "${roNo}" tidak ditemukan.`;

        return;
      }
      const costResult = await this.service.searchCC({
        page: 1,
        size: 10,
        filter: JSON.stringify({
          RO_Number: roNo
        })
      });

      const costCalculation = (costResult.data || []).find(item =>
        this.normalize(item.RO_Number) === this.normalize(roNo)
      );

      if (!costCalculation) {
        this.error.RoNo =
          `RO "${roNo}" ditemukan pada Cutting In, tetapi Cost Calculation tidak ditemukan.`;

        return;
      }
      this.data.Article = costCalculation.Article || "";
      this.data.Comodity = costCalculation.Comodity.Name;
      this.data.Buyer = costCalculation.Buyer.Name;
      this.data.BuyerBrand = costCalculation.BuyerBrand.Name;
      this.data.Quantity = costCalculation.Quantity;
      const rawDeliveryDate = costCalculation.DeliveryDate;
      this.data.DeliveryDate = rawDeliveryDate
        ? new Date(new Date(rawDeliveryDate).getTime() + 7 * 3600000).toISOString().slice(0, 10)
        : null;
      this.showDetail = true;
    } catch (error) {
      this.clearDetail();
      this.error.RoNo =
        error && error.message
          ? error.message
          : "Pencarian RO gagal. Periksa koneksi atau layanan API.";
    } finally {
      this.isSearching = false;
    }
  }

downloadTemplate() {
    const data = [
        ["NOMOR RO"],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Atur lebar kolom.
    worksheet["!cols"] = [
        { wch: 25 }
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "CLOSE ORDER RO"
    );

    XLSX.writeFile(workbook, "Template_CLOSE_ORDER_RO.xlsx");
}
handleFileUpload(event) {
    this.uploadFileInput = event.target;

    const file = event.target.files[0];

    if (!file || this.isSearching) {
        return;
    }

    this.error.file = "";

    const reader = new FileReader();
    const self = this;

    reader.onload = async function (e) {
        try {
            const workbook = XLSX.read(e.target.result, {
                type: "array"
            });

            const worksheet = workbook.Sheets[workbook.SheetNames[0]];

            const rows = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
                defval: "",
                raw: false
            });

           if (!rows || rows.length === 0) {
    alert("File Excel kosong.");
    return;
}

// Validasi header Excel.
const firstCell = String(rows[0][0] || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");

if (firstCell !== "NOMORRO") {
    alert('Format header tidak sesuai. Header wajib "NOMOR RO".');
    self.uploadFileInput.value = "";
    return;
}

const startIndex = 1;

const roList = rows
    .slice(startIndex)
    .map(function (row) {
        return String(row[0] || "").trim();
    })
    .filter(function (roNo) {
        return roNo !== "";
    });

if (roList.length === 0) {
    alert("Tidak ada Nomor RO di dalam file.");
    return;
}

            self.data = [];
            self.context.data = self.data;
            self.error = {};
            self.context.error = self.error;
            self.ROList.splice(0, self.ROList.length);
            self.dataError.splice(0, self.dataError.length);
            self.isSearching = true;

            const response =
                await self.garmentService.searchCheckROList(roList);

            let validationData = [];

            if (Array.isArray(response)) {
                validationData = response;
            } else if (response && Array.isArray(response.data)) {
                validationData = response.data;
            } else if (
                response &&
                response.data &&
                Array.isArray(response.data.data)
            ) {
                validationData = response.data.data;
            }

            const validationMap = {};

            validationData.forEach(function (item) {
                validationMap[self.normalize(item.RONumber)] = item.Status;
            });

            const validROList = [];

            roList.forEach(function (roNo) {
                const key = self.normalize(roNo);
                const isFound = validationMap[key] === true;

                if (!isFound) {
                    self.dataError.push({
                        RoNo: roNo,
                        Message: "RO belum masuk proses"
                    });

                    return;
                }

                validROList.push(roNo);
            });

            let costDataList = [];

            if (validROList.length > 0) {
                costDataList = await self.checkCostCalculation(validROList);
            }

            const costMap = {};
            costDataList.forEach(function (item) {
                costMap[self.normalize(item.RoNo)] = item;
            });

            validROList.forEach(function (roNo) {
                const key = self.normalize(roNo);
                const costData = costMap[key];

                if (!costData) {
                    self.dataError.push({
                        RoNo: roNo,
                        Message: "RO tidak ditemukan"
                    });
                } else if (costData.Status !== "Berhasil") {
                    self.dataError.push({
                        RoNo: roNo,
                        Message: costData.Status ||
                            "Data tidak berhasil diproses"
                    });
                } else {
                    self.ROList.push({
                        RoNo: roNo,
                        Article: costData.Article || "-",
                        Comodity: costData.Comodity || "-",
                        Buyer: costData.Buyer || "-",
                        BuyerBrand: costData.BuyerBrand || "-",
                        Quantity: costData.Quantity != null
                            ? costData.Quantity
                            : "-",
                        DeliveryDate: costData.DeliveryDate || "-",
                        Status: costData.Status
                    });
                }
            });

        const resultMap = {};

        self.ROList.forEach(function (item) {
            resultMap[self.normalize(item.RoNo)] = item;
        });

        const sortedROList = roList
            .map(function (roNo) {
                return resultMap[self.normalize(roNo)];
            })
            .filter(function (item) {
                return item != null;
            });

        self.ROList.splice(0, self.ROList.length);

        sortedROList.forEach(function (item) {
            self.ROList.push(item);
        });

        self.context.data = self.ROList;
        self.data = self.context.data;
        if (self.dataError.length > 0) {
            self.downloadErrorTxt();
        }
        } catch (error) {
            console.error("Gagal memproses Excel:", error);

            self.error.file = error && error.message
                ? "Gagal memproses daftar RO: " + error.message
                : "Gagal membaca file atau memproses daftar RO.";
        } finally {
            self.isSearching = false;
        }
    };

    reader.onerror = function () {
        self.error.file = "File gagal dibaca.";
        self.isSearching = false;
    };

    reader.readAsArrayBuffer(file);
}


async checkCostCalculation(roList) {
    try {
        if (!roList || roList.length === 0) {
            return [];
        }

        const costResult = await this.service.searchROList(roList);
        const costData = costResult || [];

        return costData.map(function (item) {
            return {
                RoNo: item.RO_Number,
                Article: item.Article || "",
                Comodity: item.Comodity || "",
                Buyer: item.Buyer || "",
                BuyerBrand: item.BuyerBrand || "",
                Quantity: item.Quantity,
                DeliveryDate: item.DeliveryDate
                    ? new Date(
                        new Date(item.DeliveryDate).getTime() +
                        7 * 3600000
                    ).toISOString().slice(0, 10)
                    : "",

                Status: "Berhasil"
            };
        });
    } catch (error) {
        throw error;
    }
}

downloadErrorTxt() {
    if (!this.dataError || this.dataError.length === 0) {
        return;
    }

    let content = "DAFTAR RO YANG GAGAL DIPROSES\n";
    content += "========================================\n\n";

    this.dataError.forEach(function (item, index) {
        content += (index + 1) + ". No. RO : " + item.RoNo + " " + item.Message + "\n";
        content += "----------------------------------------\n";
    });

    const blob = new Blob(
        [content],
        { type: "text/plain;charset=utf-8" }
    );

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ErrorRO.txt";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

removeRO(item, index) {
    if (!item || this.isSearching) {
        return;
    }

    if (index < 0 || index >= this.ROList.length) {
        return;
    }

    this.ROList.splice(index, 1);

    if (index < this.context.error.length) {
        this.context.error.splice(index, 1);
    }

    this.error = this.context.error;
    this.data = this.ROList;
    this.context.data = this.ROList;
}


toggleErrorList() {
    this.isErrorListVisible = !this.isErrorListVisible;
}

toggleUpload() {
    if (this.isUploadVisible) {
        this.clearUploadData();
        this.isUploadVisible = false;
        this.isErrorListVisible = false;
    } else {
        this.clearDetail();
        this.clearError();

        this.isUploadVisible = true;
    }
}

clearUploadData() {
    this.ROList.splice(0, this.ROList.length);
    this.dataError.splice(0, this.dataError.length);
    if (this.uploadFileInput) {
        this.uploadFileInput.value = "";
    }
    if (this.error) {
        this.error.file = "";
        this.error = {};
        this.context.error = this.error;
    }
    this.data = {};
    this.context.data = this.data;

    this.showDetail = false;
    this.isErrorListVisible = false;
}



  async checkRO(roNo) {
    try {
      const cuttingResult = await this.garmentService.searchCutting({
        page: 1,
        size: 10,
        filter: JSON.stringify({
          RONo: roNo
        })
      });

      const cuttingData = (cuttingResult.data || []).find(item =>
        this.normalize(item.RONo) === this.normalize(roNo)
      );

      if (!cuttingData) {
        this.error.RoNo =
          `No. RO "${roNo}" tidak ditemukan.`;

        return;
      }
      const costResult = await this.service.searchCC({
        page: 1,
        size: 10,
        filter: JSON.stringify({
          RO_Number: roNo
        })
      });

      const costCalculation = (costResult.data || []).find(item =>
        this.normalize(item.RO_Number) === this.normalize(roNo)
      );

      if (!costCalculation) {
        this.error.RoNo =
          `RO "${roNo}" ditemukan pada Cutting In, tetapi Cost Calculation tidak ditemukan.`;

        return;
      }
      this.data.Article = costCalculation.Article || "";
      this.data.Comodity = costCalculation.Comodity.Name;
      this.data.Buyer = costCalculation.Buyer.Name;
      this.data.BuyerBrand = costCalculation.BuyerBrand.Name;
      this.data.Quantity = costCalculation.Quantity;
      const rawDeliveryDate = costCalculation.DeliveryDate;
      this.data.DeliveryDate = rawDeliveryDate
        ? new Date(new Date(rawDeliveryDate).getTime() + 7 * 3600000).toISOString().slice(0, 10)
        : null;
      this.showDetail = true;
    } catch (error) {
      this.clearDetail();
      this.error.RoNo =
        error && error.message
          ? error.message
          : "Pencarian RO gagal. Periksa koneksi atau layanan API.";
    } finally {
      this.isSearching = false;
    }
  }

reset() {
    if (this.isSearching) {
        return;
    }

    this.clearUploadData();

    this.data = {};
    this.context.data = this.data;

    this.clearDetail();
    this.clearError();

    this.isUploadVisible = false;
    this.isErrorListVisible = false;
}

  clearDetail() {
    this.data.Article = null;
    this.data.Comodity = null;
    this.data.Buyer = null;
    this.data.BuyerBrand = null;
    this.data.Quantity = null;
    this.data.DeliveryDate = null;
    this.showDetail = false;
  }

  clearError() {
    this.error = {};
    this.context.error = this.error;
  }

  normalize(value) {
    return String(value || "")
      .trim()
      .toUpperCase();
  }
}
