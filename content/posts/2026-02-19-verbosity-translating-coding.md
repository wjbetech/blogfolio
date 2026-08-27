---
id: "4"
title: "Verbosity in Coding: What Teaching and Translating Taught Me About Readable Code"
excerpt: "When to be verbose in code, and why the same judgment you use in teaching and translation makes the call clearer."
author: "William East"
tags:
  - Teaching
  - Web Development
  - Translation
images:
  [
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]
coverImage: ""
featured: false
publishedAt: 2026-02-19
updatedAt: 2026-08-21
status: published
---

Ever since starting to teach myself how to code, I've run into the same swirl of advice over and over (although AI is rapidly changing the landscape on these rules, but we'll talk about that another time!).

- Make it DRY
- Keep it clean
- Comment just enough (or don't comment at all)
- Make it easy for other devs to work on
- Use functional programming
- Be verbose
- If it works, it's fine
- Use object-oriented programming
- Don't be verbose

Let's be honest, that's a lot to process as you're getting to grips with programming. It's one contradiction after another, based on _what_, somebody online's opinion? Both actually building, working with others, and _teaching in the classroom_ have shaped how I really feel about the question of verbosity.

## What verbosity buys you outside of code

Teaching isn't just delivering information. It's helping someone else understand a concept the way you already do, but without the blood, sweat and tears it took for you to reach that point.

It's about making an idea relatable, bringing it to people via an experience almost everybody has universally shared, or having the student join the dots themselves.

I felt this as a student, too. When I was self-teaching Korean, the explanations that stuck were the ones I could relate to and begin to use immediately in my own life. They were the ones that broke things down for me, showed the same pattern with two different examples, and allowed me to naturally build my own understanding. That takes more words, but it saves a lot of confusion.

Translation works the same way.

> 소식이 참 어슬프네요..

A fairly direct translation might go something along the lines of "the news is truly forlorn". That's short and dictionary-faithful, but a native English speaker is not likely to feel the emotional impact, and perhaps forlorn sounds a little bit... oldy? A more localized translation might go something like "it was rather bittersweet hearing what happened". This carries a more clear feeling and sense of context, even though it's a longer translation.

We'll come back to that trade-off, because it's the same one I believe we can and should make in code. The question isn't "is verbosity good or bad?" It's "does this extra context help the next reader?".

We'll also come full circle on the AI part soon..!

## The same trade-off in code

Say we want to return active user names in our application:

```js
// anti-verbose pattern; you have to infer a lot
function h(d: any) {
  return d.filter((x) => x.a).map((x) => x.n);
}
```

You can probably guess what `h`, `d`, `a`, and `n` refer to, but you're guessing. A seasoned programmer can probably deduce what the likely result will be, and we're doing with some small potatoes here, but it's an easy way to increase your reader's blood pressure. Here's the same idea with the context spelled out:

```js
function getActiveUserNames(users) {
  return users.filter((user) => user.isActive).map((user) => user.name);
}
```

This is longer, but it clears up a lot of the guess work and rage-inducing fog of the first. This is what verbosity buys you in code, and in many ways you can think of it as co-developer empathy. You're doing a little more typing so the next person (which, most of the time, is ytou!) can do a little less figuring out.

Another place this shows up is comments. I don't think we need a comment that repeats what the code already says:

```ts
// filter active users
const activeUsers = users.filter((user) => user.isActive);
```

What _is_ worth a comment is the _why_ that's not obvious from the line:

```ts
// include pending users for the admin review queue
const visibleUsers = users.filter((user) => user.isActive || user.status === "pendingReview");
```

The first comment isn't inherently _bad_, but it's a good way up the redundancy scale when the function is small and eloquent enough to be quickly understood. The second comment saves someone from having to dig through whatever team chat application is most popular in the year you read this to understand the intent.

So here's the little checklist I use now. We'll keep it short enough to run through in a PR:

1. **Will future you know what this is without opening another file?** If not, consider a fuller name (`userId` rather than `id`, `pendingReviewUsers` rather than `data`).
2. **Does the name explain the intent?** `getActiveUserNames` beats `getData`.
3. **Would a short comment explain a secondary layer of functionality?** If I believe the function has nuanced reason for existing, document it.

If you answer yes to one of those and the fix is a few more characters, that's verbosity earning its keep.

## When not to be verbose

This isn't a pass to write long for the sake of it. There are times and good reasons not to be verbose.

If you spot the same three-line pattern in four places and the name of the abstraction is clear, extracting it reduces 3-4 passes of your brain to just one, and ensures clean upkeep. Copying verbose blocks because you're afraid of abstraction will eventually hide the single place you actually want to change.

I also avoid verbosity that just adds ceremony. The whole point is to ensure future work goes off without a hitch, not to make your codebase look prettier, or more "professional".If the longer version doesn't help the next reader decide or understand faster, I'll keep the shorter one.

If we bring the translation idea back, it's the same instinct. You don't translate word-for-word just to be faithful, and you don't paraphrase so freely that the meaning drifts. You choose the rendering that lets the reader understand with the least extra work. In code, especially as a solo builder, that reader is you in three months, and verbosity is one of the cheapest ways to be kind to yourself.

Try it on your next PR. Pick one function, make the names say what you meant, and add the one comment that explains _why_. If the review gets faster, you'll know the extra words were worth it.

## The reality of AI and cowork

I said I would loop back to AI, and here I am. We live in a time where AI is truly incredible at churning out (fingers crossed) working code. It seems to make leaps and bounds every few months, and the ways we have adapted to working with AI are also constantly evolving.

Documentation has become the forefront skill in working with AI. You will hear over and over that the code your agent produces is only as good as the documentation and context you give it. We are _healing_ some of the damage done by the constant anti-verbosity crowd, but it's not an overnight process.

Furthermore, I recently (as of August '26) co-worked on a project with a much more junior developer than myself. PRs were left blank, the fat in variable names was trimmed down to unhealthy levels, and my co-worker and myself had to constantly ask him to re-write both his code and his PRs.

So I humbly request again, do not fear to be more verbose!
