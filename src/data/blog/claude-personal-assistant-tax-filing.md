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

With all the viral interest around OpenClaw lately, I figured I'd share something on the simpler end of what Claude Code can do: acting as a personal assistant for a real task I needed help with.

It's tax season. I was going through TurboTax and it asked me about DMV registration fees. I knew I had renewal notices somewhere in my Gmail, and I was about to go dig them up myself. If I had, I would have deducted the full amount listed in the bill and moved on. Turns out that would have been wrong. Only part of a California DMV registration is actually deductible, and Claude was the one who told me that.

## The conversation

I have Claude connected to my Gmail via MCP, so I just asked:

> Can you search my Gmail to find how much I paid in DMV registration fees for my Tesla in 2025?

Claude's first search came back empty. It tried different keywords on its own, eventually landing on "vehicle registration fee," which turned up two renewal notices. It pulled up both emails, figured out which car was which, and told me the registration amount. Then, without me asking, it told me I couldn't deduct the full bill. Only one specific line item is deductible. The rest of the fees don't count.

I asked it to pull the attached PDF and tell me exactly how much I could claim. It downloaded the renewal notice right from the email, read the fee breakdown, and came back with the deductible amount. I asked about my other car too. Same thing: pull the PDF, read the breakdown, give me the number.

Then it started catching things I hadn't thought about. One notice was issued in late 2025 but wasn't due until 2026, and it flagged that the deduction year depends on when you actually pay, not when the bill shows up. It also pointed out that these fees only matter if you itemize.

## Verifying a backdoor Roth conversion

A few days later I had another tax question.

I do a backdoor Roth IRA conversion every year. The mechanics are straightforward, but there are a few things that have to line up on your tax forms for it to be reported correctly. If TurboTax gets it wrong, you could end up paying tax on money you already paid tax on.

I had all my tax documents in a Google Drive folder, so I connected Claude to Drive via MCP and told it the high level: I did a backdoor Roth, I want to confirm everything looks right.

Claude found the relevant form from my brokerage, read the PDF, and walked me through exactly what mattered and why. It confirmed the conversion looked clean and explained the form fields and numbers in a simple way that I could understand.

Then I asked how to verify TurboTax handled it correctly. Claude told me exactly where to look on the 1040 and what the numbers should be. I pulled up the preview in TurboTax and sent Claude a screenshot. It confirmed everything checked out.

## Why this matters

TurboTax has help articles for this stuff, but the workflow is: search for "DMV registration deduction," read a few results, figure out which one applies to your situation, and hope you're interpreting it right. Claude helped me skip all of that. It searched my email, found the actual documents, read the fee breakdowns, and told me exactly what applied to me.

Claude did all of that in about two minutes.

I ended up taking the standard deduction, so the DMV exercise was moot. The Roth verification gave me peace of mind.

The pattern is the same in both cases. I have documents scattered across email and Drive. I have a rough idea of what I need. Claude connects to the actual data sources, reads the actual documents, and gives me specific answers grounded in my specific situation. Not generic tax advice. My numbers, my forms, my edge cases.

## The MCP setup

This all works because of MCP (Model Context Protocol), which lets Claude connect to external tools and data sources. I built custom MCP servers for both [Gmail](https://github.com/Porkbutts/gmail-mcp-server) and [Google Drive](https://github.com/Porkbutts/gdrive-mcp-server) because I eventually want Claude to send emails and manage files on my behalf, and the default connectors don't support that. But for just reading and searching, the standard MCP connectors that ship with Claude would work fine.

I'll probably write up how I built these servers in a future post.

## On security

With all the news around OpenClaw, people are understandably concerned about giving AI agents access to sensitive data. More data, more power, more risk.

But the honest truth is personal agents become immensely more useful when they have access to your actual stuff. If I have to hand the agent every piece of context and answer all its clarifying questions, I'd be better off just doing the task myself. Or the value add ends up similar to the chatbots that services like TurboTax already provide.

That said, you do need to be thoughtful about which tools and MCP servers you give the agent access to. The real risk is less about the agent reading your data. It's other tools in the same session that could exfiltrate it after the agent has seen it. In my case, the flow is simple: read this sensitive data, answer my questions. Low risk of outbound network calls or writing to external services. The data exfiltration surface is low. If I had a bunch of other MCP servers connected that could send emails or post to APIs, I'd want to think harder about that.