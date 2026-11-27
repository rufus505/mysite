(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const cards = [...document.querySelectorAll('.card[data-category]')];
    const search = document.getElementById('projectSearch');
    const category = document.getElementById('projectCategory');
    const count = document.getElementById('projectCount');
    const dialog = document.getElementById('projectDialog');
    const dialogContent = document.getElementById('dialogContent');
    const dialogClose = document.getElementById('dialogClose');
    const progress = document.getElementById('readingProgress');
    const backToTop = document.getElementById('backToTop');

    if (!cards.length) return;

    const labels = {
      all: 'PROJECTS',
      ai: 'AI / TECHNOLOGY',
      web: 'WEB DEVELOPMENT',
      research: 'RESEARCH',
      creative: 'CREATIVE',
      learning: 'LEARNING'
    };

    cards.forEach((card) => {
      const title = card.querySelector('h3')?.textContent.trim() || 'Project';
      const detail = document.createElement('button');
      detail.type = 'button';
      detail.className = 'card-detail';
      detail.textContent = '詳しく見る ↗';
      detail.setAttribute('aria-label', title + ' の詳細を表示');
      detail.addEventListener('click', () => openProject(card));
      card.append(detail);
    });

    function filterProjects() {
      const query = (search?.value || '').trim().toLocaleLowerCase('ja');
      const selected = category?.value || 'all';
      let visible = 0;

      cards.forEach((card) => {
        const matchesCategory = selected === 'all' || card.dataset.category === selected;
        const matchesQuery = !query || card.textContent.toLocaleLowerCase('ja').includes(query);
        const show = matchesCategory && matchesQuery;
        card.hidden = !show;
        if (show) visible++;
      });

      if (count) count.textContent = String(visible).padStart(2, '0') + ' / ' + cards.length + ' ' + (labels[selected] || 'PROJECTS');
    }

    function openProject(card) {
      const tag = card.querySelector('.tag')?.textContent.trim() || 'PROJECT';
      const title = card.querySelector('h3')?.textContent.trim() || '';
      const description = card.querySelector('p')?.textContent.trim() || '';
      const status = card.querySelector('.status')?.textContent.trim() || '';
      const meta = card.querySelector('.card-meta')?.cloneNode(true);

      dialogContent.replaceChildren();
      const tagNode = document.createElement('span');
      tagNode.className = 'tag';
      tagNode.textContent = tag;
      const heading = document.createElement('h2');
      heading.id = 'dialogTitle';
      heading.textContent = title;
      const statusNode = document.createElement('p');
      statusNode.className = 'dialog-status mono';
      statusNode.textContent = status;
      const body = document.createElement('p');
      body.textContent = description;
      dialogContent.append(tagNode, heading, statusNode, body);
      if (meta) dialogContent.append(meta);

      if (typeof dialog.showModal === 'function') dialog.showModal();
    }

    search?.addEventListener('input', filterProjects);
    category?.addEventListener('change', filterProjects);
    dialogClose?.addEventListener('click', () => dialog.close());
    dialog?.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });

    function updateScrollUI() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (progress) progress.style.width = (ratio * 100).toFixed(2) + '%';
      backToTop?.classList.toggle('visible', window.scrollY > 500);
    }
    window.addEventListener('scroll', updateScrollUI, { passive: true });
    window.addEventListener('resize', updateScrollUI);
    updateScrollUI();

    backToTop?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });

    filterProjects();
  });
})();
