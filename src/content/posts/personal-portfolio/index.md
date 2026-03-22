---
title: "Personal Portfolio"
description: "The story behind building this portfolio site — from Gatsby to Hugo to Astro."
pubDate: 2023-04-01
tags: ["Hugo", "Tailwind", "Firebase", "project"]
cover: "../../../assets/projects/personalportfolio.png"
---

## Background

Does this site count towards my personal portfolio? I certainly feel like it should...

Prior to launching this site I had a portfolio which was built with GatsbyJS, which is basically a static site generator that uses react under the hood. The site worked well, but it had a lot of dependencies under the hood, and the codebase overall was complex.

Some other gripes:

- Long build times
- Theme I used didn't support blogs
- Wanted to redesign to a simpler aesthetic

Sure I could have made it work, but this is a side project and I have limited time so I looked for other options. Speed was the name of the game here.

## In comes Hugo

I discovered [Hugo](https://gohugo.io) as a static site generator and was very impressed with the build times and how fast you could spin up a site. In a nutshell, it takes markdown files and turns them into static sites based on HTML templates which you can modify on your own.

![Hugo](./hugo.png)

Hugo also has a great library of open source themes that you can use to build whatever kind of site you want. They've got everything from documentation to personal portfolio sites. Eventually I stumbled on the [Blowfish](https://blowfish.page/) theme which was absolutely packed with features to make it easy to start up, plus it was built with tailwind which I wanted to use anyway.

## The Result

After a few weekends of working on this here and there, I had a new portfolio site that made it easy for me to show off projects that I made along with some commentary on each project.

Here's a short list of improvements:

- Easy styling with Tailwind
- Anonymous likes and page views with Firebase
- 30 second site build times
- Markdown based blog posts which are very simple to add

Fun fact, this site is hosted with Netlify which has a very generous free tier. All I pay for is the domain name "joshuaflores.rocks". Total cost per year for this site is around $10.

## More

[View on GitHub](https://github.com/Joshua-Flores/joshuaflores.rocks)
