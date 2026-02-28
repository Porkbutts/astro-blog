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
description: "I pointed Claude at my Gmail inbox to answer a tax question. It found the right emails, downloaded the PDF attachments, extracted the deductible amounts, and gave me correct tax advice in under a minute."
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

## Why this is better than TurboTax

This is the part that got me. TurboTax could tell me that vehicle license fees are deductible. It has Q&A flows for that. But it can't search my email, find the specific DMV notices for my specific cars, download the PDFs, read the fee breakdowns, and tell me that I can deduct exactly $221 across two vehicles with the caveat that one of them depends on when I actually paid.

TurboTax gives you the rules. You still have to do the work of figuring out whether and how those rules apply to your situation. Claude did all of that in about two minutes.

## The MCP setup

This works because of MCP (Model Context Protocol), which lets Claude connect to external tools and data sources. I actually [built a custom Gmail MCP server](https://github.com/Porkbutts/gmail-mcp-server) because I eventually want Claude to send emails on my behalf, and the default connectors don't support that. But for just reading and searching emails, the standard Gmail MCP connector that ships with Claude would work fine.


## More to come

I keep finding new uses for Claude as a personal assistant. The tax thing was a good one because it combined a few different capabilities: searching across emails, reading PDF attachments, and applying domain knowledge to give a specific, personalized answer. I'll keep sharing interesting ones as they come up.

I ended up taking the standard deduction, so the whole thing was moot anyway. But I learned something I didn't know about how California registration fees work, and I got the answer in two minutes instead of spending an evening Googling it.