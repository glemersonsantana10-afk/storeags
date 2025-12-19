let searchActive = false;

/* ===============================
   PRODUTOS – CADASTRAR AQUI
   =============================== */


const products = [
  {
    id: 1,
    name: 'CASE PARA HD',
    price: 34.99,
				images: ['case.jpg','case2.jpg','case3.jpg'],
    description: `
✔ Produto: Case para HD
✔ Compatibilidade: HDs 2.5” (SATA)
✔ Interface: USB (transferência rápida de dados)
✔ Proteção contra impactos e riscos
✔ Design compacto e portátil
✔ Ideal para armazenar, transportar e proteger seu HD
`
  },
  {
    id: 2,
    name: 'CARTÃO DE MEMÓRIA',
    price: 44.99,
				images: ['cardsd.jpg','cardsd2.jpg','cardsd3.jpg'],
    description: `
✔ Capacidade: 64GB
✔ Marca: SanDisk
✔ Alta velocidade e desempenho
✔ Ideal para celulares, câmeras e outros dispositivos compatíveis
✔ Armazene fotos, vídeos e arquivos com segurança
`
  },
  {
    id: 3,
    name: 'HD 500GB',
    price: 149.99,
		images: ['hd.jpg','hd2.jpg','hd3.jpg'],
    description: `
✔ Produto: HD Toshiba 500GB
✔ Capacidade: 500GB
✔ Marca: Toshiba
✔ Ideal para armazenar fotos, vídeos, músicas e documentos
✔ Alto desempenho e confiabilidade
✔ Compatível com desktops e notebooks
`
  },
  {
    id: 4,
    name: 'TV PANASONIC',
    price: 440.00,
      images: ['tv.jpg','tv2.jpg','tv3.jpg'],
    description: `
✔ Produto: TV Panasonic 32” Smart Viera (Usada)
✔ Tela: 32 polegadas
✔ Sistema: Smart Viera
✔ Marca: Panasonic
✔ Estado: Usada, funcionando
✔ Observação: não recebe sinal do controle remoto
✔ Acompanha teclado de PC para uso normal
✔ Ideal para streaming e aplicativos
`
  },
  {
    id: 5,
    name: 'PC I5 COMPLETO',
    price: 1700.00,
      images: ['pc.jpg','pc2.jpg','pc3.jpg'],
    description: `
✔ Produto: PC Completo Intel Core i5
✔ Processador: i5 3470
✔ Placa de vídeo: GTX 550 Ti
✔ Memória RAM: 16GB
✔ HD 1TB + SSD 240GB
✔ Wi-Fi e Bluetooth
✔ Ideal para jogos leves, estudos e trabalho
✔ Acompanha caixa de som
✔ Acompanha controle para jogos
`
  },
  
    {
    id: 6,
    name: 'IPTV AGS',
    price: 20.00,
      images: ['iptv.jpg','iptv2.jpg','iptv3.jpg'],
    description: `
🎬 O que você encontra na AGS IPTV:
✔Canais abertos e fechados
✔Filmes e séries atualizados
✔Esportes ao vivo
✔Conteúdo infantil
✔Programação 24h
✔Qualidade de imagem superior
✔Compatível com Smart TV, TV Box, celular, computador e tablets
`
  }
];

const catalog = document.getElementById('catalog');
const modal = document.getElementById('productModal');
let cart = [];







function renderProducts(){
  catalog.innerHTML = '';
  products.forEach(p => {
    catalog.innerHTML += `
      <div class="card" onclick="openProduct(${p.id})">
        <img src="${p.images[0]}" onclick="event.stopPropagation(); addToCart(${p.id}, this)">
        <h3>${p.name}</h3>
        <p>R$ ${p.price.toFixed(2)}</p>
        <button>Ver Produto</button>
      </div>
    `;
  });
}

function openProduct(id){
  const p = products.find(prod => prod.id === id);

  const thumbs = p.images.length > 1
    ? `
      <div class="thumbs">
        ${p.images.map((img,i)=>`
          <img src="${img}" 
               class="thumb ${i===0?'active':''}" 
               onclick="changeImage(this,'${img}')">
        `).join('')}
      </div>
    `
    : '';

  modal.innerHTML = `
  <div class="card product-card">
      <img src="${p.images[0]}" id="mainImage" class="main-img">

      ${thumbs}

      <h2>${p.name}</h2>

      <pre style="white-space:pre-wrap">${p.description}</pre>

      <div class="btn-group">
        <button onclick="addToCart(${p.id})">Adicionar ao carrinho</button>
        <button onclick="closeModal()">Voltar</button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  setTimeout(()=>modal.classList.add('show'),10);
}


function closeModal(){
  modal.classList.remove('show');
  setTimeout(()=>modal.classList.add('hidden'),300);
}


function addToCart(id, imgEl){
  const product = products.find(p => p.id === id);

  // 🔒 FALLBACK: se não veio imagem, usa a do modal
  if(!imgEl){
    imgEl = document.getElementById('mainImage');
  }

  if(imgEl){
    animateToCart(imgEl);
  }

  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  document.getElementById('cartCount').innerText = cart.length;

  const cartIcon = document.querySelector('.cart-btn');
  cartIcon.classList.add('bounce');
  setTimeout(()=>cartIcon.classList.remove('bounce'),300);
}



			renderProducts();

							const cartModal = document.getElementById('cartModal');

						document.querySelector('.cart-btn').onclick = openCart;

function openCart(){
  renderCart();
cartModal.classList.remove('hidden');
setTimeout(()=>cartModal.classList.add('show'),10);

}

function closeCart(){
  cartModal.classList.remove('show');
  setTimeout(()=>cartModal.classList.add('hidden'),300);
}


function removeFromCart(index){
  cart.splice(index,1);
  localStorage.setItem('cart', JSON.stringify(cart));
  document.getElementById('cartCount').innerText = cart.length;
  renderCart();
}


function renderCart(){

  if(cart.length === 0){
    cartModal.innerHTML = `
  <div class="card cart-card">

        <h2>Carrinho vazio</h2>
        <button onclick="closeCart()">Fechar</button>
      </div>
    `;
    return;
  }

  let total = 0;

 let items = cart.map((p,i)=>{
  total += p.price;

  return `
    <div class="cart-item">
      <img src="${p.images[0]}" class="cart-thumb">

      <div class="cart-info">
        <strong>${p.name}</strong>
        <span>R$ ${p.price.toFixed(2)}</span>
      </div>

      <button class="remove-btn" onclick="removeFromCart(${i})">✕</button>
    </div>
  `;
}).join('');


  cartModal.innerHTML = `
    <div class="card" style="max-width:400px">
      <h2>Carrinho</h2>

      <div class="cart-list">
        ${items}
      </div>

      <h3>Total: R$ ${total.toFixed(2)}</h3>

      <div style="margin-top:20px;display:flex;flex-direction:column;gap:14px">
        <button onclick="goToForm()">Finalizar compra</button>
        <button onclick="closeCart()">Voltar</button>
      </div>
    </div>
  `;
}


							const formModal = document.getElementById('formModal');

function goToForm(){
  closeCart();

	formModal.classList.remove('hidden');
	setTimeout(()=>formModal.classList.add('show'),10);
	formModal.innerHTML = `
  <div class="card form-card">
    <h2>Dados para entrega</h2>

    <input id="nome" placeholder="Nome completo">
    <input id="contato" placeholder="WhatsApp">
    <input id="cep" placeholder="CEP">
    <input id="endereco" placeholder="Endereço completo">

			<div style="margin-top:18px;display:flex;flex-direction:column;gap:14px">
				<button onclick="goToPayment()">Continuar</button>
				<button onclick="closeForm()">Voltar</button>
			</div>

  </div>
`;

  cartModal.classList.remove('hidden');
setTimeout(()=>cartModal.classList.add('show'),10);

}

function closeForm(){
  formModal.classList.remove('show');
  setTimeout(()=>formModal.classList.add('hidden'),300);
}


function goToPayment(){
  const nome = document.getElementById('nome').value.trim();
  const contato = document.getElementById('contato').value.trim();
  const cep = document.getElementById('cep').value.trim();
  const endereco = document.getElementById('endereco').value.trim();

  if(!nome || !contato || !cep || !endereco){
    toast('⚠️ Preencha todos os campos');
    return;
  }

  if(!/^\(\d{2}\) \d{5}-\d{4}$/.test(contato)){
    toast('📞 WhatsApp inválido');
    return;
  }

  if(!/^\d{5}-\d{3}$/.test(cep)){
    toast('📍 CEP inválido');
    return;
  }

  closeForm();
  openPayment(nome, contato, cep, endereco);
}


							const paymentModal = document.getElementById('paymentModal');

function openPayment(nome, contato, cep, endereco){
  formModal.classList.remove('show');
  setTimeout(()=>formModal.classList.add('hidden'),300);

  paymentModal.classList.remove('hidden');
  setTimeout(()=>paymentModal.classList.add('show'),10);

  // aqui entra o HTML do PIX

  let total = 0;
  let lista = cart.map(p=>{
    total += p.price;
    return `<li>${p.name} — R$ ${p.price.toFixed(2)}</li>`;
  }).join('');

  paymentModal.innerHTML = `
    <div class="card payment-card">
      <h2>Resumo da Compra</h2>

      <ul style="text-align:left;margin:10px 0">
        ${lista}
      </ul>

      <p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>

      <hr style="margin:15px 0">

      <p><strong>Cliente:</strong> ${nome}</p>
      <p><strong>WhatsApp:</strong> ${contato}</p>
      <p><strong>CEP:</strong> ${cep}</p>
      <p><strong>Endereço:</strong> ${endereco}</p>

				<img src="pix.jpeg" style="width:100%;margin:14px 0;border-radius:12px">

					<div style="
  background:#0b2a5f;
  padding:14px;
  border-radius:12px;
  margin-bottom:14px;
  text-align:center;
">

  <p style="font-size:13px;opacity:.8">Chave PIX (copiar e colar)</p>

  <strong id="pixKey" style="font-size:16px;display:block;margin:6px 0">
    98984925359
  </strong>

  <button onclick="copyPix()" style="margin-top:8px">
    Copiar chave PIX
  </button>

									<p style="margin-top:10px;font-size:14px">
								👤 Glemerson Santana Santos
							</p>
						</div>


      <button onclick="sendWhatsApp('${nome}','${contato}','${cep}','${endereco}',${total})">
        Já paguei
      </button>
    </div>
  `;
  paymentModal.classList.remove('hidden');
}

function sendWhatsApp(nome, contato, cep, endereco, total){
  let produtos = cart.map(p => `- ${p.name}`).join('\n');

  const msg = `
*NOVA COMPRA - AGS STORE*
👤 Nome: ${nome}
📞 WhatsApp: ${contato}
📍 CEP: ${cep}
🏠 Endereço: ${endereco}

🛒 Produtos:
${produtos}

💰 Total: R$ ${total.toFixed(2)}
`;

  window.open(
    `https://wa.me/5585988855751?text=${encodeURIComponent(msg)}`,
    '_blank'
  );

  // ✅ Limpa carrinho após envio
  cart = [];
  localStorage.removeItem('cart');
  document.getElementById('cartCount').innerText = 0;
}




function toast(msg){
  const t = document.getElementById('toast');
  t.innerText = msg;
  t.classList.remove('hidden');
  t.classList.add('show');

  setTimeout(()=>{
    t.classList.remove('show');
  },2500);
}

function copyPix(){
  navigator.clipboard.writeText('98984925359');
  toast('✅ Chave PIX copiada');
}

function changeImage(el, src){
  document.getElementById('mainImage').src = src;

  document.querySelectorAll('.thumb')
    .forEach(t => t.classList.remove('active'));

  el.classList.add('active');
}



const banners = [
  {
    img: 'banner1.jpg',
    link: 'https://wa.me/5585988855751?text=Olá!%20Quero%20o%20IPTV%20da%20AGS'
  },
  {
    img: 'banner2.jpg',
    link: 'https://wa.me/5585988855751?text=Tenho%20interesse%20na%20promoção%20da%20AGS'
  },
  {
    img: 'banner3.jpg',
    link: 'https://wa.me/5585988855751?text=Quero%20saber%20mais%20sobre%20os%20produtos%20da%20AGS'
  }
];

				let bannerIndex = 0;
						const banner = document.getElementById('banner');

function renderBanner(){
  if (banners.length === 0) return;

  banner.innerHTML = `
    <a href="${banners[bannerIndex].link}" target="_blank">
      <img src="${banners[bannerIndex].img}">
    </a>
  `;

  // ⚠️ SÓ MOSTRA SE NÃO ESTIVER PESQUISANDO
  if (!searchActive) {
    banner.classList.remove('hidden');
  }
}


		renderBanner();

setInterval(() => {
  bannerIndex = (bannerIndex + 1) % banners.length;
  renderBanner();
}, 5000);



								//MASCARAS

						document.addEventListener('input', e=>{
  if(e.target.id === 'contato'){
    let v = e.target.value.replace(/\D/g,'');
    v = v.replace(/^(\d{2})(\d)/,'($1) $2');
    v = v.replace(/(\d{5})(\d)/,'$1-$2');
    e.target.value = v.slice(0,15);
  }
});

						document.addEventListener('input', e=>{
  if(e.target.id === 'cep'){
    let v = e.target.value.replace(/\D/g,'');
    v = v.replace(/^(\d{5})(\d)/,'$1-$2');
    e.target.value = v.slice(0,9);
  }
});




								
/* ===============================BUSCADOR DE PRODUTOS=============================== */
								

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {
  const termo = searchInput.value.trim().toLowerCase();

  searchActive = termo.length > 0;

  // Mostra ou esconde banner
  banner.classList.toggle('hidden', searchActive);

  // Filtra produtos
  document.querySelectorAll('.card').forEach(card => {
    const nome = card.querySelector('h3').innerText.toLowerCase();
    card.style.display = nome.includes(termo) ? 'block' : 'none';
  });
});




function animateToCart(imgEl){
  const img = imgEl.cloneNode(true);
  const rect = imgEl.getBoundingClientRect();
  const cartRect = document.querySelector('.cart-btn').getBoundingClientRect();

  img.classList.add('fly-img');

  img.style.top = rect.top + 'px';
  img.style.left = rect.left + 'px';
  img.style.width = rect.width + 'px';
  img.style.height = rect.height + 'px';

  document.body.appendChild(img);

  requestAnimationFrame(() => {
    img.style.top = cartRect.top + 'px';
    img.style.left = cartRect.left + 'px';
    img.style.width = '30px';
    img.style.height = '30px';
    img.style.opacity = '0.3';
  });

  setTimeout(() => img.remove(), 800);
}




function renderProductsFiltered(lista){
  catalog.innerHTML = '';

  if(lista.length === 0){
    catalog.innerHTML = `
      <p style="grid-column:1/-1;text-align:center;opacity:.7">
        Nenhum produto encontrado
      </p>
    `;
    return;
  }

  lista.forEach(p => {
    catalog.innerHTML += `
      <div class="card" onclick="openProduct(${p.id})">
        <img src="${p.images[0]}">
        <h3>${p.name}</h3>
        <p>R$ ${p.price.toFixed(2)}</p>
        <button>Ver Produto</button>
      </div>
    `;
  });
}




