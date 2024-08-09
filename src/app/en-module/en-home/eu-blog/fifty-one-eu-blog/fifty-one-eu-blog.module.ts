import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogFiftyOneComponent } from './home-eu-blog-fifty-one/home-eu-blog-fifty-one.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogFiftyOneComponent }];

@NgModule({
  declarations: [HomeEuBlogFiftyOneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyOneEuBlogModule {}
