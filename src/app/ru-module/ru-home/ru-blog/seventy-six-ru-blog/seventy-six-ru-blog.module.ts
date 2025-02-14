import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRuBlogSeventySixComponent } from './home-ru-blog-seventy-six/home-ru-blog-seventy-six.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeRuBlogSeventySixComponent }];

@NgModule({
  declarations: [HomeRuBlogSeventySixComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventySixRuBlogModule {}
