import { Directive, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { tap, takeUntil } from "rxjs/operators";
import { MatAutocomplete } from '@angular/material/autocomplete';

export interface IAutoCompleteScrollEvent {
  autoComplete: MatAutocomplete;
  scrollEvent: Event;
}

@Directive({
  selector: 'mat-autocomplete[optionsScroll]',
  exportAs: 'mat-autocomplete[optionsScroll]'
})
export class MatAutocompleteOptionsScrollDirective implements OnDestroy {
  @Input() thresholdPercent = 0.8;
  @Output('optionsScroll') scroll = new EventEmitter<IAutoCompleteScrollEvent>();
  onDestroy = new Subject();

  constructor(public autoComplete: MatAutocomplete) {
    this.autoComplete.opened
      .pipe(
        tap(() => {
          setTimeout(() => {
            this.removeScrollEventListener();
            this.autoComplete.panel.nativeElement.addEventListener(
              'scroll',
              this.onScroll.bind(this)
              );
          });
        }),
        takeUntil(this.onDestroy)
      ).subscribe();

    this.autoComplete.closed
      .pipe(
        tap(() => this.removeScrollEventListener()),
        takeUntil(this.onDestroy)
      ).subscribe();
  }

  private removeScrollEventListener() {
    if (this.autoComplete && this.autoComplete.panel && this.autoComplete.panel.nativeElement) {
      this.autoComplete.panel.nativeElement.removeEventListener(
        'scroll',
        this.onScroll
      );
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.removeScrollEventListener();
  }

  onScroll(event: Event) {
    if (this.thresholdPercent === undefined) {
      this.scroll.next({ autoComplete: this.autoComplete, scrollEvent: event });
    } else {
      const scrollTop = (event.target as HTMLElement).scrollTop;
      const scrollHeight = (event.target as HTMLElement).scrollHeight;
      const elementHeight = (event.target as HTMLElement).clientHeight;
      const atBottom = scrollHeight === scrollTop + elementHeight;
      if (atBottom) {
        this.scroll.next();
      }
    }
  }
}
