"use client";

import React from "react";
import Carousel from "./Carousel";
import SoftSkill from "../atoms/SoftSkill";
import { useData } from "@/contexts/LanguageContext";

export default function SoftSkillsCarousel() {
  const listItems = useData().softSkills;

  const listNode = listItems.map((item, index) => (
    <SoftSkill
      key={index}
      label={item}
      className="hover:text-[var(--action)]"
    />
  ));

  return <Carousel list={listNode} />;
}
