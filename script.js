const priceScale = {
  first: 1.9332,
  second: 3.9884,
  third: 4.2884,
  fourth: 4.65,
  last: 5.5484,
};

const inputElems = document.querySelectorAll('input');
const resetInputs = document.querySelector('#reset-inputs');

document.querySelector('button').addEventListener('click', () => {
  const [faturaEl, maktuEl, sokakEl, yakitDegisimBirimEl] = inputElems;

  const fatura = +faturaEl.value;
  const maktu = +maktuEl.value;
  const sokak = +sokakEl.value;
  const yakitDegisimBirim = +yakitDegisimBirimEl.value;

  let harcananKw = 1;
  let harcananToplam = priceScale.first;

  while (true) {
    const genelToplam = genelToplamiHesapla(
      harcananToplam,
      yakitDegisimBirim * harcananKw
    );

    if (fatura / genelToplam <= 1) {
      harcananKwMiktariniYazdir();
      break;
    }

    if (harcananKw < 250) {
      harcananToplam += priceScale.first;
    } else if (harcananKw >= 250 && harcananKw < 500) {
      harcananToplam += priceScale.second;
    } else if (harcananKw >= 500 && harcananKw < 750) {
      harcananToplam += priceScale.third;
    } else if (harcananKw >= 750 && harcananKw < 1000) {
      harcananToplam += priceScale.fourth;
    } else if (harcananKw >= 1000) {
      harcananToplam += priceScale.last;
    }

    harcananKw += 1;
  }

  function createP(text) {
    const p = document.createElement('p');
    p.classList.add('result');
    p.textContent = text;
    return p;
  }

  function genelToplamiHesapla(
    enerjiHarcamaMiktari,
    yakitDegisimHarcamaMiktari
  ) {
    // her dongude harcama miktari verilecek
    const araToplam =
      maktu + sokak + enerjiHarcamaMiktari + yakitDegisimHarcamaMiktari;
    const kdv = araToplam * 0.1;
    const genelToplam = araToplam + kdv;
    return genelToplam;
  }

  function harcananKwMiktariniYazdir() {
    if (fatura && maktu && sokak && yakitDegisimBirimEl) {
      if (resetInputs.checked) {
        faturaEl.value = '';
        maktuEl.value = '';
        sokakEl.value = '';
        yakitDegisimBirimEl.value = '';
        resetInputs.checked = false;
      }

      document.querySelector('p') && document.querySelector('p').remove();

      const p = createP('Toplam harcanan kw: ' + harcananKw);
      let count = 1;
      while (harcananKw / 250 > 1) {
        p.appendChild(createP(`${count}. dilim: 250 kw`));
        count++;
        harcananKw -= 250;
        if (count > 4) break;
      }
      p.appendChild(createP(`${count}. dilim: ${harcananKw} kw`));
      return document.body.appendChild(p);
    }

    alert('Değerleri girin!');
  }
});
