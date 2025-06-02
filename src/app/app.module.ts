import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  Title,
  Meta,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UkModuleModule } from './uk-module/uk-module.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchblockComponent } from './searchblock/searchblock.component';
import { MainpageComponent } from './mainpage/mainpage.component';
 
import { MatExpansionModule } from '@angular/material/expansion';
@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, SearchblockComponent, MainpageComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    UkModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule ,MatExpansionModule
  ],
  providers: [provideClientHydration(), provideAnimationsAsync(), Title, Meta],
  bootstrap: [AppComponent],
})
export class AppModule {}
