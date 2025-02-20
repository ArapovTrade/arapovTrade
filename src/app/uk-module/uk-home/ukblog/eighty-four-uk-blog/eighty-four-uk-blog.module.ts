import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogEightyFourComponent } from './home-uk-blog-eighty-four/home-uk-blog-eighty-four.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogEightyFourComponent }];

@NgModule({
  declarations: [HomeUkBlogEightyFourComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightyFourUkBlogModule {}
