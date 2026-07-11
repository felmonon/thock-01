// Central GSAP entry for the plugins used by THOCK/01.
// Keeping this list focused makes the competition build smaller and faster.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomEase } from "gsap/CustomEase";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(
  ScrollTrigger,
  DrawSVGPlugin,
  Physics2DPlugin,
  CustomEase,
  CustomBounce,
  ScrambleTextPlugin,
);

export {
  gsap,
  ScrollTrigger,
  DrawSVGPlugin,
  Physics2DPlugin,
  CustomEase,
  CustomBounce,
  ScrambleTextPlugin,
};
