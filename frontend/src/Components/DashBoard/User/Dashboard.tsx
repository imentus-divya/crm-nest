import React, { useRef } from "react";
import "../styledashb.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineContainer,
  AiOutlineFileProtect,
  AiOutlineSnippets,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineFund,
} from "react-icons/ai";
import { useState } from "react";
import Header from "./UserHeader";
import SideNav from "./UserSideNav";

const Dashboard = () => {
  const urll = "http://localhost:8000";
  const navRef = useRef(null);
  // const [showForm, setShowForm] = useState(false);
  const [isNavClose, setIsNavClose] = useState(false);
  const [items, setItems] = useState([]);
  const navcloseFunc = () => {
    // Toggle the state to control the className
    setIsNavClose(!isNavClose);
  };

  return (
    <>
      <Header navcloseFunc={navcloseFunc} items={items} setItems={setItems} />
      <div className="main-container">
        <div
          className={`navcontainer ${isNavClose ? "navclose" : ""}`}
          ref={navRef}
        >
          <SideNav navcloseFunc={navcloseFunc} />
        </div>
        <div className="main">
          <>
            <div className="searchbar2">
              <input type="text" name="" id="" placeholder="Search" />
              <div className="searchbtn"></div>
            </div>

            <div>
              <div className="box-container">
                <div className="box box1">
                  <div className="text">
                    <h2 className="topic-heading">$15000</h2>
                    <h2 className="topic">Total Earning</h2>
                  </div>
                </div>

                <div className="box box2">
                  <div className="text">
                    <h2 className="topic-heading">320</h2>
                    <h2 className="topic">Activity Tracks</h2>
                  </div>
                </div>

                <div className="box box3">
                  <div className="text">
                    <h2 className="topic-heading">70</h2>
                    <h2 className="topic">Completed Tasks</h2>
                  </div>
                </div>

                <div className="box box4">
                  <div className="text">
                    <h2 className="topic-heading">10</h2>
                    <h2 className="topic">Pending Tasks</h2>
                  </div>
                </div>
              </div>

              <div className="report-container">
                <div className="report-header">
                  <h1 className="recent-Articles"></h1>
                  <div>
                    <label className="view">Sort By : </label>
                    <select name="" id="">
                      <option value="">Today</option>
                      <option value="">Last Week</option>
                    </select>
                  </div>
                </div>

                <div className="report-body">
                  <div className="report-topic-heading">
                    <h3 className="t-op">DateTime</h3>
                    <h3 className="t-op">Opening Bid</h3>
                    <h3 className="t-op">Closing Bid</h3>
                    <h3 className="t-op">Status</h3>
                  </div>

                  <div className="items">
                    <div className="item1">
                      <h3 className="t-op-nextlvl">Article 73</h3>
                      <h3 className="t-op-nextlvl">2.9k</h3>
                      <h3 className="t-op-nextlvl">210</h3>
                      <h3 className="t-op-nextlvl label-tag">Published</h3>
                    </div>

                    <div className="item1">
                      <h3 className="t-op-nextlvl">Article 72</h3>
                      <h3 className="t-op-nextlvl">1.5k</h3>
                      <h3 className="t-op-nextlvl">360</h3>
                      <h3 className="t-op-nextlvl label-tag">Published</h3>
                    </div>

                    <div className="item1">
                      <h3 className="t-op-nextlvl">Article 71</h3>
                      <h3 className="t-op-nextlvl">1.1k</h3>
                      <h3 className="t-op-nextlvl">150</h3>
                      <h3 className="t-op-nextlvl label-tag">Published</h3>
                    </div>

                    <div className="item1">
                      <h3 className="t-op-nextlvl">Article 70</h3>
                      <h3 className="t-op-nextlvl">1.2k</h3>
                      <h3 className="t-op-nextlvl">420</h3>
                      <h3 className="t-op-nextlvl label-tag">Published</h3>
                    </div>

                    <div className="item1">
                      <h3 className="t-op-nextlvl">Article 69</h3>
                      <h3 className="t-op-nextlvl">2.6k</h3>
                      <h3 className="t-op-nextlvl">190</h3>
                      <h3 className="t-op-nextlvl label-tag">Published</h3>
                    </div>

                    <div className="item1">
                      <h3 className="t-op-nextlvl">Article 68</h3>
                      <h3 className="t-op-nextlvl">1.9k</h3>
                      <h3 className="t-op-nextlvl">390</h3>
                      <h3 className="t-op-nextlvl label-tag">Published</h3>
                    </div>

                    <div className="item1">
                      <h3 className="t-op-nextlvl">Article 67</h3>
                      <h3 className="t-op-nextlvl">1.2k</h3>
                      <h3 className="t-op-nextlvl">580</h3>
                      <h3 className="t-op-nextlvl label-tag">Published</h3>
                    </div>

                    <div className="item1">
                      <h3 className="t-op-nextlvl">Article 66</h3>
                      <h3 className="t-op-nextlvl">3.6k</h3>
                      <h3 className="t-op-nextlvl">160</h3>
                      <h3 className="t-op-nextlvl label-tag">Published</h3>
                    </div>

                    <div className="item1">
                      <h3 className="t-op-nextlvl">Article 65</h3>
                      <h3 className="t-op-nextlvl">1.3k</h3>
                      <h3 className="t-op-nextlvl">220</h3>
                      <h3 className="t-op-nextlvl label-tag">Published</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
