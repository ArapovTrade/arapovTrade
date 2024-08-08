import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogFourtySevenComponent } from './home-ru-blog-fourty-seven/home-ru-blog-fourty-seven.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeRuBlogFourtySevenComponent },
];

@NgModule({
  declarations: [HomeRuBlogFourtySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtySevenRuBlogModule {}
