import React from "react";
import Carousel from "./Carousel";
import SoftSkill from "../atoms/SoftSkill";
import VIEW from "@/data/view";

export default function SoftSkillsCarousel() {
  const listItems = VIEW.softSkills;

  const listNode = listItems.map((item, index) => (
    <SoftSkill key={index} label={item} />
  ));

  return <Carousel list={listNode} />;
}
