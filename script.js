const [billElem, specificTaxElem, streetTaxElem, fuelExchangeUnitTaxElem] =
  document.querySelectorAll('input');

const resetInputs = document.querySelector('#reset');

document.querySelector('button').addEventListener('click', (e) => {
  const bill = +billElem.value;
  const specific = +specificTaxElem.value;
  const streetTax = +streetTaxElem.value;
  const fuelExhangeUnitTax = +fuelExchangeUnitTaxElem.value;

  const kw = 1;

  let harcananKw = 1;
  let harcananToplam = 1.611;

  while (true) {
    if (harcananKw < 250) {
      const tarife = 1.611;
      if (
        bill /
          genelToplamiHesapla(
            harcananToplam,
            fuelExhangeUnitTax * harcananKw
          ) <=
        1
      )
        return harcananKwMiktariniYazdir();
      else {
        harcananKw += 1;
        harcananToplam += kw * tarife;
      }
    } else if (harcananKw >= 250 && harcananKw < 500) {
      const tarife = 3.3237;
      if (
        bill /
          genelToplamiHesapla(
            harcananToplam,
            fuelExhangeUnitTax * harcananKw
          ) <=
        1
      )
        return harcananKwMiktariniYazdir();
      else {
        harcananKw += 1;
        harcananToplam += kw * tarife;
      }
    } else if (harcananKw >= 500 && harcananKw < 750) {
      const tarife = 3.5737;
      if (
        bill /
          genelToplamiHesapla(
            harcananToplam,
            fuelExhangeUnitTax * harcananKw
          ) <=
        1
      )
        return harcananKwMiktariniYazdir();
      else {
        harcananKw += 1;
        harcananToplam += kw * tarife;
      }
    } else if (harcananKw >= 750 && harcananKw < 1000) {
      const tarife = 3.87;
      if (
        bill /
          genelToplamiHesapla(
            harcananToplam,
            fuelExhangeUnitTax * harcananKw
          ) <=
        1
      )
        return harcananKwMiktariniYazdir();
      else {
        harcananKw += 1;
        harcananToplam += kw * tarife;
      }
    } else if (harcananKw >= 1000) {
      const tarife = 4.6137;
      if (
        bill /
          genelToplamiHesapla(
            harcananToplam,
            fuelExhangeUnitTax * harcananKw
          ) <=
        1
      )
        return harcananKwMiktariniYazdir();
      else {
        harcananKw += 1;
        harcananToplam += kw * tarife;
      }
    }
  }

  function createP(html) {
    const p = document.createElement('p');
    p.innerHTML = html;
    return p;
  }

  function genelToplamiHesapla(
    enerjiHarcamaMiktari,
    yakitDegisimHarcamaMiktari
  ) {
    // her dongude harcama miktari verilecek
    const araToplam =
      specific + streetTax + enerjiHarcamaMiktari + yakitDegisimHarcamaMiktari;
    const kdv = araToplam * 0.1;
    const genelToplam = araToplam + kdv;
    return genelToplam;
  }

  function harcananKwMiktariniYazdir() {
    if (resetInputs.checked) {
      billElem.value = '';
      specificTaxElem.value = '';
      streetTaxElem.value = '';
      fuelExchangeUnitTaxElem.value = '';
      resetInputs.checked = false;
    }

    document.querySelector('p') && document.querySelector('p').remove();
    const p = createP('harcanan kw: ' + harcananKw + '<br/>');
    let count = 1;
    while (harcananKw / 250 > 1) {
      p.appendChild(createP(`<p>${count}. dilim: 250 kw</p>`));
      count++;
      harcananKw -= 250;
      if (count > 4) break;
    }
    p.appendChild(createP(`${count}. dilim: ${harcananKw} kw`));
    document.body.appendChild(p);
  }
});
