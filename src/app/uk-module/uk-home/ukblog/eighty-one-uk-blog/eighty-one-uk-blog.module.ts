import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogEightyOneComponent } from './home-uk-blog-eighty-one/home-uk-blog-eighty-one.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogEightyOneComponent }];

@NgModule({
  declarations: [HomeUkBlogEightyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightyOneUkBlogModule {}
