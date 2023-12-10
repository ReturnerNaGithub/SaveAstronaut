"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Nfts",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>4 NFTs</li>
       
      </ul>
    ),
  },
  {
    title: "Playing",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>How to play</li>
       
      </ul>
    ),
  },
  {
    title: "Upgrades",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>coming soon</li>
        
        
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/max.jpg" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Game</h2>
          <p className="text-base lg:text-lg">
            The goal in the game is to collect all 4 NFTs and Save Astronaut Patrick from Oblivion. Later we will add goal time 5 min.
            If you don,t save him in 5 minutes the ship will explode. You picking up NFTs with E key. If you get stucked you have to find nearest Laptop
            and find the mouse cursor. Some things are little tricky so we hope, that you injoj playing.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              NFTs{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Playing{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Upgrades{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    
     </section>
  );
};

export default AboutSection;