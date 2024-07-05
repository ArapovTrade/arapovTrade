import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-thirteen',
  templateUrl: './home-en-thirteen.component.html',
  styleUrl: './home-en-thirteen.component.scss',
})
export class HomeEnThirteenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Risk of exchange rate changes in the Forex market',
    });
  }
}
