import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnTwentyNineComponent } from './home-en-twenty-nine/home-en-twenty-nine.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnTwentyNineComponent }];
@NgModule({
  declarations: [HomeEnTwentyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyNineEnArtickleModule {}
