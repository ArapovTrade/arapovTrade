import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkThirtyEightComponent } from './home-uk-thirty-eight/home-uk-thirty-eight.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkThirtyEightComponent }];
@NgModule({
  declarations: [HomeUkThirtyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyEightUkArtickleModule {}
