import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-fourty-one',
  templateUrl: './home-en-fourty-one.component.html',
  styleUrl: './home-en-fourty-one.component.scss',
})
export class HomeEnFourtyOneComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Trader`s Trading Plan - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'What is a trader`s trading plan?',
    });
  }
}
