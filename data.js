// Configuration
const STARTING_BALANCE = 100000;
const RISK_PERCENT = 0.0025; // 0.25% risk per trade
const RISK_PER_TRADE = STARTING_BALANCE * RISK_PERCENT;
const IMAGE_BASE = 'https://raw.githubusercontent.com/cuzohh/pablo/main/images/';

// S&P 500 monthly returns (year-month format: "YYYY-MM")
const sp500MonthlyReturns = {
    '2021-03': 4.2,
    '2021-04': 5.29,
    '2021-05': 0.66,
    '2021-06': 1.91,
    '2021-07': 2.44,
    '2021-08': 2.98,
    '2021-09': -4.97,
    '2021-10': 7.02,
    '2021-11': -0.8,
    '2021-12': 4.26,
    '2022-01': -5.27,
    '2022-02': -2.95,
    '2022-03': 3.44,
    '2022-04': -8.78,
    '2022-05': 0.23,
    '2022-06': -8.64,
    '2022-07': 9.21,
    '2022-08': -4.08,
    '2022-09': -9.62,
    '2022-10': 8.13,
    '2022-11': 5.56,
    '2022-12': -6.19,
    '2023-01': 6.29,
    '2023-02': -2.51,
    '2023-03': 3.31,
    '2023-04': 1.6,
    '2023-05': 0.46,
    '2023-06': 6.09,
    '2023-07': 3.27,
    '2023-08': -1.63,
    '2023-09': -5.08,
    '2023-10': -2.17,
    '2023-11': 9.13,
    '2023-12': 4.14,
    '2024-01': 1.59,
    '2024-02': 5.22,
    '2024-03': 2.95,
    '2024-04': -4.03,
    '2024-05': 5.06,
    '2024-06': 3.2,
    '2024-07': 1.21,
    '2024-08': 2.34,
    '2024-09': 1.79,
    '2024-10': -0.89,
    '2024-11': 5.96,
    '2024-12': -2.73,
    '2025-01': 2.69,
    '2025-02': -1.27,
    '2025-03': -5.86,
    '2025-04': -0.87,
    '2025-05': 6.28,
    '2025-06': 4.83,
    '2025-07': 2.3,
    '2025-08': 2.05,
    '2025-09': 3.28,
    '2025-10': 2.38,
    '2025-11': 0.2,
    '2025-12': -0.22,
    '2026-01': 1.99,
};

// Funny messages for when Pablo beats S&P 500
const pabloWinningMessages = [
    "Not even close.",
    "Is it even a competition?",
    "Pablo doesn't play games.",
    "S&P 500 who?",
    "aura?",
    ":)",
    "Pablo's just built different.",
    "The market tried. Pablo succeeded.",
    "Pablo's in a league of his own.",
    "S&P 500 catching strays.",
    "Pablo's making it look easy.",
    "The market is shook.",
    "Pablo's running circles around them.",
    "S&P 500 needs to step up.",
    "Pablo's on another level.",
    "The market can't keep up.",
    "Pablo's playing 4D chess.",
    "S&P 500 left in the dust.",
    "Pablo's showing them how it's done.",
    "The market is taking notes.",
    "Pablo's unstoppable.",
    "S&P 500? More like S&P 500 steps behind.",
    "skill issue"
];

// Funny messages for when Pablo loses to S&P 500
const pabloLosingMessages = [
    "The market got lucky this time.",
    "Pablo's just warming up.",
    "S&P 500 caught a break.",
    "Pablo's playing the long game.",
    "The market got lucky, that's all.",
    "Pablo's just letting them think they're winning.",
    "S&P 500 got one, but Pablo's got the rest.",
    "The market's celebrating too early.",
    "Pablo's just testing their limits.",
    "S&P 500 won the battle, not the war.",
    "Pablo's taking notes for next time.",
    "The market got a participation trophy.",
    "Pablo's just being nice.",
    ":(",
    "S&P 500 got lucky, we'll see next month.",
    "Pablo's letting them have this one.",
    "The market's celebrating prematurely.",
    "Pablo's just building suspense.",
    "S&P 500 got a fluke win.",
    "Pablo's playing possum.",
    "The market won, but at what cost?"
];

// Weekend jokes for Pablo
const weekendJokes = [
    "Pablo doesn't work weekends. He's busy painting masterpieces. 🎨",
    "Even algorithms need a break. Pablo is recharging his batteries. 🔋",
    "Weekend vibes only. Pablo is sipping virtual margaritas on a beach. 🏖️",
    "Markets are closed, but Pablo's confidence is always open. 😎",
    "Pablo took the weekend off to practice his victory dance. 💃",
    "No trades on weekends. Pablo is busy counting his fictional millions. 💰",
    "Pablo believes in work-life balance. Mostly life on weekends. 🧘",
    "Markets closed = Pablo's spa day. Don't disturb the genius. 🧖",
    "Pablo is meditating on his secret sauce. Very zen. 🕯️",
    "Weekend mode: Pablo is rewatching his greatest hits. All green candles. 📺",
    "Sir, this is a Wendy's. Markets are closed. 🍔",
    "Pablo said no. Touch grass instead. 🌿",
    "Bro really tried to trade on a weekend. 💀"
];

const tradingData = {
    '2025-12-08': {
        image: 'dec825.png',
        notes: 'Pablo took 3 stop losses before catching a 5.38 RR winner. Patience pays off.',
        trades: [
            { time: '12:00', type: 'long', result: 'loss' },
            { time: '01:53', type: 'long', result: 'loss' },
            { time: '02:56', type: 'long', result: 'loss' },
            { time: '03:15', type: 'long', result: 'win', rr: 5.38 }
        ]
    },
    '2025-12-10': {
        image: 'dec1025.png',
        notes: 'Massive day! Pablo caught a 10.08 RR winner and a 5.34 RR winner despite taking 3 losses.',
        trades: [
            { time: '10:55', type: 'long', result: 'loss' },
            { time: '11:00', type: 'long', result: 'loss' },
            { time: '11:06', type: 'long', result: 'win', rr: 10.08 },
            { time: '03:04', type: 'short', result: 'loss' },
            { time: '03:15', type: 'short', result: 'be' },
            { time: '03:34', type: 'short', result: 'win', rr: 5.34 }
        ]
    },
    '2025-12-11': {
        image: 'dec1125.png',
        notes: 'Clean day. Pablo waited for the perfect setup and nailed a 10.02 RR winner.',
        trades: [
            { time: '09:56', type: 'long', result: 'win', rr: 10.02 }
        ]
    },
    '2025-12-12': {
        image: 'dec1225.png',
        notes: 'Rough day. Pablo took 3 stop losses and 2 breakevens. No winners today.',
        trades: [
            { time: '04:54', type: 'long', result: 'be' },
            { time: '10:07', type: 'long', result: 'loss' },
            { time: '10:54', type: 'long', result: 'loss' },
            { time: '01:01', type: 'long', result: 'be' },
            { time: '02:06', type: 'long', result: 'loss' }
        ]
    },
    '2025-12-15': {
        image: 'dec1525.png',
        notes: 'Mixed day with a big 10.24 RR winner early, but struggled in the afternoon with multiple losses.',
        trades: [
            { time: '09:01', type: 'short', result: 'loss' },
            { time: '09:32', type: 'short', result: 'win', rr: 10.24 },
            { time: '12:52', type: 'long', result: 'be' },
            { time: '02:41', type: 'long', result: 'be' },
            { time: '03:23', type: 'long', result: 'loss' },
            { time: '03:41', type: 'long', result: 'loss' },
            { time: '03:50', type: 'long', result: 'loss' },
            { time: '03:57', type: 'long', result: 'win', rr: 0.74 }
        ]
    },
    '2025-12-16': {
        image: 'dec1625.png',
        notes: 'Clean single trade. Pablo waited for the perfect setup and nailed a 10.12 RR winner.',
        trades: [
            { time: '02:44', type: 'long', result: 'win', rr: 10.12 }
        ]
    },
    '2025-12-17': {
        image: 'dec1725.png',
        notes: 'Started strong with a 10.7 RR winner, but struggled through the day with multiple losses.',
        trades: [
            { time: '07:50', type: 'short', result: 'win', rr: 10.7 },
            { time: '10:50', type: 'long', result: 'loss' },
            { time: '11:08', type: 'long', result: 'loss' },
            { time: '11:50', type: 'long', result: 'be' },
            { time: '01:51', type: 'long', result: 'loss' }
        ]
    },
    '2025-12-18': {
        image: 'dec1825.png',
        notes: 'Tough day with multiple losses, but managed to close with a 2 RR winner.',
        trades: [
            { time: '09:31', type: 'short', result: 'be' },
            { time: '12:52', type: 'short', result: 'loss' },
            { time: '02:40', type: 'short', result: 'loss' },
            { time: '03:34', type: 'short', result: 'win', rr: 2.0 }
        ]
    },
    '2025-12-19': {
        image: 'dec1925.png',
        notes: 'Started with a massive 10.12 RR winner early morning, but struggled through the rest of the day.',
        trades: [
            { time: '03:52', type: 'short', result: 'loss' },
            { time: '04:53', type: 'short', result: 'win', rr: 10.12 },
            { time: '09:30', type: 'short', result: 'loss' },
            { time: '10:51', type: 'short', result: 'loss' },
            { time: '11:51', type: 'short', result: 'loss' }
        ]
    },
    '2025-12-22': {
        image: 'dec2225.png',
        notes: 'Tough start with a breakeven and two losses, but Pablo caught a 2.82 RR winner to end the day positive.',
        trades: [
            { time: '03:05', type: 'short', result: 'be' },
            { time: '05:02', type: 'short', result: 'loss' },
            { time: '07:52', type: 'short', result: 'loss' },
            { time: '09:28', type: 'short', result: 'win', rr: 2.82 }
        ]
    },
    '2025-12-29': {
        image: 'dec2925.png',
        notes: 'A quiet Monday returning from the holidays. One breakeven in the early morning followed by a stop loss.',
        trades: [
            { time: '03:51', type: 'long', result: 'be' },
            { time: '07:59', type: 'long', result: 'loss' }
        ]
    },
    '2025-12-31': {
        image: 'dec3125.png',
        notes: 'Closing out the year. Secured a solid 3.41 RR win via trailing stop, though the afternoon session was choppy.',
        trades: [
            { time: '10:56', type: 'long', result: 'win', rr: 3.41 },
            { time: '14:46', type: 'long', result: 'loss' },
            { time: '15:00', type: 'long', result: 'loss' }
        ]
    },
    '2026-01-02': {
        image: 'jan0226.png',
        notes: 'First trading day of 2026. Started with a loss and a breakeven, but Pablo caught a massive runner for 27.41 RR to the downside.',
        trades: [
            { time: '07:50', type: 'short', result: 'loss' },
            { time: '09:37', type: 'short', result: 'be' },
            { time: '09:50', type: 'short', result: 'win', rr: 27.41 }
        ]
    },
    '2026-01-05': {
        image: 'jan0526.png',
        notes: 'Rough start to the week. Pablo took 4 short losses throughout the morning session.',
        trades: [
            { time: '08:55', type: 'short', result: 'loss' },
            { time: '09:02', type: 'short', result: 'loss' },
            { time: '09:29', type: 'short', result: 'loss' },
            { time: '11:08', type: 'short', result: 'loss' }
        ]
    },
    '2026-01-06': {
        image: 'jan0626.png',
        notes: 'Mixed day with a loss early, but Pablo caught a small 0.57 RR winner in the afternoon.',
        trades: [
            { time: '09:56', type: 'short', result: 'loss' },
            { time: '15:42', type: 'short', result: 'win', rr: 0.57 }
        ]
    },
    '2026-01-07': {
        image: 'jan0726.png',
        notes: 'Started with a loss, but Pablo bounced back with a massive 9.86 RR winner.',
        trades: [
            { time: '11:57', type: 'short', result: 'loss' },
            { time: '14:08', type: 'short', result: 'win', rr: 9.86 }
        ]
    },
    '2026-01-08': {
        image: 'jan0826.png',
        notes: 'Quick turnaround. Pablo took a long loss early but immediately caught an 8.96 RR winner.',
        trades: [
            { time: '09:36', type: 'long', result: 'loss' },
            { time: '10:01', type: 'long', result: 'win', rr: 8.96 }
        ]
    },
    '2026-01-09': {
        image: 'jan0926.png',
        notes: 'Strong day with two winners. Pablo caught a 10.58 RR winner early and a 1.76 RR winner in the afternoon.',
        trades: [
            { time: '09:00', type: 'short', result: 'win', rr: 10.58 },
            { time: '14:46', type: 'short', result: 'win', rr: 1.76 }
        ]
    },
    '2026-01-13': {
        image: 'jan1326.png',
        notes: 'Late afternoon long loss. Pablo took a hit at 3:31 PM.',
        trades: [
            { time: '15:31', type: 'long', result: 'loss' }
        ]
    },
    '2026-01-14': {
        image: 'jan1426.png',
        notes: 'Challenging morning with three long losses, but Pablo bounced back with a massive 5.4 RR winner in the afternoon.',
        trades: [
            { time: '09:49', type: 'long', result: 'loss' },
            { time: '09:53', type: 'long', result: 'loss' },
            { time: '11:51', type: 'long', result: 'loss' },
            { time: '13:49', type: 'long', result: 'win', rr: 5.4 }
        ]
    },
    '2026-01-15': {
        image: 'jan1526.png',
        notes: 'Early morning loss followed by two breakevens, then another loss. Pablo finished strong with a huge 10.33 RR short winner.',
        trades: [
            { time: '04:10', type: 'short', result: 'loss' },
            { time: '09:33', type: 'short', result: 'be' },
            { time: '09:49', type: 'short', result: 'be' },
            { time: '10:59', type: 'short', result: 'loss' },
            { time: '11:49', type: 'short', result: 'win', rr: 10.33 }
        ]
    },
    '2026-01-16': {
        image: 'jan1626.png',
        notes: 'Quick start with a loss, but Pablo immediately caught a 4.59 RR winner on the next trade.',
        trades: [
            { time: '09:26', type: 'short', result: 'loss' },
            { time: '09:30', type: 'short', result: 'win', rr: 4.59 }
        ]
    },
    '2026-01-19': {
        image: 'jan1926.png',
        notes: 'Pablo caught a solid 6.31 RR long winner in the morning session.',
        trades: [
            { time: '10:55', type: 'long', result: 'win', rr: 6.31 }
        ]
    },
    '2026-01-20': {
        image: 'jan2026.png',
        notes: 'Tough start with two long losses, but Pablo bounced back with a 2.55 RR winner via trailing stop.',
        trades: [
            { time: '03:05', type: 'long', result: 'loss' },
            { time: '08:05', type: 'long', result: 'loss' },
            { time: '09:31', type: 'long', result: 'win', rr: 2.55 }
        ]
    },
    '2026-01-21': {
        image: 'jan2126.png',
        notes: 'Started with two short losses in the morning, but Pablo caught a solid 5.83 RR winner in the afternoon.',
        trades: [
            { time: '09:52', type: 'short', result: 'loss' },
            { time: '09:55', type: 'short', result: 'loss' },
            { time: '15:17', type: 'short', result: 'win', rr: 5.83 }
        ]
    },
    '2026-01-22': {
        image: 'jan2226.png',
        notes: 'Early morning loss, but Pablo bounced back with a 5.2 RR winner via trailing stop.',
        trades: [
            { time: '03:02', type: 'short', result: 'loss' },
            { time: '13:01', type: 'short', result: 'win', rr: 5.2 }
        ]
    },
    '2026-01-23': {
        image: 'jan2326.png',
        notes: 'Single short loss in the morning session.',
        trades: [
            { time: '10:53', type: 'short', result: 'loss' }
        ]
    },
    '2026-01-27': {
        image: 'jan2726.png',
        notes: 'Early morning breakeven, followed by a loss, but Pablo closed with a 1.16 RR winner in the afternoon.',
        trades: [
            { time: '02:52', type: 'short', result: 'be' },
            { time: '11:05', type: 'short', result: 'loss' },
            { time: '15:34', type: 'short', result: 'win', rr: 1.16 }
        ]
    }
};
