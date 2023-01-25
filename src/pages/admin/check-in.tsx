import { useState } from "react";

import { Center, Text } from "@chakra-ui/react";
import { trpc } from "../../utils/trpc";

import { QrReader } from "react-qr-reader";

const CheckinPage = () => {
  const {
    data: isAdmin,
    isLoading,
    isError,
  } = trpc.adminRouter.checkIfAdmin.useQuery();

  const mut = trpc.adminRouter.adminCheckinParticipant.useMutation();

  const [qrData, setQrData] = useState("No result");

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  if (!isAdmin)
    return (
      <Center minH="100vh" color="white">
        You are not an admin
      </Center>
    );

  return (
    <Center flexDir="column" minH="100vh" color="white">
      <h1>Admin</h1>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            setQrData(result.getText());
          }

          if (error) {
            console.info(error);
          }
        }}
        constraints={{ facingMode: "environment" }}
      />
      <p>{qrData}</p>
    </Center>
  );
};

export default CheckinPage;
