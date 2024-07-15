import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkThirtyThreeComponent } from './home-uk-thirty-three/home-uk-thirty-three.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkThirtyThreeComponent }];
@NgModule({
  declarations: [HomeUkThirtyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtyThreeUkArtickleModule {}
