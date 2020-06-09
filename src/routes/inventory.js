module.exports = [
    {
        route: 'inventory/packing-receipt',
        name: 'packing-receipt',
        moduleId: './modules/inventory/packing-receipt/index',
        nav: true,
        title: 'Penerimaan Packing Gudang Jadi',
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/inventory-documents',
        name: 'inventory/inventory-documents',
        moduleId: './modules/inventory/inventory-document/index',
        nav: true,
        title: 'Dokumen Inventory',
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "*": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/reports/inventory-movement-report',
        name: 'inventory/reports/inventory-movement-report',
        moduleId: './modules/inventory/reports/inventory-movement-report/index',
        nav: true,
        title: 'Laporan Stock In/Out',
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "*": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/reports/inventory-summary-report',
        name: 'inventory/reports/inventory-summary-report',
        moduleId: './modules/inventory/reports/inventory-summary-report/index',
        nav: true,
        title: 'Kartu Stok',
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "*": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/reports/fp-packing-receipt-report',
        name: 'inventory/reports/fp-packing-receipt-report',
        moduleId: './modules/inventory/reports/fp-packing-receipt-report/index',
        nav: true,
        title: 'Laporan Penerimaan Packing',
        auth: true,
        settings: {
            group: "Inventory",
            //permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/finishing-printing/fp-retur-to-qc-doc',
        name: 'inventory/finishing-printing/fp-retur-to-qc-doc',
        moduleId: './modules/inventory/finishing-printing/fp-retur-to-qc-doc/index',
        nav: true,
        title: 'Retur Barang ke QC',
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }

    },
    {
        route: "inventory/finishing-printing/reports/fp-retur-to-qc-doc-report",
        name: "inventory/finishing-printing/reports/fp-retur-to-qc-doc-report",
        moduleId: "modules/inventory/finishing-printing/reports/fp-retur-to-qc-doc-report/index",
        nav: true,
        title: "Laporan Retur Barang ke QC",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/fp-shipment-document",
        name: "inventory/finishing-printing/fp-shipment-document",
        moduleId: "modules/inventory/finishing-printing/fp-shipment-document/index",
        nav: true,
        title: "Pengiriman Barang Gudang Jadi",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/shin-fp-shipment-document",
        name: "inventory/finishing-printing/shin-fp-shipment-document",
        moduleId: "modules/inventory/finishing-printing/shin-fp-shipment-document/index",
        nav: true,
        title: "Pengiriman Barang Gudang Jadi (Copy)",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
      route: "inventory/finishing-printing/material-delivery-note",
      name: "inventory/finishing-printing/material-delivery-note",
      moduleId: "modules/inventory/finishing-printing/material-delivery-note/index",
      nav: true,
      title: "Bon Pengiriman Barang Spinning",
      auth: true,
      settings: {
          group: "Inventory",
          permission: { "C9": 1, "F1": 1, "F2": 1 },
          iconClass: "fa fa-dashboard"
      }
    },
    {
        route: "inventory/finishing-printing/material-delivery-note-weaving",
        name: "inventory/finishing-printing/material-delivery-note-weaving",
        moduleId: "modules/inventory/finishing-printing/material-delivery-note-weaving/index",
        nav: true,
        title: "Bon Pengiriman Barang Weaving",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
      },
    {
        route: "inventory/finishing-printing/reports/fp-shipment-document-report",
        name: "inventory/finishing-printing/reports/fp-shipment-document-report",
        moduleId: "modules/inventory/finishing-printing/reports/fp-shipment-document-report/index",
        nav: true,
        title: "Laporan Pengiriman Barang Gudang Jadi",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/fp-retur-from-buyer",
        name: "inventory/finishing-printing/fp-retur-from-buyer",
        moduleId: "modules/inventory/finishing-printing/fp-retur-from-buyer/index",
        nav: true,
        title: "Retur Barang Dari Buyer",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/reports/fp-shiptment-delivery-buyer-report",
        name: "inventory/reports/fp-shiptment-delivery-buyer-report",
        moduleId: "modules/inventory/reports/fp-shiptment-delivery-buyer-report/index",
        nav: true,
        title: "Laporan Pengiriman Buyer",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/material-distribution-note",
        name: "inventory/finishing-printing/material-distribution-note",
        moduleId: "modules/inventory/finishing-printing/material-distribution-note/index",
        nav: true,
        title: "Bon Pengantar Greige",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/disposition-material-distribution-note",
        name: "inventory/finishing-printing/disposition-material-distribution-note",
        moduleId: "modules/inventory/finishing-printing/disposition-material-distribution-note/index",
        nav: true,
        title: "Bon Pengantar Greige Disposisi",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/stock-transfer-note",
        name: "inventory/stock-transfer-note",
        moduleId: "modules/inventory/stock-transfer-note/index",
        nav: true,
        title: "Catatan Transfer Stok",
        auth: true,
        settings: {
            group: "Inventory",
            //permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/stock-transfer-approval",
        name: "inventory/stock-transfer-approval",
        moduleId: "modules/inventory/stock-transfer-approval/index",
        nav: true,
        title: "Terima Transfer Stok",
        auth: true,
        settings: {
            group: "Inventory",
            //permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/reports/material-distribution-note",
        name: "inventory/finishing-printing/reports/material-distribution-note",
        moduleId: "modules/inventory/finishing-printing/reports/material-distribution-note/index",
        nav: true,
        title: "Laporan Bon Pengantar Greige",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/finishing-printing/fp-return-inv-to-purchasing",
        name: "inventory/finishing-printing/fp-return-inv-to-purchasing",
        moduleId: "modules/inventory/finishing-printing/fp-return-inv-to-purchasing/index",
        nav: true,
        title: "Bon Retur Barang - Pembelian",
        auth: true,
        settings: {
            group: "Inventory",
            //permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/garment/leftover-warehouse/receipt/fabric",
        name: "inventory/garment/leftover-warehouse/receipt/fabric",
        moduleId: "modules/inventory/garment-leftover-warehouse/receipt/fabric/index",
        nav: true,
        title: "Penerimaan Gudang Sisa - FABRIC",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/garment/leftover-warehouse/receipt/finished-good",
        name: "inventory/garment/leftover-warehouse/receipt/finished-good",
        moduleId: "modules/inventory/garment-leftover-warehouse/receipt/finished-good/index",
        nav: true,
        title: "Penerimaan Gudang Sisa - BARANG JADI",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/garment/leftover-warehouse/receipt/aval",
        name: "inventory/garment/leftover-warehouse/receipt/aval",
        moduleId: "modules/inventory/garment-leftover-warehouse/receipt/aval/index",
        nav: true,
        title: "Penerimaan Gudang Sisa - AVAL",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: 'inventory/reports/inventory-dystuff-report',
        name: 'inventory/reports/inventory-dystuff-report',
        moduleId: './modules/inventory/reports/inventory-dystuff-report/index',
        nav: true,
        title: 'Laporan Stock Gudang Dyeing Printing',
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "*": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: "inventory/garment/leftover-warehouse/expenditure/fabric",
        name: "inventory/garment/leftover-warehouse/expenditure/fabric",
        moduleId: "modules/inventory/garment-leftover-warehouse/expenditure/fabric/index",
        nav: true,
        title: "Pengeluaran Gudang Sisa - FABRIC",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "inventory/garment/leftover-warehouse/expenditure/finished-good",
        name: "inventory/garment/leftover-warehouse/expenditure/finished-good",
        moduleId: "modules/inventory/garment-leftover-warehouse/expenditure/finished-good/index",
        nav: true,
        title: "Pengeluaran Gudang Sisa - BARANG JADI",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },{
        route: "inventory/garment/leftover-warehouse/expenditure/aval",
        name: "inventory/garment/leftover-warehouse/expenditure/aval",
        moduleId: "modules/inventory/garment-leftover-warehouse/expenditure/aval/index",
        nav: true,
        title: "Pengeluaran Gudang Sisa - AVAL",
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
]
