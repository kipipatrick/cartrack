import React from "react";
import UserService from "../../services/userService";

const filters = ["Name", "Username", "Email", "Website"];

const styles = {
  main: {
    overflowX: "auto",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#708a8c",
    color: "white",
  },
  header:{
    fontSize: 30,
    fontWeight: 500,
    marginTop: 50,
    marginBottom:20
  },
  button: {
    height: "35px",
    marginLeft: 2,
    border: '1px solid white',
    backgroundColor: '#708a8c',
    color:'white'
  },
  inputField: {
    width: "30vw",
    height: "30px",
  },
  cardTitle: { fontWeight: 600, fontSize: 14 },
  subText: { fontWeight: 300, fontSize: 12 },
  resultsField: {
    display: "flex",
    flexWrap: "wrap",
    width: "50%",
    marginTop: "2%",
    justifyContent: "center",
  },
  radio: { width: "5%", fontSize: 10 },
  onHoveredCard: {
    margin: 5,
    padding: 20,
    minWidth: "250px",
    borderRadius: "10px",
    backgroundColor: "#e2d7c2",
    cursor: "pointer",
    color: "black",
    border: "1px solid white",
    fontSize: 10,
  },
  card: {
    margin: 5,
    padding: 20,
    minWidth: "250px",
    borderRadius: "10px",
    backgroundColor: "#708a8c",
    border: "1px solid white",
    fontSize: 10,
  },
  dialogBox: {
    position: "absolute",
    top: 0,
    bottom: 10,
    width: "350px",
    border: "1px solid #708a8c",
  },
};

let Users = () => {
  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [key, setKey] = React.useState("Name");
  const [term, setTerm] = React.useState("");

  const selectUser = (user) => {
    setUser(user);
  };
  const retrieveUsers = () => {
    UserService.getAll().then((res) => {
      setUsers(res.data);
setTerm("")
    });
  };

  const searchUser = () => {
    UserService.search(term, key).then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  };

  const onChangeValue = (event) => {
    setKey(event.target.value);
  };
  const onInputChange = (event) => {
    setTerm(event.target.value);
  };

  const renderSearchField = () => {
    return (
      <div style={{ justifyContent: "center", display: "flex" }}>
        <div>
          <div style={styles.header}>CarTrack User Finder</div>
          <div>
            <input style={styles.inputField} value={term} onChange={onInputChange} />
            <button style={styles.button} onClick={searchUser}>
              Search
            </button>
            <button style={styles.button} onClick={retrieveUsers}>
              Show All
            </button>
          </div>
          <div style={{ marginTop: 10 }}>
   
            <span>
    
            <form name="searchType">
           <span style={styles.subText} > Search By :</span>
              {filters.map((item) => {
                return (
                  <span style={styles.subText}>
                    <input
                      style={styles.radio}
                      type="radio"
                      value={item}
                      checked={key == item}
                      onChange={onChangeValue}
                    />{" "}
                    {item}
                  </span>
                );
              })}
              
            </form>
            </span>
          </div>
          <div style={{ fontSize: 12, marginTop: "5%", fontWeight: 100 }}>
            Returned {users.length} Results{" "}
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={styles.resultsField}>
          {users ? (
            users.map((item, key) => {
              return (
                <div
                  style={user == item ? styles.onHoveredCard : styles.card}
                  onMouseEnter={() => selectUser(item)}
                  onClick={() => {
                    setOpen(true);
                    selectUser(item);
                  }}
                >
                  <div style={styles.cardTitle}>{item.name}</div>
                  <div>{item.email}</div>
                </div>
              );
            })
          ) : (
            <div>No Data</div>
          )}
          <dialog
            onMouseLeave={() => setOpen(false)}
            style={styles.dialogBox}
            open={open}
          >
            <div style={styles.cardTitle}>{user.name}</div>
            <div style={styles.subText}>{user.email}</div>
            <div style={styles.subText}>{user.phone}</div>
            <div style={styles.subText}>
              {user.address
                ? `${user.address.street} ${user.address.suite} ${user.address.city}`
                : ""}{" "}
            </div>
            <div style={styles.subText}>{user.website}</div>
          </dialog>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.main}>
      <div>
        {renderSearchField()}
        {renderResults()}
      </div>
    </div>
  );
};

export default Users;
