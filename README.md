
# MultiApiApp

Bu proje, Rapid API'daki farklı API'lerden veri çekerek çeşitli bilgileri bir araya getiren bir full-stack web uygulamasıdır.

## Özellikler

*   **Döviz Kurları:** Güncel DOLAR-TL kur bilgisini gösterir.
*   **Google Haberler:** Google Haberler'den Türkiye'deki haber başlıklarını listeler.
*   **Film Önerileri:** Film türü üzerinden kullanıcılara öneriler sunar.
*   **Hava Durumu:** Şehirler için güncel hava durumu bilgilerini sağlar.
*   **Kelime Çevirmeni:** İngilizce kelimeyi Türkçeye çevirir.
*   **X Trendleri (Eski Twitter):** Türkiye'deki popüler konuları (trendleri) gösterir.

## Teknolojiler

### Backend (MultiApiBackend)

*   **ASP.NET Core:** 
*   **C#:** 

### Frontend (multi-api-frontend)

*   **React:** 
*   **TypeScript:** 
*   **Vite:** 
*   **TailwindCSS**


## Kurulum ve Çalıştırma

Projenin hem backend hem de frontend kısımlarını çalıştırmak için aşağıdaki adımları izleyin.

### Önkoşullar

*   [.NET SDK](https://dotnet.microsoft.com/download) (En az .NET 6 veya üzeri önerilir)
*   [Node.js](https://nodejs.org/en/download/) (LTS sürümü önerilir)
*   [npm](https://www.npmjs.com/get-npm) (Node.js ile birlikte gelir)

### Adımlar

1.  **Depoyu Klonlayın:**

    ```bash
    git clone https://github.com/kayamuhammet/RapidAPIProject.git
    cd MultiApiApp
    ```

2.  **Backend'i Çalıştırın:**

    Backend projesi `MultiApiBackend` dizininde bulunur.

    ```bash
    cd MultiApiBackend
    dotnet restore
    dotnet run
    ```
    Backend başarıyla çalıştığında, API endpoint'lerine genellikle `https://localhost:5xxx` gibi bir adresten erişilebilir olacaktır (port numarasını konsol çıktısından kontrol edebilirsiniz).

3.  **Frontend'i Çalıştırın:**

    Frontend projesi `multi-api-frontend` dizininde bulunur.

    ```bash
    cd ../multi-api-frontend
    npm install
    npm run dev
    ```
    Frontend uygulaması başarıyla çalıştığında, genellikle `http://localhost:5173` gibi bir adresten erişilebilir olacaktır.

## Kullanım

İlk olarak RapidAPİ sayfası üzerinden "key bilgisini" almalısınız. Aldığınız key bilgisini appsettings.json dosyasına yazmalısınız. Sonrasında projeyi ayağa kaldırabilirsiniz.

```bash
"RapidApi": {
    "Key": "xxxxxxxxxxxxxxxxxxxxxxx"
  }
```
Her iki kısım da (backend ve frontend) çalıştıktan sonra, web tarayıcınızı `http://localhost:5173` adresine yönlendirerek uygulamaya erişebilirsiniz. Uygulama, backend API'leri ile iletişim kurarak verileri çekecek ve kullanıcı arayüzünde gösterecektir. 