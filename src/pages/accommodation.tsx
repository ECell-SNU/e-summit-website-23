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
	const [checkinDate, setCheckinDate] = useState(0); // 27, 28, 29
	const [checkoutDate, setCheckoutDate] = useState(2); // 28, 29, 30
	const [files, setFiles] = useState<any>([]);
	const user = useSession();
	const handleAcomCheckout = trpc.accommodationCheckout.handleAccommodationCheckout.useMutation();
	
	useEffect(() => {
    if (user.status === "unauthenticated")
      signIn("google", { callbackUrl: "/accommodation" });
	}, [user]);
	
	return (
		<div className="flex flex-col items-center pt-24 gap-10">
			<Heading textAlign="center">
				Accommodation
			</Heading>
			{/* Datepicket */}
			<Select
				placeContent="Select Checkin Date"
				maxW="300px"
				isRequired
				value={checkinDate}
				onChange={(e) => setCheckinDate(parseInt(e.target.value))}
			>
				<option style={{ color: 'black' }} value="0">27th Jan</option>
				<option style={{ color: 'black' }} value="1">28th Jan</option>
				<option style={{ color: 'black' }} value="2">29th Jan</option>
			</Select>
			<Select
				placeContent="Select Checkout Date"	
				maxW="300px"
				isRequired
				value={checkoutDate}
				onChange={(e) => setCheckoutDate(parseInt(e.target.value))}
			>
				<option style={{ color: 'black' }} value="0">28th Jan</option>
				<option style={{ color: 'black' }} value="1">29th Jan</option>
				<option style={{ color: 'black' }} value="2">30th Jan</option>
			</Select>			
			{checkinDate > checkoutDate && (
				<h1 className="text-center text-xl text-red-500">
					Check in date should be before check out date
				</h1>
			)}
			<h1 className="text-center text-4xl text-white">
				Make Payment {cost[checkoutDate - checkinDate]} Rs
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
				isDisabled={files.length === 0 || handleAcomCheckout.isLoading || checkinDate > checkoutDate}
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