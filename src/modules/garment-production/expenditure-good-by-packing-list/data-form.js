import { bindable, inject } from "aurelia-framework";
import { Service } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
const PackingListLoader = require('../../../loader/garment-packing-list-for-expenditure-loader');

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable isCreate = false;
    @bindable title;
    @bindable data = {};
    @bindable itemOptions = {};
    @bindable selectedUnit;
    @bindable packinglists;

    expenditureTypes = ["EXPORT"];
    roGroups = [];
    roGroupColumns = [
        "RO",
        "SC NO",
        "BUYER BRAND",
        "ARTICLE",
        "COMMODITY",
        "ACTION"
    ];
    roGroupOptions = {};
    isLoadingPackingList = false;
    packingListMessage = "";

    constructor(service) {
        this.service = service;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    controlOptions = {
        label: { length: 2 },
        control: { length: 7 }
    };

    async bind(context) {
        this.context = context;
        this.data = this.context.data || {};
        this.error = this.context.error || {};
        this.isCreate = !!this.context.isCreate;
        this.isEdit = !!this.context.isEdit;

        if (!this.data.Items)
            this.data.Items = [];

        this.itemOptions = {
            isEdit: this.isEdit,
            isCreate: this.isCreate,
            multiRO: true
        };

        this.roGroupOptions = {
            readOnly: !!this.readOnly,
            isEdit: this.isEdit,
            isCreate: this.isCreate
        };

        if (!this.isCreate)
            this._buildGroupsFromSavedItems(this.data.Items);

        if (this.data.PackingListId) {
            this.packinglists = {
                id: this.data.PackingListId,
                invoiceNo: this.data.Invoice
            };
        }

        if (this.data.Unit)
            this.selectedUnit = this.data.Unit;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get packingListLoader() {
        return PackingListLoader;
    }

    unitView = unit => `${unit.Code || unit.code} - ${unit.Name || unit.name}`;
    packingListView = inv => `${inv.invoiceNo || inv.InvoiceNo || ''}`;

    get totalQuantity() {
        return (this.data.Items || [])
            .filter(item => item && item.FinishedGoodStockId)
            .reduce((sum, item) => sum + Number(item.Quantity || 0), 0);
    }

    _getId(obj) {
        if (!obj) return null;
        return obj.Id !== undefined ? obj.Id : obj.id;
    }

    _getValue(obj, pascalName, camelName) {
        if (!obj) return null;
        if (obj[pascalName] !== undefined && obj[pascalName] !== null)
            return obj[pascalName];
        return obj[camelName];
    }

    _normalizeRONo(value) {
        if (value === undefined || value === null)
            return null;

        if (typeof value === "string" || typeof value === "number") {
            const result = String(value).trim();
            return result || null;
        }

        if (typeof value === "object") {
            const nested = value.RONo !== undefined ? value.RONo
                : value.roNo !== undefined ? value.roNo
                : value.RO_Number !== undefined ? value.RO_Number
                : value.RONumber !== undefined ? value.RONumber
                : value.Value !== undefined ? value.Value
                : value.value;

            if (nested !== undefined && nested !== value)
                return this._normalizeRONo(nested);
        }

        return null;
    }

    _normalizeParty(value) {
        if (!value)
            return null;

        return {
            Id: this._getId(value) || 0,
            Code: this._getValue(value, "Code", "code") || "",
            Name: this._getValue(value, "Name", "name") || ""
        };
    }

    _normalizeComodity(value) {
        if (!value)
            return null;

        return {
            Id: this._getId(value) || 0,
            Code: this._getValue(value, "Code", "code") || "",
            Name: this._getValue(value, "Name", "name") || ""
        };
    }

    _normalizeSize(value) {
        if (!value)
            return null;

        return {
            Id: this._getId(value) || 0,
            Size: this._getValue(value, "Size", "size") || "",
            SizeIdx: this._getValue(value, "SizeIdx", "sizeIdx") || 0
        };
    }

    _normalizeUom(value) {
        if (!value)
            return null;

        return {
            Id: this._getId(value) || 0,
            Unit: this._getValue(value, "Unit", "unit") || ""
        };
    }

    _getFinishedGoodSize(finGood) {
        const nested = this._getValue(finGood, "Size", "size");
        if (nested)
            return this._normalizeSize(nested);

        return this._normalizeSize({
            Id: this._getValue(finGood, "SizeId", "sizeId"),
            Size: this._getValue(finGood, "SizeName", "sizeName")
        });
    }

    _getFinishedGoodUom(finGood) {
        const nested = this._getValue(finGood, "Uom", "uom");
        if (nested)
            return this._normalizeUom(nested);

        return this._normalizeUom({
            Id: this._getValue(finGood, "UomId", "uomId"),
            Unit: this._getValue(finGood, "UomUnit", "uomUnit")
        });
    }

    _sameSize(left, right) {
        if (!left || !right)
            return false;

        const leftId = this._getId(left);
        const rightId = this._getId(right);
        if (leftId && rightId)
            return Number(leftId) === Number(rightId);

        const leftName = String(this._getValue(left, "Size", "size") || "").trim().toUpperCase();
        const rightName = String(this._getValue(right, "Size", "size") || "").trim().toUpperCase();
        return leftName === rightName;
    }

    _sameUom(left, right) {
        if (!left || !right)
            return true;

        const leftId = this._getId(left);
        const rightId = this._getId(right);
        if (leftId && rightId)
            return Number(leftId) === Number(rightId);

        const leftUnit = String(this._getValue(left, "Unit", "unit") || "").trim().toUpperCase();
        const rightUnit = String(this._getValue(right, "Unit", "unit") || "").trim().toUpperCase();
        return !leftUnit || !rightUnit || leftUnit === rightUnit;
    }

    _sameColour(left, right) {
        const leftColour = String(left || "").trim().toUpperCase();
        const rightColour = String(right || "").trim().toUpperCase();

        return leftColour === rightColour;
    }

    selectedUnitChanged(newValue) {
        this.selectedUnit = newValue || null;
        this.data.Unit = newValue || null;

        if (!this.isCreate)
            return;

        this.packingListLoadToken = (this.packingListLoadToken || 0) + 1;
        this.packinglists = null;
        this.roGroups = [];
        this.data.Items = [];
        this.data.PackingListId = 0;
        this.data.Invoice = "";
        this.data.Buyer = null;
        this.data.BuyerView = "";
        this.packingListMessage = "";
        this.isLoadingPackingList = false;
    }

    _extractRows(response) {
        if (!response)
            return [];

        if (Array.isArray(response))
            return response;
        const directData = this._getValue(response, "Data", "data");
        if (Array.isArray(directData))
            return directData;
        if (directData) {
            const nestedData = this._getValue(directData, "Data", "data");
            if (Array.isArray(nestedData))
                return nestedData;
        }

        return [];
    }

    _buildIssuedMap(issuedResponse) {
        const rows = this._extractRows(issuedResponse);

        const map = new Map();
        for (const row of rows) {
            const id = Number(this._getValue(row, "PackingListSizeId", "packingListSizeId") || 0);
            if (!id)
                continue;

            const qty = Number(this._getValue(row, "Quantity", "quantity") || 0);
            map.set(id, qty);
        }
        return map;
    }

    _createRemainingPackingListGroups(packingItems, issuedMap) {
        const groups = new Map();

        for (const packingItem of packingItems) {
            const roNo = this._normalizeRONo(this._getValue(packingItem, "RONo", "roNo"));
            if (!roNo)
                continue;

            if (!groups.has(roNo)) {
                groups.set(roNo, {
                    RONo: roNo,
                    SCNo: this._getValue(packingItem, "SCNo", "scNo") || "",
                    Article: this._getValue(packingItem, "Article", "article") || "",
                    BuyerBrand: this._normalizeParty(this._getValue(packingItem, "BuyerBrand", "buyerBrand")),
                    Comodity: this._normalizeComodity(this._getValue(packingItem, "Comodity", "comodity")),
                    Sizes: []
                });
            }

            const group = groups.get(roNo);
            const packingListItemId = Number(this._getId(packingItem) || 0) || null;
            const packingUom = this._normalizeUom(this._getValue(packingItem, "Uom", "uom"));
            const details = this._getValue(packingItem, "Details", "details") || [];

            for (const detail of details) {
                const packingListDetailId = Number(this._getId(detail) || 0) || null;
                const detailColour = this._getValue(detail, "Colour", "colour") || "";
                const sizes = this._getValue(detail, "Sizes", "sizes") || [];

                for (const packingSize of sizes) {
                    const packingListSizeId = Number(this._getId(packingSize) || 0) || null;
                    const size = this._normalizeSize(this._getValue(packingSize, "Size", "size"));
                    const packingListQuantity = Number(this._getValue(packingSize, "Quantity", "quantity") || 0);
                    const issuedQuantity = packingListSizeId ? Number(issuedMap.get(packingListSizeId) || 0) : 0;
                    const remainingQuantity = packingListQuantity - issuedQuantity;

                    if (remainingQuantity <= 0)
                        continue;

                    group.Sizes.push({
                        PackingListItemId: packingListItemId,
                        PackingListDetailId: packingListDetailId,
                        PackingListSizeId: packingListSizeId,
                        Size: size,
                        Uom: packingUom,
                        Colour: detailColour,
                        PackingListQuantity: packingListQuantity,
                        IssuedQuantity: issuedQuantity,
                        RemainingQuantity: remainingQuantity
                    });
                }
            }
        }

        for (const [roNo, group] of Array.from(groups.entries())) {
            if (!group.Sizes.length)
                groups.delete(roNo);
        }

        return groups;
    }

    _finishedGoodToRow(roGroup, packingSize, finGood, showPackingList, rowSpan) {
        const fgSize = finGood ? this._getFinishedGoodSize(finGood) : packingSize.Size;
        const fgUom = finGood ? this._getFinishedGoodUom(finGood) : packingSize.Uom;

        return {
            IsSave: true,
            PackingListItemId: packingSize.PackingListItemId,
            PackingListDetailId: packingSize.PackingListDetailId,
            PackingListSizeId: packingSize.PackingListSizeId,
            RONo: roGroup.RONo,
            ContractNo: roGroup.SCNo,
            Article: roGroup.Article,
            BuyerBrand: roGroup.BuyerBrand,
            Comodity: roGroup.Comodity,
            Size: fgSize,
            SizeName: fgSize ? (this._getValue(fgSize, "Size", "size") || "") : "",
            Uom: fgUom,
            PackingListQuantity: packingSize.PackingListQuantity,
            IssuedQuantity: packingSize.IssuedQuantity,
            RemainingQuantity: packingSize.RemainingQuantity,
            PackingListColour: packingSize.Colour || "",
            ShowPartialColumns: true,
            ShowPackingList: showPackingList,
            PackingListRowSpan: rowSpan || 1,

            FinishedGoodStockId: finGood ? (this._getValue(finGood, "Id", "id") || this._getValue(finGood, "Identity", "identity")) : null,
            FinishedGoodStockNo: finGood ? (this._getValue(finGood, "FinishedGoodStockNo", "finishedGoodStockNo") || "") : "",
            ReferenceFinishedGoodStockNo: finGood ? (this._getValue(finGood, "ReferenceFinishedGoodStockNo", "referenceFinishedGoodStockNo") || "") : "",
            StockQuantity: finGood ? Number(this._getValue(finGood, "Quantity", "quantity") || 0) : null,
            Quantity: 0,

            Colour: finGood
                ? (this._getValue(finGood, "Colour", "colour") || "")
                : (packingSize.Colour || ""),
            WarehouseCode: finGood ? (this._getValue(finGood, "WarehouseCode", "warehouseCode") || "") : "",
            Area: finGood ? (this._getValue(finGood, "Area", "area") || "") : "",
            LineCode: finGood ? (this._getValue(finGood, "LineCode", "lineCode") || "") : "",
            PalletCode: finGood ? (this._getValue(finGood, "PalletCode", "palletCode") || "") : "",
            LocationCode: finGood ? (this._getValue(finGood, "LocationCode", "locationCode") || "") : "",
            ItemDescription: ""
        };
    }

    async packinglistsChanged(newValue) {
        if (!this.isCreate)
            return;

        this.roGroups = [];
        this.data.Items = [];
        this.packingListMessage = "";

        if (!newValue) {
            this.data.PackingListId = 0;
            this.data.Invoice = "";
            this.data.Buyer = null;
            this.data.BuyerView = "";
            return;
        }

        if (!this.data.Unit || !this._getId(this.data.Unit)) {
            alert("Pilih Unit Pengeluaran terlebih dahulu sebelum memilih Packing List.");
            this.packinglists = null;
            return;
        }

        const packingListId = Number(this._getId(newValue) || 0);
        this.data.PackingListId = packingListId;
        this.data.Invoice = this._getValue(newValue, "InvoiceNo", "invoiceNo") || "";
        this.data.Carton = Number(this._getValue(newValue, "TotalCartons", "totalCartons") || 0);

        const buyer = this._normalizeParty(this._getValue(newValue, "BuyerAgent", "buyerAgent"));
        this.data.Buyer = buyer;
        this.data.BuyerView = buyer ? `${buyer.Code}${buyer.Code ? ' - ' : ''}${buyer.Name}` : "";

        const packingListType = this._getValue(newValue, "PackingListType", "packingListType");
        if (packingListType && this.expenditureTypes.includes(packingListType))
            this.data.ExpenditureType = packingListType;

        const packingItems = this._getValue(newValue, "Items", "items") || [];
        if (!packingItems.length) {
            this.packingListMessage = "Packing List tidak memiliki item.";
            return;
        }

        const loadToken = (this.packingListLoadToken || 0) + 1;
        this.packingListLoadToken = loadToken;
        this.isLoadingPackingList = true;

        try {
            const issuedResponse = await this.service.getIssuedByPackingList(packingListId);
            if (loadToken !== this.packingListLoadToken)
                return;

            const issuedMap = this._buildIssuedMap(issuedResponse);
            const remainingByRO = this._createRemainingPackingListGroups(packingItems, issuedMap);
            const roNos = Array.from(remainingByRO.keys());

            if (!roNos.length) {
                this.packingListMessage = "Semua quantity Packing List ini sudah dikeluarkan.";
                return;
            }

            const fgResponse = await this.service.getFinishedGood({
                filter: JSON.stringify({
                    RONo: roNos,
                    UnitId: this._getId(this.data.Unit)
                }),
                size: 1000
            });

            if (loadToken !== this.packingListLoadToken)
                return;

            const finishedGoods = this._extractRows(fgResponse);
            const finishedGoodsByRO = new Map();

            for (const finGood of finishedGoods) {
                const roNo = this._normalizeRONo(this._getValue(finGood, "RONo", "roNo"));
                if (!roNo)
                    continue;

                if (!finishedGoodsByRO.has(roNo))
                    finishedGoodsByRO.set(roNo, []);

                finishedGoodsByRO.get(roNo).push(finGood);
            }

            const allRows = [];
            const groups = [];

            for (const roNo of roNos) {
                const roGroup = remainingByRO.get(roNo);
                const stocks = finishedGoodsByRO.get(roNo) || [];
                const rows = [];

                for (const packingSize of roGroup.Sizes) {
                    const matching = stocks.filter(stock => {
                        const stockColour = this._getValue(stock, "Colour", "colour") || "";

                        return (
                            this._sameSize(packingSize.Size, this._getFinishedGoodSize(stock)) &&
                            this._sameUom(packingSize.Uom, this._getFinishedGoodUom(stock)) &&
                            this._sameColour(packingSize.Colour, stockColour)
                        );
                    });

                    if (matching.length) {
                        matching.forEach((stock, index) => {
                            const row = this._finishedGoodToRow(
                                roGroup,
                                packingSize,
                                stock,
                                index === 0,
                                matching.length
                            );
                            rows.push(row);
                            allRows.push(row);
                        });
                    } else {
                        const row = this._finishedGoodToRow(roGroup,packingSize,null,true,1
                        );
                        rows.push(row);
                        allRows.push(row);
                    }
                }

                groups.push({
                    RONo: roGroup.RONo,
                    SCNo: roGroup.SCNo,
                    BuyerBrandName: roGroup.BuyerBrand ? roGroup.BuyerBrand.Name : "",
                    Article: roGroup.Article,
                    ComodityName: roGroup.Comodity ? roGroup.Comodity.Name : "",
                    Rows: rows,
                    IsShowing: false
                });
            }

            this.roGroups = groups;
            this.data.Items = allRows;
        } catch (e) {
            if (loadToken === this.packingListLoadToken) {
                this.roGroups = [];
                this.data.Items = [];
                this.packingListMessage = "Gagal mengambil sisa Packing List / Finished Good Stock.";
            }
            console.error(e);
        } finally {
            if (loadToken === this.packingListLoadToken)
                this.isLoadingPackingList = false;
        }
    }

    _buildGroupsFromSavedItems(items) {const map = new Map();

        for (const item of items || []) {
            const roNo = item.RONo || "-";
            if (!map.has(roNo)) {
                map.set(roNo, {
                    RONo: item.RONo,
                    SCNo: item.ContractNo,
                    BuyerBrandName: item.BuyerBrand ? item.BuyerBrand.Name : "",
                    Article: item.Article,
                    ComodityName: item.Comodity ? item.Comodity.Name : "",
                    Rows: [],
                    IsShowing: false
                });
            }

            const group = map.get(roNo);
            group.Rows.push({
                ...item,
                SizeName: item.Size ? (item.Size.Size) : (item.SizeName || ""),
                PackingListQuantity: item.PackingListQuantity !== undefined ? item.PackingListQuantity : null,
                IssuedQuantity: item.IssuedQuantity !== undefined ? item.IssuedQuantity : null,
                RemainingQuantity: item.RemainingQuantity !== undefined ? item.RemainingQuantity : null,
                ShowPartialColumns: false,
                ShowPackingList: true,
                PackingListRowSpan: 1,
                StockQuantity: item.StockQuantity !== undefined ? item.StockQuantity : null,
                Colour: item.Colour || item.Description || "",
                WarehouseCode: item.WarehouseCode || "",
                Area: item.Area || "",
                LineCode: item.LineCode || "",
                PalletCode: item.PalletCode || "",
                LocationCode: item.LocationCode || ""
            });
        }

        for (const group of map.values()) {
            group.Rows.sort((a, b) => {
                const aPackingListSizeId =Number(a.PackingListSizeId || 0);
                const bPackingListSizeId =Number(b.PackingListSizeId || 0);
                if (
                    aPackingListSizeId &&
                    bPackingListSizeId &&
                    aPackingListSizeId !== bPackingListSizeId
                ) {
                    return aPackingListSizeId - bPackingListSizeId;
                }

                const palletA =String(a.PalletCode || "");
                const palletB =String(b.PalletCode || "");

                return palletA.localeCompare(palletB);
            });


            const rowGroups = new Map();

            group.Rows.forEach((row, index) => {
                const sizeId =row.Size? (row.Size.Id || 0): 0;
                const uomId = row.Uom? (row.Uom.Id): 0;
                const key =row.PackingListSizeId? `pl:${row.PackingListSizeId}`: `legacy:${sizeId}:${uomId}:${row.SizeName}`;
                if (!rowGroups.has(key))
                    rowGroups.set(key, []);

                rowGroups.get(key).push(index);
            });

            for (const indexes of rowGroups.values()) {

                indexes.forEach((rowIndex, i) => {
                    group.Rows[rowIndex].ShowPackingList =i === 0;
                    group.Rows[rowIndex].PackingListRowSpan =indexes.length;
                });
            }
        }

        this.roGroups = Array.from(map.values());
    }
}
