import { Directive, ElementRef, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Destroy } from '@fuse/services/utils/destroy';
import { filter, takeUntil } from 'rxjs';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fuseScrollReset]',
    providers: [Destroy],
    exportAs: 'fuseScrollReset'
})
export class FuseScrollResetDirective implements OnInit
{

    /**
     * Constructor
     */
    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _router: Router,
        private readonly _unsubscribeAll: Destroy
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to NavigationEnd event
        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {

            // Reset the element's scroll position to the top
            this._elementRef.nativeElement.scrollTop = 0;
        });
    }
}
