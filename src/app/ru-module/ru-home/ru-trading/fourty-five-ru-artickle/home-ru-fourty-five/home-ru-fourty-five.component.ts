import {
  Component,
  OnInit,
  Inject,
  signal,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home-ru-fourty-five',
  templateUrl: './home-ru-fourty-five.component.html',
  styleUrl: './home-ru-fourty-five.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeRuFourtyFiveComponent implements OnInit, AfterViewInit {
  readonly panelOpenState = signal(false);
  constructor(
    private meta: Meta,
    private titleService: Title,
    private articleServ: ArticlesService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    

    this.titleService.setTitle(
      'Бесплатный курс по  трейдингу от Игоря Арапова'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({
      name: 'description',
      content:
        'Бесплатный курс по трейдингу: 130+ статей и 70 видеоуроков. Изучите основы, анализ, психологию торговли и проверенные стратегии',
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
        question: 'Как поменять язык сайта?',
        answer:
          'В правом верхнем углу нажмите на иконку значка флага и выберите подходящий вам язык.',
      },
      {
        question: 'Как связаться с нами?',
        answer:
          'Юридический адрес с регистрацией доступен для всех желающих на главной странице сайта с подробным указанием контактной информации',
      },

      {
        question: 'Как начать обучение?',
        answer:
          'Программу обучения нужно  изучать последовательно в той очередности тем которые указаны на сайте',
      },
      {
        question: 'Кому подходит этот курс?',
        answer:
          'Курс предназначен для начинающих трейдеров, желающих освоить основы биржевой торговли. Он также будет полезен тем, кто уже имеет базовые знания и стремится систематизировать и углубить свои навыки.',
      },
      {
        question: 'Какие темы входят в курс?',
        answer:
          'Курс включает следующие разделы: Введение в трейдинг, Технический анализ, Объемный анализ, Концепция Smart Money, Психология трейдинга, Фундаментальный анализ, Криптовалюты, Примеры сделок',
      },
      {
        question: 'Нужно ли платить за обучение?',
        answer:
          'Нет, курс полностью бесплатный и доступен для самостоятельного изучения без каких-либо скрытых платежей.',
      },
      {
        question: 'Есть ли торговая система в курсе?',
        answer:
          'Да, курс включают торговую систему -  практические примеры сделок и видео-уроки, демонстрирующие применение теоретических знаний на практике.',
      },
      {
        question:
          'Нужны ли специальные программы или платформы для прохождения курса?',
        answer:
          'Нет, все материалы доступны онлайн через ваш веб-браузер. Однако для практики трейдинга рекомендуется установить торговую платформу, подходящую для ваших целей.',
      },
      {
        question: 'Как записаться на платный курс с наставником?',
        answer:
          'Контактная информация для связи  указана на сайте. Вы можете использовать предоставленные средства связи для получения дополнительной информации или консультаций.',
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

    // -----------------------

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
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.articleServ.getRandomUkArticles();
  }
  ngAfterViewInit() {
    // Затримка для забезпечення ініціалізації Angular Material
    setTimeout(() => {
      this.cdr.detectChanges();
    this.cdr.markForCheck();
      // Запускаємо перевірку після рендерингу
    }, 100);
  }
}
