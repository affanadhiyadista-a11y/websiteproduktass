const WHATSAPP_NUMBER = "6285715385002";

const products = {
  Nayala:{price:"Rp80.000",image:"assets/nayala.jpg",type:"Handbag",description:"Tas wanita dengan desain simple dan elegan. Cocok digunakan sehari-hari maupun acara santai."},
  Miraida:{price:"Rp70.000",image:"assets/miraida.jpg",type:"Handbag",description:"Tas wanita stylish dengan bahan tebal dan berkualitas, ringan serta nyaman untuk daily use."},
  Hanya:{price:"Rp70.000",image:"assets/hanya.jpg",type:"Handbag",description:"Tas dengan desain elegan dan berkarakter. Pilihan yang cocok untuk melengkapi gaya sehari-hari."},
  Melora:{price:"Rp75.000",image:"assets/melora.jpg",type:"Shoulder Bag",description:"Tas wanita stylish dengan bentuk modern dan strap yang nyaman digunakan untuk berbagai aktivitas."},
  Janessa:{price:"Rp75.000",image:"assets/janessa.jpg",type:"Shoulder Bag",description:"Tas hitam klasik dengan detail hardware gold yang memberikan kesan elegan dan mudah dipadukan."},
  Liora:{price:"Rp75.000",image:"assets/liora.jpg",type:"Handbag",description:"Tas warna putih dengan desain clean dan elegan untuk tampilan yang fresh."},
  Serenna:{price:"Rp70.000",image:"assets/serenna.jpg",type:"Tote Bag",description:"Tote bag minimalis dengan ruang yang lega dan cocok untuk kegiatan sehari-hari."}
};

function whatsappLink(name, price){
  const message = `Halo High Markett 👋\n\nSaya tertarik membeli produk:\n👜 Nama: ${name}\n💰 Harga: ${price}\n\nApakah produk ${name} masih tersedia? Saya ingin mengetahui pilihan warna dan cara pemesanannya.\n\nTerima kasih.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const menuToggle=document.getElementById("menuToggle");
const navLinks=document.getElementById("navLinks");
menuToggle.addEventListener("click",()=>{const open=navLinks.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>{navLinks.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));

const cards=[...document.querySelectorAll(".product-card")];
const searchInput=document.getElementById("productSearch");
const resultCount=document.getElementById("resultCount");
const emptyState=document.getElementById("emptyState");
let activeFilter="all";

function applyProductFilter(){
  const query=(searchInput.value||"").trim().toLowerCase();
  let visible=0;
  cards.forEach(card=>{
    const matchesPrice=activeFilter==="all" || card.dataset.price===activeFilter;
    const haystack=`${card.dataset.name} ${card.dataset.type} ${card.textContent}`.toLowerCase();
    const matchesSearch=!query || haystack.includes(query);
    const show=matchesPrice && matchesSearch;
    card.classList.toggle("hidden",!show);
    if(show) visible++;
  });
  resultCount.textContent=`${visible} produk ${visible===1?"ditemukan":"ditemukan"}`;
  emptyState.classList.toggle("hidden",visible!==0);
}

document.querySelectorAll(".filter-btn").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));btn.classList.add("active");activeFilter=btn.dataset.filter;applyProductFilter();}));
searchInput.addEventListener("input",applyProductFilter);

function bindBuyButtons(){
  document.querySelectorAll(".buy-btn[data-product]").forEach(btn=>btn.addEventListener("click",()=>{
    const name=btn.dataset.product;
    const price=btn.dataset.price || products[name]?.price || "";
    window.open(whatsappLink(name,price),"_blank","noopener,noreferrer");
  }));
}

const modal=document.getElementById("productModal");
const modalImage=document.getElementById("modalImage");
const modalName=document.getElementById("modalName");
const modalPrice=document.getElementById("modalPrice");
const modalDescription=document.getElementById("modalDescription");
const modalBuy=document.getElementById("modalBuy");
function openModal(name){
  const p=products[name]; if(!p)return;
  modalImage.src=p.image; modalImage.alt=`Tas ${name}`; modalName.textContent=name; modalPrice.textContent=p.price; modalDescription.textContent=p.description;
  modalBuy.onclick=()=>window.open(whatsappLink(name,p.price),"_blank","noopener,noreferrer");
  modal.classList.add("show");modal.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");
}
function closeModal(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open");}
document.querySelectorAll(".quick-view").forEach(btn=>btn.addEventListener("click",()=>openModal(btn.dataset.product)));
document.querySelectorAll("[data-close-modal]").forEach(el=>el.addEventListener("click",closeModal));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
document.getElementById("year").textContent=new Date().getFullYear();
bindBuyButtons();
