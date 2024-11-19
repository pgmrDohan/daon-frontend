import { useState, useLayoutEffect, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./index.module.scss";

const days = ["일", "월", "화", "수", "목", "금", "토"];

const getDate = (startDate: Date, daysToAdd: number): number[][] => {
  let result = [];
  for (let i = 0; i < Math.abs(daysToAdd); i++) {
    const d_today = new Date(startDate);
    d_today.setDate(startDate.getDate() + (daysToAdd > 0 ? i : -i));
    let date = d_today.getDate();
    let day = d_today.getDay();

    let data = [date, day];
    result.push(data);
  }
  return daysToAdd > 0 ? result : result.reverse();
};

export const DateSelect = ({ className }: { className: string }) => {
  const today = new Date();
  const initialDates = getDate(new Date(Date.now() - 4 * 86400000), 10);

  // Find today's index in the initialDates array
  const todayIndex = initialDates.findIndex(
    (date) => date[0] === today.getDate() && date[1] === today.getDay()
  );

  const [data, setData] = useState(initialDates);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(todayIndex);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;

      // Center the dates initially
      const dateItem = container.querySelector(`.${styles.dateItem}`);
      if (dateItem) {
        const itemWidth = dateItem.clientWidth;
        const containerWidth = container.clientWidth;
        const scrollPosition =
          (itemWidth * data.length) / 2 - containerWidth / 2;
        container.scrollLeft = scrollPosition;
      }

      // Add scroll listener
      const handleScroll = () => {
        if (!hasScrolled) {
          setHasScrolled(true);
        }
      };

      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const loadMoreDates = (direction: "start" | "end") => {
    if (!hasScrolled) return; // Don't load if user hasn't scrolled

    const lastDate = new Date();
    lastDate.setDate(lastDate.getDate() + data.length - 3);
    const firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 3 - data.length);
    let newDates;

    if (direction === "end") {
      newDates = getDate(lastDate, 3);
      setData([...data, ...newDates]);
    } else {
      newDates = getDate(firstDate, -3);
      setSelectedIndex(selectedIndex + 3);
      setData([...newDates, ...data]);
    }
  };

  const { ref: endRef, inView: endInView } = useInView({
    root: scrollContainerRef.current,
    rootMargin: "20px",
    threshold: 1.0,
  });
  const { ref: startRef, inView: startInView } = useInView({
    root: scrollContainerRef.current,
    rootMargin: "20px",
    threshold: 1.0,
  });

  useLayoutEffect(() => {
    if (endInView) {
      loadMoreDates("end");
    }
  }, [endInView]);

  useLayoutEffect(() => {
    if (startInView) {
      loadMoreDates("start");
    }
  }, [startInView]);

  return (
    <div
      className={`${styles.scrollContainer} ${className}`}
      ref={scrollContainerRef}
    >
      <div className={styles.dateList}>
        <div ref={startRef}></div>
        {data.map((date, index) => (
          <div
            key={index}
            className={`${styles.dateItem} ${
              selectedIndex === index ? styles.selected : ""
            }`}
            onClick={() => setSelectedIndex(index)}
          >
            <div className="p-md pt-sm pb-sm">
              <p className="typo-subTitle">{days[date[1]]}</p>
              <span className="typo-header2">{date[0]}</span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
    </div>
  );
};
