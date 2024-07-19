import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-fourty-one',
  templateUrl: './home-uk-fourty-one.component.html',
  styleUrl: './home-uk-fourty-one.component.scss',
})
export class HomeUkFourtyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Торговий план трейдера - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Що таке торговельний план трейдера?',
    });
  }
}
