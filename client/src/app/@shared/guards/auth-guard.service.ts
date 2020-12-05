import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private readonly router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const isAuthenticated = true; // todo: replace with jwt or equivalent
    if (!isAuthenticated) {
      await this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
