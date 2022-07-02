import { Component, Input, OnDestroy, TemplateRef } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { debounceTime, finalize, takeUntil, tap } from "rxjs/operators";

export enum ButtonState {
  Init,
  Loading,
  Done,
}

@Component({
  selector: "app-button-three-state",
  templateUrl: "./button-three-state.component.html",
})
export class ButtonThreeStateComponent implements OnDestroy {
  @Input() addClicked$: Observable<any>;
  @Input() initLabel: string | TemplateRef<any>;
  @Input() loadingLabel: string | TemplateRef<any>;
  @Input() doneLabel: string | TemplateRef<any>;
  ButtonState = ButtonState;
  state = ButtonState.Init;

  private destroyed$ = new Subject();

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onClick(): void {
    if (this.state === ButtonState.Init) {
      this.state = ButtonState.Loading;
      this.addClicked$
        .pipe(
          debounceTime(100),
          tap(() => {
            this.state = ButtonState.Done;
          }),
          finalize(() => {
            setTimeout(() => {
              this.state = ButtonState.Init;
            }, 300);
          }),
          takeUntil(this.destroyed$)
        )
        .subscribe();
    }
  }

  isStringLabel(param: string | TemplateRef<any>): boolean {
    return typeof param === "string";
  }
}
