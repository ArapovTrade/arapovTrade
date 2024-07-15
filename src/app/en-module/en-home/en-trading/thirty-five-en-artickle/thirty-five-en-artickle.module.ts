import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnThirtyFiveComponent } from './home-en-thirty-five/home-en-thirty-five.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnThirtyFiveComponent }];
@NgModule({
  declarations: [HomeEnThirtyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyFiveEnArtickleModule {}
