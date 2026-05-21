---
title: Gallery
permalink: /gallery/
---

<section class="bg-gradient-to-br from-cream via-white to-bgLight py-16 sm:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <span class="section-kicker">Gallery</span>
    <h1 class="mt-5 font-heading text-4xl font-black sm:text-5xl">Campus & Classroom Gallery</h1>
    <p class="mt-6 max-w-3xl text-lg leading-8 text-textMuted">Album-style glimpses of classroom learning, events, achievements, and student moments.</p>
  </div>
</section>

<section class="py-16 md:py-20 bg-[#F9FAFB]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-10 flex flex-wrap gap-3">
      <span class="rounded-full bg-primaryDark px-4 py-2 text-sm font-bold text-white">Classroom</span>
      <span class="rounded-full bg-cream px-4 py-2 text-sm font-bold text-primaryDark ring-1 ring-gold/30">Events</span>
      <span class="rounded-full bg-cream px-4 py-2 text-sm font-bold text-primaryDark ring-1 ring-gold/30">Achievements</span>
      <span class="rounded-full bg-cream px-4 py-2 text-sm font-bold text-primaryDark ring-1 ring-gold/30">Students</span>
    </div>
    <div class="gallery-masonry">
      {% for item in site.data.gallery %}
      <article class="gallery-item" data-category="{{ item.category }}">
        <img
          src="{{ item.image }}"
          alt="{{ item.alt }}"
          loading="lazy"
          decoding="async"
        />
        <div class="p-5">
          <p class="text-xs font-black uppercase tracking-[0.16em] text-primary">{{ item.category }}</p>
          <h2 class="mt-2 font-heading text-lg font-extrabold">{{ item.title }}</h2>
        </div>
      </article>
      {% endfor %}
    </div>
  </div>
</section>
