---
layout: post
author: hanbo
title: "HyperNet Relay"
tags: [eve-online, design-doc]
categories: [EVE-Online, Design]
mathjax: true
---

# What is HyperNet Relay?

HyperNet Relay is a lottery system in Eve-Online. It is a <big>**HUGE**</big> source of income for any player, with the following characteristics:

* Skill requirement: 0
* ISK requirement: **HIGH**, billions
* Risk: **LOW**
* Reward: **HIGH**
* Time requirement: **LOW**, daily login
* Player interaction: 0

EVE university has a [good introduction](https://wiki.eveuniversity.org/HyperNet_Relay) to HyperNet Relay.

# How does it work?

0. Preparation: put one character in Jita trade hub (must be Jita)
1. Buy some T2 **destroyers** and **frigates**, or faction ships worth around 50M.
2. Buy some [HyperCore](https://everef.net/type/52568). For each ship around 50M, you need < 10 hypercores.
3. Create a HyperNet Relay for each ship, use the default configuration (8 HyperNodes), change the **Total Price** to around **Average Price** of open hypernet offers.
4. Buy **4 tickets** out of the 8 tickets. This is important. 
5. Wait for the HyperNet Relay to finish (around 1 day), collect the raffles.
6. If you win, recreate a HyperNet Relay with the ship. If you lose, buy the ship from the market, and recreate a HyperNet Relay.

# In theory, How much can I earn?

1. You buy a T2 ship, with Jita Sell for **50M**, write $P_{ship} = 50$.
2. You buy hypercores, where 10 hypercores costs 1 plex. 
3. You create a HyperNet Relay. The default **Total Price** $P_{total} = 1.4 * P_{ship} = 70$, but usually we reduce this by small offset $P_{offset}$. The number of hypercore is $N_{hypercore} \approx P_{ship} / 10M$. Intuitively, the **hypercore cost** is around $P_{hypercore} \approx 0.05 * P_{total} \approx 0.07 * P_{ship} $.
4. You buy 4 tickets, so ticket costs $P_{ticket} = P_{total} / 2 = 0.7 P_{ship}$.
5. You wait for the HyperNet Relay to finish. There's a chance (from my experience, around **10%**) raffle is not filled, **you lose the hypercores**. If filled, you expected 50% chance to win the ship, so each successful HyperNet Relay will give you
$P_{payout} = (1-0.05) * P_{total} + 0.5 * P_{ship} = (1 - 0.05) * 1.4 P_{ship} + 0.5 * P_{ship} $
$= 1.83 P_{ship}$, where the 0.05 is the HyperNet Relay fee on filled raffles.

Putting things together:

$profit = 0.9 * (P_{payout} - P_{ship} - P_{ticket} - P_{hypercore}) - 0.1 * P_{hypercore}$
$ = 0.9 * (1.83 P_{ship} - P_{ship} - 0.7 P_{ship} - 0.07 P_{ship}) - 0.1 * 0.07 P_{ship} = 4.7\% P_{ship}$

So you earn around **4.7% daily**. In a month, you can double your investment.

# Variables to consider