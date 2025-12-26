"use client"
import Header from '@/components/Header'
import css from "./app.module.sass"
import React from 'react'
import Thought from '@/components/Thought'

const page = () => {
    const thoughts = [
        {
            username: "itxmuhammadjazib",
            thought: "Learn to give before you take.",
            paws: 2410,
            shares: 20
        },
        {
            username: "azlan.codes",
            thought: "Silence is the most honest reply.",
            paws: 1533,
            shares: 11
        },
        {
            username: "wolfmind",
            thought: "Heal in private, grow in public.",
            paws: 1984,
            shares: 16
        },
        {
            username: "inkedthoughts",
            thought: "Weak ties break fast. Strong hearts don’t.",
            paws: 1204,
            shares: 9
        },
        {
            username: "exist.with.purpose",
            thought: "Not everyone deserves a seat in your life.",
            paws: 2211,
            shares: 14
        },
        {
            username: "mindshift",
            thought: "Respect is expensive. Earn it.",
            paws: 1442,
            shares: 12
        },
        {
            username: "soul.storm",
            thought: "Your growth will offend small minds.",
            paws: 2090,
            shares: 18
        },
        {
            username: "itxmuhammadjazib",
            thought: "Be kind. It confuses the unkind.",
            paws: 1730,
            shares: 15
        },
        {
            username: "seeker",
            thought: "Walk alone until the right people catch up.",
            paws: 2677,
            shares: 22
        },
        {
            username: "silentwolf",
            thought: "Peace looks good on you.",
            paws: 1330,
            shares: 8
        },

        // ---------- LONG THOUGHTS ----------
        {
            username: "itxmuhammadjazib",
            thought: `Sometimes life doesn’t break you to destroy you.  
    It breaks you to rebuild parts of you that were never allowed to grow.  
    You lose people so you can find yourself.  
    You fall so you can rise differently.  
    You get hurt so you can learn boundaries.  
    You get ignored so you can stop seeking validation.  
    You walk alone so you can hear your own voice.  
    Growth is loud inside you, even if the world stays silent.`,
            paws: 4821,
            shares: 41
        },
        {
            username: "mind.core",
            thought: `The truth is, you outgrow people faster than you expect.  
    You outgrow places, habits, and versions of yourself you once loved.  
    That’s not betrayal.  
    That’s evolution.  
    You are not meant to stay where you were hurt.  
    You are not meant to shrink to fit.  
    Rise so high that your past cannot reach you anymore.`,
            paws: 4211,
            shares: 39
        },
        {
            username: "depthscript",
            thought: `Be careful whose opinions you internalize.  
    Some judge you from their wounds, not your reality.  
    Some attack because your confidence exposes their insecurity.  
    Some distance themselves because your growth threatens their comfort.  
    Don’t shrink.  
    Don’t bend.  
    Move forward with the strength they never expected.`,
            paws: 3790,
            shares: 31
        },
        {
            username: "soulwriter",
            thought: `One day you will understand why certain doors remained closed.  
    Why people left without warning.  
    Why opportunities slipped.  
    Not because you were unworthy—  
    but because life was protecting you from smaller destinies.  
    Trust the timing.  
    Trust the redirections.`,
            paws: 3999,
            shares: 27
        },
        {
            username: "alpha.mind",
            thought: `You don’t truly change when life is soft.  
    You change when life throws you into silence, forces you to stand alone.  
    In that silence, you rebuild your truth.  
    You stop craving validation.  
    You start choosing yourself.  
    That’s when real life begins.`,
            paws: 3555,
            shares: 26
        },

        // ---------- MORE SHORT & MEDIUM ----------
        {
            username: "moonlogic",
            thought: "Your value is not up for negotiation.",
            paws: 1901,
            shares: 10
        },
        {
            username: "wolfmind",
            thought: "Protect your peace like it's oxygen.",
            paws: 2150,
            shares: 13
        },
        {
            username: "codedbyfate",
            thought: "If it costs your mental health, it's too expensive.",
            paws: 1680,
            shares: 7
        },
        {
            username: "quietalpha",
            thought: "Growth is painful, but staying the same is deadly.",
            paws: 2402,
            shares: 22
        },
        {
            username: "life.engine",
            thought: "Your future deserves a stronger you.",
            paws: 1550,
            shares: 6
        },
        {
            username: "itxmuhammadjazib",
            thought: "Not everyone deserves the unfiltered version of you.",
            paws: 2041,
            shares: 14
        },
        {
            username: "coremind",
            thought: "Your mindset is your true home.",
            paws: 1300,
            shares: 5
        },
        {
            username: "rawtruth",
            thought: "Let actions prove what words could never.",
            paws: 1988,
            shares: 10
        },
        {
            username: "energyvault",
            thought: "Stop watering dead plants.",
            paws: 1666,
            shares: 9
        },
        {
            username: "solitude",
            thought: "Better alone than badly accompanied.",
            paws: 2210,
            shares: 15
        },
        {
            username: "truthhunter",
            thought: "You owe loyalty only to those who earned it.",
            paws: 1877,
            shares: 10
        },
        {
            username: "calmstorm",
            thought: "Sometimes not reacting is the loudest reaction.",
            paws: 2544,
            shares: 17
        },
        {
            username: "codedspirit",
            thought: "A calm mind wins every battle.",
            paws: 1733,
            shares: 8
        },
        {
            username: "wolf.alpha",
            thought: "You lose people when you level up. It’s normal.",
            paws: 2333,
            shares: 14
        },
        {
            username: "journaltide",
            thought: `You are not behind.  
    You are not late.  
    You are exactly where your story needs you.  
    Some chapters are slow, some are wild,  
    but every page turns you into someone  
    your past self wished to become.`,
            paws: 3622,
            shares: 30
        }
    ];
    return (
        <div className={css.app}>
            <div className={css.col}>
                <Header css={css} />
                <main>
                    <div className={css.masonry}>
                        {thoughts.map((thought, index) => (<Thought key={index} data={thought} css={css} />))}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default page