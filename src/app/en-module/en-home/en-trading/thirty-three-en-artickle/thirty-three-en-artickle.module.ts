import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnThirtyThreeComponent } from './home-en-thirty-three/home-en-thirty-three.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeEnThirtyThreeComponent }];
@NgModule({
  declarations: [HomeEnThirtyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyThreeEnArtickleModule {}
