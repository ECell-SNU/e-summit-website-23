import { useCallback, useEffect, useState } from "react";
import { type NextPage } from "next";
import Image from "next/image";
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
import { flushSync } from "react-dom";

import cornerBorder from "../assets/corner-border.svg";
import spons from "../assets/spons.png";

const TWEEN_FACTOR = 4.2

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

const Home: NextPage = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		// loop: true,
		startIndex: 1
	});
	
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
	
	const [tweenValues, setTweenValues] = useState<number[]>([])

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
