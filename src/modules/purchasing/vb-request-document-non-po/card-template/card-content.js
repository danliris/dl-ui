import { inject, bindable, computedFrom, customElement } from 'aurelia-framework';
import moment from 'moment';

@customElement("card-content")
@inject(Element)
export class CardContentCustomElement {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) items;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) errors;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) data;
  // @bindable readOnly;
  // formOptions = {
  //   cancelText: "Kembali",
  //   saveText: "Simpan",
  //   deleteText: "Hapus",
  //   editText: "Ubah",
  // };

  // controlOptions = {
  //   label: {
  //     length: 4,
  //   },
  //   control: {
  //     length: 4,
  //   },
  // };

  constructor(element) {
    this.component = element;
  }

  bind() {
  }

  activate(params) {
  }
}
