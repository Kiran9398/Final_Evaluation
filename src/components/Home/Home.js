import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import "./Home.css";
const geettingDataFromLocaleStorage = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  if (userData) {
    return userData;
  } else {
    return [];
  }
};
const Home = () => {
  const [showAdd, setShowAdd] = useState(false);

  const [title, seeTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [data, setData] = useState(geettingDataFromLocaleStorage());
  const [activeTab, setActiveTab] = useState(0);
  const [stared, setStared] = useState(true);
  const [viewAllDiv, setViewAllDiv] = useState([]);
  const [edit, setEdit] = useState();
  const [showAddBtn, setShowAddBtn] = useState(true);
  const [staeData, setStarData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCardId, setSelectedCardId] = useState();
  const [showbtn, setShowBtn] = useState(false);
  const [showBtn2, setShowBtn2] = useState(false);

 

  // generates date
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(data));
  }, [data]);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const formattedDate = currentDate.toLocaleString("en-US", options);
  const titleHanlder = (e) => {
    seeTitle(e.target.value);
  };

  const disHanlder = (e) => {
    setDiscription(e.target.value);
  };

  const todoAddHanlder = (e) => {
    e.preventDefault();
    setShowAdd(false);
    const toDoData = {
      date: formattedDate,
      title,
      discription,
    };
    setData([...data, toDoData]);
    setDiscription("");
    seeTitle("");
    setShowAddBtn(true);
  };

  const LengthOfData = data.length;
  const lengthOfStaredData = staeData.length;
  const lengthOfDeletedData = deleteData.length;
  const navAddHandler = () => {
    setShowAdd(true);
  };
  const deleteHandler = (i) => {
    data.splice(i, 1);
    setData([...data]);
    setDeleteData([...deleteData, i]);
  };
  const staredHanlder = (e) => {
   
    setStarData([...staeData, e]);
  };
  

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const onOpenHanlder = (e) => {
    setViewAllDiv([e]);
    setShowBtn(false);
    setShowBtn2(true);
  };
  const updateHanlder = () => {
    const userData = data.map((e) => {
      if (e === edit) {
        return {
          title,
          discription,
          date: e.date,
        };
      } else {
        return e;
      }
    });
    setData(userData);
    seeTitle("");
    setDiscription("");
    setEdit(null);
  };
  const editHanlder = (each) => {
    seeTitle(each.title);
    setDiscription(each.discription);
    setShowAdd(true);
    setEdit(each);
    setShowAddBtn(false);
  };

  const inputHandler = (e) => {
    setSearch(e.target.value);
  };
  const filterdData = data.filter((e) => {
    return e.title.toLowerCase().includes(search.toLowerCase());
  });
  const searchDataa = data > 1 ? data : filterdData;

  const name = "Kiran";

  return (
    <div>
      {!showAdd ? (
        <div>
          <nav className="navBar">
            <h4>Notes</h4>
            <input
              value={search}
              className="searchInput"
              placeholder="search by title"
              type="search"
              onChange={inputHandler}
            />
            <button onClick={navAddHandler} className="headerAddButton">
              Add
            </button>

            <h5 className="welcomeHeading">
              Welcome <span className="nameHeading">{name}</span>
            </h5>
          </nav>

          <div className="gridContainer">
            <div className="vertical-tabs">
              <div className="tab-nav mt-4 ml-0">
                <ul>
                  <li
                    className={`tab-item mt-2 ${
                      activeTab === 0 ? "active" : "inactive"
                    }`}
                    onClick={() => handleTabClick(0)}
                  >
                    {`All (${LengthOfData})`}
                  </li>
                  <li
                    className={`tab-item mt-2 ${
                      activeTab === 1 ? "active" : "inactive"
                    }`}
                    onClick={() => handleTabClick(1)}
                  >
                    {`Starred(${lengthOfStaredData})`}
                  </li>
                  <li
                    className={`tab-item mt-2 ${
                      activeTab === 2 ? "active" : "inactive"
                    }`}
                    onClick={() => handleTabClick(2)}
                  >
                    {`Delete(${lengthOfDeletedData})`}
                  </li>
                </ul>
              </div>

              <div className="tab-content">
                {activeTab === 0 && (
                  <div>
                    <h4 className="allNotesHeading">All notes</h4>
                    {searchDataa.map((e, index) => {
                      return (
                        <div
                          onClick={() =>
                            onOpenHanlder({
                              title: e.title,
                              des: e.discription,
                              date: e.date,
                            })
                          }
                          key={index}
                          className="cardCotainer"
                        >
                          <div className="cardItems">
                            <div className="flex">
                              <div>
                                <h6 className="text-dark">{e.title}</h6>
                              </div>
                              <div>
                                <button
                                  onClick={() => staredHanlder(e)}
                                  className="deleteAndStarBtn"
                                >
                                  <AiOutlineStar />
                                </button>

                                <button
                                  onClick={() => deleteHandler(e)}
                                  className="deleteAndStarBtn"
                                >
                                  <AiOutlineDelete />
                                </button>
                              </div>
                            </div>
                            <p className="text-dark">{e.discription}</p>
                          </div>
                        </div>
                      );
                    })}

                    {deleteData.map((e, index) => {
                      return (
                        <div
                          onClick={() =>
                            onOpenHanlder({
                              title: e.title,
                              des: e.discription,
                              date: e.date,
                            })
                          }
                          key={index}
                          className="cardCotainer"
                        >
                          <div className="deleteCard">
                            <div className="flex">
                              <div className="deleteContainerTitleDeleteButton">
                                <h6 className="mt-2">{e.title}</h6>
                                <button className="deleteContainerDeleteButton">
                                  Deleted
                                </button>
                              </div>

                              <div>
                                <button
                                  onClick={() => staredHanlder(e)}
                                  className="deleteAndStarBtn"
                                >
                                  <AiOutlineStar />
                                </button>

                                <button
                                  onClick={() => deleteHandler(e)}
                                  className="deleteAndStarBtn"
                                >
                                  <AiOutlineDelete />
                                </button>
                              </div>
                            </div>
                            <p>{e.discription}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {activeTab === 1 && (
                  <div>
                    <h4 className="allNotesHeading">Starred notes</h4>
                    {staeData.map((e, index) => {
                      return (
                        <div
                          onClick={() =>
                            onOpenHanlder({
                              title: e.title,
                              des: e.discription,
                              date: e.date,
                            })
                          }
                          className="cardCotainer"
                        >
                          <div
                            className={`starredCard ${
                              selectedCardId === e.id ? "selectedd" : ""
                            }`}
                          >
                            <div className="flex">
                              <div>
                                <h6>{e.title}</h6>
                              </div>
                              <div>
                                <button
                                  onClick={() => staredHanlder(e)}
                                  className="deleteAndStarBtn"
                                >
                                  <AiFillStar />
                                </button>

                                <button
                                  onClick={deleteHandler}
                                  className="deleteAndStarBtn"
                                >
                                  <AiFillDelete />
                                </button>
                              </div>
                            </div>
                            <p>{e.discription}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {activeTab === 2 && (
                  <div>
                    <h4 className="allNotesHeading">Deleted Notes</h4>

                    {deleteData.map((e, index) => {
                      return (
                        <div
                          onClick={() =>
                            onOpenHanlder({
                              title: e.title,
                              des: e.discription,
                              date: e.date,
                            })
                          }
                          key={index}
                          className="cardCotainer"
                        >
                          <div className="deleteCard">
                            <div className="flex">
                              <div className="deleteContainerTitleDeleteButton">
                                <h6 className="mt-2">{e.title}</h6>
                                <button className="deleteContainerDeleteButton">
                                  Deleted
                                </button>
                              </div>

                              <div>
                                <button
                                  onClick={() => staredHanlder(e)}
                                  className="deleteAndStarBtn"
                                >
                                  <AiOutlineStar />
                                </button>

                                <button
                                  onClick={() => deleteHandler(e)}
                                  className="deleteAndStarBtn"
                                >
                                  <AiOutlineDelete />
                                </button>
                              </div>
                            </div>
                            <p>{e.discription}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div>
              {viewAllDiv.map((e, index) => {
                return (
                  <div className="thirdContainer">
                    <div className="thirdContainerFlex">
                      <div className="titleAndDateHeading">
                        <p className="titleHeadingDate">{e.title}</p>
                        <p className="dateHeading">{e.date}</p>
                      </div>

                      <div className="editStarBtn">
                        <button onClick={() => editHanlder(e)}>
                          <AiOutlineEdit />
                        </button>
                        <button>
                          <AiOutlineStar />
                        </button>
                        <button>
                          <AiOutlineDelete />
                        </button>
                      </div>
                    </div>
                    <p className="thirdContainerDiscription">{e.des}</p>
                  </div>
                );
              })}

              {showBtn2 &&
                data.map((e) => {
                  return (
                    <div className="editStarBtn">
                      <button onClick={() => editHanlder(e)}>
                        <AiOutlineEdit />
                      </button>
                      <button>
                        <AiOutlineStar />
                      </button>
                      <button>
                        <AiOutlineDelete />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="addContainer">
            <div className="addWelcomeHeading d-flex justify-content-between">
              <h3>Notes</h3>
              <h5>
                Welcome <span className="nameHeading">{`${name}`}</span>
              </h5>
            </div>

            <form className="formCotainer">
              <label className="labelTitle" htmlFor="title">
                Title<span className="spanEl">*</span>
              </label>
              <br />
              <input
                value={title}
                onChange={titleHanlder}
                placeholder="personal notes"
                className="addTitleInput"
                id="title"
                type="text"
              />
              <br />
              <label className="labelTitle" htmlFor="context">
                Context<span className="spanEl">*</span>
              </label>
              <br />
              <input
                value={discription}
                onChange={disHanlder}
                className="addDescriptionInput"
                id="context"
                type="text"
              />
              <br />
              <button id="cancelButton">Cancel</button>
              {showAddBtn ? (
                <button onClick={todoAddHanlder} id="addButton">
                  Add
                </button>
              ) : (
                <button onClick={updateHanlder} id="addButton">
                  Update
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
