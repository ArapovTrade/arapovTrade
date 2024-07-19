import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-fourty-six',
  templateUrl: './home-uk-fourty-six.component.html',
  styleUrl: './home-uk-fourty-six.component.scss',
})
export class HomeUkFourtySixComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Основні причини втрати грошей на біржі - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Як не втратити гроші у трейдингу?',
    });
  }
}
