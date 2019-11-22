import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {AppState} from './reducers';
import {isLoggedIn, isLoggedOut} from './auth/auth.selectors';
import {login, logout} from './auth/auth.actions';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;

    isLoggedIn$: Observable<boolean>;

    isLoggedOut$: Observable<boolean>;


    constructor(
        private router: Router,
        private store: Store<AppState>
    ) {

    }

    ngOnInit() {


        const userProfile = localStorage.getItem('user');

        if (userProfile) { // this keeps the user logged in
            this.store.dispatch(login({ user: JSON.parse(userProfile) }));
        }

        this.router.events.subscribe(event  => {
            switch (true) {
                case event instanceof NavigationStart: {
                this.loading = true;
                break;
                }

                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                    this.loading = false;
                    break;
                }
                default: {
                    break;

                }
            }
        });


        this.store.subscribe(state => console.log('store value:', state));

        this.isLoggedIn$ = this.store
            .pipe(

                 // select operator works like map except it removes duplicate values
                select(isLoggedIn)

                // old version without memoization
                // select(state => !!state["auth"].user)
            );

        this.isLoggedOut$ = this.store
            .pipe(
                select(isLoggedOut)
            );


    }

    logout() {
        this.store.dispatch(logout());

        this.store.dispatch(logout());

    }

}
