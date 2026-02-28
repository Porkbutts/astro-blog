---
author: Adrian Teng-Amnuay
pubDatetime: 2026-02-27T12:00:00Z
title: "Claude Code as a personal tax advisor"
featured: false
draft: false
tags:
  - agentic-ai
  - personal-automation
  - claude
description: "I pointed Claude at my Gmail and Google Drive to answer real tax questions. It found DMV registration PDFs, figured out what's actually deductible, then verified my backdoor Roth IRA conversion was reported correctly on my 1040."
---

With all the viral interest around OpenClaw lately, I figured I'd share something on the simpler end of what Claude Code can do. No orchestration framework, no multi-agent system. Just Claude acting as a personal assistant for a real task I needed help with.

It's tax season. I was going through TurboTax and it asked me about DMV registration fees. I knew I had renewal notices somewhere in my Gmail, and I was about to go dig them up myself. But honestly, I probably would have just put the full amount from the bill and moved on. Turns out that would have been wrong. Only part of the registration is actually deductible, and Claude was the one who told me that.

## The conversation

I have Claude connected to my Gmail via MCP, so I just asked:

> Can you search my Gmail to find how much I paid in DMV registration fees for my Tesla in 2025?

Claude's first search came back empty. It tried different keywords on its own, eventually landing on "vehicle registration fee," which turned up two DMV Vehicle Renewal Notices. One for my Tesla, one for my Honda.

It pulled up both emails, figured out which was which, and told me my Tesla registration bill was $619. Then, without me asking, it told me I couldn't deduct the full $619. Only the vehicle license fee portion of a California registration is tax-deductible. The registration fee, special plate fee, and county fees don't count. I didn't know that.

## Going deeper

I asked it to pull the attached PDF and tell me exactly how much I could claim. It downloaded the renewal notice PDF right from the email, read the fee breakdown, and came back with $205. That's the license fee line item, which the DMV itself labels as "may be an income tax deduction."

I asked about the Honda too. Same thing: pull the PDF, read the breakdown. $16 in deductible license fees. Total across both vehicles: $221.

Then it caught something I hadn't thought about. The Tesla notice was issued in December 2025 but wasn't due until March 2026. For tax purposes, what matters is when you actually pay, not when the bill shows up. If I paid in 2025, it goes on my 2025 return. If I pay in 2026, it's a 2026 deduction.

It also pointed out that vehicle license fees fall under the SALT deduction, which is capped at $10,000 and only applies if you itemize. If you take the standard deduction, none of this matters.

## Verifying a backdoor Roth conversion

A few days later I had another tax question, and this time it was one where getting it wrong would actually cost me money.

I do a backdoor Roth IRA conversion every year. The short version: you contribute to a Traditional IRA (non-deductible), then immediately convert it to a Roth. It's a legal workaround for people whose income exceeds the Roth contribution limit. The mechanics are straightforward, but there are a few things that have to line up on your tax forms for it to be reported correctly, and if TurboTax gets it wrong, you end up paying tax on money you already paid tax on.

I had all my tax documents in a Google Drive folder, so I connected Claude to Drive via MCP and asked it to look at my 1099-R forms. I told it the high level: I did a backdoor Roth, I want to confirm everything looks right.

Claude found the 1099-R from my brokerage, read the PDF, and walked me through exactly which boxes mattered and why. It confirmed the conversion looked clean, explained a small discrepancy in the amount (the money was briefly invested and lost a few dollars before I converted), and caught a nuance I didn't fully understand about how the "taxable amount" box on a 1099-R doesn't actually mean what it looks like it means.

Then I asked how to verify TurboTax handled it correctly. Claude told me to look at line 4 of the 1040: line 4a should show the gross distribution, and line 4b, the taxable amount, should show zero. If 4b showed the full amount, TurboTax hadn't applied my non-deductible basis properly.

I pulled up the 1040 preview in TurboTax and sent Claude a screenshot. It confirmed line 4b showed $0. Everything checked out.

## Why this is better than TurboTax

TurboTax could tell me that vehicle license fees are deductible. It has Q&A flows for that. But it can't search my email, find the specific DMV notices for my specific cars, download the PDFs, read the fee breakdowns, and tell me that I can deduct exactly $221 across two vehicles with the caveat that one of them depends on when I actually paid.

TurboTax gives you the rules. You still have to do the work of figuring out whether and how those rules apply to your situation. Claude did all of that in about two minutes.

I ended up taking the standard deduction for the DMV fees, so that whole exercise was moot. But the Roth verification wasn't. If TurboTax had mislabeled that conversion, I would have paid tax on $7,000 of income that was already taxed. Claude caught the right things to check and walked me through exactly where to look to confirm it.

The pattern across both of these is the same. I have documents scattered across email and Drive. I have a rough idea of what I need. Claude connects to the actual data sources, reads the actual documents, and gives me specific answers grounded in my specific situation. Not generic tax advice. My numbers, my forms, my edge cases.

## The MCP setup

This all works because of MCP (Model Context Protocol), which lets Claude connect to external tools and data sources. I built custom MCP servers for both [Gmail](https://github.com/Porkbutts/gmail-mcp-server) and [Google Drive](https://github.com/Porkbutts/gdrive-mcp-server) because I eventually want Claude to send emails and manage files on my behalf, and the default connectors don't support that. But for just reading and searching, the standard MCP connectors that ship with Claude would work fine.

I'll probably write up how I built these servers in a future post.

## On security

With all the news around OpenClaw, people are understandably concerned about giving AI agents access to sensitive data. More data, more power, more risk.

But the honest truth is personal agents become immensely more useful when they have access to your actual stuff. If I have to hand the agent every piece of context and answer all its clarifying questions, I'd be better off just doing the task myself. Or the value add ends up similar to the chatbots that services like TurboTax already provide.

That said, you do need to be thoughtful about which tools and MCP servers you give the agent access to. The real risk is less about the agent reading your data. It's other tools in the same session that could exfiltrate it after the agent has seen it. In my case, the flow is simple: read this sensitive data, answer my questions. Low risk of outbound network calls or writing to external services. The data exfiltration surface is low. If I had a bunch of other MCP servers connected that could send emails or post to APIs, I'd want to think harder about that.