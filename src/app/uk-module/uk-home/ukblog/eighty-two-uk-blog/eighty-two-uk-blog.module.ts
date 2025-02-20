import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogEightyTwoComponent } from './home-uk-blog-eighty-two/home-uk-blog-eighty-two.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogEightyTwoComponent }];

@NgModule({
  declarations: [HomeUkBlogEightyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightyTwoUkBlogModule {}
