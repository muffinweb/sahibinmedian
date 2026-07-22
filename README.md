# 📊 Sahibinden.com Medyan Fiyat Analizörü

Arama sonuçları sayfasındaki gayrimenkul / araç ilanlarını DOM üzerinden anlık olarak ayrıştırıp **Medyan Toplam Fiyat** ve **Medyan m² Birim Fiyatı** değerlerini hesaplayan, tarayıcı tabanlı (Bookmarklet / Console) hafif bir JavaScript aracıdır.

---

## ✨ Özellikler

* **Otomatik Reklam Temizleme:** Sponsorlu ve reklam içeren satırları (`nativeAd`) otomatik tespit eder ve analiz dışı bırakır.
* **Gelişmiş Veri Ayrıştırma:** Fiyat ve metrekare bilgilerindeki noktalama, para birimi ve metin karakterlerini temizleyerek hassas sayısal verilere dönüştürür.
* **Akıllı Medyan Hesabı:** Aşırı yüksek veya düşük (aykırı/outlier) ilan fiyatlarından etkilenmeyen **gerçek pazar medyanını** hesaplar.
* **Kolay UI / Arayüz:** Konsola yapıştırıldığı anda sayfanın sağ üst köşesine yüzen şık bir panel ekler.
* **SweetAlert2 Entegrasyonu:** Analiz sonuçlarını kullanıcıya derli toplu ve şık bir bildirim penceresinde sunar.

---

## 🚀 Kurulum ve Kullanım

Herhangi bir kurulum veya ek tarayıcı eklentisi gerektirmez.

1. **Sahibinden.com** üzerinde analiz etmek istediğin arama/liste sayfasına git.
2. Klavyenden `F12` veya `Ctrl + Shift + I` (Mac için `Cmd + Option + I`) tuşlarına basarak **Geliştirici Araçları'nı (DevTools)** aç.
3. **Console (Konsol)** sekmesine geç.
4. [`index.js`](./sahibinmedian.js) (veya ana script) kodunu kopyalayıp konsola yapıştır ve `Enter` tuşuna bas.
5. Ekranda beliren sağ üstteki **📊 Medyan Hesapla** butonuna tıkla!

---

## 📸 Ekran Görüntüsü / Görsel Temsili

```text
+-----------------------------------------------------------+
| Sahibinden Medyan Analiz                                  |
| [ 📊 Medyan Hesapla ]                                     |
+-----------------------------------------------------------+
                             │
                             ▼
+-----------------------------------------------------------+
| 📊 Medyan Analiz Sonucu                                   
| ─────────────────────────────────────────────────────────
| İncelenen İlan Sayısı: 50 adet                          
| Medyan Toplam Fiyat:   3.250.000 TL                        
| Medyan m² Birim Fiyatı:    32.500 TL/m²                 
+-----------------------------------------------------------+
