import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './data.service';

@NgModule({
  imports     : [HttpClientModule],
  providers   : [DataService],
  declarations: []
})

export class DataModule {
}
