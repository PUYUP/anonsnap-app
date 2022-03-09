import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagPage } from './tag.page';

import { TagPageRoutingModule } from './tag-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TagPageRoutingModule
  ],
  declarations: [TagPage]
})
export class TagPageModule {}
