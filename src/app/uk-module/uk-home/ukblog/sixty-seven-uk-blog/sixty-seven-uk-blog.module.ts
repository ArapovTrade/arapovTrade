import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSixtySevenComponent } from './home-uk-blog-sixty-seven/home-uk-blog-sixty-seven.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSixtySevenComponent }];

@NgModule({
  declarations: [HomeUkBlogSixtySevenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixtySevenUkBlogModule {}
