// Sayfa ilk açıldığında kayıtlı notları getir
window.onload = function() {
    notlariYukle();
};

function notEkle() {
    const input = document.getElementById('noteInput');
    const category = document.getElementById('categorySelect');
    const list = document.getElementById('noteList');

    if (input.value !== "") {
        const notObjesi = {
            metin: input.value,
            kategori: category.value
        };

        // Ekrana ekle
        notuEkranaBas(notObjesi);
        
        // Hafızaya kaydet
        notuKaydet(notObjesi);

        input.value = ""; // Kutuyu temizle
    }
}

// Notu ekrana yazdıran fonksiyon
function notuEkranaBas(not) {
    const list = document.getElementById('noteList');
    const li = document.createElement('li');
    li.setAttribute('data-category', not.kategori);
    
    li.innerHTML = `
        <span><strong>[${not.kategori}]</strong> ${not.metin}</span>
        <button onclick="notuSil(this, '${not.metin}')" style="background:none; color:white; border:none; cursor:pointer;">❌</button>
    `;
    list.appendChild(li);
}

// Tarayıcı hafızasına (LocalStorage) kaydetme
function notuKaydet(not) {
    let notlar = JSON.parse(localStorage.getItem('benimNotlarim')) || [];
    notlar.push(not);
    localStorage.setItem('benimNotlarim', JSON.stringify(notlar));
}

// Sayfa yenilendiğinde notları hafızadan çekme
function notlariYukle() {
    let notlar = JSON.parse(localStorage.getItem('benimNotlarim')) || [];
    notlar.forEach(not => notuEkranaBas(not));
}

// Notu silme ve hafızadan kaldırma
function notuSil(buton, metin) {
    // Ekrandan sil
    buton.parentElement.remove();
    
    // Hafızadan sil
    let notlar = JSON.parse(localStorage.getItem('benimNotlarim')) || [];
    const yeniNotlar = notlar.filter(n => n.metin !== metin);
    localStorage.setItem('benimNotlarim', JSON.stringify(yeniNotlar));
}

// Filtreleme fonksiyonun (Daha önce yazdığımız gibi kalabilir)
function notlariFiltrele(secilenKategori) {
    const tumNotlar = document.querySelectorAll('#noteList li');
    tumNotlar.forEach(not => {
        const notunKategorisi = not.getAttribute('data-category');
        if (secilenKategori === 'Hepsi' || notunKategorisi === secilenKategori) {
            not.style.display = 'flex';
        } else {
            not.style.display = 'none';
        }
    });
}