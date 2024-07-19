import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-fourty-four',
  templateUrl: './home-uk-fourty-four.component.html',
  styleUrl: './home-uk-fourty-four.component.scss',
})
export class HomeUkFourtyFourComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'На якому таймфреймі краще торгувати новачкові - Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'На якому часовому періоді краще торгувати трейдеру-початківцю?',
    });
  }
}
