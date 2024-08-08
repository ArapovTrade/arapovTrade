import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFourtyEightComponent } from './home-en-blog-fourty-eight/home-en-blog-fourty-eight.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogFourtyEightComponent },
];

@NgModule({
  declarations: [HomeEnBlogFourtyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtyEightEnBlogModule {}
