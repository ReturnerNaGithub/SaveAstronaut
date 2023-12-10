"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-2xl sm:text-4xl lg:text-6xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Chainlink Project :{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "Save The Patrick",
                1000,
                "Surviving Game",
                1000,
                "NFT Full Suit",
                1000,
                "Burn and Merge NFTs",
                1000,
                "Fuji & Sepolia testnets",
                1000,
                "Chainlink CCIP",
                1000,
              ]}
              wrapper="span"
              speed={40}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
          An interesting game where you need to acquire four NFTs using CCIP for endpoint.
          </p>
          <div>
            <Link
              href="https://testnets.opensea.io/account"
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
            >
              Nft Marketplace
            </Link>
            <Link
              href="https://1drv.ms/f/s!AuolOG7htGE3lQ1GI86Gvr31UdpT?e=sHjfXY"
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
            >
              Dowload & Play
            </Link>
            <Link
              href="https://github.com/ReturnerNaGithub/SaveAstronaut"
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
            >
              
            </Link>
            
            
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div
            className="rounded-full bg-[#a736c6] w-[150px] h-[50px] lg:w-[930px] 
          lg:h-[1px] relative"
          >
            <Image
              src="/images/moon.png"
              alt="hero image"
              className="absolute transform  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={1650}
              height={1650}
            />
            <Image
              src="/images/abg.png"
              alt="hero image"
              className="absolute flex  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={450}
              height={350}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
