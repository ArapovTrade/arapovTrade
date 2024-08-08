import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fourty-eight',
  templateUrl: './home-uk-blog-fourty-eight.component.html',
  styleUrl: './home-uk-blog-fourty-eight.component.scss',
})
export class HomeUkBlogFourtyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Інструкція з самостійного навчання Трейдингу - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Інструкція з самостійного навчання Трейдингу',
    });
  }
}
