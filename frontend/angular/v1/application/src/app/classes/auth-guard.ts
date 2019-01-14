import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, NextObserver } from 'rxjs';

import { User } from './user';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    private user$: Observable<User>;

    constructor(
        private router: Router,
        private service: UserService
    ) {
        this.user$ = this.service.user$;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create((observer: NextObserver<boolean>) => {
            this.user$.subscribe((user: User) => {
                let allowed = false;

                if (user.is_signed_in) {
                    if (route.data.permission && user.has_permission(route.data.permission)) {
                        allowed = true;
                    } else {
                        console.log('AuthGuard::canActivate() requires permission: ' + route.data.permission);
                        this.router.navigate(['forbidden']);
                    }
                } else {
                    console.log('AuthGuard::canActivate() redirecting to sign in page');
                    this.router.navigate(['user', 'signin'], {
                        queryParams: {
                            url: state.url
                        }
                    });
                }

                observer.next(allowed);
                observer.complete();
            });
        });
    }
}
