import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-fourty',
  templateUrl: './home-en-fourty.component.html',
  styleUrl: './home-en-fourty.component.scss',
})
export class HomeEnFourtyComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Beginner Trader Mistakes - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'The main mistakes of novice traders',
    });
  }
}
