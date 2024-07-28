import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-ru-blog-fiveteen',
  templateUrl: './home-ru-blog-fiveteen.component.html',
  styleUrl: './home-ru-blog-fiveteen.component.scss',
})
export class HomeRuBlogFiveteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Вся правда о торговле фьючерсами - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Вся правда о торговле фьючерсами',
    });
  }
}
