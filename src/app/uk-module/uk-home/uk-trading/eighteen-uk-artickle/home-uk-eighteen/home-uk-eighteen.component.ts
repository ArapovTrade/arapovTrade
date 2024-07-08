import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-eighteen',
  templateUrl: './home-uk-eighteen.component.html',
  styleUrl: './home-uk-eighteen.component.scss',
})
export class HomeUkEighteenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Психологія трейдингу',
    });
  }
}
