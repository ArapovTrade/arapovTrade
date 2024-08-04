import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogThirtySixComponent } from './home-uk-blog-thirty-six/home-uk-blog-thirty-six.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogThirtySixComponent }];

@NgModule({
  declarations: [HomeUkBlogThirtySixComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ThirtySixUkBlogModule {}
