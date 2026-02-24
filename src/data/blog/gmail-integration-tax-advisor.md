---
author: Adrian Teng-Amnuay
pubDatetime: 2026-02-24T12:00:00Z
title: "Claude as Tax Advisor: Gmail Integration in Practice"
featured: false
draft: false
tags:
  - agentic-ai
  - mcp
  - personal-automation
description: "A real example of Claude searching Gmail, downloading attachments, and extracting actionable tax information from a DMV renewal notice."
---

Tax season is a good stress test for personal AI assistants. Not because the questions are hard, but because the answers are buried across emails, PDFs, bank statements, and half-remembered deadlines. The kind of thing that takes a human 20 minutes of digging through inboxes and squinting at fee breakdowns.

I've been running Claude with Gmail integration via MCP (Model Context Protocol), and this is a quick walkthrough of what that looks like in practice.

## The setup

Claude connects to Gmail through an MCP server that exposes a few straightforward tools: list messages, get message details, download attachments. The MCP server handles OAuth and provides Claude with scoped access to search and read emails. I built and open-sourced this one: [gmail-mcp-server](https://github.com/Porkbutts/gmail-mcp-server).

The important thing is that Claude can chain these tools together in a single conversation. Search, find, read, download, extract. That's where the value shows up.

## The scenario

I needed to know how much I paid in DMV registration fees for my car in 2025, specifically the tax-deductible portion. Here's how the conversation went.

**Me:** Can you search my Gmail to find how much I paid in DMV registration fees for my car in 2025?

Claude started by searching for "DMV registration" in primary emails. Nothing. So it broadened the search across a few keyword variations: "DMV registration 2025", "vehicle registration fee", "registration renewal." This is the kind of iterative search a human would do, just faster.

It found two DMV Vehicle Renewal Notices. One for my car, one for another vehicle. It pulled up both message details to check which was which, identified the right one (December 2025, registration bill of $619), and flagged the due date.

Then I asked the real question.

**Me:** If it's due in 2026, can I claim it on my 2025 taxes?

Claude's answer was precise: it depends on when you actually paid, not when the bill was issued. Only the vehicle license fee portion is deductible, not the full amount. California registration includes non-deductible items like highway patrol fees and weight fees.

This is the kind of nuance that matters. A simple search engine gives you the email. Claude gives you the interpretation.

**Me:** Pull the attached PDF and tell me how much I can claim.

Claude downloaded the renewal notice PDF, read through the fee breakdown, and pulled out the specific line item: **$205 in vehicle license fees**, which the DMV itself notes may be an income tax deduction. The remaining $414 in registration fees, special plate fees, and county fees are not deductible.

Total interaction time: about 30 seconds.

## What's actually happening here

This is a simple example, but the pattern generalizes. Claude is doing four things that individually aren't impressive but together are genuinely useful:

1. **Iterative search.** The first query returned nothing. Claude tried variations without being asked. This is basic agent behavior but it matters in practice because email search is notoriously hit-or-miss with exact phrasing.

2. **Cross-message reasoning.** It found two renewal notices, read both, and correctly identified which one I was asking about. No ambiguity in the response.

3. **Attachment extraction.** It downloaded a PDF from a Gmail attachment and parsed the fee breakdown. This is the step that saves the most time in practice. Nobody wants to open a PDF to find one line item.

4. **Domain knowledge applied to personal data.** Claude knows California registration fee structure and tax deductibility rules. It applied that knowledge to my specific numbers. The answer wasn't generic. It was "your deductible amount is $205."

## The MCP angle

Gmail integration through MCP is worth highlighting because it's clean. The MCP server is a standalone process that handles auth and exposes a typed tool interface. Claude doesn't need custom prompting or function definitions baked into the conversation. It discovers the available tools and uses them naturally.

This means the same pattern works for any email-based workflow: finding receipts, tracking orders, pulling invoice data, searching for contract terms. The integration cost is the MCP server setup. After that, every new use case is just a conversation.

## Where this is heading

Right now this is a read-only interaction. Claude searches and extracts but doesn't compose or send. That's a reasonable starting point. The next step is connecting this to other data sources: bank statements for payment verification, a spreadsheet for tax tracking, maybe a calendar for deadline reminders.

The tax advisor use case is a good example because it's concrete and immediately useful. But the underlying capability (search personal data, extract structured information, apply domain knowledge) is the building block for a much broader personal automation layer.

The interesting engineering isn't in any single tool call. It's in the orchestration: how Claude decides to broaden a search, which attachment to pull, what context to apply. That's the agentic behavior that turns a chatbot into something that actually saves you time.
