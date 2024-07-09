import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuTwentySevenComponent } from './home-ru-twenty-seven/home-ru-twenty-seven.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeRuTwentySevenComponent }];
@NgModule({
  declarations: [HomeRuTwentySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentySevenRuArtickleModule {}
