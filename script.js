
function notEkle() {
    const input = document.getElementById('noteInput');
    const category = document.getElementById('categorySelect');
    const list = document.getElementById('noteList');

    if (input.value !== "") {
        const li = document.createElement('li');
        
        // Notun hangi kategoriye ait olduğunu etikete işliyoruz
        li.setAttribute('data-category', category.value);
        
        li.innerHTML = `
            <span><strong>[${category.value}]</strong> ${input.value}</span>
            <button onclick="this.parentElement.remove()" style="background:none; color:white; border:none; cursor:pointer;">❌</button>
        `;
        
        list.appendChild(li);
        input.value = "";
    }
}

function notlariFiltrele(secilenKategori) {
    const tumNotlar = document.querySelectorAll('#noteList li');
    
    tumNotlar.forEach(not => {
        const notunKategorisi = not.getAttribute('data-category');
        
        if (secilenKategori === 'Hepsi' || notunKategorisi === secilenKategori) {
            not.style.display = 'flex'; // Göster
        } else {
            not.style.display = 'none'; // Gizle (Farklı klasördeymiş gibi)
        }
    });
}
