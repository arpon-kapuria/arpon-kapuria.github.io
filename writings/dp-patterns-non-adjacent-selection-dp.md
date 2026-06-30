---
title: Dynamic Programming Patterns - Non Adjacent Selection DP 
description: A pattern-based guide to identifying and solving Non-Adjacent Selection Dynamic Programming problems using a common template and practice problems.

date: October 11, 2025
modified: October 11, 2025

author: Arpon Kapuria
category: Dev Journal
tags: Dynamic Programming, Algorithms
---

## Background

Many problems require selecting elements from a list or array to **maximize a total value** while following a constraint:

> *If you pick one element, you cannot pick certain "adjacent" elements.*

The **goal** is to **maximize the total sum or points** obtained while respecting these adjacency constraints. 

For example:

- In *[Delete and Earn](https://leetcode.com/problems/delete-and-earn/description/)* problem, picking a number removes all numbers equal to `x-1` and `x+1`.
- In *[House Robber](https://leetcode.com/problems/house-robber/description/)* problem, picking a house prevents picking its neighboring houses.

### 1.1 Typical variations 

- *Index adjacency restriction*
    - House Robber problems (cannot pick consecutive indices)
- *Value adjacency restriction*
    - Delete and Earn (cannot pick numbers x-1, x+1)
    - Maximum Total Damage (cannot pick powers within ±2)
- *Weighted elements*
    - Each element has a weight or frequency
- *Custom adjacency rule*
    - Skip elements within k distance (generalized form)

## Understanding the Pattern

This family of problems can be abstracted as **Non-Adjacent Selection DP**:

- We are allowed to *pick or skip elements*.
- Picking an element *conflicts with one or more other elements* (cannot pick them).
- We aim to *maximize total gain*.

### 2.1 Key Insights

1. Conflict is either *index-based* or *value-based*.
    - Index-based: adjacency in array (House Robber).
    - Value-based: adjacency in values (Delete and Earn, Maximum Total Damage).
2. *Grouping duplicates* is often useful.
    - If multiple elements have the same value, treat them as a single unit with combined weight using Hashmap.
3. *DP formulation*: choose the maximum between *skipping* or *taking plus best non-conflicting previous*.

### 2.2 Mathematically

```cpp
dp[i] = max(dp[i-1], value[i] + dp[last non-adjacent index])
```

### 2.3 Look for these clues

- You can *pick or skip elements*.
- Picking an element *prevents picking neighbors*.
    - Index-based neighbors → House Robber
    - Value-based neighbors → Delete and Earn
- Goal: *maximize total sum / points*.
- Duplicates exist → consider *grouping*.

## Approach

- *Compress / Group Elements* (if necessary)
    - For value-based problems, count the total contribution of each unique value. Use a hashmap.
- *Sort Keys / Values* (for value-based adjacency)
    - Sorting helps identify adjacency in value-based problems.
- *Define DP State*
    - `dp[i]` = maximum total sum considering elements up to `i`.
- *Decide Skip or Take*
    - Skip: `dp[i-1]`
    - Take: `value[i] + dp[last non-conflicting index]`
- *Compute Last Non-Conflicting Element*
    - Index-based: `i-2` (House Robber)
    - Value-based: find last key < current - conflict distance (linear search or binary search)
- *Iterate and Update DP*
    - Fill `dp[i]` for all `i`.
- *Return Result*
    - Maximum is `dp[n-1]`.

## Template

How to Use This Template:

1. *Set `k`* according to problem constraints:
    - If taking `x` blocks `x-1` and `x+1`, `k=1`
    - If taking `x` blocks `x-2` to `x+2`, `k=2`
    - Generalizable to any integer `k`
2. *Aggregate duplicates* before DP → use frequency map.
3. *Sort unique keys* to make adjacency checking easy.
4. *Iterate DP* → skip or take current value based on last non-conflicting element.

```cpp
#include <bits/stdc++.h>
using namespace std;

// nums: input array
// k: adjacency conflict gap (x ± k are blocked when picking x)
long long nonAdjacentSelectionDP(const vector<int>& nums, int k) {
    // Step 1: Aggregate values
    unordered_map<int, long long> freq;
    for (int x : nums)
        freq[x] += x;  // total contribution of each unique value

    // Step 2: Sort unique keys
    vector<int> keys;
    for (auto& [key, _] : freq)
        keys.push_back(key);
    sort(keys.begin(), keys.end());

    int n = keys.size();
    vector<long long> dp(n, 0);

    // Step 3: Base case
    dp[0] = freq[keys[0]];

    // Step 4: DP iteration
    for (int i = 1; i < n; i++) {
        long long takeCurrent = freq[keys[i]];

        // Find the last non-conflicting index
        int prev = i - 1;
        while (prev >= 0 && keys[prev] >= keys[i] - k)
            prev--;

        if (prev >= 0)
            takeCurrent += dp[prev];

        // Maximum of skipping or taking current
        dp[i] = max(dp[i - 1], takeCurrent);
    }

    return dp[n - 1];
}
```

## Problems to Practice

- [198. House Robber - LeetCode](https://leetcode.com/problems/house-robber/description/) (Index based)
- [213. House Robber II - LeetCode](https://leetcode.com/problems/house-robber-ii/description/) (Index based)
- [3186. Maximum Total Damage With Spell Casting - LeetCode](https://leetcode.com/problems/maximum-total-damage-with-spell-casting/description/) (Value based)
- [740. Delete and Earn - LeetCode](https://leetcode.com/problems/delete-and-earn/description/) (Value based)

<hr>

<blockquote>In short, If the problem says "taking/skiping X blocks nearby values", immediately think "Non-Adjacent Selection DP".</blockquote>