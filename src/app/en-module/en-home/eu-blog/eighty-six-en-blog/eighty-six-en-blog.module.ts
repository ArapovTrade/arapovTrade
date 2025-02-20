import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogEightySixComponent } from './home-en-blog-eighty-six/home-en-blog-eighty-six.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogEightySixComponent }];

@NgModule({
  declarations: [HomeEnBlogEightySixComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EightySixEnBlogModule {}
