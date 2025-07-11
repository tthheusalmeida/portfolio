import Image from "next/image";
import Tag from "../atoms/Tag";
import { mergeClassNames } from "@/utils/classNames";
import CompanyTime from "../atoms/CompanyTime";

interface BaloonProps {
  label: string;
  logo?: string;
  role: string;
  descriptions: Array<string>;
  arrow?: "right" | "left" | "";
  dateStart?: string;
  dateEnd?: string;
}

export default function Balloon({
  label,
  logo,
  role,
  descriptions,
  // arrow = "",
  dateStart,
  dateEnd,
}: BaloonProps) {
  // const isArrowRight = arrow === "right";

  return (
    <div
      className={mergeClassNames(
        "relative sm:w-[520px] p-3 sm:p-4 z-1",
        "bg-[var(--color-background)]/60 backdrop-blur-3xl rounded"
      )}
    >
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="order-2 sm:order-1">
          <h3 className="font-semibold text-2xl sm:text-4xl">{label}</h3>

          <div className="flex flex-col sm:flex-row gap-3 items-baseline mt-2 sm:mt-4">
            <Tag className="order-2 sm:order-1">{role}</Tag>

            {dateStart && dateEnd && (
              <CompanyTime
                start={dateStart}
                end={dateEnd}
                className="order-1 sm:order-2"
              />
            )}
          </div>
        </div>

        {logo && (
          <div
            className={mergeClassNames(
              "flex items-center justify-center",
              "bg-white rounded-xl sm:ml-2 mb-4 sm:p-1",
              "order-1 sm:order-2 min-h-16 sm:min-h-auto"
            )}
          >
            <Image
              src={logo}
              width={120}
              height={48}
              alt={`${label} company`}
              unoptimized
              priority
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
      </div>

      <ul className="mt-4! text-base">
        {descriptions.map((description, index) => (
          <li
            key={index}
            className="leading-relaxed before:content-['-'] before:mr-2 before:text-[var(--color-foreground)]/25"
          >
            {description}
          </li>
        ))}
      </ul>

      {/* {arrow && (
        <div
          className={mergeClassNames(
            "w-6 h-6 rotate-45",
            "bg-[var(--color-background)]/60 backdrop-blur-3xl",
            "hidden sm:block absolute top-4 z-0",
            `${isArrowRight ? "-left-3" : "-right-3"}`
          )}
        ></div>
      )} */}
    </div>
  );
}
