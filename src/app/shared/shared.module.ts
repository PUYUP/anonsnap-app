import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationFilterComponent } from './location-filter/location-filter.component';
import { IonicModule } from '@ionic/angular';
import { FilterRadiusComponent } from './filter-radius/filter-radius.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [
    LocationFilterComponent,
    FilterRadiusComponent
  ],
  entryComponents: [
    LocationFilterComponent,
    FilterRadiusComponent
  ],
  exports: [
    LocationFilterComponent,
    FilterRadiusComponent
  ]
})
export class SharedModule { }
