import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFourtyThreeComponent } from './home-ru-blog-fourty-three/home-ru-blog-fourty-three.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogFourtyThreeComponent },
];

@NgModule({
  declarations: [HomeRuBlogFourtyThreeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyThreeRuBlogModule {}
