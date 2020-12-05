import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuardService} from '../@shared/guards/auth-guard.service';
import {SocketIoModule} from 'ngx-socket-io';

@NgModule({
  imports  : [
    BrowserModule,
    BrowserAnimationsModule,
    SocketIoModule
  ],
  exports  : [
    BrowserModule,
    BrowserAnimationsModule,
    SocketIoModule
  ],
  providers: [AuthGuardService]
})
export class CoreModule {
}
