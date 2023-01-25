import { useState, useEffect } from "react";

import { Center, flexbox, Text } from "@chakra-ui/react";
import { trpc } from "../../utils/trpc";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import QrScan from "react-qr-reader";

const CheckinPage = () => {
  const {
    data: isAdmin,
    isLoading,
    isError,
  } = trpc.adminRouter.checkIfAdmin.useQuery();

  const qrUserDataMut = trpc.adminRouter.adminGetQrUserData.useMutation();
  const checkInMut = trpc.adminRouter.adminCheckinParticipant.useMutation();

  const [qrData, setQrData] = useState("No result");

  useEffect(() => {
    // const d = qrUserDataMut.mutate({ qrUserId: qrData });

    checkInMut.mutate({ userIdToCheckIn: qrData });
  }, [qrData]);

  const handleScan = (data: string) => {
    if (data) {
      setQrData(data);
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
  };

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
      <h1 className="text-3xl">Admin</h1>
      <h1 className="text-xl">Check in a participant</h1>
      <div>
        <div style={{ marginTop: 30, marginBottom: 100 }}>
          <QrScan
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ height: "50vh", width: "100vw" }}
          />
        </div>
      </div>
      <div className="flex flex-col rounded-xl bg-slate-600 p-10">
        <p className="text-xl text-white">{qrData}</p>
      </div>
    </Center>
  );
};

export default CheckinPage;
