import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fifty-five',
  templateUrl: './home-uk-blog-fifty-five.component.html',
  styleUrl: './home-uk-blog-fifty-five.component.scss',
})
export class HomeUkBlogFiftyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Скальпінг у трейдингу - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Скальпінг у трейдингу що потрібно знати початківцям?',
    });
  }
}
