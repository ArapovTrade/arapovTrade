import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSixComponent } from './home-uk-blog-six/home-uk-blog-six.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSixComponent }];

@NgModule({
  declarations: [HomeUkBlogSixComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SixUkBlogModule {}
