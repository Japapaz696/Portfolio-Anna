# Portfólio — Anna Clara Ferraz Santos

Site pessoal de **Anna Clara Ferraz Santos**, estudante de Medicina, com estética minimalista em tons bege e terracota.

## Sobre o projeto

Site estático multi-páginas construído apenas com HTML, CSS e JavaScript puro — sem frameworks, dependências ou etapa de build. Ele foi pensado para funcionar bem no GitHub Pages e para ser fácil de abrir no celular.

### Páginas

- `index.html` — Página inicial com apresentação e atalhos para o portfólio
- `sobre.html` — História pessoal, vocação e galeria editorial com lightbox
- `curiosidades.html` — Família, amigas, pets e detalhes pessoais
- `formacao.html` — Pontos fortes, desafios e planos de estudo
- `academico.html` — Resumo visual da vida acadêmica

### Interações (`script.js`)

- Menu hambúrguer no mobile
- Fundo global com manchas de cor nos cantos, fixo durante a rolagem
- Nome surgindo letra por letra com efeito de blur na página inicial
- Animações de entrada ao rolar a página
- Contadores animados e barras acadêmicas
- Troca de imagens por rolagem/hover na página Sobre mim
- Lightbox para ampliar as fotos

## Como visualizar localmente

Basta abrir o `index.html` no navegador, ou servir localmente dentro da pasta do projeto:

```bash
cd portfolio-anna
python -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador.

## Publicação no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie os arquivos desta pasta para a raiz do repositório.
3. No GitHub, abra **Settings > Pages**.
4. Em **Build and deployment**, selecione a branch `main` e a pasta `/root`.
5. Salve e aguarde o link do GitHub Pages ficar disponível.

---

Feito com ❤️ como presente para Anna Clara.
