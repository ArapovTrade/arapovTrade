import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogEightySevenComponent } from './home-uk-blog-eighty-seven/home-uk-blog-eighty-seven.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogEightySevenComponent },
];

@NgModule({
  declarations: [HomeUkBlogEightySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightySevenUkBlogModule {}
