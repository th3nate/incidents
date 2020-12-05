import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NavModule} from '../nav/nav.module';
import {DataModule} from './data/data.module';
import {AuthGuardService} from './guards/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    NavModule,
    DataModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    NavModule,
    DataModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuardService]
})
export class SharedModule {
}
