import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogNineteenComponent } from './home-uk-blog-nineteen/home-uk-blog-nineteen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogNineteenComponent }];

@NgModule({
  declarations: [HomeUkBlogNineteenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NineteenUkBlogModule {}
