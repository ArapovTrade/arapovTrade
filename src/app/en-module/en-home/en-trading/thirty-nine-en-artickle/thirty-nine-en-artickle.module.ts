import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnThirtyNineComponent } from './home-en-thirty-nine/home-en-thirty-nine.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnThirtyNineComponent }];
@NgModule({
  declarations: [HomeEnThirtyNineComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyNineEnArtickleModule {}
