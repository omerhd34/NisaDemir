# Nisa — Uzman Klinik Psikolog Web Sitesi

Uzman Klinik Psikolog **Nisa Demir** için geliştirilmiş, içerik yönetim panelli kişisel web sitesi. Ziyaretçiler terapi alanlarını inceleyebilir, blog yazılarını okuyabilir ve iletişim formu üzerinden mesaj gönderebilir; site sahibi ise admin panelinden tüm içeriği güncelleyebilir.

## Özellikler

### Ziyaretçi tarafı

- **Ana sayfa** — Alıntılar, görseller ve öne çıkan yazılar
- **Tanışalım** — Biyografi ve mesleki geçmiş
- **Çalışma alanları** — Bireysel terapi, online terapi vb. hizmet tanımları
- **Blog & makaleler** — Slug tabanlı makale listesi ve detay sayfaları
- **İletişim** — Çalışma saatleri, sosyal bağlantılar ve e-posta formu (Resend)
- **Açık/koyu tema** — Kullanıcı tercihi `localStorage` ile saklanır
- **SEO** — Dinamik sitemap, robots.txt, Open Graph görseli ve JSON-LD yapılandırılmış veri

### Admin paneli (`/admin`)

Cookie tabanlı oturum ile korunan içerik yönetimi:

| Bölüm | Yönetilen içerik |
|-------|------------------|
| Sosyal Medya | E-posta, Instagram kullanıcı adı ve URL |
| Ana Sayfa | Alıntı metinleri, yazarlar, kitaplar, görseller |
| Hakkımda | Tanışalım sayfası metinleri |
| Çalışma Alanları | Başlık, açıklama ve ikonlar |
| Yazılar | Blog yazısı ekleme, düzenleme, silme |
| İletişim | Çalışma saatleri |

## Teknoloji yığını

| Katman | Teknoloji |
|--------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | React 19, [Tailwind CSS 4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/) |
| Veritabanı | [Prisma](https://www.prisma.io/) + MySQL |
| E-posta | [Resend](https://resend.com/) |
| İkonlar | Lucide React, React Icons |

## Proje yapısı

```
nisa2/
├── app/
│   ├── (routes)/          # Ziyaretçi sayfaları (Ana sayfa, Tanışalım, Yazılar…)
│   ├── admin/             # Admin paneli ve giriş
│   ├── api/               # REST API route'ları
│   └── components/        # Paylaşılan UI bileşenleri
├── components/ui/         # Shadcn/Radix tabanlı temel bileşenler
├── context/               # React context (tema vb.)
├── lib/                   # Prisma, auth, site verisi yardımcıları
├── prisma/
│   ├── schema.prisma      # Veritabanı şeması
│   └── seed.js            # Başlangıç verisi
└── public/                # Statik dosyalar (görseller)
```

## Gereksinimler

- **Node.js** 18.18 veya üzeri
- **MySQL** veritabanı (yerel veya barındırılmış — örn. [Neon](https://neon.tech/), PlanetScale, Railway)
- **Resend** hesabı ve API anahtarı (iletişim formu için)

## Kurulum

### 1. Bağımlılıkları yükleyin

```bash
npm install
```

### 2. Ortam değişkenlerini ayarlayın

Proje kökünde `.env` dosyası oluşturun:

```env
# Veritabanı (MySQL)
DATABASE_URL="mysql://KULLANICI:SIFRE@HOST:3306/VERITABANI"

# Site URL (production'da zorunlu — sitemap ve SEO için)
NEXT_PUBLIC_SITE_URL="https://ornek.com"

# Admin girişi
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="guclu-sifre"
ADMIN_SECRET="uzun-rastgele-gizli-anahtar"

# İletişim formu e-postası
RESEND_API_KEY="re_xxxxxxxx"
```

> **Not:** Geliştirme ortamında `ADMIN_*` değişkenleri tanımlanmazsa varsayılan `admin` / `admin123` kullanılır. Production'da mutlaka güçlü değerler atayın.

### 3. Veritabanını hazırlayın

Şemayı uygulayıp başlangıç verisini yükleyin:

```bash
npm run db:setup
```

Bu komut sırasıyla `prisma db push` ve `prisma/seed.js` çalıştırır.

Alternatif olarak adım adım:

```bash
npm run db:push    # Şemayı veritabanına uygular
npm run db:seed    # Örnek içeriği yükler
```

### 4. Geliştirme sunucusunu başlatın

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde açılır. Admin paneli: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu (Turbopack) |
| `npm run build` | Production derlemesi (`prisma generate` dahil) |
| `npm run start` | Production sunucusu |
| `npm run lint` | ESLint kontrolü |
| `npm run db:generate` | Prisma client üretimi |
| `npm run db:push` | Şemayı veritabanına senkronize eder |
| `npm run db:seed` | Seed verisini yükler |
| `npm run db:setup` | `db:push` + `db:seed` |

## Sayfa rotaları

| Rota | Açıklama |
|------|----------|
| `/` | Ana sayfa |
| `/tanisalim` | Hakkımda |
| `/calisma_alanlarim` | Terapi alanları |
| `/yazilarim` | Blog listesi |
| `/yazilarim/[slug]` | Makale detayı |
| `/iletisim` | İletişim formu |
| `/admin/login` | Admin girişi |
| `/admin` | İçerik yönetim paneli |

## Production dağıtımı

Proje [Vercel](https://vercel.com/) veya benzeri bir platforma deploy edilebilir.

1. Ortam değişkenlerinin tamamını platform paneline ekleyin.
2. `NEXT_PUBLIC_SITE_URL` değerini canlı domain ile eşleştirin.
3. `DATABASE_URL` için erişilebilir bir MySQL bağlantısı sağlayın.
4. Resend'de gönderici domain'inizi doğrulayın; `app/api/contact/route.js` içindeki `from` adresini buna göre güncelleyin.
5. Build komutu: `npm run build` — Start komutu: `npm run start`

`VERCEL_URL` tanımlandığında site URL'si otomatik olarak türetilir; yine de `NEXT_PUBLIC_SITE_URL` kullanımı önerilir.

## Lisans

Bu proje özel (`private`) bir projedir.
