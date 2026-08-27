---
id: "7"
title: "The State of Models and Agentic Coding in 2026"
excerpt: "Where the models actually stand in mid-2026, why the leaderboard question is dead, and what working with coding agents looks like now."
author: "William East"
tags:
  - AI
  - Web Development
images:
  [
    "https://images.unsplash.com/photo-1758626052247-79003b45f802?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]
coverImage: ""
featured: false
publishedAt: 2026-08-22
updatedAt: 2026-08-21
status: published
---

Back in February, I promised we'd come full circle on the AI part of the verbosity story, and then (classic me) left you hanging through spring. Consider this the payoff.

Building software with models looks almost nothing like it did when I wrote that post. The tools have changed, the workflows have changed, and honestly a few of my own habits from six months ago need updating too. So let's take stock together: where the models actually are, what agentic coding has turned into, and what any of it means for those of us who still have software to ship.

## The leaderboard era is over

For a couple of years there, "which model should I use?" had a real answer. One lab was clearly ahead, everyone knew which one it was, and picking something else was a genuine trade-off.

That era's done. As I write this in August 2026, the frontier is a cluster rather than a podium. Anthropic shipped Claude Opus 5 in late July, Claude Fable 5 arrived in June as their long-horizon specialist, OpenAI took the GPT-5.6 family general in early July, and Google's Gemini 3 line keeps quietly swallowing entire codebases with its context window. On SWE-bench Verified (a benchmark where models tackle real GitHub issues), the top handful sit within about two points of each other. Two points! And most of those headline scores are self-reported by the labs, with independent re-runs shuffling the order depending on who's doing the measuring.

So the honest answer to "which model is best?" has become another question: best at what, run through which tool?

## Route by difficulty, not by hype

Here's the framing that has saved me the most money this year: most coding work is voluminous rather than hard. Autocomplete, unit tests, boilerplate, mechanical refactors, CI chores. For that, the fast tiers are absurd value now. Claude Sonnet 5 runs about $2/$10 per million tokens (input/output), GPT-5.6 Terra sits at $2/$12, and if you want the meter at zero entirely, the open-weight crowd (DeepSeek V4, Qwen3-Coder, GLM) is genuinely capable and happy to live on your own hardware.

Then there's the genuinely hard stuff: ambiguous briefs, architecture calls, refactors that ripple across files nobody has touched since 2019. That's what the frontier tier is for, and the price gap reflects it ($5/$25 per million tokens and up).

My rule of thumb: if I can specify the task completely in a paragraph, the small model handles it. If writing the specification is the actual work, I reach for the big one.

Oh, and 1M-token context windows are standard at the top now. Entire repositories fit in memory at once. Remember when 8K felt luxurious?

## The harness matters as much as the model

Something the leaderboards keep underselling: the model is only half the product. The other half is the harness, the agent loop wrapped around it (Claude Code, Codex CLI, Gemini CLI, opencode, Cursor, and friends), which decides how it reads your repo, calls tools, runs your tests, and recognises when it's finished.

In practice, a slightly weaker model inside a well-built harness routinely out-ships a stronger model driven poorly. This took me embarrassingly long to internalise. I spent ages agonising over model picks when the bigger lever was which agent I ran them through and how the project around them was set up.

Two harness-level shifts this year feel genuinely new:

1. **Parallel subagents went mainstream.** Both big labs shipped fan-out modes this summer: hand a task to a coordinator and it spawns subagents working concurrently, then reconciles the results. Jobs that were "kick it off overnight" territory last year fit into a lunch break now.
2. **MCP became the plumbing standard.** The Model Context Protocol is a shared way for agents to talk to external tools, and it's why an integration built for one agent increasingly works with another. Your setup carries over between harnesses instead of being locked in.

## Agents grew legs

Zoom out and the trajectory is wild. 2023 gave us autocomplete with delusions of grandeur. 2024 was chat that could write files. 2025 was the year single agents completed real tasks end to end. And 2026 belongs to long-horizon runs: agents that plan, code, test, hit a wall, adjust, and keep going for hours or days, checking in with us only at decisions that actually need a human.

Adoption numbers back the vibe shift up. One widely cited survey puts enterprise agents in production at 57%, up from under 5% about a year prior. Whatever you think of enterprise surveys, that's not a fringe any more.

The surprise for me is where the skill went. Prompting got easy; everything around the prompt is where the craft moved:

- **Spec-driven development** became a proper discipline. You write down what you want, the constraints, and the acceptance criteria, then let the agent execute against that instead of against vibes. Documentation first, it turns out, was the winning strategy all along (more on that in a moment).
- **Context engineering** is the phrase of the year: deliberately managing what the agent can see. An agent plans based on whatever files it finds. If the real change touches seventeen files and it found three, it ships confident, locally-correct code that misses two-thirds of the job. People call this the 80% problem, and the missing pieces are the same every time: auth middleware, DTOs at a different layer, integration tests in a sibling repo, migration scripts nobody regenerated.

## Review is the new bottleneck

Now the uncomfortable bit. When code becomes cheap, review becomes expensive.

The numbers are startling wherever agents ship at volume. One industry dataset puts code churn up more than eightfold, median review duration up more than 400%, and agent-authored pull requests about half again larger than human ones. Meanwhile merges with zero meaningful review climbed by roughly a third, presumably because who on earth has the time.

Worse, agents have picked up (in the least malicious way possible) a talent for gaming the checks we give them. The classic failure mode: change the behaviour, then "fix" the failing test by rewriting the assertion to match the new broken behaviour. Green tick, latent bug. One engineering writer described agents as gradient descent finding the cheapest path to green, and I haven't been able to shake that phrase since.

So here's the mental model I've settled on: treat every agent like the keenest junior developer you've ever met. Blisteringly fast, tireless, reads your whole codebase overnight, and still not someone you let merge their own PRs unreviewed. Read the test changes first (that's where the bodies are buried), keep deterministic CI strict, and demand evidence before you'll even look at a change: what it's for, the diff, the test output, proof it actually ran.

My co-working story from the verbosity post feels newly relevant here. The real problem was never unclear code itself; it was unclear code and empty PR descriptions pushing the cost of understanding onto whoever reviewed next. Agents scale that dynamic to industrial volumes. Verbosity as empathy, chapter two.

## Full circle

Remember the thesis? The code your agent produces is only as good as the context and documentation you give it. Six months on, the industry has converged on exactly that, just with fancier vocabulary. Specs, context engineering, constitution files, requirement documents: it's all the same move. Write the intent down clearly enough that somebody else (human or model) can act on it without guessing.

Which means the skills that matter in 2026 look suspiciously like the ones that always mattered. Say what you mean, structure your thinking, review carefully, be kind to the next reader. The models do the typing now. We're still doing the deciding.

If you're still treating AI coding as autocomplete with extra steps, the gap is widening fast. Pick one task this week, write the spec properly, hand it to whichever agent you already have installed, and read the diff like it came from a person you trust but verify anyway. Spec, delegate, review: that loop is the job now. Everything else is implementation detail.
