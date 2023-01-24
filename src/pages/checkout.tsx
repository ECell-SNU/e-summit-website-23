import {
  Box,
  Button,
  Center,
  Flex,
  ListItem,
  Select,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FilePond } from "react-filepond";
import paymentQr from "../assets/payment_qr.jpg";
import { trpc } from "../utils/trpc";

const Checkout: NextPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [files, setFiles] = useState<any>([]);
  const toast = useToast();
  const user = useSession();
  const handleInitialCheckout =
    trpc.discountedCheckout.handleInitialCheckout.useMutation();

  const amount = (quantity: number) => {
    switch (quantity) {
      case 1:
        return 599;
      case 2:
        return 1099;
      case 4:
        return 1999;
    }
  };

  useEffect(() => {
    if (handleInitialCheckout.isSuccess)
      toast({
        title: "Payment processing",
        description:
          "Kindly wait for 24 hours for us to get back with a confirmation. Don't worry, your money is safe.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  }, [handleInitialCheckout, toast]);

  useEffect(() => {
    if (user.status === "unauthenticated")
      signIn("google", { callbackUrl: "/checkout" });
  }, [user]);

  return (
    <Center mt="6rem">
      <Flex flexDir="column" align="center" gap="2rem">
        <UnorderedList maxW="70%">
          <ListItem>Solo - 1 Ticket worth Rs 599</ListItem>
          <ListItem>Duo - 2 Tickets worth Rs 1099 (1 ticket = 549)</ListItem>
          <ListItem>Squad - 4 Tickets worth Rs 1999 (1 ticket = 499)</ListItem>
        </UnorderedList>
        <Flex align="center" gap="1rem">
          <Text>Select quantity</Text>
          <Select
            w="125px"
            bg="black"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            <option style={{ backgroundColor: "black" }} value={1}>
              Solo
            </option>
            <option style={{ backgroundColor: "black" }} value={2}>
              Duo
            </option>
            <option style={{ backgroundColor: "black" }} value={4}>
              Squad
            </option>
          </Select>
        </Flex>

        <h1 className="text-center text-4xl text-white">
          Make Payment {amount(quantity)} Rs
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
          isDisabled={files.length === 0 || handleInitialCheckout.isLoading}
          _disabled={{
            color: "white",
            bg: "gray.500",
          }}
          bgColor="green"
          color="black"
          _hover={{}}
          _focus={{}}
          onClick={() => {
            handleInitialCheckout.mutate({ quantity });
            setFiles([]);
          }}
        >
          Payment confirm
        </Button>
      </Flex>
    </Center>
  );
};
export default Checkout;
