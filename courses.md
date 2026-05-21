---
title: Courses
permalink: /courses/
---

<section class="bg-gradient-to-br from-softRed via-white to-bgLight py-16 sm:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <span class="section-kicker">Courses</span>
    <h1 class="mt-5 max-w-4xl font-heading text-4xl font-black sm:text-5xl">Structured programs for boards and competitive exams.</h1>
    <p class="mt-6 max-w-3xl text-lg leading-8 text-textMuted">Each course is planned around syllabus coverage, regular practice, revision cycles, and exam temperament.</p>
  </div>
</section>

<section class="bg-white py-16 sm:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {% for course in site.data.courses %}
      <article id="{{ course.title | downcase | replace: ' & ', '-' | replace: ' ', '-' }}" class="card rounded-[2rem] p-7">
        <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-softRed text-3xl text-primaryDark"><i class="{{ course.icon }}"></i></div>
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
