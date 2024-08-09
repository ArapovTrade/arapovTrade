import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogFiftyTwoComponent } from './home-uk-blog-fifty-two/home-uk-blog-fifty-two.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogFiftyTwoComponent }];

@NgModule({
  declarations: [HomeUkBlogFiftyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyTwoUkBlogModule {}
