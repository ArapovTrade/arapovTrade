import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root',
})
export class MetaservService {
  constructor(
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  addOrganizationSchema() {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Arapov Trade',
      legalName: 'ФОП Арапов І.В.',
      taxID: '3314507171',
      url: 'https://arapov.trade',
      logo: 'https://arapov.trade/favicon.ico',
      image: 'https://arapov.trade/assets/img/photo_mainpage.jpg',
      email: 'arapov.trade@gmail.com',
      telephone: '+380502933075',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'вул. Усенко, д. 9',
        addressLocality: 'Дніпро',
        addressRegion: 'Дніпропетровська область',
        postalCode: '49130',
        addressCountry: 'UA',
      },
      founder: {
        '@type': 'Person',
        name: 'Ігор Арапов',
        jobTitle: 'Трейдер та засновник Arapov Trade',
        sameAs: [
          'https://t.me/ArapovTrade',
          'https://www.youtube.com/@ArapovTrade',
          'https://www.facebook.com/igor.arapov.75',
          'https://www.linkedin.com/in/arapovtrade',

          'https://wa.me/380502933075',
          'viber://chat?number=%2B380502933075',
          'https://rutube.ru/channel/41668647',
          'https://dzen.ru/id/66bf54343761337a416dac58?share_to=link',
        ],
      },
      sameAs: [
        'https://t.me/ArapovTrade',
        'https://www.youtube.com/@ArapovTrade',
        'https://www.facebook.com/igor.arapov.75',
        'https://www.linkedin.com/in/arapovtrade',

        'https://wa.me/380502933075',
        'viber://chat?number=%2B380502933075',
        'https://rutube.ru/channel/41668647',
        'https://dzen.ru/id/66bf54343761337a416dac58?share_to=link',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+380502933075',
        contactType: 'customer support',
        areaServed: 'UA',
        availableLanguage: ['Russian', 'Ukrainian'],
      },
    };
    if (isPlatformBrowser(this.platformId)) {
      this.meta.removeTag('name="schema"');
    }
    if (isPlatformBrowser(this.platformId)) {
      this.meta.addTag({ name: 'schema', content: JSON.stringify(schema) });
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    } else {
      this.meta.addTag({ name: 'schema', content: JSON.stringify(schema) });
    }
  }
}
