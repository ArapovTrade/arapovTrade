import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuThirtyFourComponent } from './home-ru-thirty-four/home-ru-thirty-four.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuThirtyFourComponent }];
@NgModule({
  declarations: [HomeRuThirtyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyFourRuArtickleModule {}
