import { useState } from "react";
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
  const [friends, setFriends] = useState(initialFriends);
  const [toggleAddFriend, setToggleAddFriend] = useState(false);
  const [selectedFriend, setSelectedFreind] = useState(null);

  function onAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }
  function handleClick() {
    setToggleAddFriend((show) => !show);
    setSelectedFreind(null);
  }

  function handleSelection(friend) {
    setSelectedFreind((cur) => (cur?.id === friend.id ? null : friend));
    setToggleAddFriend(false);
  }

  function handleSplitBill(amount) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + amount }
          : friend
      )
    );
    setSelectedFreind(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {toggleAddFriend && <AddFriend handleAddFriend={onAddFriend} />}
        <Button onClick={handleClick}>
          {toggleAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <SplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendList({ friends, selectedFriend, onSelection }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owns you £{friend.balance}
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          You own {friend.name} £{Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>{friend.name} and you are even.</p>}
      <button className="button" onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}

function SplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState(0);
  const [uExpense, setUExpense] = useState(0);
  const [payer, setPayer] = useState("0");

  const fExpense = bill ? bill - uExpense : "";

  function onClick(e) {
    e.preventDefault();
    onSplitBill(payer === "0" ? fExpense : -uExpense);
  }

  return (
    <div>
      <form className="form-split-bill">
        <h2>Split the bill with {selectedFriend.name}</h2>
        <label>Bill value</label>
        <input
          type="text"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />
        <label>Your expense</label>
        <input
          type="text"
          value={uExpense}
          onChange={(e) =>
            setUExpense(
              Number(e.target.value > bill ? uExpense : e.target.value)
            )
          }
        />
        <label>{selectedFriend.name}'s expense</label>
        <input type="text" disabled value={fExpense} />
        <label>Who is paying the bill?</label>
        <select value={payer} onChange={(e) => setPayer(e.target.value)}>
          <option value="0">You</option>
          <option value="1">{selectedFriend.name}</option>
        </select>
        <Button onClick={onClick}>Split bill</Button>
      </form>
    </div>
  );
}
function AddFriend({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function onAddFriend(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const friend = {
      name,
      image: `${image}?=${name}`,
      balance: 0,
      id,
    };

    handleAddFriend(friend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <div>
      <form className="form-add-friend" onSubmit={onAddFriend}>
        <label>Friend name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button>Add</Button>
      </form>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
