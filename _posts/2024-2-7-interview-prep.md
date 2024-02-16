---
layout: post
author: hanbo
title: "Interview questions for System Software"
categories: [Job Prep]
mathjax: true
---


## Math (bit operation)

#### Is power of 2?

* **Problem**: Given a number, determine if it is a power of 2.
* **Restrictions**: no division, no loops, no function calls.
* **Solution**: `x & (x-1) == 0`.
* **Example**: 
  * `x = 128`, `x & (x-1) = 128 & 127 = 10000000 & 01111111 = 0`.
  * `x = 123`, `x & (x-1) = 123 & 122 = 1111011 & 1111010 = 1111010 != 0`.
* **Another solution**: `x & (-x) == x`.
-----

#### Find next multiple

* **Problem**: Given a number `x`, find the number `y, y >= x` that is a multiple of `k`.
* **Example**: 
  * Given `x = 3990`, `k = 16`, find that `y = 4000`.
  * Given `x = 233`, `k = 13`, find that `y = 234`.
* **Restrictions**: no modulo, no division, no loops, no function calls.
* **Solution**: `y = (x + k - 1) & ~(k - 1)`.
* **Example**:
  * `x = 233 = 0b11101001`, `k - 1 = 12 = 0b1100`, `y = 0b11110101 & 0b11110011 = 0b11110001`.

-----

#### Find least significant bit

* **Problem**: Given a number `x`, find the first bit that is 1.
* **Example**: `x = 0b1101000`, the least significant bit is 3.
* **Restrictions**: no loops, no function calls.
* **Solution**: `x & -x + 1`.   
* **Example**: `x = 0b1101000`, `x & -x + 1 = 0b1000`.