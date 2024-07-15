import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-eighteen',
  templateUrl: './home-en-eighteen.component.html',
  styleUrl: './home-en-eighteen.component.scss',
})
export class HomeEnEighteenComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Psychological risks FOREX - Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Psychology of Trading',
    });
  }
}
