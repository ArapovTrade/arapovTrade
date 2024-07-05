import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-fifteen',
  templateUrl: './home-en-fifteen.component.html',
  styleUrl: './home-en-fifteen.component.scss',
})
export class HomeEnFifteenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Major Forex Central Banks',
    });
  }
}
