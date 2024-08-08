import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFourtyEightComponent } from './home-ru-blog-fourty-eight/home-ru-blog-fourty-eight.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogFourtyEightComponent },
];

@NgModule({
  declarations: [HomeRuBlogFourtyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyEightRuBlogModule {}
