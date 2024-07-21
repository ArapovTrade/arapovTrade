import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-two',
  templateUrl: './home-uk-blog-two.component.html',
  styleUrl: './home-uk-blog-two.component.scss',
})
export class HomeUkBlogTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Дивергенція на індикаторах  - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Дивергенція на індикаторах',
    });
  }
}
