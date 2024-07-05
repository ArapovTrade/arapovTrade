import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-one-en',
  templateUrl: './home-one-en.component.html',
  styleUrl: './home-one-en.component.scss',
})
export class HomeOneEnComponent implements OnInit {
  constructor(private meta: Meta) {}

  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: '10 tips for beginning traders from Igor Arapov',
    });
  }
}
