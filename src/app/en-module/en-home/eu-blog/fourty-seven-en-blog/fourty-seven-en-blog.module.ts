import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogFourtySevenComponent } from './home-en-blog-fourty-seven/home-en-blog-fourty-seven.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogFourtySevenComponent },
];

@NgModule({
  declarations: [HomeEnBlogFourtySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FourtySevenEnBlogModule {}
