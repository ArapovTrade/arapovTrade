import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkThirtyNineComponent } from './home-uk-thirty-nine/home-uk-thirty-nine.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkThirtyNineComponent }];
@NgModule({
  declarations: [HomeUkThirtyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyNineUkArtickleModule {}
