import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { filter, fromEvent, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Contact as DataType } from '@modules/admin/clients/clients.types';
import { ContactsService as DataService } from '@modules/admin/clients/clients.service';

@Component({
  selector: 'clients-list',
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  itemName = 'Clients';
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

  items$: Observable<DataType[]>;

  itemsCount: number = 0;
  itemsTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
  drawerMode: 'side' | 'over';
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  selectedItem: DataType;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _dataServices: DataService,
    @Inject(DOCUMENT) private _document: any,
    private _router: Router,
    private _fuseMediaWatcherService: FuseMediaWatcherService
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the contacts
    this.items$ = this._dataServices.items$;
    this._dataServices.items$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((items: DataType[]) => {

        // Update the counts
        this.itemsCount = items.length;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the contact
    this._dataServices.item$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((item: DataType) => {

        // Update the selected contact
        this.selectedItem = item;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });


    // Subscribe to search input field value changes
    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        switchMap(query =>

          // Search
          this._dataServices.searchItems(query)
        )
      )
      .subscribe();

    // Subscribe to MatDrawer opened change
    this.matDrawer.openedChange.subscribe((opened) => {
      if (!opened) {
        // Remove the selected contact when drawer closed
        this.selectedItem = null;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      }
    });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Set the drawerMode if the given breakpoint is active
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
        }
        else {
          this.drawerMode = 'over';
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Listen for shortcuts
    fromEvent(this._document, 'keydown')
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter<KeyboardEvent>(event =>
          (event.ctrlKey === true || event.metaKey) // Ctrl or Cmd
          && (event.key === '/') // '/'
        )
      )
      .subscribe(() => {
        this.createContact();
      });
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On backdrop clicked
   */
  onBackdropClicked(): void {
    // Go back to the list
    this._router.navigate(['./'], { relativeTo: this._activatedRoute });

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Create contact
   */
  createContact(): void {
    // Create the contact
    this._dataServices.createNewItem().subscribe((newItem) => {

      // Go to the new contact
      this._router.navigate(['./', newItem.id], { relativeTo: this._activatedRoute });

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
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
