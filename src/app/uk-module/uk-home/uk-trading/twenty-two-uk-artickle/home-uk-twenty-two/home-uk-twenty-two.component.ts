import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-twenty-two',
  templateUrl: './home-uk-twenty-two.component.html',
  styleUrl: './home-uk-twenty-two.component.scss',
})
export class HomeUkTwentyTwoComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Економічні фактори - Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content: 'Економічні фактори у трейдингу',
    });
  }
}
