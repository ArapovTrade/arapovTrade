import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-sixteen',
  templateUrl: './home-uk-sixteen.component.html',
  styleUrl: './home-uk-sixteen.component.scss',
})
export class HomeUkSixteenComponent implements OnInit {
  constructor(private meta: Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Психологія трейдингу. Поведінкові ризики',
    });
  }
}
