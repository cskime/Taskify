import { useBackdropClick } from "@/hooks/use-backdrop-unmount";
import { classnames } from "@/utils/classnames";
import { PropsWithChildren, ReactNode, useState } from "react";
import styles from "./menu.module.css";

interface Props extends PropsWithChildren {
  items: ReactNode[];
  direction?: "left" | "right";
}

export function Menu({ items, children, direction = "left" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const targetRef = useBackdropClick<HTMLDivElement>({
    callback: () => setIsOpen(false),
  });

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={targetRef}>
      <button className={styles.anchor} onClick={handleClick}>
        {children}
      </button>
      {isOpen && (
        <div
          className={classnames(styles.menu, styles[direction])}
          onClick={handleItemClick}
        >
          {items}
        </div>
      )}
    </div>
  );
}
