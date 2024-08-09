import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-fifty-four',
  templateUrl: './home-uk-blog-fifty-four.component.html',
  styleUrl: './home-uk-blog-fifty-four.component.scss',
})
export class HomeUkBlogFiftyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Особливості ринку Криптовалют - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Особливості ринку Криптовалют | Навчання трейдингу',
    });
  }
}
