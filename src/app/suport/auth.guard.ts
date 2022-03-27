import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../share/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if(this.authService.isLoggedIn !== true) {
    //   this.router.navigate(['sign-in']);
    //   return false;
    // }
    this.isLoggedIn();
    return true;
  }

  private isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    console.log(user);
    console.log("user is login : ", user);
    if (!user) {
      this.router.navigate(['sign-in']);
      return false;
    } else if (!user?.emailVerified) {
      this.router.navigate(['verify-email-address']);
      return false;
    }
    return true;
    // return user !== null ;
    // return user !== null && user.emailVerified !== false;
  }
}
