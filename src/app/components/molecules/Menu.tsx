"use client";

import { useState, useEffect, lazy, Suspense, useMemo } from "react";
import Button from "../atoms/Button";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";
import FooterLabels from "./FooterLabels";

const LazyModal = lazy(() => import("./Modal"));

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const router = useRouter();

  const items = useMemo(
    () => [
      { label: "home", path: "/" },
      { label: "projects", path: "/projects" },
      { label: "contact", path: "/contact" },
    ],
    []
  );

  useEffect(() => {
    items.forEach(({ path }) => {
      router.prefetch(path);
    });
  }, [items, router]);

  const handleToggle = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (path: string) => {
    setPendingPath(path);
    setIsOpen(false);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);

    if (pendingPath) {
      router.push(pendingPath);
      setPendingPath(null);
    }
  };

  return (
    <>
      <Button
        onClick={handleToggle}
        disabled={isAnimating || isOpen}
        variant="secondary"
        className="w-12 bg-transparent"
      >
        {isOpen ? <IoCloseSharp size={32} /> : <HiMenuAlt4 size={32} />}
      </Button>

      <Suspense>
        <LazyModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onAnimationEnd={handleAnimationEnd}
          title="Menu"
          className="flex flex-col h-full justify-between pb-8 pt-52"
        >
          <ul className="flex flex-col items-end gap-10 w-[80vw] sm:w-auto">
            {items.map(({ label, path }, index) => (
              <li
                className="w-full"
                key={index}
                onClick={() => handleItemClick(path)}
              >
                <MenuItem path={path} label={label} />
              </li>
            ))}
          </ul>

          <FooterLabels />
        </LazyModal>
      </Suspense>
    </>
  );
}
