import { inject } from 'aurelia-framework';
import { Service } from './service';

var UomLoader = require('../../../loader/uom-loader');

// Format nilai: selalu 4 digit di belakang koma, gaya Indonesia (90.000,0000)
function formatValue(v) {
  return Number(v).toLocaleString('id-ID', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  });
}

@inject(Service)
export class List {
  columns = [
    { field: 'No', title: 'No', align: 'center', width: 60, sortable: false },
    { field: 'BigUomUnit', title: 'Satuan Besar' },
    { field: 'SmallUomUnit', title: 'Satuan Kecil' },
    { field: 'ValueText', title: 'Nilai Konversi', align: 'right' },
    {
      field: 'Aksi', title: 'Aksi', align: 'center', width: 120, sortable: false,
      formatter: () =>
        '<button type="button" class="btn btn-ic btn-edit" title="Ubah"><i class="fa fa-pencil"></i></button>' +
        '<button type="button" class="btn btn-ic btn-del" title="Hapus"><i class="fa fa-trash"></i></button>',
      events: {
        'click .btn-edit': (e, value, row) => this.edit(row),
        'click .btn-del': (e, value, row) => this.remove(row)
      }
    }
  ];
  tableOptions = { smartDisplay: false, showToggle: false };

  data = {};
  error = {};
  original = null;

  constructor(service) {
    this.service = service;
  }

  get uomLoader() { return UomLoader; }
  uomView = (uom) => `${uom.Unit || uom.unit}`;

  loader = (info) => {
    var order = {};
    if (info.sort) order[info.sort === 'ValueText' ? 'Value' : info.sort] = info.order;
    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    };
    return this.service.search(arg).then(result => ({
      total: result.info.total,
      data: result.data.map((r, i) => Object.assign({}, r, {
        No: info.offset + i + 1,
        ValueText: formatValue(r.Value)
      }))
    }));
  };

  refreshTable() {
    var t = this.table;
    if (t && t.au && t.au['au-table']) t = t.au['au-table'].viewModel;
    if (t && typeof t.refresh === 'function') t.refresh();
  }

  exportData(type) {
    var arg = { page: 1, size: 100000, keyword: '', order: {} };
    this.service.search(arg).then(result => {
      var head = ['No', 'Satuan Besar', 'Satuan Kecil', 'Nilai Konversi'];
      var rows = result.data.map((r, i) => [
        i + 1,
        r.BigUomUnit,
        r.SmallUomUnit,
        formatValue(r.Value)
      ]);

      var content, mime, name;
      if (type === 'csv') {
        // pakai ; supaya terbuka rapi di Excel dengan pengaturan regional Indonesia
        var esc = v => '"' + String(v).replace(/"/g, '""') + '"';
        content = '\uFEFF' + [head].concat(rows).map(r => r.map(esc).join(';')).join('\r\n');
        mime = 'text/csv;charset=utf-8;';
        name = 'konversi-satuan.csv';
      } else {
        var th = head.map(h => `<th>${h}</th>`).join('');
        var tr = rows.map(r => '<tr>' + r.map(c => `<td>${c}</td>`).join('') + '</tr>').join('');
        content = '\uFEFF<html><head><meta charset="utf-8"></head><body>' +
          `<table border="1"><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></body></html>`;
        mime = 'application/vnd.ms-excel;charset=utf-8;';
        name = 'konversi-satuan.xls';
      }

      var blob = new Blob([content], { type: mime });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
    return false;
  }

  edit(row) {
    this.error = {};
    this.service.getById(row.Id).then(res => {
      var full = (res && res.data) ? res.data : res;
      this.original = full;
      this.data = {
        Id: full.Id,
        BigUom: { Id: full.BigUomId, Unit: full.BigUomUnit },
        SmallUom: { Id: full.SmallUomId, Unit: full.SmallUomUnit },
        Value: full.Value
      };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  remove(row) {
    if (confirm(`Hapus konversi ${row.BigUomUnit} -> ${row.SmallUomUnit}?`)) {
      this.service.delete(row).then(() => {
        if (this.data.Id === row.Id) this.cancel();
        this.refreshTable();
      });
    }
  }

  cancel() {
    this.data = {};
    this.error = {};
    this.original = null;
  }

  save() {
    var d = this.data;
    var err = {};
    if (!d.BigUom) err.BigUomId = 'Satuan besar wajib dipilih';
    if (!d.SmallUom) err.SmallUomId = 'Satuan kecil wajib dipilih';
    if (d.BigUom && d.SmallUom && d.BigUom.Id === d.SmallUom.Id) err.SmallUomId = 'Satuan kecil harus berbeda';
    if (!(d.Value > 0)) err.Value = 'Nilai konversi harus lebih dari 0';
    this.error = err;
    if (Object.keys(err).length) return;

    var payload = Object.assign({}, this.original || {}, {
      Id: d.Id,
      BigUomId: d.BigUom.Id, BigUomUnit: d.BigUom.Unit,
      SmallUomId: d.SmallUom.Id, SmallUomUnit: d.SmallUom.Unit,
      Value: Math.round(d.Value * 10000) / 10000
    });
    var req = d.Id ? this.service.update(payload) : this.service.create(payload);
    req.then(() => { this.cancel(); this.refreshTable(); })
       .catch(e => { this.error = e || {}; });
  }
}