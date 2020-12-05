import {NgModule} from '@angular/core';
import {NavComponent} from './nav.component';
import {MaterialModule} from '@shared/material.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [NavComponent],
  imports     : [MaterialModule, RouterModule, CommonModule],
  exports     : [NavComponent]
})
export class NavModule {
}
