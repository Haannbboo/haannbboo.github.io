export interface Post {
  id: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  content: string;
}

export const POSTS_DATA: Post[] = [
  {
    id: "eve-hypernet",
    title: "HyperNet Relay: EVE-Online Market Mechanics & Profit Analysis",
    date: "2023-12-16",
    category: "EVE-Online",
    tags: ["eve-online", "design", "finance", "game-mechanics"],
    summary: "Mathematical breakdown of income generation, ticket odds, and expected daily ROI in EVE-Online's HyperNet Relay lottery system.",
    content: `
# What is HyperNet Relay?

HyperNet Relay is a lottery system in EVE-Online. It represents a **HUGE** source of income for active market traders:

* **Skill Requirement**: 0
* **ISK Requirement**: High (Billions)
* **Risk**: Low (with probabilistic ticket hedging)
* **Time Requirement**: Daily login (~10 mins)

# How Does It Work?

1. **Preparation**: Place trade character in Jita IV-4 trade hub.
2. **Stock Selection**: Purchase popular T2 destroyers/frigates or faction ships (~50M ISK value).
3. **HyperCores**: Acquire required HyperCores (<10 cores per 50M ship).
4. **Relay Setup**: Create HyperNet Relay offer with default 8 HyperNodes, pricing Total Price near market average.
5. **Ticket Strategy**: Buy **4 tickets** (50%) out of the 8 available tickets.
6. **Raffle Completion**: When filled, collect raffle outcome. If won, re-list ship. If lost, replenish inventory.

# Profit Mathematics & Expected Value

* Ship Purchase Price: $P_{\\text{ship}} = 50\\text{M}$
* Total HyperNet Price: $P_{\\text{total}} = 1.4 \\times P_{\\text{ship}} = 70\\text{M}$
* Ticket Cost (4/8 tickets): $P_{\\text{ticket}} = 0.7 \\times P_{\\text{ship}}$
* HyperCore Cost: $P_{\\text{hypercore}} \\approx 0.07 \\times P_{\\text{ship}}$

### Expected Payout per Filled Raffle

$$P_{\\text{payout}} = (1 - 0.05) \\times 1.4 P_{\\text{ship}} + 0.5 \\times P_{\\text{ship}} = 1.83 P_{\\text{ship}}$$

### Net Expected Daily Return

$$Profit = 0.9 \\times (1.83 P_{\\text{ship}} - P_{\\text{ship}} - 0.7 P_{\\text{ship}} - 0.07 P_{\\text{ship}}) - 0.1 \\times 0.07 P_{\\text{ship}} \\approx 4.7\\% P_{\\text{ship}}$$

A systematic 4-ticket strategy yields ~**4.7% expected daily return**, effectively compounding capital monthly.
`
  },
  {
    id: "interview-prep",
    title: "Interview Questions for System Software & Bitwise Math",
    date: "2024-02-07",
    category: "Job Prep",
    tags: ["interview", "systems", "bit-manipulation", "c"],
    summary: "Essential bitwise operation tricks and low-level math solutions for C/C++ systems software interviews.",
    content: `
# Low-Level Systems & Bitwise Interview Tricks

Essential bitwise operations frequently tested in systems engineering, operating systems, and kernel programming interviews.

---

### 1. Check Power of 2

* **Problem**: Given an integer \`x\`, determine if it is a power of 2.
* **Restrictions**: No division, no loops, no function calls.
* **Solution**: \`x & (x - 1) == 0\` (for \`x > 0\`)
* **Explanation**: 
  * \`x = 128 (0b10000000)\`, \`x - 1 = 127 (0b01111111)\` $\\rightarrow$ \`128 & 127 == 0\`
  * \`x = 123 (0b01111011)\`, \`x & (x - 1) != 0\`
* **Alternative**: \`x & (-x) == x\`

---

### 2. Find Next Multiple of Power-of-2 ($k$)

* **Problem**: Given integer \`x\` and power-of-two alignment \`k\`, find smallest $y \\ge x$ that is a multiple of $k$.
* **Restrictions**: No modulo, no division, no loops.
* **Solution**: \`y = (x + k - 1) & ~(k - 1)\`
* **Example**:
  * For \`x = 3990\` and \`k = 16\`, \`y = 4000\`
  * Alignment masks out lower bits while rounding up.

---

### 3. Find Least Significant Set Bit

* **Problem**: Given integer \`x\`, isolate the lowest set bit.
* **Solution**: \`x & -x\`
* **Example**: For \`x = 0b1101000\`, \`x & -x = 0b0001000\`.
`
  }
];
