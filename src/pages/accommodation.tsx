import {
	Select,
	Heading,
	Box,
	Button
} from "@chakra-ui/react";
import Image from "next/image";
import { FilePond } from "react-filepond";
import paymentQr from "../assets/payment_qr.jpg";
import { trpc } from "../utils/trpc";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

const Accommodation : React.FC = () => {
	const cost: number[] = [ 349, 599, 899 ];
	const [checkinDate, setCheckinDate] = useState(new Date("2021-01-27"));
	const [checkoutDate, setCheckoutDate] = useState(new Date("2021-01-30"));
	const [days, setDays] = useState(3);
	const [files, setFiles] = useState<any>([]);
	const user = useSession();
	const handleAcomCheckout = trpc.accommodationCheckout.handleAccommodationCheckout.useMutation();
	
	useEffect(() => {
    if (user.status === "unauthenticated")
      signIn("google", { callbackUrl: "/accommodation" });
	}, [user]);
	
	useEffect(() => {
		setDays(Math.floor((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 3600 * 24)));
		if (checkinDate < new Date("2021-01-27") || checkoutDate > new Date("2021-01-30") || checkoutDate < checkinDate)
			setDays(-1);
	}, [checkinDate, checkoutDate]);
	
	return (
		<div className="flex flex-col items-center pt-24 gap-10">
			<Heading textAlign="center">
				Accommodation
			</Heading>
			{/* Datepicket */}
			<input
				className="bg-white text-black rounded-lg py-2 px-4 appearance-none leading-normal"
				value={checkinDate.toISOString().split("T")[0]}
				onChange={(e) => setCheckinDate(new Date(e.target.value))}
				type="date"
			/>	
			<input
				className="bg-white text-black rounded-lg py-2 px-4 appearance-none leading-normal"
				value={checkoutDate.toISOString().split("T")[0]}
				onChange={(e) => setCheckoutDate(new Date(e.target.value))}
				type="date"
			/>
			{days < 0 && (
				<h1 className="text-center text-xl text-red-500">
					Select between dates of 27th Jan to 30th Jan
				</h1>
			)}
			<h1 className="text-center text-4xl text-white">
				Make Payment {cost[days - 1]} Rs
			</h1>
			<Image
				className="hidden md:block"
				height="200"
				width="200"
				src={paymentQr}
				alt=""
			/>
			<p className="text-center">
				Upload Screenshot after payment, make sure it includes UPI Order / ref
				id
				<br />
				9109782774@paytm <br />
				<a
					className="text-blue-500 underline"
					href="https://p.paytm.me/xCTH/kmd08rbm"
				>
					https://p.paytm.me/xCTH/kmd08rbm
				</a>
			</p>

			<Box w="200px">
				<FilePond
					files={files}
					acceptedFileTypes={["image/*"]}
					onprocessfile={(error, file) => {
						if (!error) {
							setFiles([file]);
						}
					}}
					onremovefile={(error) => {
						if (!error) {
							setFiles([]);
						}
					}}
					allowMultiple={false}
					server="/api/checkout/ss-upload"
					name="files"
					labelIdle="Upload your payment screenshot"
				/>
			</Box>
			<Button
				isDisabled={files.length === 0 || handleAcomCheckout.isLoading || days > 0}
				_disabled={{
					color: "white",
					bg: "gray.500",
				}}
				bgColor="green"
				color="black"
				_hover={{}}
				_focus={{}}
				onClick={() => {
					handleAcomCheckout.mutate({ 
						checkinDate: checkinDate,
						checkoutDate: checkoutDate,
					 });
					setFiles([]);
				}}
			>
				Payment confirm
			</Button>
		</div>
	);
};

export default Accommodation;