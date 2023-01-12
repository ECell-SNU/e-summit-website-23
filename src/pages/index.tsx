import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { type NextPage } from "next";
import Image from "next/image";
import { Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import blueEllipse from "../assets/blue-ellipse.svg";
import blueEllipse1 from "../assets/blue-ellipse1.svg";
import blueUniverse from "../assets/blue-universe.png";
import ideathon from "../assets/ideathon.svg";
import imagination from "../assets/imagination.png";
import innovation from "../assets/innovation.png";
import paradigm from "../assets/paradigm.svg";
import playButton from "../assets/play-button.png";
import redEllipse from "../assets/red-ellipse.svg";
import redEllipse1 from "../assets/red-ellipse1.svg";
import redEllipse2 from "../assets/red-ellipse2.svg";
import splashImgLeftUni from "../assets/splash-left-universe.png";
import splashImgRightUni from "../assets/splash-right-universe.png";
import splashImg from "../assets/splash.png";
import startupexpo from "../assets/startupexpo.svg";
import startupverse from "../assets/startupverse.svg";
import universe from "../assets/universe.svg";
import videoThumbnail from "../assets/video-thumbnail.png";

import RegBox from "../components/reg-box";

// Add this to every page to protect from users who haven't filled the form
export { default as getServerSideProps } from "../lib/serverProps";

import Countdown from "../components/countdown";

const Home: NextPage = () => {
	const [video, setVideo] = useState(false);
	const data = [
		[startupverse, redEllipse2, "/events/startupverse"],
		[paradigm, redEllipse1, "/events/paradigm"],
		[ideathon, blueEllipse, "/events/ideathon"],
		[startupexpo, blueEllipse1, "/events/startupexpo"],
	];
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
	});
	const [selectedIndex, setSelectedIndex] = useState(0);
	const controls = useAnimation();
	const videoRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: videoRef,
		offset: ["center end", "center start"],
	});
	const [md, setMd] = useState(false);
	
	const [showTicket, setShowTicket] = useState(true);
	const [showAcommodation, setShowAcommodation] = useState(true);

	useEffect(() => {
		if (emblaApi) {
			console.log(emblaApi?.selectedScrollSnap());
			const interval = setInterval(() => {
				emblaApi.scrollPrev();
			}, 3000);
			return () => clearInterval(interval);
		}
	}, [emblaApi]);
	useEffect(() => {
		if (video) {
			if (videoRef.current) {
				videoRef.current.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
			setTimeout(() => {
				if (videoRef.current) {
					videoRef.current.scrollIntoView({ block: "center" });
				}
				disableBodyScroll(videoRef.current);
			}, 800);
		} else {
			enableBodyScroll(videoRef.current);
		}
	}, [video]);

	useEffect(() => {
		if (!emblaApi) return

		emblaApi.on('pointerDown', () => {
			setSelectedIndex(-1);
		});
		emblaApi.on('pointerUp', () => {
			setSelectedIndex(emblaApi.selectedScrollSnap());
		});
		emblaApi.on('select', () => {
			setSelectedIndex(emblaApi.selectedScrollSnap());
		});
	}, [emblaApi, setSelectedIndex]);

	useEffect(() => {
		const resize = () => {
			if (window.innerWidth >= 768) {
				setMd(true);
			} else {
				setMd(false);
			}
		}

		resize();
		window.addEventListener("resize", () => resize());
	}, [controls]);

	return (
		<div className="flex w-screen flex-col items-center">
			
			{showTicket && (
				<div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-md z-50 flex items-center justify-center">
					<div className="relative flex-col w-[375px] h-[430px] rounded-xl border border-white/50 bg-black z-60">
						<button
							className="absolute top-4 right-4 border border-white/50 rounded-md px-2"
							onClick={() => {
								setShowTicket(false);
							}}>
							x
						</button>
						<div className="flex-col w-full p-6 gap-1">
							<p className="text-white font-[600] text-xl">E-Summit&apos; 23 Ticket</p>
							<p className="text-sm text-white/60 w-4/5 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.</p>
						</div>
						<div className="flex-col my-1 p-6 border-y-[1px] border-white/50">
							<p className="text-xs w-4/5">University</p>
						</div>
						<div className="flex py-4 px-5 justify-end">
							<button className="rounded-md border border-white/50 px-6 py-2">
								<p className="text-sm">Cancel</p>
							</button>
							<button className="flex rounded-md bg-[#0085FF] px-6 py-2 ml-2 items-center gap-1">
								<p className="text-sm">Next</p>
								<ArrowForwardIcon color={"white"} />
							</button>
						</div>
					</div>
				</div>
			)}
			{showAcommodation && (
				<div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-md z-50 flex items-center justify-center">
					<div className="relative flex-col w-[750px] h-[500px] rounded-xl border border-white/50 bg-black items-center py-4">
						<button
							className="absolute top-4 right-4 border border-white/50 rounded-md px-2"
							onClick={() => {
								setShowAcommodation(false);
							}}>
							x
						</button>
						<h1 className="text-2xl font-[600] text-center">ACOMMODATION</h1>
						<div className="flex w-full justify-center items-center text-sm p-4">
							<p className="text-white/50">BASIC DETAILS</p>
							<div className="w-1/3 h-[1px] bg-white/20 mx-3" />
							<p className="text-white/50">MEMBERS DETAILS</p>
						</div>
						<div className="flex flex-col flex-wrap w-full h-[70%] border-y-[1px] border-white/20 p-4">
							{[...Array(9).keys()].map((i) => (
								<div className="flex flex-col w-1/3" key={i}>
									<p className="text-sm text-white">{i}</p>
									<Input
										className="mt-1"
										variant="outline"
										placeholder=""
									/>
								</div>
							))}
						</div>
						<div className="flex py-4 px-5 justify-end">
							<button className="rounded-md border border-white/50 px-6 py-2">
								<p className="text-sm">Cancel</p>
							</button>
							<button className="flex rounded-md bg-[#0085FF] px-6 py-2 ml-2 items-center gap-1">
								<p className="text-sm">Next</p>
								<ArrowForwardIcon color={"white"} />
							</button>
						</div>
					</div>
				</div>
			)}
			<div className="relative flex w-full items-center justify-start pt-[70px]">
				<Image
					className="absolute left-0 top-[-12%] -z-10 h-[125%] select-none object-contain object-left"
					draggable={false}
					alt=""
					src={splashImgLeftUni}
				/>
				<div className="flex h-full w-full select-none flex-col items-center justify-start">
					<Image
						className="-ml-[8%] mt-[0%] w-full md:ml-0 md:w-3/4"
						draggable={false}
						alt=""
						src={splashImg}
					/>
					<RegBox />
					<div className="mt-6 flex flex-col items-center gap-2 md:mt-12">
						<Countdown
							initialTime={new Date("Jan 20, 2023 00:00:00").getTime()}
							isLarge={true}
						/>
						<h1 className="text-lg font-thin sm:text-4xl">DAYS TO GO</h1>
					</div>
				</div>
				<Image
					className="absolute right-0 top-[-12%] -z-10 h-[125%] select-none object-contain object-right"
					draggable={false}
					alt=""
					src={splashImgRightUni}
				/>
			</div>
			<div className="relative flex aspect-[7/8] h-full w-full flex-col items-center justify-center overflow-visible overflow-x-clip sm:aspect-video">
				<Image
					className="absolute -top-[22%] left-0 -z-20 h-1/2 w-full rotate-180 object-contain sm:-top-[25%]"
					draggable={false}
					alt=""
					src={blueUniverse}
				/>
				<motion.p
					className="absolute top-[17%] left-4 z-10 w-1/2 text-left text-[8px] sm:top-[10%] sm:left-[10%] sm:w-[30%] md:text-center md:text-xs lg:text-base"
					style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
				>
					The E-Summit is the flagship event of E-Cell, which provides a
					platform to listen to and connect with industry stalwarts, new
					entrepreneurs, and provides a platform to try, fail, learn and test
					out your ideas in front of a huge audience.
				</motion.p>
				<motion.div
					className="absolute top-[12%] -right-1/2 -z-10 w-[95%]"
					style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]) }}
				>
					<Image
						className="w-full object-contain"
						draggable={false}
						alt=""
						src={imagination}
					/>
				</motion.div>
				{video && (
					<button
						className="fixed top-0 left-0 z-50 h-full w-full backdrop-blur-lg"
						onClick={() => {
							setVideo(false);
						}}
					/>
				)}
				<div
					className="relative mx-4 overflow-hidden rounded-2xl sm:w-1/2 md:rounded-[50px]"
					ref={videoRef}
					style={{
						transform: video && md ? "scale(1.5)" : "scale(1)",
						transition: "transform 0.8s",
						zIndex: video ? 100 : 0,
					}}
				>
					<button
						onClick={() => {
							setVideo((v: boolean) => !v);
						}}
					>
						<Image
							className="w-full object-contain"
							draggable={false}
							alt=""
							src={videoThumbnail}
						/>
						<div className="absolute bottom-0 left-0 h-1/6 w-full bg-gradient-to-t from-black to-transparent" />
						<Image
							className="absolute bottom-0 left-0 w-1/5"
							draggable={false}
							alt=""
							src={playButton}
						/>
						{video && (
							<iframe
								className="absolute top-0 left-0 h-full w-full"
								src="https://www.youtube.com/embed/pR0sQaWS5oc?autoplay=1"
								title="YouTube video player"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
								allowFullScreen
							/>
						)}
					</button>
				</div>
				<motion.p
					className="absolute bottom-[17%] right-4 z-10 w-1/2 text-right text-[8px] sm:bottom-[10%] sm:right-[10%] sm:w-[30%] md:text-center md:text-xs lg:text-base"
					style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]) }}
				>
					The E-Summit covers four broad verticals, namely, Med-Tech, Meta,
					Social Media and Electric Mobility. We strongly believe that these
					four are the pillars for the growth of entrepreneurship in the near
					future.
				</motion.p>
				<motion.div
					className="absolute bottom-[12%] -left-1/2 -z-10 w-[95%]"
					style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "75%"]) }}
				>
					<Image
						className="w-full object-contain"
						draggable={false}
						alt=""
						src={innovation}
					/>
				</motion.div>
				<Image
					className="absolute -bottom-[10%] left-0 -z-20 h-1/2 w-full object-contain"
					draggable={false}
					alt=""
					src={blueUniverse}
				/>
			</div>
			<div className="relative flex w-full flex-col items-center justify-center md:gap-[20px]">
				<p className="text-center text-[1.5rem] text-white md:text-[50px]">
					Become the part of
					<br /> these amazing <b>Events</b>
				</p>
				<Image
					className="-top-1/6 absolute -z-10 h-full w-1/2 object-contain"
					draggable={false}
					alt=""
					src={universe}
				/>
				<Image
					className="-top-1/6 absolute -z-10 h-[125%] w-full object-contain"
					draggable={false}
					alt=""
					src={redEllipse}
				/>
				<div className="w-full overflow-hidden" ref={emblaRef}>
					<div className="embla__container flex h-[170px] items-center md:h-[400px]">
						{data.map((data_item, index) => (
							<a key={index} href={data_item[2]} rel="noreferrer">
								<div
									className={`relative flex aspect-video h-[125px] shrink-0 grow-0 items-end overflow-hidden rounded-md bg-black md:h-[300px]
											${selectedIndex === index ? "z-10 animate-scale" : ""}
										`}
								>
									<Image
										className="absolute bottom-0 h-[100%]"
										draggable={false}
										alt=""
										src={data_item[0]}
									/>
								</div>
							</a>
						))}
					</div>
				</div>
				{/* create navigation 4 buttons select index */}
				<div className="my-10 flex w-full justify-center gap-6">
					{data.map((_, index) => (
						<div
							className={`h-3 w-3 cursor-pointer rounded-full transition-all duration-300 ease-in-out
								${index === selectedIndex % data.length ? "scale-150 bg-white" : "bg-white/40"}
							`}
							key={index}
							onClick={() =>
								emblaApi?.scrollTo(
									emblaApi?.selectedScrollSnap() +
									(index - (selectedIndex % data.length))
								)
							}
						/>
					))}
				</div>
			</div>
			{/* <div className="relative mx-auto  my-8 hidden h-fit w-3/4 rounded-3xl bg-gradient-to-r from-white to-white/0 p-[1px] sm:block">
          <div className="flex flex-col items-center rounded-3xl bg-black pt-5">
            <Image
              className="absolute top-0 m-5 w-[95%] object-contain"
              draggable={false}
              alt=""
              src={cornerBorder}
            />
            <Image
              className="m-5 w-[60%] object-contain"
              draggable={false}
              alt=""
              src={spons}
            />
          </div>
        </div> */}
		</div>
	);
};

export default Home;
