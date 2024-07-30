import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogTwentySevenComponent } from './home-uk-blog-twenty-seven/home-uk-blog-twenty-seven.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: HomeUkBlogTwentySevenComponent },
];

@NgModule({
  declarations: [HomeUkBlogTwentySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentySevenUkBlogModule {}
