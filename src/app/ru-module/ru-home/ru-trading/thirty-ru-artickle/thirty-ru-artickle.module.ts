import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuThirtyComponent } from './home-ru-thirty/home-ru-thirty.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuThirtyComponent }];
@NgModule({
  declarations: [HomeRuThirtyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyRuArtickleModule {}
