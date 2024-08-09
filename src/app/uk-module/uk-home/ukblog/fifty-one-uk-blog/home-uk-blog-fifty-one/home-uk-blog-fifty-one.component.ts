import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fifty-one',
  templateUrl: './home-uk-blog-fifty-one.component.html',
  styleUrl: './home-uk-blog-fifty-one.component.scss',
})
export class HomeUkBlogFiftyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Cвічні патерни в Price Action - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Cвічні патерни в Price Action',
    });
  }
}
