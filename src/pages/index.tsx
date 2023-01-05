import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { type NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

import Layout from "../components/layout";

import cornerBorder from "../assets/corner-border.svg";
import spons from "../assets/spons.png";
import Countdown from '../components/countdown';

const Home: NextPage = () => {
	const [video, setVideo] = useState(false);
	const data = [
		[startupverse, redEllipse2, '/events/startupverse'],
		[paradigm, redEllipse1, '/events/paradigm'],
		[ideathon, blueEllipse, '/events/ideathon'],
		[startupexpo, blueEllipse1, '/events/startupexpo'],
	];
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
	});
	const [selectedIndex, setSelectedIndex] = useState(0);
	const controls = useAnimation();
	const videoRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: videoRef,
		offset: ["center end", "center start"]
	});
	const [md, setMd] = useState(false);

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
		<Layout title="Home">
			<div className="flex flex-col w-screen items-center">
				<div className="flex items-center justify-start w-full relative pt-[70px]">
					<Image className="absolute left-0 top-[-12%] select-none object-left object-contain h-[125%] -z-10" draggable={false} alt="" src={splashImgLeftUni} />
					<div className="w-full h-full select-none flex flex-col items-center justify-start">
						<Image className="w-full md:w-3/4 -ml-[8%] mt-[8%] md:ml-0" draggable={false} alt="" src={splashImg} />
						<RegBox />
						<div className="flex flex-col items-center gap-2 mt-6 md:mt-12">
							<Countdown initialTime={new Date("Jan 20, 2023 00:00:00").getTime()} isLarge={true} />
							<h1 className="text-lg sm:text-4xl font-thin">DAYS TO GO</h1>
						</div>
					</div>
					<Image className="absolute right-0 top-[-12%] select-none h-[125%] object-right object-contain -z-10" draggable={false} alt="" src={splashImgRightUni} />
				</div>
				<div className="flex flex-col items-center relative h-full w-full aspect-[7/8] sm:aspect-video justify-center overflow-visible overflow-x-clip">
					<Image className="absolute -z-20 -top-[22%] sm:-top-[25%] left-0 h-1/2 w-full object-contain rotate-180" draggable={false} alt="" src={blueUniverse} />
					<motion.p
						className="absolute top-[17%] sm:top-[10%] left-4 sm:left-[10%] w-1/2 sm:w-[30%] z-10 text-left md:text-center text-[8px] md:text-xs lg:text-base"
						style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '100%']), }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
					</motion.p>
					<motion.div
						className='w-[95%] absolute -z-10 top-[12%] -right-1/2'
						style={{ x: useTransform(scrollYProgress, [0, 1], ['0%', '-75%']), }}>
						<Image
							className="w-full object-contain"
							draggable={false}
							alt=""
							src={imagination} />
					</motion.div>
					{video &&
						<button
							className="fixed top-0 left-0 h-full w-full z-50 backdrop-blur-lg"
							onClick={() => {setVideo(false)}}
						/>
					}
					<div
						className="sm:w-1/2 relative rounded-2xl md:rounded-[50px] overflow-hidden mx-4"
						ref={videoRef}
						style={{
							transform: (video && md) ? 'scale(1.5)' : 'scale(1)',
							transition: 'transform 0.8s',
							zIndex: video ? 100 : 0,
						}}>
						<button onClick={() => {
								setVideo((v: boolean) => !v);
							}}>
							<Image className="w-full object-contain" draggable={false} alt="" src={videoThumbnail} />
							<div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-black to-transparent" />
							<Image className="absolute bottom-0 left-0 w-1/5" draggable={false} alt="" src={playButton} />
							{video &&
								<iframe
									className="absolute top-0 left-0 w-full h-full"
									src="https://www.youtube.com/embed/pR0sQaWS5oc?autoplay=1"
									title="YouTube video player"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
									allowFullScreen
								/>
							}
						</button>
					</div>
					<motion.p
						className="absolute bottom-[17%] sm:bottom-[10%] right-4 sm:right-[10%] w-1/2 sm:w-[30%] z-10 text-right md:text-center text-[8px] md:text-xs lg:text-base"
						style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-100%']), }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
					</motion.p>
					<motion.div
						className="absolute -z-10 bottom-[12%] -left-1/2 w-[95%]"
						style={{ x: useTransform(scrollYProgress, [0, 1], ['0%', '75%']), }}>
						<Image
							className="w-full object-contain"
							draggable={false}
							alt=""
							src={innovation} />
					</motion.div>
					<Image className="absolute -z-20 -bottom-[10%] left-0 h-1/2 w-full object-contain" draggable={false} alt="" src={blueUniverse} />
				</div>
				<div className="w-full flex flex-col relative justify-center items-center md:gap-[20px]">
					<p
						className="text-white text-[1.5rem] md:text-[50px] text-center">
						Become the part of<br /> these amazing <b>Events</b>
					</p>
					<Image
						className="absolute -z-10 -top-1/6 h-full w-1/2 object-contain"
						draggable={false}
						alt=""
						src={universe} />
					<Image
						className="absolute -z-10 -top-1/6 h-[125%] w-full object-contain"
						draggable={false}
						alt=""
						src={redEllipse} />
					<div className="w-full overflow-hidden" ref={emblaRef}>
						<div className="embla__container flex h-[170px] md:h-[400px] items-center">
							{data.map((data_item, index) => (
								<a key={index} href={data_item[2]} rel="noreferrer">
									<div
										className={`h-[125px] md:h-[300px] aspect-video overflow-hidden relative flex grow-0 shrink-0 items-end rounded-md bg-black
											${selectedIndex === index ? 'animate-scale z-10' : ''}
										`}>
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
          <div className='flex w-full justify-center my-10 gap-6'>
					{data.map((_, index) => (
						<div className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out cursor-pointer
								${index === (selectedIndex % data.length) ? 'bg-white scale-150' : 'bg-white/40'}
							`}
							key={index}
							onClick={() => emblaApi?.scrollTo(emblaApi?.selectedScrollSnap() + (index - (selectedIndex % data.length)))}
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
    </Layout>
  );
};

export default Home;
