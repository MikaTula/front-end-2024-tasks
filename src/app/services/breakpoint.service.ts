import {computed, DestroyRef, inject, Injectable, signal} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root'
})
export class BreakpointService {
    public currentRange = signal<BreakpointView>(BreakpointView.Large);
    public isSmall = computed<boolean>(() =>
        this.currentRange() === BreakpointView.Small
    );
    public isMedium = computed<boolean>(() =>
        this.currentRange() === BreakpointView.Medium
    );
    public isLarge = computed<boolean>(() =>
        this.currentRange() === BreakpointView.Large
    );

    private readonly _breakpointObserver = inject(BreakpointObserver);
    private readonly _destroyRef = inject(DestroyRef);

    constructor() {
        this._breakpointObserver.observe(
            [
                '(max-width: 399.98px)',
                '(min-width: 400px) and (max-width: 899.98px)',
                '(min-width: 900px)'
            ]
        )
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((state: BreakpointState) => {
                if (state.breakpoints['(max-width: 399.98px)']) {
                    this.currentRange.set(BreakpointView.Small);
                }
                if (state.breakpoints['(min-width: 400px) and (max-width: 899.98px)']) {
                    this.currentRange.set(BreakpointView.Medium);
                }
                if (state.breakpoints['(min-width: 900px)']) {
                    this.currentRange.set(BreakpointView.Large);
                }


                // if (this._breakpointObserver.isMatched(['(max-width: 499.98px)'])) {
                //     this.currentRange.set(BreakpointView.Small);
                //     console.log(BreakpointView.Small)
                // }
                // if (this._breakpointObserver.isMatched(['(min-width: 400px) and (max-width: 899.98px)'])) {
                //     this.currentRange.set(BreakpointView.Medium);
                //     console.log(BreakpointView.Medium)
                // }
                // if (this._breakpointObserver.isMatched(['(max-width: 900px)'])) {
                //     this.currentRange.set(BreakpointView.Large);
                //     console.log(BreakpointView.Large)
                // }
            });
    }

}

export enum BreakpointView {
    'Small' = 'Small', 'Medium' = 'Medium', 'Large' = 'Large'
}
