import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fifty-eight',
  templateUrl: './home-uk-blog-fifty-eight.component.html',
  styleUrl: './home-uk-blog-fifty-eight.component.scss',
})
export class HomeUkBlogFiftyEightComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Усереднення у трейдингу- Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: ' Усереднення у трейдингу що це і як використовувати?',
    });
  }
}
