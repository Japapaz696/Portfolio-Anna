/* ===== Portfolio Anna Clara — interações ===== */

// Fundo decorativo global: manchas de cor nos cantos da tela
// (injetado em todas as páginas, fixo durante a rolagem)
(function injectBackground() {
  const bg = document.createElement("div");
  bg.className = "page-bg";
  bg.setAttribute("aria-hidden", "true");
  bg.innerHTML = `
    <span class="blob blob-1"></span>
    <span class="blob blob-2"></span>
    <span class="blob blob-3"></span>
    <span class="blob blob-4"></span>
  `;
  document.body.prepend(bg);
})();

// Menu mobile (hambúrguer)
const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggle && navLinks) {
  toggle.setAttribute("aria-expanded", "false");

  toggle.addEventListener("click", () => {
    const aberto = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(aberto));
    toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  // Fecha o menu ao clicar em um link
  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    })
  );
}

// Animação de entrada (reveal) — elementos aparecem suavemente
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  // Fallback: mostra tudo direto
  revealEls.forEach((el) => el.classList.add("visible"));
}

// Nome surge letra por letra, saindo do blur (home)
const nameEl = document.querySelector(".hero-name");

if (nameEl) {
  const nome = nameEl.dataset.text;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Transforma cada caractere em um <span>
  nome.split("").forEach((char) => {
    const span = document.createElement("span");
    span.className = char === " " ? "char space" : "char";
    span.textContent = char === " " ? " " : char;
    nameEl.appendChild(span);
  });

  const chars = nameEl.querySelectorAll(".char");

  if (reduced) {
    chars.forEach((c) => c.classList.add("on"));
  } else {
    // Espera um instante pro fundo já estar se movendo antes do nome surgir
    chars.forEach((char, i) => {
      setTimeout(() => char.classList.add("on"), 500 + i * 70);
    });
  }
}

// Contadores animados na página Acadêmico
const counters = document.querySelectorAll(".stat-value[data-count]");

if (counters.length && "IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((el) => counterObserver.observe(el));
}

function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    // easeOutCubic para desacelerar no final
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = (target * eased).toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// Barras de notas crescem quando entram na tela
const gradeBars = document.querySelectorAll(".grade-bar span");

if (gradeBars.length && "IntersectionObserver" in window) {
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.style.getPropertyValue("--w");
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  gradeBars.forEach((bar) => barObserver.observe(bar));
} else {
  gradeBars.forEach((bar) => (bar.style.width = bar.style.getPropertyValue("--w")));
}

// ===== Layout Editorial - Troca de imagem ao scroll/hover =====
(function initEditorialLayout() {
  const blocos = document.querySelectorAll(".texto-bloco[data-img]");
  const imagens = document.querySelectorAll(".imagem-principal img[data-index]");
  const legendaTexto = document.querySelector(".legenda-texto");
  const progressoBarra = document.querySelector(".progresso-barra");
  const imagemPrincipal = document.querySelector(".imagem-principal");
  const lightbox = document.getElementById("lightbox");

  if (!blocos.length || !imagens.length) return;

  const legendas = [
    "Anna Clara",
    "Anna Clara",
    "Com Lili & Lola",
    "Anna Clara",
    "Anna Clara",
    "Anna Clara",
    "Anna Clara",
    "Anna Clara"
  ];

  let indiceAtual = 0;
  let travado = false;

  function trocarImagem(novoIndice, suavizar = true) {
    if (travado || novoIndice === indiceAtual) return;
    if (novoIndice < 0 || novoIndice >= imagens.length) return;

    travado = true;
    const imgAtual = imagens[indiceAtual];
    const imgNova = imagens[novoIndice];

    if (suavizar) {
      imgAtual.classList.remove("imagem-ativa");
      // Força reflow para transição suave
      void imgNova.offsetWidth;
      imgNova.classList.add("imagem-ativa");
    } else {
      imgAtual.classList.remove("imagem-ativa");
      imgNova.classList.add("imagem-ativa");
    }

    // Atualiza legenda
    if (legendaTexto) {
      legendaTexto.style.opacity = "0";
      legendaTexto.style.transform = "translateY(8px)";
      setTimeout(() => {
        legendaTexto.textContent = legendas[novoIndice] || "";
        legendaTexto.style.opacity = "";
        legendaTexto.style.transform = "";
      }, 150);
    }

    // Atualiza barra de progresso
    if (progressoBarra) {
      const progresso = ((novoIndice + 1) / imagens.length) * 100;
      progressoBarra.style.setProperty("--progress", `${progresso}%`);
    }

    // Atualiza blocos de texto ativos
    blocos.forEach((bloco, i) => {
      bloco.classList.toggle("ativo", i === novoIndice);
    });

    indiceAtual = novoIndice;

    setTimeout(() => { travado = false; }, 700);
  }

  // IntersectionObserver para detectar qual bloco está visível
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bloco = entry.target;
            const idx = parseInt(bloco.dataset.img, 10);
            if (!isNaN(idx)) trocarImagem(idx);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Ativa quando bloco está no terço superior da tela
        threshold: 0.15
      }
    );

    blocos.forEach((bloco) => observer.observe(bloco));
  } else {
    // Fallback: primeira imagem ativa
    trocarImagem(0, false);
  }

  // Hover nos blocos de texto também troca a imagem (desktop)
  let hoverTimeout = null;
  blocos.forEach((bloco) => {
    bloco.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout);
      const idx = parseInt(bloco.dataset.img, 10);
      if (!isNaN(idx)) trocarImagem(idx);
    });
  });

  // Passa automaticamente por todas as fotos a cada 3 segundos
  setInterval(() => {
    if (lightbox && !lightbox.hidden) return;
    const proximoIndice = (indiceAtual + 1) % imagens.length;
    trocarImagem(proximoIndice);
  }, 3000);

  // Click na imagem principal abre lightbox
  imagemPrincipal?.addEventListener("click", () => abrirLightbox(indiceAtual));
  imagemPrincipal?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      abrirLightbox(indiceAtual);
    }
  });

  // ===== Lightbox =====
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxLegenda = document.getElementById("lightbox-legenda");
  const lightboxContador = document.getElementById("lightbox-contador");
  const btnFechar = lightbox?.querySelector(".lightbox-fechar");
  const btnAnterior = lightbox?.querySelector(".lightbox-anterior");
  const btnProxima = lightbox?.querySelector(".lightbox-proxima");
  const total = imagens.length;

  function abrirLightbox(indice) {
    if (indice < 0 || indice >= total) return;

    indiceAtual = indice;
    const img = imagens[indice];
    const legenda = legendas[indice] || "";

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxLegenda.textContent = legenda;
    lightboxContador.textContent = `${indice + 1} / ${total}`;

    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    setTimeout(() => btnFechar?.focus(), 100);
  }

  function fecharLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    lightboxImg.src = "";
  }

  function proxima() {
    if (travado) return;
    travado = true;
    const figura = lightbox.querySelector(".lightbox-figura");
    figura.classList.add("trocando");

    setTimeout(() => {
      indiceAtual = (indiceAtual + 1) % total;
      abrirLightbox(indiceAtual);
      figura.classList.remove("trocando");
      figura.classList.add("nova");
      setTimeout(() => figura.classList.remove("nova"), 50);
      travado = false;
    }, 200);
  }

  function anterior() {
    if (travado) return;
    travado = true;
    const figura = lightbox.querySelector(".lightbox-figura");
    figura.classList.add("trocando");

    setTimeout(() => {
      indiceAtual = (indiceAtual - 1 + total) % total;
      abrirLightbox(indiceAtual);
      figura.classList.remove("trocando");
      figura.classList.add("nova");
      setTimeout(() => figura.classList.remove("nova"), 50);
      travado = false;
    }, 200);
  }

  btnFechar?.addEventListener("click", fecharLightbox);
  btnProxima?.addEventListener("click", proxima);
  btnAnterior?.addEventListener("click", anterior);

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) fecharLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox?.hidden) return;
    if (e.key === "Escape") fecharLightbox();
    if (e.key === "ArrowRight") proxima();
    if (e.key === "ArrowLeft") anterior();
  });

  // Swipe no mobile
  let touchStartX = 0;
  lightbox?.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox?.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) proxima();
      else anterior();
    }
  }, { passive: true });

  // Inicializa primeira imagem
  trocarImagem(0, false);
})();
