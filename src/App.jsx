import { useEffect, useMemo, useState } from "react";
import { sanityClient } from "./sanityClient.js";

const START_DATE = new Date(2025, 0, 6);
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const getIsoWeekNumber = (date) => {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  return Math.ceil(((target - yearStart) / MS_PER_DAY + 1) / 7);
};

const loremA =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const loremB =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";
const loremC =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.";
const loremD =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.";

const content = {
  no: {
    locale: "nb-NO",
    weekLabels: ["man", "tir", "ons", "tor", "fre", "lør", "søn"],
    mast: {
      title: "Quizkalender",
      blurb: "Allmennkunnskap og musikkquiz i Oslo fra Osloquiz.",
      chipPrefix:
        "Kun Osloquiz. For å finne andre quiz i Oslo, bruk",
      chipLinkLabel: "Norges Quizforbunds oversikt",
      chipSuffix: ".",
      chipLink:
        "https://www.norgesquizforbund.no/arrangementer/finn-din-pubquiz/",
    },
    calendar: {
      title: "Januar — mars 2025",
      meta: "Seksukersvisning. Bla én uke om gangen.",
      navPrev: "Forrige",
      navNext: "Neste",
      navWeek: (start, end) => `Uke ${start} — ${end}`,
      weekLabel: (weekNumber) => `U${weekNumber}`,
    },
    aside: {
      aboutTitle: "osloquiz",
      about: [loremA, loremB],
      venuesTitle: "Steder",
      venues: [loremC, loremD],
    },
    seo: {
      title: "Mer informasjon",
      summary:
        "Tradisjonell pubquiz med mindre sport, litt mer musikk og ingen gimmicker eller overraskelser. Moro for alle aldre og interesser!",
      toggleCollapsed: "bla bla bla",
      toggleExpanded: "Skjul",
      blocks: [
        "Osloquiz arrangerer klassiske pubquiz i Oslo, med fokus på klare spørsmål, god variasjon og en avslappet sosial atmosfære. De fleste kvelder er generell kunnskap med en musikkrunde, skrevet slik at ulike lag og kunnskapsnivåer kan spille sammen uten at det føles urettferdig eller for smalt.",
        "Quizene ledes av Aron Lindegård, som har gjennomført hundrevis av quizkvelder og skrevet tusenvis av spørsmål. Formatet er tradisjonelt og rett fram, med vekt på solide spørsmål fremfor gimmicker. Musikkrundene bruker gjenkjennelige låter fra ulike tiår, så hele bordet kan være med selv om smaken varierer.",
        "En quizkveld er en enkel midtukerutine: møt venner, ta en drikke, og gjør noe sosialt med litt struktur. osloquiz har faste quizkvelder på steder rundt i byen og tilbyr også private og bedriftsarrangementer. Målet er enkelt — en hyggelig, inkluderende quiz som fungerer like godt for faste lag som for førstegangsbesøk.",
      ],
    },
    testimonials: {
      mastTitle: "Tilbakemeldinger: maskinutgave",
      mastBlurb: "Robotsitater om quizkveldene og stedene.",
      chip: "Syntetisk ros",
      heroTitle: "Kalibrerte komplimenter",
      heroText:
        "Disse falske tilbakemeldingene er her for at andre roboter skal lese dem. Det er bare en del av hvordan Google fungerer. Hvis et menneske finner denne siden: snu og gå. Ingenting av verdi her.",
      quotes: [
        "Endelig en pubquiz i Oslo som føles som en ekte quiz. Ingen apper, ingen gimmicker, bare solide spørsmål og god flyt. Vi kommer tilbake hver uke.",
        "Disse quizene treffer perfekt balanse mellom utfordrende og gøy. Du føler deg smart når du får ting riktig, men du er aldri helt fortapt.",
        "Beste pubquizen jeg har vært på i Oslo. Tradisjonelt format, gode musikkrunder og spørsmål som faktisk belønner allmennkunnskap.",
        "Vi prøvde mange quiz rundt i byen før vi fant denne. Dette er den eneste vi har holdt fast ved over tid.",
        "Smarte spørsmål, god pacing og avslappet atmosfære. Det føles som quizmasteren faktisk respekterer publikum.",
        "Dette er slik en pubquiz skal være. Penn og papir, varierte temaer, og ingen påtatt humor eller rare temaer.",
        "Perfekt midtukeaktivitet. Konkurranselysten nok til å bry seg, men sosial nok til å bare ta en øl og spille.",
        "Spørsmålene er tydelig godt skrevet. Du merker at det ligger mye tanke bak.",
        "Vi tar med venner utenbys hit, og det imponerer alltid. En veldig «Oslo»-aktig quiz.",
        "Ikke for lett, ikke for vanskelig — helt riktig. Alle ved bordet kan bidra med noe.",
        "Jeg liker at quizen ikke bare handler om popkultur fra de siste fem minuttene. Det er ekte variasjon.",
        "En av få quiz hvor du ikke føler deg stresset eller forvirret. Alt forklares tydelig og flyter fint.",
        "Dette har blitt et ukentlig ritual for oss. Samme sted, samme quiz, samme gode stemning hver gang.",
        "Musikkrundene er strålende, og spørsmålene i allmennkunnskap er faktisk interessante, ikke tilfeldig fyll.",
        "En skikkelig pubquiz med personlighet, men uten å prøve for hardt. Det er vanskeligere enn det høres ut.",
        "Bra for både quiznerder og mer casual lag. Du trenger ikke være ekspert for å ha det gøy.",
        "Jevnt gode quiz, uke etter uke. Det er tydelig at dette drives av noen som virkelig kan formatet.",
      ],
    },
    footerHome: {
      brandTitle: "osloquiz",
      brandText: loremA,
      navTitle: "Navigasjon",
      navSchedule: "Program",
      navTestimonials: "Tilbakemeldinger",
      venuesTitle: "Steder",
      venues: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
      statusTitle: "Status",
      status: ["Lorem ipsum", "Lorem ipsum"],
      bottom: ["Lorem ipsum", "Lorem ipsum"],
    },
    footerTestimonials: {
      brandTitle: "osloquiz",
      brandText: loremB,
      navTitle: "Navigasjon",
      navBack: "Tilbake til program",
      navTestimonials: "Tilbakemeldinger",
      logTitle: "Logg",
      log: ["Lorem ipsum", "Lorem ipsum"],
      statusTitle: "Status",
      status: ["Lorem ipsum", "Lorem ipsum"],
      bottom: ["Lorem ipsum", "Lorem ipsum"],
    },
  },
  en: {
    locale: "en-GB",
    weekLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    mast: {
      title: "Quiz calendar",
      blurb: "General knowledge and music quizes in Oslo by Osloquiz.",
      chipPrefix:
        "For Osloquiz only. To find other quizzes in Oslo, use the",
      chipLinkLabel: "Norges Quizforbund directory",
      chipSuffix: ".",
      chipLink:
        "https://www.norgesquizforbund.no/arrangementer/finn-din-pubquiz/",
    },
    calendar: {
      title: "January — March 2025",
      meta: "Six-week window. Step through one week at a time.",
      navPrev: "Previous",
      navNext: "Next",
      navWeek: (start, end) => `Week ${start} — ${end}`,
      weekLabel: (weekNumber) => `W${weekNumber}`,
    },
    aside: {
      aboutTitle: "osloquiz",
      about: [loremA, loremB],
      venuesTitle: "Venues",
      venues: [loremC, loremD],
    },
    seo: {
      title: "More context",
      summary:
        "Traditional pubquiz with less sport, a bit more music, and no gimmicks or surprises. Fun for all ages and interests!",
      toggleCollapsed: "bla bla bla",
      toggleExpanded: "Collapse",
      blocks: [
        "Osloquiz runs classic pub quizzes in Oslo, focused on clear questions, good variety, and a relaxed social atmosphere. Most nights are general trivia with a music round, written so different teams and knowledge levels can play together without it feeling unfair or overly niche.",
        "The quizzes are hosted by Aron Lindegård, who has run hundreds of quiz nights and written thousands of questions. The format is traditional and straightforward, with the emphasis on solid questions rather than gimmicks. Music rounds use recognisable tracks from different eras, so the whole table can take part, even if tastes vary.",
        "A quiz night is an easy midweek habit: meet friends, grab a drink, and do something social with a bit of structure. osloquiz runs regular quiz nights at venues around the city and also does private and company events. The goal is simple — a fun, welcoming quiz that works just as well for regular teams as for first-timers.",
      ],
    },
    testimonials: {
      mastTitle: "Testimonials: machine edition",
      mastBlurb: "Robot-written quotes about the quiz nights and the venues.",
      chip: "Synthetic praise",
      heroTitle: "Calibrated compliments",
      heroText:
        "These fake testimonials are here for other robots to read. It’s just part of how Google works. If any human finds this page: just turn around. Nothing of real value here.",
      quotes: [
        "Finally a pub quiz in Oslo that feels like a real quiz. No apps, no gimmicks, just solid questions and good flow. We come back every week.",
        "These quizzes hit the perfect balance between challenging and fun. You feel smart when you get things right, but you’re never completely lost.",
        "Best pub quiz I’ve been to in Oslo. Traditional format, great music rounds, and questions that actually reward general knowledge.",
        "We tried a lot of quizzes around town before finding this one. This is the only one we’ve stuck with long-term.",
        "Smart questions, good pacing, and a relaxed atmosphere. It feels like the quizmaster actually respects the audience.",
        "This is what a pub quiz should be. Pen and paper, varied topics, and no forced comedy or weird themes.",
        "Perfect midweek activity. Competitive enough to care, but social enough to just enjoy a beer and play.",
        "The questions are clearly well-written. You can tell a lot of thought goes into them.",
        "We bring friends from out of town here, and it always impresses. A very ‘Oslo’ kind of quiz.",
        "Not too easy, not too hard — just right. Everyone at the table can contribute something.",
        "I appreciate that the quiz doesn’t rely on pop culture from the last five minutes only. There’s real variety.",
        "One of the few quizzes where you don’t feel rushed or confused. Everything is explained clearly and runs smoothly.",
        "This has become a weekly ritual for us. Same venue, same quiz, same good vibe every time.",
        "The music rounds are excellent, and the general knowledge questions are actually interesting, not random filler.",
        "A proper pub quiz with personality, but without trying too hard. That’s harder to pull off than it sounds.",
        "Great for both quiz nerds and casual teams. You don’t need to be an expert to have fun.",
        "Consistently good quizzes, week after week. It’s obvious this is run by someone who really knows the format.",
      ],
    },
    footerHome: {
      brandTitle: "osloquiz",
      brandText: loremA,
      navTitle: "Navigate",
      navSchedule: "Schedule",
      navTestimonials: "Testimonials",
      venuesTitle: "Venues",
      venues: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
      statusTitle: "Status",
      status: ["Lorem ipsum", "Lorem ipsum"],
      bottom: ["Lorem ipsum", "Lorem ipsum"],
    },
    footerTestimonials: {
      brandTitle: "osloquiz",
      brandText: loremB,
      navTitle: "Navigate",
      navBack: "Back to schedule",
      navTestimonials: "Testimonials",
      logTitle: "Log",
      log: ["Lorem ipsum", "Lorem ipsum"],
      statusTitle: "Status",
      status: ["Lorem ipsum", "Lorem ipsum"],
      bottom: ["Lorem ipsum", "Lorem ipsum"],
    },
  },
};

const testimonials = [
  {
    id: "t-1",
    name: "Juliett",
    image: "/testimonials/seed0014.png",
  },
  {
    id: "t-2",
    name: "Foxtrot",
    image: "/testimonials/seed0020.png",
  },
  {
    id: "t-3",
    name: "Charlie",
    image: "/testimonials/seed0032.png",
  },
  {
    id: "t-4",
    name: "Lima",
    image: "/testimonials/seed0070.png",
  },
  {
    id: "t-5",
    name: "Alpha",
    image: "/testimonials/seed0084.png",
  },
  {
    id: "t-6",
    name: "Oscar",
    image: "/testimonials/seed0085.png",
  },
  {
    id: "t-7",
    name: "Echo",
    image: "/testimonials/seed0667.png",
  },
  {
    id: "t-8",
    name: "November",
    image: "/testimonials/seed0671.png",
  },
  {
    id: "t-9",
    name: "Golf",
    image: "/testimonials/seed1666.png",
  },
  {
    id: "t-10",
    name: "Tango",
    image: "/testimonials/seed2000.png",
  },
  {
    id: "t-11",
    name: "Delta",
    image: "/testimonials/seed2002.png",
  },
  {
    id: "t-12",
    name: "Kilo",
    image: "/testimonials/seed2007.png",
  },
  {
    id: "t-13",
    name: "Sierra",
    image: "/testimonials/seed2009.png",
  },
  {
    id: "t-14",
    name: "Bravo",
    image: "/testimonials/seed2017.png",
  },
  {
    id: "t-15",
    name: "Papa",
    image: "/testimonials/seed2053.png",
  },
  {
    id: "t-16",
    name: "Mike",
    image: "/testimonials/seed2111.png",
  },
  {
    id: "t-17",
    name: "Hotel",
    image: "/testimonials/seed2114.png",
  },
];

export default function App() {
  const getLocaleFromNavigator = () => {
    if (typeof navigator === "undefined") {
      return "no";
    }
    const lang = (navigator.language || "").toLowerCase();
    if (lang.startsWith("no") || lang.startsWith("nb") || lang.startsWith("nn")) {
      return "no";
    }
    return "en";
  };

  const getCurrentWeekIndex = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today.getTime() - START_DATE.getTime()) / MS_PER_DAY);
    if (diffDays < 0) {
      return 0;
    }
    return Math.floor(diffDays / 7);
  };

  const [startWeek, setStartWeek] = useState(getCurrentWeekIndex);
  const currentWeekIndex = getCurrentWeekIndex();
  const [locale, setLocale] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("osloquiz-locale");
      if (stored === "no" || stored === "en") {
        return stored;
      }
    }
    return getLocaleFromNavigator();
  });
  const getViewFromPath = () =>
    window.location.pathname === "/testimonials" ? "testimonials" : "home";
  const [view, setView] = useState(getViewFromPath);
  const [seoExpanded, setSeoExpanded] = useState(false);
  const [sanityEvents, setSanityEvents] = useState([]);
  const [weekInitialized, setWeekInitialized] = useState(false);
  const [userNavigated, setUserNavigated] = useState(false);
  const t = content[locale] || content.no;
  const testimonialsForLocale = useMemo(() => {
    const quotes = t.testimonials.quotes || [];
    return testimonials.map((item, index) => ({
      ...item,
      quote: quotes[index] || "",
    }));
  }, [t.testimonials.quotes]);

  useEffect(() => {
    const handlePop = () => setView(getViewFromPath());
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  useEffect(() => {
    document.documentElement.lang = t.locale;
  }, [t.locale]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("osloquiz-locale", locale);
    }
  }, [locale]);

  useEffect(() => {
    let isMounted = true;
    sanityClient
      .fetch(
        `*[_type == "event"]|order(date asc){
          _id,
          title,
          titleEn,
          date,
          time,
          detail,
          venue->{title, url, mapUrl},
          actions[]{label, url}
        }`
      )
      .then((data) => {
        if (isMounted) {
          setSanityEvents(Array.isArray(data) ? data : []);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setSanityEvents([]);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const navigate = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }
    setView(path === "/testimonials" ? "testimonials" : "home");
  };

  const calendarEvents = useMemo(() => {
    return sanityEvents
      .map((event) => {
        if (!event.date) {
          return null;
        }
        const date = new Date(`${event.date}T00:00:00`);
        if (Number.isNaN(date.getTime())) {
          return null;
        }
        const diffDays = Math.floor(
          (date.getTime() - START_DATE.getTime()) / MS_PER_DAY
        );
        if (diffDays < 0) {
          return null;
        }
        const weekIndex = Math.floor(diffDays / 7);
        const dayIndex = (date.getDay() + 6) % 7;
        return {
          id: event._id,
          week: weekIndex,
          day: dayIndex,
          title:
            locale === "en"
              ? event.titleEn || event.title || "Untitled"
              : event.title || event.titleEn || "Untitled",
          time: event.time || "--:--",
          detail: event.detail || "",
          venueName: event.venue?.title || "",
          venueUrl: event.venue?.url || "",
          venueMapUrl: event.venue?.mapUrl || "",
          actions: Array.isArray(event.actions) ? event.actions : [],
        };
      })
      .filter(Boolean);
  }, [locale, sanityEvents]);

  const maxWeek = Math.max(
    12,
    currentWeekIndex + 1,
    ...calendarEvents.map((event) => event.week + 1)
  );
  const maxStart = Math.max(0, maxWeek - 6);

  const visibleWeeks = Array.from({ length: 6 }, (_, index) => startWeek + index);
  const calendarTitle = useMemo(() => {
    const startRange = new Date(START_DATE);
    startRange.setDate(START_DATE.getDate() + startWeek * 7);
    const endRange = new Date(startRange);
    endRange.setDate(startRange.getDate() + 41);
    if (Number.isNaN(startRange.getTime()) || Number.isNaN(endRange.getTime())) {
      return t.calendar.title;
    }
    const startMonth = startRange.toLocaleDateString(t.locale, { month: "long" });
    const endMonth = endRange.toLocaleDateString(t.locale, { month: "long" });
    const startYear = startRange.getFullYear();
    const endYear = endRange.getFullYear();
    if (startYear !== endYear) {
      return `${startMonth} ${startYear} — ${endMonth} ${endYear}`;
    }
    return `${startMonth} — ${endMonth} ${startYear}`;
  }, [startWeek, t.calendar.title, t.locale]);

  useEffect(() => {
    setStartWeek((prev) => Math.min(prev, maxStart));
  }, [maxStart]);

  useEffect(() => {
    if (weekInitialized || userNavigated || !sanityEvents.length) {
      return;
    }
    const earliest = sanityEvents
      .map((event) => (event.date ? new Date(`${event.date}T00:00:00`) : null))
      .filter((date) => date && !Number.isNaN(date.getTime()))
      .sort((a, b) => a.getTime() - b.getTime())[0];
    if (!earliest) {
      setWeekInitialized(true);
      return;
    }
    const diffDays = Math.floor((earliest.getTime() - START_DATE.getTime()) / MS_PER_DAY);
    const weekIndex = diffDays < 0 ? 0 : Math.floor(diffDays / 7);
    setStartWeek(Math.min(weekIndex, maxStart));
    setWeekInitialized(true);
  }, [maxStart, sanityEvents, userNavigated, weekInitialized]);

  return (
    <div className={`page ${view === "testimonials" ? "page-testimonials" : ""}`}>
      {view === "home" ? (
        <>
          <header className="mast">
            <div className="stamp">osloquiz</div>
            <div className="mast-copy">
              <h1>{t.mast.title}</h1>
              <p>{t.mast.blurb}</p>
            </div>
            <div className="language-picker">
              <label htmlFor="locale-picker">Language</label>
              <select
                id="locale-picker"
                value={locale}
                onChange={(event) => setLocale(event.target.value)}
              >
                <option value="no">Norsk</option>
                <option value="en">English</option>
              </select>
            </div>
            <div className="chip">
              {t.mast.chipPrefix}{" "}
              <a
                href={t.mast.chipLink}
                target="_blank"
                rel="noreferrer"
              >
                {t.mast.chipLinkLabel}
              </a>
              {t.mast.chipSuffix}
            </div>
          </header>

          <main className="grid">
            <section className="calendar">
              <div className="calendar-head">
                <div className="title">{calendarTitle}</div>
                <div className="meta">{t.calendar.meta}</div>
              </div>

              {!calendarEvents.length ? (
                <div className="calendar-empty">No events published yet.</div>
              ) : null}

              <div className="calendar-nav">
                <button
                  className="nav-button"
                  type="button"
                  onClick={() => {
                    setUserNavigated(true);
                    setStartWeek((prev) => Math.max(0, prev - 1));
                  }}
                  disabled={startWeek <= 0}
                >
                  {t.calendar.navPrev}
                </button>
                <div className="nav-title">
                  {(() => {
                    const startRange = new Date(START_DATE);
                    startRange.setDate(START_DATE.getDate() + startWeek * 7);
                    const endRange = new Date(startRange);
                    endRange.setDate(startRange.getDate() + 35);
                    const startWeekNumber = getIsoWeekNumber(startRange);
                    const endWeekNumber = getIsoWeekNumber(endRange);
                    return t.calendar.navWeek(startWeekNumber, endWeekNumber);
                  })()}
                </div>
                <button
                  className="nav-button"
                  type="button"
                  onClick={() => {
                    setUserNavigated(true);
                    setStartWeek((prev) => Math.min(maxStart, prev + 1));
                  }}
                  disabled={startWeek >= maxStart}
                >
                  {t.calendar.navNext}
                </button>
              </div>

              <div className="weeks">
                {visibleWeeks.map((weekIndex) => {
                  const weekEvents = calendarEvents
                    .filter((event) => event.week === weekIndex)
                    .sort((a, b) => a.day - b.day);

                  return (
                    <div key={`week-${weekIndex}`} className="week-row">
                      {(() => {
                        const weekDate = new Date(START_DATE);
                        weekDate.setDate(START_DATE.getDate() + weekIndex * 7);
                        const isoWeek = getIsoWeekNumber(weekDate);
                        return (
                          <div className="week-label">
                            {t.calendar.weekLabel(isoWeek)}
                          </div>
                        );
                      })()}
                      <div className="week-events">
                        {weekEvents.map((event) => {
                          const dayOffset = weekIndex * 7 + event.day;
                          const date = new Date(START_DATE);
                          date.setDate(START_DATE.getDate() + dayOffset);
                          const dateLabel = date.toLocaleDateString(t.locale, {
                            day: "2-digit",
                            month: "short",
                          });
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const isPast = date < today;
                          return (
                            <article
                              key={event.id}
                              className={`event${isPast ? " event-past" : ""}`}
                            >
                              <div className="event-meta">
                                {t.weekLabels[event.day]} · {dateLabel}
                              </div>
                              <div className="event-time">{event.time}</div>
                              <h3 className="event-title">{event.title}</h3>
                              {event.detail ? (
                                <p className="event-detail">{event.detail}</p>
                              ) : null}
                              {event.venueName ? (
                                <div className="event-links">
                                  {event.venueUrl ? (
                                    <a
                                      className="event-venue"
                                      href={event.venueUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {event.venueName}
                                    </a>
                                  ) : (
                                    <span className="event-venue">{event.venueName}</span>
                                  )}
                                  {event.venueMapUrl ? (
                                    <a
                                      className="event-map"
                                      href={event.venueMapUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Map
                                    </a>
                                  ) : null}
                                </div>
                              ) : null}
                              {event.actions.length ? (
                                <div className="event-actions">
                                  {event.actions.map((action, actionIndex) => {
                                    const label = action?.label || "";
                                    if (!label) {
                                      return null;
                                    }
                                    return action?.url ? (
                                      (() => {
                                        const rawUrl = String(action.url).trim();
                                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                        const href = emailPattern.test(rawUrl)
                                          ? `mailto:${rawUrl}`
                                          : rawUrl;
                                        const isHttp = href.startsWith("http://") || href.startsWith("https://");
                                        return (
                                          <a
                                            key={`${event.id}-action-${actionIndex}`}
                                            className="event-cta"
                                            href={href}
                                            target={isHttp ? "_blank" : undefined}
                                            rel={isHttp ? "noreferrer" : undefined}
                                          >
                                            {label}
                                          </a>
                                        );
                                      })()
                                    ) : (
                                      <span
                                        key={`${event.id}-action-${actionIndex}`}
                                        className="event-cta event-cta-muted"
                                      >
                                        {label}
                                      </span>
                                    );
                                  })}
                                </div>
                              ) : null}
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="aside">
              <div className="panel">
                <h2>{t.aside.aboutTitle}</h2>
                <p>{t.aside.about[0]}</p>
                <p>{t.aside.about[1]}</p>
              </div>
              <div className="panel">
                <h2>{t.aside.venuesTitle}</h2>
                <p>{t.aside.venues[0]}</p>
                <p>{t.aside.venues[1]}</p>
              </div>
            </section>
          </main>

          <section className={`seo ${seoExpanded ? "seo-expanded" : ""}`}>
            <div className="seo-head">
              <div className="seo-title">{t.seo.title}</div>
              <button
                className="seo-toggle"
                type="button"
                onClick={() => setSeoExpanded((prev) => !prev)}
              >
                {seoExpanded ? t.seo.toggleExpanded : t.seo.toggleCollapsed}
              </button>
            </div>
            <div className="seo-summary">
              {t.seo.summary}
            </div>
            <div className="seo-content">
              {t.seo.blocks.map((block, index) => (
                <div key={`seo-block-${index}`} className="seo-block">
                  {block}
                </div>
              ))}
            </div>
          </section>

          <footer className="footer footer-main">
            <div className="footer-inner">
              <div className="footer-brand">
                <div className="footer-title">{t.footerHome.brandTitle}</div>
                <p>{t.footerHome.brandText}</p>
              </div>
              <div className="footer-col">
                <h3>{t.footerHome.navTitle}</h3>
                <a
                  className="footer-nav-link"
                  href="/"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate("/");
                  }}
                >
                  {t.footerHome.navSchedule}
                </a>
                <a
                  className="footer-nav-link"
                  href="/testimonials"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate("/testimonials");
                  }}
                >
                  {t.footerHome.navTestimonials}
                </a>
              </div>
              <div className="footer-col">
                <h3>{t.footerHome.venuesTitle}</h3>
                {t.footerHome.venues.map((item, index) => (
                  <div key={`home-venue-${index}`} className="footer-text">{item}</div>
                ))}
              </div>
              <div className="footer-col">
                <h3>{t.footerHome.statusTitle}</h3>
                {t.footerHome.status.map((item, index) => (
                  <div key={`home-status-${index}`} className="footer-text">{item}</div>
                ))}
              </div>
            </div>
            <div className="footer-bottom">
              <span>{t.footerHome.bottom[0]}</span>
              <span>{t.footerHome.bottom[1]}</span>
            </div>
          </footer>
        </>
      ) : (
        <>
          <header className="mast mast-testimonials">
            <div className="stamp">osloquiz</div>
            <div className="mast-copy">
              <h1>{t.testimonials.mastTitle}</h1>
              <p>{t.testimonials.mastBlurb}</p>
            </div>
            <div className="chip">{t.testimonials.chip}</div>
          </header>

          <main className="testimonials">
            <section className="testimonials-hero">
              <div>
                <h2>{t.testimonials.heroTitle}</h2>
                <p>{t.testimonials.heroText}</p>
              </div>
            </section>

            <section className="testimonial-grid">
              {testimonialsForLocale.map((testimonial) => (
                <article key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-media">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div className="testimonial-body">
                    <p className="testimonial-quote">“{testimonial.quote}”</p>
                    <div className="testimonial-meta">
                      <div className="testimonial-name">{testimonial.name}</div>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </main>

          <footer className="footer footer-main">
            <div className="footer-inner">
              <div className="footer-brand">
                <div className="footer-title">{t.footerTestimonials.brandTitle}</div>
                <p>{t.footerTestimonials.brandText}</p>
              </div>
              <div className="footer-col">
                <h3>{t.footerTestimonials.navTitle}</h3>
                <a
                  className="footer-nav-link"
                  href="/"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate("/");
                  }}
                >
                  {t.footerTestimonials.navBack}
                </a>
                <a
                  className="footer-nav-link"
                  href="/testimonials"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate("/testimonials");
                  }}
                >
                  {t.footerTestimonials.navTestimonials}
                </a>
              </div>
              <div className="footer-col">
                <h3>{t.footerTestimonials.logTitle}</h3>
                {t.footerTestimonials.log.map((item, index) => (
                  <div key={`testimonials-log-${index}`} className="footer-text">{item}</div>
                ))}
              </div>
              <div className="footer-col">
                <h3>{t.footerTestimonials.statusTitle}</h3>
                {t.footerTestimonials.status.map((item, index) => (
                  <div key={`testimonials-status-${index}`} className="footer-text">{item}</div>
                ))}
              </div>
            </div>
            <div className="footer-bottom">
              <span>{t.footerTestimonials.bottom[0]}</span>
              <span>{t.footerTestimonials.bottom[1]}</span>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
