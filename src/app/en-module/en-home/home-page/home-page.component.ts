import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}
  scrollToRegistrationEn() {
    const element = document.getElementById('registrationEn');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  ngOnInit(): void {
    this.titleService.setTitle(
      "Trading courses Author's online trading training | Igor Arapov"
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        "Author's ⏩ trading courses from Igor Arapov. ⭐ Training in trading from scratch from ArapovTrade.",
    });
    this.meta.addTag({
      name: 'keywords',
      content:
        'trading courses, trading, exchange, finance, stocks, currencies, trading training, courses, free trading training',
    });
  }
}
