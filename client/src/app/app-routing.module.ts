import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from './@shared/guards/auth-guard.service';

const routes: Routes = [{
  path       : '',
  pathMatch  : 'full',
  redirectTo : 'incidents',
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
