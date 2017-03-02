import { bindable, bindingMode, containerless, inject, computedFrom, customElement } from "aurelia-framework";
import dispatchCustomEvent from "../../../lib/dispatch-custom-event";

function startsWith(str, start) {
  // console.log(str);
  // str = str.toLowerCase();
  // start = start.toLowerCase()
  // return str.startsWith(start);
  return true;
}

@customElement("au-autocomplete")
@inject(Element)
export class Autocomplete {
  // control properties
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options; 

  // autocomplete properties
  @bindable loader = []; // can be either array of suggestions or function returning Promise resolving to such array
  @bindable minLength = 1; // min length of input to start search and suggest 
  @bindable template = null; // template to display a suggestion - if none string value of suggestion is shown 
  @bindable placeholder = ''; // placeholder for input control 
  @bindable filter // function to filter out suggestions
  @bindable query // query object
  @bindable editorValue; // input field value;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) key;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) text;

  _suggestions = [];
  _suggestionVisible = false;
  _ignoreInputChange = false;
  _isLoading = false;
  _noSuggestions = false;

  constructor(component) {
    this.component = component;
  }

  valueChanged(newValue) {
    this.bind();
  }

  bind() {
    this._ignoreInputChange = true;
    this.editorValue = this._getSuggestionText(this.value);
    if (this.value)
      this._suggestions = [this.value];
  }

  editorValueChanged() {
    if (this._ignoreInputChange) {
      this._ignoreInputChange = false;
      return;
    }
    if (this.editorValue === "") {
      this.value = null;
      this._noSuggestions = false;
      this._suggestions = [];
    }
    else {
      this._loadSuggestions(this.editorValue)
        .then(suggestions => {
          this._suggestions = suggestions || [];
          this._showSuggestions();
        });
    }
  }

  _loadSuggestions(keyword) {
    this._isLoading = true;
    this._noSuggestions = false;
    this._suggestions = [this.value];

    var promise;
    if (Array.isArray(this.loader)) {
      promise = Promise.resolve(this.loader.filter(item => startsWith(this.getSuggestionValue(item), keyword)));
    } else if (typeof this.loader === 'function') {
      promise = this.loader(keyword, this.query);
    }
    return promise.then(suggestions => {
      this._isLoading = false;
      this._noSuggestions = !suggestions || !suggestions.length;
      return suggestions;
    });
  }

  _hideSuggestions() {
    this._suggestionVisible = false;
  }

  _showSuggestions() {
    if (this._suggestions && this._suggestions.length || this._noSuggestions) {
      this._suggestionVisible = true;
      this._highlightSuggestion(this.value);
    }
  }

  _selectSuggestion(suggestion) {
    this.value = suggestion;
    this._suggestions = [suggestion];
    this._ignoreInputChange = true;
    this.editorValue = this._getSuggestionText(suggestion);
    if (this.value) {
      // dispatchCustomEvent("change", this.component, this.value);
      this._hideSuggestions();
    }
  }

  _highlightSuggestion(suggestion) {
    if (suggestion) {

    }
  }

  _getSuggestionText(suggestion) {
    if (!suggestion)
      return "";
    else if (typeof suggestion === "string")
      return suggestion;
    else if (typeof suggestion === "object" && this.text) {
      return suggestion[this.text];
    }
    else
      return suggestion.toString();
  }

  _getSuggestionKey(suggestion) {
    if (!suggestion)
      return null;
    else if (typeof suggestion === "string")
      return suggestion;
    else if (typeof suggestion === "object" && this.key) {
      return suggestion[this.key];
    }
    else
      return suggestion;
  }
  
  changeCallback(event) {
    event.preventDefault();
  }
}
