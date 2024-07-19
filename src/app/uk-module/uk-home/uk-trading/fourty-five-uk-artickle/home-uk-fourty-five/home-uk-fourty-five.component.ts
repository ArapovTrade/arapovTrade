import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-fourty-five',
  templateUrl: './home-uk-fourty-five.component.html',
  styleUrl: './home-uk-fourty-five.component.scss',
})
export class HomeUkFourtyFiveComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Види таймфреймів - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Основні види таймфреймів у трейдингу.',
    });
  }
}
