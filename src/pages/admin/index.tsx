import { Center, Text } from "@chakra-ui/react";
import { trpc } from "../../utils/trpc";

const Admin = () => {
  const { data } = trpc.adminRouter.adminViewTickets.useQuery();
  console.log(data);
  if (!data?.isAdmin)
    return (
      <Center minH="100vh" color="white">
        You are not an admin
      </Center>
    );
  return (
    <Center flexDir="column" minH="100vh" color="white">
      <h1>Admin</h1>
      <Text>Total Tickets sold - {data.totalQuantity}</Text>
      <Text>Total Amount - {data.totalAmount} </Text>
    </Center>
  );
};

export default Admin;
