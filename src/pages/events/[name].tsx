import { type NextPage } from "next";
import Image from "next/image";
import { type GetServerSidePropsContext } from "next";

import judgeComingSoon from "../../assets/judge-coming-soon.png";
import paradigm from "../../assets/paradigm.png";
import events from "../../assets/events.json";
import Countdown from "../../components/countdown";

export async function getStaticPaths() {
	const paths = Object.keys(events).map((event) => ({
		params: { name: event }
	}));
	
	return {
		paths,
		fallback: false
	};
}

export const getStaticProps = async (ctx: GetServerSidePropsContext) => {
	const name = ctx.params?.name;
	const event = (events as EventList)[name as string ?? ""];
	
	const details = event?.details;
	const prizes = event?.prizes;
	
	return {
		props: {
			details,
			prizes
		}
	};
};

interface EventList {
	[key: string]: Event;
}

interface Event {
	details: {
		title: string;
		content: string;
	}[];
	prizes: {
		title: string;
		content: string[];
	}[];
}

const Events: NextPage<Event> = ({ details, prizes }: Event) => {
	
	return (
		<div className="flex flex-col w-screen items-center p-3 sm:p-6 lg:p-14 mt-[70px] gap-8">
			<Image className="w-full" alt="" src={paradigm} />
			<div className="grid xl:grid-cols-[40%_27%_30%] w-full gap-3 sm:gap-6">
				<div className="flex flex-col col-span-1 h-fit bg-[#111111] rounded-2xl p-4 sm:p-8 gap-2 items-center">
					<h1 className="w-full text-md sm:text-2xl font-bold">About the Event</h1>
					<p className="text-sm sm:text-lg lg:text-xl">
						The hackathon will be held on the 20th of January, as part of Day 0 of The E-Summit &apos;23 includes free of cost registrations. This event will bring together talented individuals from the business-to-business (B2B) sector as well as IT sector professionals to come and judge your submissions. An amazing opportunity for students to participate and create innovative solutions to real-world challenges in the B2B sector. Participants will go through a selection round and an on-campus round before moving on to the pitching rounds. The winning teams will have the chance to take home a prize pool worth up to 1.6 Lakh rupees.
					</p>
					<div className="w-full flex flex-col md:flex-row justify-between gap-5 md:gap-10 md:px-4 m-2 sm:m-6">
						<button
							className="w-full py-2 rounded-lg text-lg"
							style={{
								background: 'linear-gradient(90.83deg, #FF1761 0%, #910AB1 98.45%)'
							}}
						>
							Register
						</button>
						<button
							className="w-full py-2 rounded-lg border border-white whitespace-nowrap text-lg">
							Event Details
						</button>
					</div>
					<p className="text-xs sm:text-sm">Registration ends in</p>
					<Countdown initialTime={new Date("Jan 20, 2023 00:00:00").getTime()} isLarge={false} />
				</div>
				<div className="flex flex-col gap-4 col-span-1 col-start-1 xl:col-start-2">
					{prizes.map((prize, index) => (
						<div className="w-full flex flex-col bg-[#111111] rounded-2xl p-4 sm:p-6 gap-3 items-start" key={index}>
							<p className="text-lg font-bold text-[#FBC82E]">{prize.title}</p>
							<ul className="text-md whitespace-pre-wrap list-disc list-inside">
								{prize.content.map((item, index) => (
									<li key={index}>{item}</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<div className=" lg:h-fit col-span-1 p-6 gap-4 items-center bg-[#111111] rounded-2xl self-start
					sm:sticky sm:top-[80px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-2 row-start-2 md:row-start-1 col-start-1 md:col-start-2 xl:col-start-3
				">
					{details.map((detail, index) => (
						<div className="flex flex-col gap-1" key={index}>
							<p className="text-xs sm:text-md text-white/50 whitespace-nowrap">{detail.title}</p>
							<p className="text-sm sm:text-md lg:text-lg">{detail.content}</p>
						</div>
					))}
				</div>
				<div className="flex flex-col gap-6 col-span-1 xl:col-span-2 row-start-4 xl:row-start-2">
					<h1 className="text-2xl font-bold">Judges</h1>
					<div className="flex flex-wrap gap-6 w-full">
						<Image className="xl:w-1/3" alt="" src={judgeComingSoon} />
						<Image className="xl:w-1/3" alt="" src={judgeComingSoon} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Events;