﻿import {computed, effect, ResourceRef, Signal, signal} from '@angular/core';
import {IPageRequest} from '../interfaces/requests/page-request';
import {ISortRequest} from '../interfaces/requests/sort-request';
import {IPageResponse, IPaginationData} from '../interfaces/responses/page-response';


export abstract class BaseDataSource<TResponse, TFilterRequest> {

    public readonly data: Signal<TResponse[]> = computed(() => this.dataResource().value()?.items ?? []);
    public readonly isLoading = computed(() => this.dataResource().isLoading());
    private readonly _defaultPageRequest: IPageRequest = {
        pageNumber: 0,
        pageSize: 5,
    }
    private readonly _defaultSortRequest: ISortRequest = {
        sortBy: 'ModifiedOn',
        sortDir: 'desc',
    }
    private readonly _defaultPaginationData: IPaginationData = {
        total: 0,
        totalPages: 0,
        pageNumber: this._defaultPageRequest.pageNumber,
        pageSize: this._defaultPageRequest.pageSize,
    }
    public readonly paginationData = computed<IPaginationData>(() =>
        this.dataResource().value() ?? this._defaultPaginationData);
    private readonly _pageRequest = signal<IPageRequest>(this._defaultPageRequest);
    public readonly pageRequest = computed(() =>
        this._pageRequest()
    );
    private readonly _sortRequest = signal<ISortRequest>(this._defaultSortRequest);
    public readonly sortRequest = computed(() => this._sortRequest());
    private readonly _filterRequest = signal<TFilterRequest>(this.defaultFilterRequest());
    public readonly filterRequest = computed(() => this._filterRequest());

    public constructor() {
        effect(() => {
            const sortRequest = this._sortRequest();
            const filterRequest = this._filterRequest();
            this._pageRequest.update(pageRequest => {
                pageRequest.pageNumber = 0;
                return pageRequest;
            });
        });
    }

    public changePage(pageRequest: IPageRequest) {
        this._pageRequest.set(pageRequest);
    }

    public changeSort(sortRequest: ISortRequest) {
        this._sortRequest.set(sortRequest);
    }

    public changeFilter(filterRequest: TFilterRequest) {
        if (JSON.stringify(this._filterRequest()) === JSON.stringify(filterRequest)) return;
        this._filterRequest.set(filterRequest);
    }

    public reload() {
        const pageRequest: IPageRequest = {
            pageNumber: 0,
            pageSize: this._pageRequest().pageSize,
        };
        this._pageRequest.set(pageRequest);
    }

    protected abstract dataResource(): ResourceRef<IPageResponse<TResponse>>;

    protected abstract defaultFilterRequest(): TFilterRequest;
}
