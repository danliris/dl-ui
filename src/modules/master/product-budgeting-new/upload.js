import { inject, bindable, Lazy, BindingEngine } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service, Element, BindingEngine)
export class Create {
    @bindable error = {};

    constructor(router, service, element, bindingEngine) {
        this.router = router;
        this.service = service;
        this.element = element;
        this.bindingEngine = bindingEngine;
        this.data = {};
        this.isLoading = false;
        this.previewData = [];
    }

    activate(params) {
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
      this.list();
    }

    async fileChanged(event) {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);

            const workbook = XLSX.read(data, {
                type: "array"
            });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const jsonData = XLSX.utils.sheet_to_json(
                worksheet,
                {
                    defval: ""
                }
            );

            if (!jsonData || jsonData.length === 0) {
                alert("File kosong atau tidak memiliki data.");
                return;
            }

            const expectedHeaders = [
                "FOB/CMT",
                "IMPORT/LOKAL",
                "Kode Kategori",
                "Nama Barang",
                "Tipe",
                "Satuan",
                "Mata Uang",
                "Harga",
                "Tags",
                "Keterangan"
            ];

            const actualHeaders = Object.keys(jsonData[0]);
            for (let header of expectedHeaders) {
                if (!actualHeaders.includes(header)) {
                    alert("Template tidak sesuai.");
                    return;
                }
            }

            const cleanData = jsonData
                .map(row => {
                    const cleanedRow = {};

                    expectedHeaders.forEach(header => {
                        cleanedRow[header] = row.hasOwnProperty(header)
                            ? row[header]
                            : "";
                    });

                    return cleanedRow;
                })
                .filter(row =>
                    Object.values(row).some(val =>
                        val !== null &&
                        val !== undefined &&
                        !(typeof val === "string" && val.trim() === "")
                    )
                );
            const mandatoryColumns = [
                "FOB/CMT",
                "IMPORT/LOKAL",
                "Kode Kategori",
                "Nama Barang",
                "Tipe",
                "Satuan",
                "Mata Uang",
            ];

            const errors = [];

            cleanData.forEach((row, rowIndex) => {
                const excelRow = rowIndex + 2;

                // Validasi kolom wajib
                mandatoryColumns.forEach(col => {
                    const value = row[col];

                    const isEmpty =
                        value === null ||
                        value === undefined ||
                        (
                            typeof value === "string" &&
                            value.trim() === ""
                        );

                    if (isEmpty) {
                        errors.push(
                            `Baris ${excelRow}: Kolom "${col}" wajib diisi.`
                        );
                    }
                });

                // Validasi FOB/CMT
                const fobCmt = String(row["FOB/CMT"] || "")
                    .trim()
                    .toUpperCase();

                if (fobCmt !== "FOB" && fobCmt !== "CMT") {
                    errors.push(
                        `Baris ${excelRow}: Kolom "FOB/CMT" hanya boleh diisi "FOB" atau "CMT".`
                    );
                }
                
                const importLokal = String(row["IMPORT/LOKAL"] || "")
                    .trim()
                    .toUpperCase();

                if (importLokal !== "IMPORT" && importLokal !== "LOKAL") {
                    errors.push(
                        `Baris ${excelRow}: Kolom "IMPORT/LOKAL" hanya boleh diisi "IMPORT" atau "LOKAL".`
                    );
                }

                const tipe = String(row["Tipe"] || "")
                    .trim();
                if (tipe !== "Item" && tipe !== "Service") {
                    errors.push(
                        `Baris ${excelRow}: Kolom "Tipe" hanya boleh diisi "Item" atau "Service".`
                    );
                }

            });

            if (errors.length > 0) {
                if (confirm("Terdapat data kosong, download file error?")) {
                    this.downloadErrorExcel(errors);
                }

                return;
            }

            // Simpan hasil Excel ke property class
            this.previewData = cleanData;
        };

        reader.readAsArrayBuffer(file);
    }

    downloadErrorExcel(errors){
        const errorData = errors.map((msg, index) => ({
            No: index + 1,
            Error: msg
        }));
        const worksheet = XLSX.utils.json_to_sheet(errorData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Error Upload");
        XLSX.writeFile(workbook, "Error_Upload.xlsx");
        document.getElementById("fileCsv").value = "";
    }

    async pushDataExcel(data) {
        console.log("Data dari save:", data);

        if (!Array.isArray(data)) {
            console.error("Data harus berupa Array:", data);
            return;
        }

        if (data.length === 0) {
            console.error("Data kosong.");
            return;
        }

        const payload = data.map(row => {
            const manufactureType = String(row["FOB/CMT"] || "").trim().toUpperCase();
            const originType = String(row["IMPORT/LOKAL"] || "").trim().toUpperCase();
            const categoryCode = String(row["Kode Kategori"] || "").trim();
            let code = "";
            if (manufactureType === "FOB" && originType === "LOKAL") 
            {
                code = "GFUL";
            }
            else if (manufactureType === "FOB" && originType === "IMPORT") 
            {
                code = "GFUI";
            }
            else if (manufactureType === "CMT" && originType === "LOKAL") 
            {
                code = "GCUL";
            }
            else if (manufactureType === "CMT" && originType === "IMPORT")
            {
                code = "GCUI";
            }
            return {
                ManufactureType: manufactureType,
                OriginType: originType,
                Code: code + "-" + categoryCode,
                Name: String(row["Nama Barang"] || "").trim(),
                CategoryCode: String(row["Kode Kategori"] || ""),
                UomUnit: String(row["Satuan"] || "").trim(),
                ItemType: String(row["Tipe"] || "").trim(),
                CurrencyCode: String(row["Mata Uang"] || "").trim(),
                Price: Number(row["Harga"]) || 0,
                Tags: String(row["Tags"] || "").trim(),
                Description: String(row["Keterangan"] || "").trim()
            };
        });

        
        return payload;
    }

    async saveCallback() {
        if (!this.previewData || this.previewData.length === 0) {
            alert("Belum ada data Excel.");
            return;
        }

        try {
            const payload = await this.pushDataExcel(this.previewData);
            if (!payload || payload.length === 0) {
                alert("Data upload tidak valid.");
                return;
            }
            await this.service.postingCSV(payload);
            this.router.navigateToRoute('list');
        } catch (error) {
            document.getElementById("fileCsv").value = "";

            let errorText = "";

            if (error.error) {
                errorText += `${error.message}\r\n\r\n`;

                Object.keys(error.error).forEach(key => {
                    errorText += `${key}\r\n`;
                    errorText += `${error.error[key]}\r\n\r\n`;
                });
            } else {
                errorText = JSON.stringify(error, null, 2);
            }

            const blob = new Blob(
                [errorText],
                { type: "text/plain;charset=utf-8" }
            );

            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Error Validation Upload Barang.txt";
            link.click();

            URL.revokeObjectURL(link.href);

            alert("Gagal mengirim data.");
            console.error(error);
        }
    }

}