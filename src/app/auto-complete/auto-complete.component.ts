import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
} from "@angular/core";
import { Country } from "app/country.service";
import { Observable, of, Subject } from "rxjs";
import { debounceTime, finalize, takeUntil, tap } from "rxjs/operators";

export enum ButtonState {
  Init,
  Loading,
  Done,
}

@Component({
  selector: "app-auto-complete",
  templateUrl: "./auto-complete.component.html",
  styleUrls: ["./auto-complete.component.css"],
  host: {
    "(document:click)": "onClick($event)",
  },
})
export class AutoCompleteComponent {
  @Input() countryList: Country[] = [];
  @Output() selectionChange = new EventEmitter<Country>();

  value: string = "";
  isShow: boolean;

  private selectedItem: Country;

  constructor(private ele: ElementRef) {}

  get listItem(): Country[] {
    return this.countryList.filter((e) =>
      e.name.toLocaleLowerCase().includes(this.value?.toLocaleLowerCase())
    );
  }

  onFocus(): void {
    this.isShow = true;
    this.value = "";
  }

  onSelectedItem(country: Country): void {
    this.isShow = false;
    this.selectedItem = country;
    this.selectionChange.emit(country);
    this.value = country.name;
  }

  onClick(event: Event): void {
    if (!this.ele.nativeElement.contains(event.target)) {
      this.isShow = false;
      this.value = this.selectedItem?.name || "";
    }
  }
}
