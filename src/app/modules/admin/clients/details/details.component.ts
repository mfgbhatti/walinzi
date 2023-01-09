import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { debounceTime, takeUntil } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Contact as DataType, Country, Tag } from '@modules/admin/clients/clients.types';
import { ListComponent } from '@modules/admin/clients/list/list.component';
import { ContactsService as DataService } from '@modules/admin/clients/clients.service';
import { Destroy } from '@fuse/services/utils/destroy';

@Component({
  selector: 'clients-details',
  templateUrl: './details.component.html',
  providers: [Destroy],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {
  itemName: string = 'Client';
  @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;

  editMode: boolean = false;
  item: DataType;
  itemForm: UntypedFormGroup;
  items: DataType[];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _itemsListComponent: ListComponent,
    private _dataService: DataService,
    private _formBuilder: UntypedFormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _renderer2: Renderer2,
    private _router: Router,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private readonly _unsubscribeAll: Destroy
  ) {
  }

  ngOnInit(): void {
    // Open the drawer
    this._itemsListComponent.matDrawer.open();

    // Create the contact form
    this.itemForm = this._formBuilder.group({
      id: [''],
      avatar: [null],
      name: ['', [Validators.required]],
      emails: this._formBuilder.array([]),
      phoneNumbers: this._formBuilder.array([]),
      title: [''],
      company: [''],
      birthday: [null],
      address: [null],
      notes: [null],
    });

    // Get the contacts
    this._dataService.items$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((items: DataType[]) => {
        this.items = items;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the contact
    this._dataService.item$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((item: DataType) => {

        // Open the drawer in case it is closed
        this._itemsListComponent.matDrawer.open();

        // Get the contact
        this.item = item;

        // Clear the emails and phoneNumbers form arrays
        (this.itemForm.get('emails') as UntypedFormArray).clear();
        (this.itemForm.get('phoneNumbers') as UntypedFormArray).clear();

        // Patch values to the form
        this.itemForm.patchValue(item);

        // Setup the emails form array
        const emailFormGroups = [];

        if (item.emails.length > 0) {
          // Iterate through them
          item.emails.forEach((email) => {

            // Create an email form group
            emailFormGroups.push(
              this._formBuilder.group({
                email: [email.email],
                label: [email.label]
              })
            );
          });
        }
        else {
          // Create an email form group
          emailFormGroups.push(
            this._formBuilder.group({
              email: [''],
              label: ['']
            })
          );
        }

        // Add the email form groups to the emails form array
        emailFormGroups.forEach((emailFormGroup) => {
          (this.itemForm.get('emails') as UntypedFormArray).push(emailFormGroup);
        });

        // Setup the phone numbers form array
        const phoneNumbersFormGroups = [];

        if (item.phoneNumbers.length > 0) {
          // Iterate through them
          item.phoneNumbers.forEach((phoneNumber) => {

            // Create an email form group
            phoneNumbersFormGroups.push(
              this._formBuilder.group({
                country: [phoneNumber.country],
                phoneNumber: [phoneNumber.phoneNumber],
                label: [phoneNumber.label]
              })
            );
          });
        }
        else {
          // Create a phone number form group
          phoneNumbersFormGroups.push(
            this._formBuilder.group({
              country: ['us'],
              phoneNumber: [''],
              label: ['']
            })
          );
        }

        // Add the phone numbers form groups to the phone numbers form array
        phoneNumbersFormGroups.forEach((phoneNumbersFormGroup) => {
          (this.itemForm.get('phoneNumbers') as UntypedFormArray).push(phoneNumbersFormGroup);
        });

        // Toggle the edit mode off
        this.toggleEditMode(false);

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }

  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._itemsListComponent.matDrawer.close();
  }

  toggleEditMode(editMode: boolean | null = null): void {
    if (editMode === null) {
      this.editMode = !this.editMode;
    }
    else {
      this.editMode = editMode;
    }

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  updateItem(): void {
    // Get the contact object
    const item = this.itemForm.getRawValue();

    // Go through the contact object and clear empty values
    item.emails = item.emails.filter(email => email.email);

    item.phoneNumbers = item.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

    // Update the contact on the server
    this._dataService.updateItem(item.id, item).subscribe(() => {

      // Toggle the edit mode off
      this.toggleEditMode(false);
    });
  }

  /**
   * Delete the contact
   */
  deleteItem(): void {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete '+ this.item.name,
      message: 'Are you sure you want to delete this '+ this.itemName+'? This action cannot be undone!',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });

    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {

      // If the confirm button pressed...
      if (result === 'confirmed') {
        // Get the current contact's id
        const id = this.item.id;

        // Get the next/previous contact's id
        const currentItemIndex = this.items.findIndex(item => item.id === id);
        const nextItemIndex = currentItemIndex + ((currentItemIndex === (this.items.length - 1)) ? -1 : 1);
        const nextItemId = (this.items.length === 1 && this.items[0].id === id) ? null : this.items[nextItemIndex].id;

        // Delete the contact
        this._dataService.deleteItem(id)
          .subscribe((isDeleted) => {

            // Return if the contact wasn't deleted...
            if (!isDeleted) {
              return;
            }

            // Navigate to the next contact if available
            if (nextItemId) {
              this._router.navigate(['../', nextItemId], { relativeTo: this._activatedRoute });
            }
            // Otherwise, navigate to the parent
            else {
              this._router.navigate(['../'], { relativeTo: this._activatedRoute });
            }

            // Toggle the edit mode off
            this.toggleEditMode(false);
          });

        // Mark for check
        this._changeDetectorRef.markForCheck();
      }
    });

  }

  addEmailField(): void {
    // Create an empty email form group
    const emailFormGroup = this._formBuilder.group({
      email: [''],
      label: ['']
    });

    // Add the email form group to the emails form array
    (this.itemForm.get('emails') as UntypedFormArray).push(emailFormGroup);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  removeEmailField(index: number): void {
    // Get form array for emails
    const emailsFormArray = this.itemForm.get('emails') as UntypedFormArray;

    // Remove the email field
    emailsFormArray.removeAt(index);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Add an empty phone number field
   */
  addPhoneNumberField(): void {
    // Create an empty phone number form group
    const phoneNumberFormGroup = this._formBuilder.group({
      country: ['us'],
      phoneNumber: [''],
      label: ['']
    });

    // Add the phone number form group to the phoneNumbers form array
    (this.itemForm.get('phoneNumbers') as UntypedFormArray).push(phoneNumberFormGroup);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Remove the phone number field
   *
   * @param index
   */
  removePhoneNumberField(index: number): void {
    // Get form array for phone numbers
    const phoneNumbersFormArray = this.itemForm.get('phoneNumbers') as UntypedFormArray;

    // Remove the phone number field
    phoneNumbersFormArray.removeAt(index);

    // Mark for check
    this._changeDetectorRef.markForCheck();
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
