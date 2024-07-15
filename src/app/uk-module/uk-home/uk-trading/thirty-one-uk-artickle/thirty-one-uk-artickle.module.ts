import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkThirtyOneComponent } from './home-uk-thirty-one/home-uk-thirty-one.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkThirtyOneComponent }];
@NgModule({
  declarations: [HomeUkThirtyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyOneUkArtickleModule {}
