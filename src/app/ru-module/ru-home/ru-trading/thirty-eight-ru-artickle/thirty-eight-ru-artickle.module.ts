import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuThirtyEightComponent } from './home-ru-thirty-eight/home-ru-thirty-eight.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuThirtyEightComponent }];
@NgModule({
  declarations: [HomeRuThirtyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyEightRuArtickleModule {}
