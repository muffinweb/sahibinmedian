(function () {
    // 1. SweetAlert2 Kütüphanesini Sayfaya Dinamik Ekle
    if (!document.getElementById("swal2-script")) {
        const script = document.createElement("script");
        script.id = "swal2-script";
        script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
        document.head.appendChild(script);
    }

    // 2. Medyan Hesaplama Fonksiyonu
    function calculateMedian(numbers) {
        if (numbers.length === 0) return 0;
        const sorted = [...numbers].sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);

        if (sorted.length % 2 === 0) {
            return Math.round((sorted[middle - 1] + sorted[middle]) / 2);
        } else {
            return sorted[middle];
        }
    }

    // 3. Tabloyu Taramak ve Analiz Etmek İçin Ana Fonksiyon
    function analyzeTable() {
        const rows = document.querySelectorAll("#searchResultsTable tbody tr.searchResultsItem");
        const prices = [];
        const pricesPerSqm = [];

        rows.forEach(row => {
            // Reklam satırlarını atla
            if (row.classList.contains("nativeAd")) return;
            if (row.classList.contains("searchResultsPromoSuper")) return;

            // Fiyat Temizleme
            const priceEl = row.querySelector("td.searchResultsPriceValue span");
            let price = 0;
            if (priceEl) {
                const priceText = priceEl.innerText.replace(/[^0-9]/g, "");
                price = parseFloat(priceText) || 0;
            }

            // Metrekare Temizleme
            const attributeCells = row.querySelectorAll("td.searchResultsAttributeValue");
            const sqmRaw = attributeCells[0] ? attributeCells[0].innerText.trim() : "0";
            const sqm = parseFloat(sqmRaw.replace(".", "").replace(",", ".")) || 0;

            if (price > 0) {
                prices.push(price);
                if (sqm > 0) {
                    pricesPerSqm.push(Math.round(price / sqm));
                }
            }
        });

        if (prices.length === 0) {
            if (window.Swal) {
                Swal.fire({
                    icon: 'warning',
                    title: 'İlan Bulunamadı',
                    text: 'Sayfada analiz edilecek geçerli ilan satırı tespit edilemedi.'
                });
            } else {
                alert('Sayfada analiz edilecek geçerli ilan satırı bulunamadı.');
            }
            return;
        }

        const medianPrice = calculateMedian(prices);
        const medianPricePerSqm = calculateMedian(pricesPerSqm);

        // SweetAlert2 ile Gösterim
        if (window.Swal) {
            Swal.fire({
                title: '📊 Medyan Analiz Sonucu',
                html: `
                    <div style="text-align: left; font-size: 15px; line-height: 1.8;">
                        <p><b>Incelenen Ilan Sayisi:</b> ${prices.length} adet</p>
                        <hr style="margin: 10px 0; border: 0; border-top: 1px solid #eee;">
                        <p><b>Medyan Toplam Fiyat:</b> <span style="color: #2e7d32; font-weight: bold;">${medianPrice.toLocaleString('tr-TR')} TL</span></p>
                        <p><b>Medyan m² Birim Fiyati:</b> <span style="color: #1565c0; font-weight: bold;">${medianPricePerSqm.toLocaleString('tr-TR')} TL/m²</span></p>
                    </div>
                `,
                icon: 'success',
                confirmButtonText: 'Harika!',
                confirmButtonColor: '#3085d6'
            });
        } else {
            alert(`Medyan Fiyat: ${medianPrice.toLocaleString('tr-TR')} TL\nMedyan m² Fiyatı: ${medianPricePerSqm.toLocaleString('tr-TR')} TL/m²`);
        }
    }

    // 4. Ekranın Sağ Üstüne Arayüz (UI) Butonunu Ekle
    const existingUi = document.getElementById("median-analyzer-ui");
    if (existingUi) existingUi.remove(); // Tekrar çalıştırılırsa eskiyi kaldır

    const uiContainer = document.createElement("div");
    uiContainer.id = "median-analyzer-ui";
    uiContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 999999;
        background: #ffffff;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        border: 2px solid #ffe800;
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
    `;

    uiContainer.innerHTML = `
        <div style="font-weight: bold; font-size: 13px; color: #333;">Sahibinden Medyan Analiz</div>
        <button id="btn-run-median-analysis" style="
            background: #ffe800;
            color: #000;
            border: none;
            padding: 8px 16px;
            font-weight: bold;
            font-size: 13px;
            border-radius: 6px;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: transform 0.1s ease;
        ">📊 Medyan Hesapla</button>
    `;

    document.body.appendChild(uiContainer);

    // Buton Tıklama Etkinliği
    document.getElementById("btn-run-median-analysis").addEventListener("click", analyzeTable);

})();
