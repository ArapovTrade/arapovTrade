import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogEightySevenComponent } from './home-en-blog-eighty-seven/home-en-blog-eighty-seven.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeEnBlogEightySevenComponent },
];

@NgModule({
  declarations: [HomeEnBlogEightySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightySevenEnBlogModule {}
