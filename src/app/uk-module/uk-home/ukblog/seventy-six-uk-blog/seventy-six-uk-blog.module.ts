import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventySixComponent } from './home-uk-blog-seventy-six/home-uk-blog-seventy-six.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSeventySixComponent }];

@NgModule({
  declarations: [HomeUkBlogSeventySixComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventySixUkBlogModule {}
