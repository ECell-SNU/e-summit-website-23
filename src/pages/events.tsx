import { type NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout";

import judgeComingSoon from "../assets/judge-coming-soon.png";
import paradigm from "../assets/paradigm.png";
import { useCountdown } from "../utils/countdownHook";

const Events: NextPage = () => {
	const time = useCountdown(new Date("Jan 20, 2023 00:00:00").getTime());
	const [md, setSm] = useState(false);

	useEffect(() => {
		const resize = () => {
			if (window.innerWidth > 640) {
				setSm(true);
			} else {
				setSm(false);
			}
		};
		
		resize();
		window.addEventListener("resize", () => resize());
	}, []);

	const details = [
		{
			title: "Venue",
			content: "G 102, G-Block"
		},
		{
			title: "Amount",
			content: "Free"
		},
		{
			title: "Date",
			content: "20th Jan 2023"
		},
		{
			title: "Participants/Team",
			content: "2-4 Participants"
		},
		{
			title: "Registration Open",
			content: "20th Dec 2023"
		},
		{
			title: "Submission Ends",
			content: "20th Jan 2023"
		},
		{
			title: "Teams notified via Gmail",
			content: "20th Jan 2023"
		},
	];

	const prizes = [
		{
			title: "1st Runner Up",
			content: `Electric Scooter (bounce infinity) worth 60,000 Rs, provided by bounce infinity along with a test drive on campus
Monetary prize of 40,000 Rs.
2nd day access pass to the E-Summit
Free E-Summit clothing apparel
Meet with investors
Pitch to sharks during the startup verse event`,
		},
		{
			title: "2nd Runner Up",
			content: `Monetary prize of 25,000 Rs.
Free E-Summit clothing apparel
Meet with investors
2nd day access pass to the E-Summit`,
		},
		{
			title: "3rd Runner Up",
			content: `Monetary prize of 10,000
2nd day access pass to the E-Summit`,
		},
		{
			title: "Participation",
			content: `2nd day access pass to the E-Summit`,
		},
	];

	const DetailGrid: React.FC = () => {
		return (
			<div className={`flex flex-wrap lg:grid lg:grid-cols-2 lg:h-fit col-span-1 p-2 sm:p-6 gap-4 items-center
				${md ? "bg-[#111111] rounded-2xl" : ""}
			`}>
				{details.map((detail, index) => (
					<div className="flex flex-col gap-1" key={index}>
						<p className="text-xs sm:text-md text-white/50 whitespace-nowrap">{detail.title}</p>
						<p className="text-sm sm:text-lg">{detail.content}</p>
					</div>
				))}
			</div>
		);
	};

	return (
		<Layout>
			<div className="flex flex-col w-screen items-center p-3 sm:p-6 lg:p-14 mt-[70px] gap-8">
				<Image className="w-full" alt="" src={paradigm} />
				<div className="grid lg:grid-cols-[57%_40%] xl:grid-cols-[40%_30%_27%] w-full gap-6">
					<div className="flex flex-col col-span-1 h-fit bg-[#111111] rounded-2xl p-4 sm:p-8 gap-2 items-center">
						<h1 className="w-full text-md sm:text-2xl font-bold">About the Event</h1>
						<p className="text-sm sm:text-lg lg:text-xl">
							The hackathon will be held on the 20th of January, as part of Day 0 of The E-Summit &apos;23 includes free of cost registrations. This event will bring together talented individuals from the business-to-business (B2B) sector as well as IT sector professionals to come and judge your submissions. An amazing opportunity for students to participate and create innovative solutions to real-world challenges in the B2B sector. Participants will go through a selection round and an on-campus round before moving on to the pitching rounds. The winning teams will have the chance to take home a prize pool worth up to 1.6 Lakh rupees.
						</p>
						{
							!md && <DetailGrid />
						}
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
						<h1 className="text-lg sm:text-2xl font-bold">
							{time} Days
						</h1>
					</div>
					{
						md && <DetailGrid />
					}
					<div className="flex flex-col gap-4 col-span-1">
						{prizes.map((prize, index) => (
							<div className="w-full flex flex-col bg-[#111111] rounded-2xl p-4 sm:p-6 gap-3 items-start" key={index}>
								<p className="text-lg font-bold text-[#FBC82E]">{prize.title}</p>
								<ul className="text-md whitespace-pre-wrap list-disc list-inside">
									{prize.content.split("\n").map((item, index) => (
										<li key={index}>{item}</li>
									))}
								</ul>
							</div>
						))}
					</div>
					<div className="flex flex-col gap-6 col-span-1 xl:col-span-2">
						<h1 className="text-2xl font-bold">Judges</h1>
						<div className="flex flex-wrap gap-6 w-full">
							<Image className="xl:w-1/3" alt="" src={judgeComingSoon} />
							<Image className="xl:w-1/3" alt="" src={judgeComingSoon} />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Events;