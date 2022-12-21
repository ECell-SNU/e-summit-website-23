import { type NextPage } from "next";
import Image from "next/image";
import { useCallback, useEffect, useState, useRef } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useEmblaCarousel from 'embla-carousel-react';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

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

import { flushSync } from "react-dom";
import Layout from "../components/layout";

import cornerBorder from "../assets/corner-border.svg";
import spons from "../assets/spons.png";
import { useCountdown } from "../utils/countdownHook";

const TWEEN_FACTOR = 4.2

const numberWithinRange = (number: number, min: number, max: number): number =>
	Math.min(Math.max(number, min), max)

const Home: NextPage = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		// loop: true,
		startIndex: 1
	});
	const time = useCountdown(new Date("Jan 20, 2023 00:00:00").getTime());
	const [video, setVideo] = useState(false);
	const images = [[startupverse, redEllipse2], [paradigm, redEllipse1], [ideathon, blueEllipse], [startupexpo, blueEllipse1]];
	const [tweenValues, setTweenValues] = useState<number[]>([])
	const controls = useAnimation();
	const [ref, inView] = useInView();
	const lockRef = useRef<HTMLDivElement>(null);
	
	const imaginationVariants = {
		hidden: { x: "50%" },
		visible: { x: "0%" },
	};
	
	useEffect(() => {
		if (video) {
			if (lockRef.current) {
				lockRef.current.scrollIntoView({ block: "center" });
			}
			disableBodyScroll(lockRef.current);
		} else {
			enableBodyScroll(lockRef.current);
		}
	}, [video]);
	
	const onScroll = useCallback(() => {
		if (!emblaApi) return

		const engine = emblaApi.internalEngine()
		const scrollProgress = emblaApi.scrollProgress()

		const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
			if (!emblaApi.slidesInView().includes(index)) return 0
			let diffToTarget = scrollSnap - scrollProgress

			if (engine.options.loop) {
				engine.slideLooper.loopPoints.forEach((loopItem) => {
					const target = loopItem.target().get()
					if (index === loopItem.index && target !== 0) {
						const sign = Math.sign(target)
						if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
						if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
					}
				})
			}
			const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR)
			return numberWithinRange(tweenValue, 0, 1)
		})
		setTweenValues(styles);
	}, [emblaApi, setTweenValues])

	useEffect(() => {
		if (!emblaApi) return

		onScroll()
		emblaApi.on('scroll', () => {
			flushSync(() => onScroll())
		})
		emblaApi.on('reInit', onScroll);
	}, [emblaApi, onScroll]);

	return (
		<Layout title="Home">
			<div className="flex flex-col w-screen items-center">
				<div className="flex items-center justify-start w-full relative pt-14">
					<Image className="absolute left-0 top-[-12%] select-none object-left object-contain h-[125%] -z-10" draggable={false} alt="" src={splashImgLeftUni} />
					<div className="w-full h-full select-none flex flex-col items-center justify-start">
						<Image className="w-full md:w-3/4 -ml-[8%] md:m-0" draggable={false} alt="" src={splashImg} />
						<RegBox />
						<div className="flex flex-col items-center gap-2 mt-6 md:mt-12">
							<h1 className="text-lg sm:text-5xl font-thin">{time}</h1>
							<h1 className="text-lg sm:text-3xl font-thin">DAYS TO GO</h1>
						</div>
					</div>
					<Image className="absolute right-0 top-[-12%] select-none h-[125%] object-right object-contain -z-10" draggable={false} alt="" src={splashImgRightUni} />
				</div>
				<div className="flex flex-col items-center relative h-full w-full aspect-[7/8] sm:aspect-video justify-center">
					<Image className="absolute -z-20 -top-[22%] sm:-top-[25%] left-0 h-1/2 w-full object-contain rotate-180" draggable={false} alt="" src={blueUniverse} />
					<p className="absolute top-[15%] left-4 md:left-[10%] w-1/2 md:w-[30%] text-left md:text-center z-10 text-[8px] md:text-xs lg:text-base">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
					</p>
					<motion.div
						className="w-[95%] absolute -z-10 top-[12%] right-0"
						// initial="hidden"
						// variants={{
						// 	hidden: { x: "50%" },
						// 	visible: { x: "0%"},
						// }}
						animate={{ x: [50, 5, 4, 3, 1, 0]}}
						// whileInView="visible"
						// transition={{ duration: 0.8, type: "spring", times: [0, 0.98, 0.99, 1]}}
					>
						<Image
							className="w-full object-contain"
							draggable={false}
							alt=""
							src={imagination} />
					</motion.div>
					{video &&
						<button
							className="fixed top-0 left-0 h-full w-full z-50 backdrop-blur-lg"
							onClick={() => setVideo(false)}
						/>
					}
					<div
						className="sm:w-1/2 relative rounded-2xl md:rounded-[50px] overflow-hidden mx-4"
						ref={lockRef}
						style={{
							transform: video ? 'scale(1.5)' : 'scale(1)',
							transition: 'transform 0.8s',
							zIndex: video ? 100 : 0,
						}}>
						<Image className="w-full object-contain" draggable={false} alt="" src={videoThumbnail} />
						<div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-black to-transparent" />
						<button
							className="absolute bottom-0 left-0 w-1/5"
							onClick={() => setVideo(v=> !v)}>
							<Image className="w-full" draggable={false} alt="" src={playButton} />
						</button>
						{video &&
							<iframe
								className="absolute top-0 left-0 w-full h-full"
								src="https://www.youtube.com/embed/pR0sQaWS5oc?autoplay=1"
								title="YouTube video player"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						}
					</div>
					<p className="absolute bottom-[15%] right-4 md:right-[10%] w-1/2 md:w-[30%] text-right md:text-center z-10 text-[8px] md:text-xs lg:text-base">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
					</p>
					<Image className="absolute -z-10 bottom-[12%] left-0 w-[95%] object-contain" draggable={false} alt="" src={innovation} />
					<Image className="absolute -z-20 -bottom-[10%] left-0 h-1/2 w-full object-contain" draggable={false} alt="" src={blueUniverse} />
				</div>
				<div className="w-full flex flex-col relative justify-center items-center md:gap-[20px]">
					<p className="text-white text-[1.5rem] md:text-[50px] text-center">Become the part of<br /> these amazing <b>Events</b></p>
					<Image className="absolute -z-10 -top-1/6 h-full w-1/2 object-contain" draggable={false} alt="" src={universe} />
					<Image className="absolute -z-10 -top-1/6 h-[125%] w-full object-contain" draggable={false} alt="" src={redEllipse} />
					<div className="w-full overflow-hidden" ref={emblaRef}>
						<div className="embla__container flex h-[170px] md:h-[400px] items-center">
							{images.map((image, index) => (
								<div
									className={`h-[125px] md:h-[300px] md:m-[-10px] aspect-video overflow-hidden relative flex grow-0 shrink-0 items-end border border-white/60 rounded-md bg-black`}
									key={index}
									style={{
										...(tweenValues.length && {
											transform: `scale(${1 + ((tweenValues[index] ?? 0) * 0.3)})`,
											zIndex: (tweenValues[index] ?? 0) > 0.2 ? 1 : 0,
											opacity: (Math.abs(tweenValues.findIndex((value) => value > 0.1) - index) < 2) ? 1 : 0,
											transition: 'opacity 0.3s ease-in-out'
										}),
									}}>
									<Image className="h-[150%] w-[150%] absolute -left-1/2 -bottom-1/2 object-contain" draggable={false} alt="" src={universe} />
									<Image className="h-[175%] w-[150%] absolute -left-1/2 -bottom-3/4 object-contain" draggable={false} alt="" src={image[1]} />
									<Image className="h-[150%] w-[150%] absolute -right-1/2 -top-1/2 object-contain" draggable={false} alt="" src={universe} />
									<Image className="h-[175%] w-[150%] absolute -right-1/2 -top-1/2 object-contain" draggable={false} alt="" src={image[1]} />
									<Image className="h-[95%] absolute bottom-0" draggable={false} alt="" src={image[0]} />
									<div className="m-2 px-7 py-1 border border-white/30 rounded-md backdrop-blur-md">
										<p className="text-[0.25rem] md:text-xs">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula....Learn More
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="hidden sm:block  mx-auto my-8 p-[1px] w-3/4 h-fit relative rounded-3xl bg-gradient-to-r from-white to-white/0">
					<div className="pt-5 flex flex-col items-center rounded-3xl bg-black">
						<Image className="absolute top-0 m-5 object-contain w-[95%]" draggable={false} alt="" src={cornerBorder} />
						<Image className="m-5 object-contain w-[60%]" draggable={false} alt="" src={spons} />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
