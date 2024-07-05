import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-three-en',
  templateUrl: './home-three-en.component.html',
  styleUrl: './home-three-en.component.scss',
})
export class HomeThreeEnComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Getting to know the stock exchange. How the stock exchange works.',
    });
  }
}
