import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogEightyComponent } from './home-uk-blog-eighty/home-uk-blog-eighty.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogEightyComponent }];

@NgModule({
  declarations: [HomeUkBlogEightyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightyUkBlogModule {}
