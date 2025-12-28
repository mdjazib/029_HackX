"use client"
import React, { useMemo } from "react";

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysBetween(a, b) {
  const ms = startOfDay(b) - startOfDay(a);
  return Math.round(ms / (24 * 60 * 60 * 1000));
}

// Simple responsive activity heatmap (12 weeks x 7 days)
const ActivityHeatmap = ({ css, events = [], weeks = 12, title = "Mood Map" }) => {
  const { grid, weekLabels, maxCount, counts, startDate } = useMemo(() => {
    const totalDays = weeks * 7;
    const now = new Date();
    const end = startOfDay(now);
    const start = new Date(end);
    start.setDate(end.getDate() - (totalDays - 1));

    const c = new Array(totalDays).fill(0);

    for (const e of events) {
      const date = new Date(e);
      const idx = daysBetween(start, date);
      if (idx >= 0 && idx < totalDays) c[idx] += 1;
    }

    const max = c.reduce((m, v) => Math.max(m, v), 0) || 1;
    const g = [];
    for (let i = 0; i < weeks; i++) {
      const col = [];
      for (let d = 0; d < 7; d++) {
        const dayIndex = i * 7 + d;
        col.push(c[dayIndex]);
      }
      g.push(col);
    }

    // Month labels for each week start
    const labels = [];
    for (let i = 0; i < weeks; i++) {
      const dt = new Date(start);
      dt.setDate(start.getDate() + i * 7);
      labels.push(dt.toLocaleString(undefined, { month: "short" }));
    }

    return { grid: g, weekLabels: labels, maxCount: max, counts: c, startDate: start };
  }, [events, weeks]);

  const getLevel = (count) => {
    if (count <= 0) return 0;
    const ratio = count / maxCount;
    if (ratio > 0.75) return 4;
    if (ratio > 0.5) return 3;
    if (ratio > 0.25) return 2;
    return 1;
  };

  return (
    <section className={css.activity_section}>
      <div className={css.activity_header}>
        <h3>{title}</h3>
      </div>
      <div className={css.activity_heatmap}>
        {grid.map((week, wi) => (
          <div key={wi} className={css.activity_col}>
            {week.map((count, di) => {
              const level = getLevel(count);
              return (
                <div
                  key={di}
                  className={`${css.activity_cell} ${css[`lvl_${level}`]}`}
                  title={`${count} activities`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className={css.activity_legend}>
        <span>Less</span>
        <div className={`${css.activity_cell} ${css.lvl_0}`} />
        <div className={`${css.activity_cell} ${css.lvl_1}`} />
        <div className={`${css.activity_cell} ${css.lvl_2}`} />
        <div className={`${css.activity_cell} ${css.lvl_3}`} />
        <div className={`${css.activity_cell} ${css.lvl_4}`} />
        <span>More</span>
      </div>
    </section>
  );
};

export default ActivityHeatmap;
