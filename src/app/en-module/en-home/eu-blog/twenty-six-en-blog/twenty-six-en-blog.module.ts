import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEnBlogTwentySixComponent } from './home-en-blog-twenty-six/home-en-blog-twenty-six.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEnBlogTwentySixComponent }];

@NgModule({
  declarations: [HomeEnBlogTwentySixComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentySixEnBlogModule {}
