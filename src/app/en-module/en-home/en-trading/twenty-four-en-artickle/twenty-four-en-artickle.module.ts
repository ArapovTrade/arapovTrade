import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnTwentyFourComponent } from './home-en-twenty-four/home-en-twenty-four.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnTwentyFourComponent }];
@NgModule({
  declarations: [HomeEnTwentyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyFourEnArtickleModule {}
