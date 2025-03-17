import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root'
})
export class BreakpointService {
    public currentRange = signal<BreakpointView>(BreakpointView.Large);

    private readonly _breakpointObserver = inject(BreakpointObserver);
    private readonly _destroyRef = inject(DestroyRef);

    constructor() {
        this._breakpointObserver.observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                if (this._breakpointObserver.isMatched(Breakpoints.Small)) {
                    this.currentRange.set(BreakpointView.Small);
                }
                if (this._breakpointObserver.isMatched(Breakpoints.Medium)) {
                    this.currentRange.set(BreakpointView.Medium);
                }
                if (this._breakpointObserver.isMatched(Breakpoints.Large)) {
                    this.currentRange.set(BreakpointView.Large);
                }
            });
    }

}

export enum BreakpointView {
    'Small' = 'Small', 'Medium' = 'Medium', 'Large' = 'Large'
}
