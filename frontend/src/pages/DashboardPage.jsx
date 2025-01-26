import withAuth from "../hoc/withAuth";

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
};

export default withAuth(DashboardPage);
