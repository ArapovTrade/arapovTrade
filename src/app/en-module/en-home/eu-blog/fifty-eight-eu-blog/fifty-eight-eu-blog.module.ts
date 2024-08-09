import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogFiftyEightComponent } from './home-eu-blog-fifty-eight/home-eu-blog-fifty-eight.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogFiftyEightComponent }];

@NgModule({
  declarations: [HomeEuBlogFiftyEightComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyEightEuBlogModule {}
