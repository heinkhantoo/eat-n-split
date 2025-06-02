import "./index.css";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        <AddFriend />
        <Button>Add friend</Button>
      </div>
      <SplitBill />
    </div>
  );
}

function FriendList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          name={friend.name}
          image={friend.image}
          balance={friend.balance}
          key={friend.id}
        />
      ))}
    </ul>
  );
}

function Friend({ name, image, balance }) {
  return (
    <li>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {balance > 0 && (
        <p className="green">
          {name} owns you £{balance}
        </p>
      )}
      {balance < 0 && (
        <p className="red">
          You own {name} £{Math.abs(balance)}
        </p>
      )}
      {balance === 0 && <p>{name} and you are even.</p>}
      <button className="button">Select</button>
    </li>
  );
}

function SplitBill() {
  return (
    <div>
      <form className="form-split-bill">
        <h2>Split the bill with X</h2>
        <label>Bill value</label>
        <input type="number" />
        <label>Your expense</label>
        <input type="number" />
        <label>Anthony's expense</label>
        <input type="number" disabled={true} />
        <label>Who is paying the bill?</label>
        <select>
          <option value="user">You</option>
          <option value="anthony">Anthony</option>
        </select>
        <Button>Split bill</Button>
      </form>
    </div>
  );
}
function AddFriend() {
  return (
    <div>
      <form className="form-add-friend">
        <label>Friend name</label>
        <input type="text" />
        <label>Image URL</label>
        <input type="text" />
        <Button>Add</Button>
      </form>
    </div>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}
