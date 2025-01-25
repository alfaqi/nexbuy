import { useEffect } from "react";
import { useUserStore } from "../../store/users";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

const UserListPage = () => {
  const { users, isLoading, error, fetchUsers } = useUserStore();
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  console.log("users:", users);

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} onRetry={fetchUsers} />;

  return (
    <div>
      {users.map((a) => (
        <p>{a.username}</p>
      ))}
    </div>
  );
};

export default UserListPage;
