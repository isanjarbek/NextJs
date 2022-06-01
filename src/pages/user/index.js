export async function getServerSideProps() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await response.json();

  return {
    props: {
      users: data,
    },
  };
}

const User = ({ users }) => {
  console.log(users);
  return (
    <div>
      <h2>User</h2>
      {users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default User;
