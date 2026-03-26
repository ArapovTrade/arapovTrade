import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root',
})
export class MetaservService {
  constructor(
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  addOrganizationSchema() {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Arapov Trade',
      alternateName: 'Навчання трейдингу від Ігоря Арапова',
      legalName: 'ФОП Арапов І.В.',
      taxID: '3314507171',
      url: 'https://arapov.trade',
      logo: {
        '@type': 'ImageObject',
        url: 'https://arapov.trade/favicon.ico',
        width: 200,
        height: 200,
      },
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
        alternateName: [
          'Igor Arapov',
          'Арапов Игорь',
          'I. Arapov',
          'Игорь Арапов',
          'І. В. Арапов',
          'Арапов Ігор',
          'Arapov Igor',
        ],
        jobTitle: 'Трейдер та засновник Arapov Trade',
        sameAs: [
          'https://www.researchgate.net/scientific-contributions/I-V-Arapov-2341564479',
          'https://www.semanticscholar.org/author/2421286270',
          'https://papers.ssrn.com/Sol3/Cf_Dev/AbsByAuth.cfm?per_id=10402456',
          'https://openalex.org/authors/a5127355048',
          'https://ru.tradingview.com/u/Igor_Arapov/',
          'https://www.wikidata.org/wiki/Q137454477',
          'https://nuft.edu.ua/news/podiyi/pppro-trejding-i-birzhovu-diyalnist-%E2%80%93-zdobuvacham-osvitnoyi-programi',
          'https://orcid.org/0009-0003-0430-778X',
          'https://ssrn.com/author=10402456',
          'https://doi.org/10.32702/2306-6814.2026.4.96',
          'https://scholar.google.com/citations?hl=uk&user=N440tWQAAAAJ',
          'https://www.amazon.com/stores/author/B0GBRFY457',
          'https://www.youtube.com/@ArapovTrade',
          'https://www.linkedin.com/in/arapovtrade',
          'https://t.me/ArapovTrade',
          'https://ru.wikibooks.org/wiki/Участник:IgorArapov',
          'https://www.google.com/search?kgmid=/g/11ysn_rm8l',
          'https://www.crunchbase.com/person/igor-arapov',
          'https://ru.wikibooks.org/wiki/Основы_трейдинга',
          'https://www.facebook.com/igor.arapov.75',
          'https://rutube.ru/channel/41668647',
          'https://dzen.ru/id/66bf54343761337a416dac58?share_to=link',
          'https://isni.org/isni/0000000529518564',
          'https://bookwire.bowker.com/author/Igor-Arapov-40225801',
          'https://www.goodreads.com/author/show/66848566',
          'https://openlibrary.org/authors/OL16073686A',
          'http://www.irbis-nbuv.gov.ua/cgi-bin/irbis64r_81/cgiirbis_64.exe?Z21ID=&I21DBN=VFEIR&P21DBN=VFEIR&S21STN=1&S21REF=10&S21FMT=fullw&C21COM=S&S21CNR=20&S21P01=3&S21P02=0&S21P03=A=&S21COLORTERMS=0&S21STR=Арапов%2C%20Ігор',
        ],
      },
      sameAs: [
        'https://t.me/ArapovTrade',
        'https://www.youtube.com/@ArapovTrade',
        'https://www.facebook.com/igor.arapov.75',
        'https://www.linkedin.com/in/arapovtrade',
        'https://wa.me/380502933075',
        'https://www.wikidata.org/wiki/Q137454477',
        'viber://chat?number=%2B380502933075',
        'https://rutube.ru/channel/41668647',
        'https://dzen.ru/id/66bf54343761337a416dac58?share_to=link',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+380502933075',
        contactType: 'customer service',
        areaServed: 'UA',
        availableLanguage: ['Russian', 'Ukrainian', 'English'],
      },
      knowsAbout: [
        'Trading Education',
        'Smart Money Concepts',
        'Wyckoff Method',
        'Volume Analysis',
        'Technical Analysis',
        'Cryptocurrency Trading',
      ],
    };

    if (isPlatformBrowser(this.platformId)) {
      // Удаляем старые <meta name="schema">
      const existingMeta = document.querySelectorAll('meta[name="schema"]');
      existingMeta.forEach((meta) => meta.remove());

      // Удаляем старые <script type="application/ld+json">
      const existingScripts = document.querySelectorAll(
        'script[type="application/ld+json"]',
      );
      existingScripts.forEach((script) => {
        try {
          const data = JSON.parse(script.textContent || '{}');
          if (data['@type'] === 'Organization') {
            script.remove();
          }
        } catch (e) {
          // невалидный JSON игнорируем
        }
      });

      // Добавляем новый <meta>
      // this.meta.addTag({ name: 'schema', content: JSON.stringify(schema) });

      // Добавляем новый <script>
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    } else {
      // На сервере просто добавляем meta
      this.meta.removeTag('name="schema"'); // удаляем старый, если есть
      this.meta.addTag({ name: 'schema', content: JSON.stringify(schema) });
    }
  }
}
