import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import {UserReducer} from '../../main/apps/users/store/users.reducer';
import {UserState} from '../../main/apps/users/store/users.store';
import { SessionReduser } from '../../auth/store/session.reducer';
import { SessionState } from '../../auth/store/session.store';

export interface RouterStateUrl
{
    url: string;
    queryParams: Params;
    params: Params;
}

export interface State
{
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
    users: UserState;
    session: SessionState;
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer,
    users: UserReducer,
    session: SessionReduser
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl>
{
    serialize(routerState: RouterStateSnapshot): RouterStateUrl
    {
        const {url} = routerState;
        const {queryParams} = routerState.root;

        let state: ActivatedRouteSnapshot = routerState.root;
        while ( state.firstChild )
        {
            state = state.firstChild;
        }
        const {params} = state;

        return {
            url,
            queryParams,
            params
        };
    }
}
