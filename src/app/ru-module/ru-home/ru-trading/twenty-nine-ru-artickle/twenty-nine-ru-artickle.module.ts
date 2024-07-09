import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuTwentyNineComponent } from './home-ru-twenty-nine/home-ru-twenty-nine.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuTwentyNineComponent }];
@NgModule({
  declarations: [HomeRuTwentyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyNineRuArtickleModule {}
