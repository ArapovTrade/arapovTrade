import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkTwentyThreeComponent } from './home-uk-twenty-three/home-uk-twenty-three.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeUkTwentyThreeComponent }];
@NgModule({
  declarations: [HomeUkTwentyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentyThreeUkArtickleModule {}
