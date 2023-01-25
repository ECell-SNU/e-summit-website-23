import { Center, Text } from "@chakra-ui/react";
import { trpc } from "../../utils/trpc";

const Admin = () => {
	const { data } = trpc.adminRouter.adminViewTickets.useQuery();
	const { data: teams } = trpc.adminRouter.adminViewTeams.useQuery();
	
  console.log(data);
  if (!data?.isAdmin)
    return (
      <Center minH="100vh" color="white">
        You are not an admin
      </Center>
    );
  return (
    <div className="flex flex-col pt-[90px] px-10 items-start justify-start">
			<h1 className="text-4xl whitespace-nowrap">Admin</h1>
			<Text>Total Amount - {data.totalAmount} </Text>
			<table className="border border-collapse">
				<thead>
					<tr>
						<th className="border p-2">Team Name</th>
						<th className="border p-2">Member Name</th>
						<th className="border p-2">Check-in status</th>
					</tr>
				</thead>
				<tbody>
					{(teams?.teams ?? []).map((team) => (
						<tr key={team.id}>
							<td className="border p-2">{team.name}</td>
							<td className="border p-2">
								{team.User.map((member) => (
									<tr key={member.id}>
										<td>{member.name}</td>
									</tr>
								))}
							</td>
							<td className="border p-2">
								{team.User.map((member) => (
									<tr key={member.id}>
										<td className={`
											${member.arrivedOnsite ? "bg-green-500" : "bg-red-500"}
										`}>
											{member.arrivedOnsite ? "Checked In" : "Not Checked In"}
										</td>
									</tr>
								))}
							</td>
						</tr>
					))}
				</tbody>
			</table>
    </div>
  );
};

export default Admin;
