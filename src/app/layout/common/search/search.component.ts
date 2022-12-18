import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { debounceTime, filter, map, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations/public-api';
import { Destroy } from '@fuse/services/utils/destroy';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'search',
  templateUrl: './search.component.html',
  providers: [Destroy],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'fuseSearch',
  animations: fuseAnimations,
})
export class SearchComponent implements OnChanges, OnInit {
  @Input() appearance: 'basic' | 'bar' = 'basic';
  @Input() debounce = 300;
  @Input() minLength = 2;
  @Output() search: EventEmitter<any> = new EventEmitter<any>();

  opened = false;
  resultSets!: any[] | null;
  searchControl: UntypedFormControl = new UntypedFormControl();
  private _matAutocomplete!: MatAutocomplete;

  /**
   * Constructor
   */
  constructor(
    private _elementRef: ElementRef,
    private readonly _destroy: Destroy,
    private _httpClient: HttpClient,
    private _renderer2: Renderer2
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Host binding for component classes
   */
  @HostBinding('class') get classList(): any {
    return {
      'search-appearance-bar': this.appearance === 'bar',
      'search-appearance-basic': this.appearance === 'basic',
      'search-opened': this.opened,
    };
  }

  /**
   * Setter for bar search input
   *
   * @param value
   */
  @ViewChild('barSearchInput')
  set barSearchInput(value: ElementRef) {
    // If the value exists, it means that the search input
    // is now in the DOM, and we can focus on the input..
    if (value) {
      // Give Angular time to complete the change detection cycle
      setTimeout(() => {
        // Focus to the input element
        value.nativeElement.focus();
      });
    }
  }

  /**
   * Setter for mat-autocomplete element reference
   *
   * @param value
   */
  @ViewChild('matAutocomplete')
  set matAutocomplete(value: MatAutocomplete) {
    this._matAutocomplete = value;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Appearance
    if ('appearance' in changes) {
      // To prevent any issues, close the
      // search after changing the appearance
      this.close();
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the search field value changes
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounce),
        takeUntil(this._destroy),
        map((value) => {
          // Set the resultSets to null if there is no value or
          // the length of the value is smaller than the minLength
          // so the autocomplete panel can be closed
          if (!value || value.length < this.minLength) {
            this.resultSets = null;
          }

          // Continue
          return value;
        }),
        // Filter out undefined/null/false statements and also
        // filter out the values that are smaller than minLength
        filter((value) => value && value.length >= this.minLength)
      )
      .subscribe((value) => {
        this._httpClient
          .post('api/common/search', { query: value })
          .subscribe((resultSets: any) => {
            // Store the result sets
            this.resultSets = resultSets;

            // Execute the event
            this.search.next(resultSets);
          });
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On keydown of the search input
   *
   * @param event
   */
  onKeydown(event: KeyboardEvent): void {
    // Escape
    if (event.code === 'Escape') {
      // If the appearance is 'bar' and the mat-autocomplete is not open, close the search
      if (this.appearance === 'bar' && !this._matAutocomplete.isOpen) {
        this.close();
      }
    }
  }

  /**
   * Open the search
   * Used in 'bar'
   */
  open(): void {
    // Return if it's already opened
    if (this.opened) {
      return;
    }

    // Open the search
    this.opened = true;
  }

  /**
   * Close the search
   * * Used in 'bar'
   */
  close(): void {
    // Return if it's already closed
    if (!this.opened) {
      return;
    }

    // Clear the search input
    this.searchControl.setValue('');

    // Close the search
    this.opened = false;
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
