import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkThirtyFourComponent } from './home-uk-thirty-four/home-uk-thirty-four.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkThirtyFourComponent }];
@NgModule({
  declarations: [HomeUkThirtyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyFourUkArtickleModule {}
