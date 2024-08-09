import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fifty-seven',
  templateUrl: './home-uk-blog-fifty-seven.component.html',
  styleUrl: './home-uk-blog-fifty-seven.component.scss',
})
export class HomeUkBlogFiftySevenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Індикатори в трейдингу - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Індикатори в трейдингу - всі плюси та мінуси використання',
    });
  }
}
