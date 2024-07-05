import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-en-eight',
  templateUrl: './home-en-eight.component.html',
  styleUrl: './home-en-eight.component.scss',
})
export class HomeEnEightComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Currencies and their quotes. Basic definitions.',
    });
  }
}
