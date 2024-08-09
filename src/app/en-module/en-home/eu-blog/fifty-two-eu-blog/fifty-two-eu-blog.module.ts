import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogFiftyTwoComponent } from './home-eu-blog-fifty-two/home-eu-blog-fifty-two.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogFiftyTwoComponent }];

@NgModule({
  declarations: [HomeEuBlogFiftyTwoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyTwoEuBlogModule {}
