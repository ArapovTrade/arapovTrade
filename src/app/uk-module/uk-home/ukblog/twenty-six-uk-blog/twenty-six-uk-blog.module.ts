import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogTwentySixComponent } from './home-uk-blog-twenty-six/home-uk-blog-twenty-six.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogTwentySixComponent }];

@NgModule({
  declarations: [HomeUkBlogTwentySixComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TwentySixUkBlogModule {}
