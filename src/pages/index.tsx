// import { useCallback, useEffect, useState } from "react";
import { type NextPage } from "next";
import Image from "next/image";
// import { flushSync } from 'react-dom'
import paradigm from "../assets/paradigm.svg";
import startupverse from "../assets/startupverse.svg";
import ideathon from "../assets/ideathon.svg";
import startupexpo from "../assets/startupexpo.svg";

import universe from "../assets/universe.svg";
import redEllipse from "../assets/red-ellipse.svg";
import redEllipse1 from "../assets/red-ellipse1.svg";
import redEllipse2 from "../assets/red-ellipse2.svg";
import blueEllipse from "../assets/blue-ellipse.svg";
import blueEllipse1 from "../assets/blue-ellipse1.svg";

import redUniverse from "../assets/red-universe.svg";
import splashImgLeftUni from "../assets/splash-left-universe.png";
import splashImgRightUni from "../assets/splash-right-universe.png";
import splashImg from "../assets/splash.png";
import useEmblaCarousel from 'embla-carousel-react'

import RegBox from "../components/reg-box";

// Add this to every page to protect from users who haven't filled the form
export { default as getServerSideProps } from "../lib/serverProps";

import Layout from "../components/layout";

// const numberWithinRange = (number: number, min: number, max: number): number =>
//   Math.min(Math.max(number, min), max)

const Home: NextPage = () => {
	const [emblaRef] = useEmblaCarousel({ loop: true, startIndex: 1 });
	// list of images to be displayed in carousel
	const images = [
		[
			startupverse,
			redEllipse2,
		],
		[
			paradigm,
			redEllipse1,
		],
		[
			ideathon,
			blueEllipse,
		],
		[
			startupexpo,
			blueEllipse1,
		],
	];
	
	return (
		<Layout title="Home">
			<div className="flex flex-col h-[90vh] w-screen items-center">
				<div className="flex items-center justify-between">
					<div className="select-none">
						<Image draggable={false} alt="" src={splashImgLeftUni} />
					</div>
					<div className="select-none flex flex-col items-center pb-10">
						<Image draggable={false} alt="" src={splashImg} />
						<RegBox />
					</div>
					<div className="select-none">
						<Image draggable={false} alt="" src={splashImgRightUni} />
					</div>
				</div>
				<div className="w-full flex flex-col relative justify-center items-center gap-[80px]">
					<p className="text-white text-[50px] text-center">Become the part of<br /> these amazing <b>Events</b></p>
					<Image className="absolute -z-10 -top-1/6 h-full w-1/2 object-contain" draggable={false} alt="" src={universe} />
					<Image className="absolute -z-10 -top-1/6 h-[125%] w-full object-contain" draggable={false} alt="" src={redEllipse} />
					<div className="w-full overflow-hidden" ref={emblaRef}>
						<div className="embla__container flex">
							{images.map((image, index) => (
							<div className="h-[300px] aspect-video overflow-hidden relative flex grow-0 shrink-0 ml-4 items-center border border-white/60 rounded-md bg-black" key={index}>
								<Image className="h-[150%] w-[150%] absolute -left-1/2 -bottom-1/2 object-contain" draggable={false} alt="" src={universe} />
								<Image className="h-[175%] w-[150%] absolute -left-1/2 -bottom-3/4 object-contain" draggable={false} alt="" src={image[1]} />
								<Image className="h-[150%] w-[150%] absolute -right-1/2 -top-1/2 object-contain" draggable={false} alt="" src={universe} />
								<Image className="h-[175%] w-[150%] absolute -right-1/2 -top-1/2 object-contain" draggable={false} alt="" src={image[1]} />
								<Image className="h-[95%] absolute bottom-0" draggable={false} alt="" src={image[0]} />
								<div className="absolute bottom-0 m-2 px-7 py-1 border border-white/30 rounded-md backdrop-blur-md text-xs">
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula....Learn More
									</p>
								</div>
							</div>
						))}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
