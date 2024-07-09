import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnTwentyFiveComponent } from './home-en-twenty-five/home-en-twenty-five.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnTwentyFiveComponent }];
@NgModule({
  declarations: [HomeEnTwentyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyFiveEnArtickleModule {}
