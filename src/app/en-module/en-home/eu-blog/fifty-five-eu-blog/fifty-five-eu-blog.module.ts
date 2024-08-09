import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEuBlogFiftyFiveComponent } from './home-eu-blog-fifty-five/home-eu-blog-fifty-five.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeEuBlogFiftyFiveComponent }];

@NgModule({
  declarations: [HomeEuBlogFiftyFiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FiftyFiveEuBlogModule {}
