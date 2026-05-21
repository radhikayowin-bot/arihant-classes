---
title: Courses
permalink: /courses/
---

<section class="bg-gradient-to-br from-cream via-white to-bgLight py-16 sm:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <span class="section-kicker">Courses</span>
    <h1 class="mt-5 max-w-4xl font-heading text-4xl font-black sm:text-5xl">Structured programs for boards and competitive exams.</h1>
    <p class="mt-6 max-w-3xl text-lg leading-8 text-textMuted">Each course is planned around syllabus coverage, regular practice, revision cycles, exam temperament, and subject-wise clarity.</p>
  </div>
</section>

<section class="bg-white py-16 sm:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {% for course in site.data.courses %}
      <article class="card rounded-[2rem] p-7">
        <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-cream text-3xl text-primaryDark ring-1 ring-gold/30"><i class="{{ course.icon }}"></i></div>
        <h2 class="mt-6 font-heading text-2xl font-black">{{ course.title }}</h2>
        <p class="mt-4 leading-8 text-textMuted">{{ course.description }}</p>
        <ul class="mt-5 grid gap-3 text-sm font-semibold text-textDark">
          <li><i class="fa-solid fa-check mr-2 text-primary"></i>Planned syllabus completion</li>
          <li><i class="fa-solid fa-check mr-2 text-primary"></i>Regular assignments and tests</li>
          <li><i class="fa-solid fa-check mr-2 text-primary"></i>Doubt support and progress review</li>
        </ul>
        <a href="{{ '/registration/' | relative_url }}" class="btn btn-primary mt-7">Register Interest</a>
      </article>
      {% endfor %}
    </div>
  </div>
</section>

<section class="bg-cream py-16 sm:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <span class="section-kicker">Subjects Offered</span>
    <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="subject-pill"><i class="fa-solid fa-square-root-variable"></i> Mathematics</div>
      <div class="subject-pill"><i class="fa-solid fa-calculator"></i> Applied Maths</div>
      <div class="subject-pill"><i class="fa-solid fa-atom"></i> Physics</div>
      <div class="subject-pill"><i class="fa-solid fa-flask-vial"></i> Chemistry</div>
      <div class="subject-pill"><i class="fa-solid fa-dna"></i> Biology</div>
      <div class="subject-pill"><i class="fa-solid fa-laptop-code"></i> Computer Science</div>
      <div class="subject-pill sm:col-span-2"><i class="fa-solid fa-chart-line"></i> Commerce Stream</div>
    </div>
  </div>
</section>
