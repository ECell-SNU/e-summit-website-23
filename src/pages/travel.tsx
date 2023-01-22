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

const Travel : React.FC = () => {
	const cost: number[][] = [
		[875, 1350], // Botanical Gardens
		[975, 1550], // Connaught Place
		[1575, 2350], // IGI Airport
	];
	const [location, setLocation] = useState(2);
	const [seater, setSeater] = useState(1);
	const [files, setFiles] = useState<any>([]);
	const user = useSession();
	const handleTravelCheckout = trpc.travelCheckout.handleTravelCheckout.useMutation();
	
	useEffect(() => {
    if (user.status === "unauthenticated")
      signIn("google", { callbackUrl: "/travel" });
  }, [user]);
	
	return (
		<div className="flex flex-col items-center pt-24 gap-10">
			<Heading textAlign="center">
				Travel
			</Heading>
			<Select
				placeContent="Select Location"
				maxW="300px"
				isRequired
				value={location}
				onChange={(e) => setLocation(Number(e.target.value))}
			>
				<option style={{ color: 'black' }} value={0}>Botanical Gardens</option>
				<option style={{ color: 'black' }} value={1}>Connaught Place</option>
				<option style={{ color: 'black' }} value={2}>IGI Airport</option>
			</Select>
			<Select
				placeContent="Select Seater"
				onChange={(e) => setSeater(Number(e.target.value))}
				maxW="300px"
				value={seater}
				isRequired
			>
				<option style={{ color: 'black' }} value={0}>4 Seater</option>
				<option style={{ color: 'black' }} value={1}>7 Seater</option>
			</Select>
			<h1 className="text-center text-4xl text-white">
				Make Payment {cost[location]?.[seater] ?? 875} Rs
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
				isDisabled={files.length === 0 || handleTravelCheckout.isLoading}
				_disabled={{
					color: "white",
					bg: "gray.500",
				}}
				bgColor="green"
				color="black"
				_hover={{}}
				_focus={{}}
				onClick={() => {
					handleTravelCheckout.mutate({
						location,
						seater,
					});
					setFiles([]);
				}}
			>
				Payment confirm
			</Button>
		</div>
	);
};

export default Travel;