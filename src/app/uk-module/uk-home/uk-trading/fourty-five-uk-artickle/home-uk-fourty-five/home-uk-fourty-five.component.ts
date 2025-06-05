import { Component, OnInit, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-home-uk-fourty-five',
  templateUrl: './home-uk-fourty-five.component.html',
  styleUrl: './home-uk-fourty-five.component.scss',
})
export class HomeUkFourtyFiveComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(
      'Безкоштовний курс з трейдингу від Ігоря Арапова'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Безкоштовний курс з трейдингу: 130+ статей та 70 відеоуроків. Вивчіть основи, аналіз, психологію торгівлі та перевірені стратегії',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-05-30' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/freeeducationnew.webp',
    });

    this.gerRandom();

    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const element = this.document.getElementById(fragment);
          if (element) {
            // Отступ сверху в пикселях, например 80px (зависит от вашего меню)
            const offset = 80;

            // Позиция элемента относительно страницы
            const elementPosition =
              element.getBoundingClientRect().top + window.pageYOffset;

            // Скроллим с учётом отступа
            window.scrollTo({
              top: elementPosition - offset,
              behavior: 'smooth',
            });
          }
        }, 100);
      }
    });

    // FAQ для JSON-LD в зависимости от языка
    const faqs = [
      {
        question: 'Як змінити мову сайту?',
        answer:
          'У правому верхньому куті натисніть на іконку прапора та виберіть потрібну вам мову.',
      },
      {
        question: 'Як зв’язатися з нами?',
        answer:
          'Юридична адреса з реєстрацією доступна для всіх бажаючих на головній сторінці сайту з детальним зазначенням контактної інформації.',
      },
      {
        question: 'Як розпочати навчання?',
        answer:
          'Програму навчання потрібно вивчати послідовно в тій черговості тем, які вказані на сайті.',
      },
      {
        question: 'Кому підходить цей курс?',
        answer:
          'Курс призначений для початківців-трейдерів, які бажають опанувати основи біржової торгівлі. Він також буде корисним для тих, хто вже має базові знання і прагне систематизувати та поглибити свої навички.',
      },
      {
        question: 'Які теми входять до курсу?',
        answer:
          'Курс включає наступні розділи: Вступ до трейдингу, Технічний аналіз, Об’ємний аналіз, Концепція Smart Money, Психологія трейдингу, Фундаментальний аналіз, Криптовалюти, Приклади угод.',
      },
      {
        question: 'Чи потрібно платити за навчання?',
        answer:
          'Ні, курс повністю безкоштовний і доступний для самостійного вивчення без будь-яких прихованих платежів.',
      },
      {
        question: 'Чи є торгова система в курсі?',
        answer:
          'Так, курс включає торгову систему — практичні приклади угод та відеоуроки, що демонструють застосування теоретичних знань на практиці.',
      },
      {
        question: 'Чи потрібні спеціальні програми або платформи для проходження курсу?',
        answer:
          'Ні, усі матеріали доступні онлайн через ваш веб-браузер. Однак для практики трейдингу рекомендується встановити торгову платформу, що підходить для ваших цілей.',
      },
      {
        question: 'Як записатися на платний курс із наставником?',
        answer:
          'Контактна інформація для зв’язку вказана на сайті. Ви можете використовувати надані засоби зв’язку для отримання додаткової інформації або консультацій.',
      },
    ];

    // JSON-LD для FAQPage
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    };
// 
    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    let faqScript: HTMLScriptElement | any = null;
    scripts.forEach((script) => {
      try {
        const jsonContent = JSON.parse(script.textContent || '{}');
        if (jsonContent['@type'] === 'FAQPage') {
          faqScript = script;
        }
      } catch (e) {
        // Игнорируем некорректный JSON
      }
    });
    // Если скрипт FAQPage найден, заменяем его
    if (faqScript) {
      faqScript.text = JSON.stringify(faqSchema);
    } else {
      // Если скрипт не найден, создаём новый

      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(faqSchema);
      this.document.head.appendChild(script);
    }
    // 


     // Добавление JSON-LD в <head>
    // const script = this.document.createElement('script');
    // script.type = 'application/ld+json';
    // script.text = JSON.stringify(faqSchema);
    // this.document.head.appendChild(script);

  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
}
