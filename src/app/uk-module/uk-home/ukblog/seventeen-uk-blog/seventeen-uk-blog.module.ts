import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUkBlogSeventeenComponent } from './home-uk-blog-seventeen/home-uk-blog-seventeen.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: HomeUkBlogSeventeenComponent }];

@NgModule({
  declarations: [HomeUkBlogSeventeenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SeventeenUkBlogModule {}
