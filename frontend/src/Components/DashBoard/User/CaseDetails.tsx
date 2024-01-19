import { useState, useEffect, useRef } from "react";
import "../styledashb.css";
import styles from "./caseDetails.module.css";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Panel } from "primereact/panel";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { ListBox, ListBoxChangeEvent } from "primereact/listbox";

interface Country {
  user: string;
  comment: string;
  time: string;
}

const CaseDetails = () => {
  const Navigation = useNavigate();
  const toast = useRef<Toast>(null);
  const [selectedCountries, setSelectedCountries] = useState<Country | null>(
    null
  );
  const countries: Country[] = [
    {
      user: "Ishwar Parmar",
      comment: "webpack compiled with 2 warning",
      time: "28 sec ago",
    },
    { user: "Ishwar Parmar", comment: "No issues found", time: "28 sec ago" },
    {
      user: "Ishwar Parmar",
      comment: "'useRef' is defined but never used",
      time: "yesterday",
    },
    {
      user: "Ishwar Parmar",
      comment:
        "start value has mixed support, consider using flex-start instead",
      time: "1 hour ago",
    },
    {
      user: "Ishwar Parmar",
      comment: "webpack compiled with 2 warning",
      time: "28 sec ago",
    },
    { user: "Ishwar Parmar", comment: "No issues found", time: "28 sec ago" },
    {
      user: "Ishwar Parmar",
      comment: "'useRef' is defined but never used",
      time: "yesterday",
    },
    {
      user: "Ishwar Parmar",
      comment:
        "start value has mixed support, consider using flex-start instead. start value has mixed support, consider using flex-start instead. start value has mixed support, consider using flex-start instead",
      time: "1 hour ago",
    },
    {
      user: "Ishwar Parmar",
      comment: "webpack compiled with 2 warning",
      time: "28 sec ago",
    },
    { user: "Ishwar Parmar", comment: "No issues found", time: "28 sec ago" },
    {
      user: "Ishwar Parmar",
      comment: "'useRef' is defined but never used",
      time: "yesterday",
    },
    {
      user: "Ishwar Parmar",
      comment:
        "start value has mixed support, consider using flex-start instead",
      time: "1 hour ago",
    },
  ];

  const countryTemplate = (option: Country) => {
    return (
      <div className={`${styles.commentSec}`}>
        <div className={`${styles.dp}`}>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
            className="dpicn"
            alt="dp"
          />
        </div>
        <div>
          <div style={{ fontSize: "large", fontWeight: 'bolder' }}>
            {option.user}
            <span style={{ paddingLeft: "10px", fontSize: "12px" }}>
              {option.time}
            </span>
          </div>
          <div style={{ fontSize: "small" }}>{option.comment}</div>
        </div>
      </div>
    );
  };

  const [newCmnt, setNewCmnt] = useState("");

  // To add user's comment
  async function handleUserComment() {
    try {
      toast.current?.show({
        severity: "success",
        summary: "Comment Added",
      });
      //   const response = await axios.put(
      //     `${urll}/foreclosure/${selectedCaseNo}/${selCaseId}`,
      //     {
      //       newComment: newCmnt,
      //     }
      //   );
      //   if (response.status === 200) {
      //     toast.current?.show({
      //       severity: "success",
      //       summary: "Comment Added",
      //     });
      //     await getData();
      //     setcomment(response.data);
      //   }
    } catch (error) {
      console.log(
        "🚀 ~ file: ForeclosureTable.tsx:103 ~ addComment ~ error:",
        error
      );
    }
  }

  const header = (
    <div className={`${styles.headerValue}`}>
      <div>
        <p className={`${styles.headerTop}`}>Auctn Date</p>
        <p className={`${styles.headerDet}`}>10 am 31 Oct, 2023</p>
      </div>
      <div>
        <p className={`${styles.header}`}>Auctn Date</p>
        <p className={`${styles.headerDet}`}>10 am 31 Oct, 2023</p>
      </div>
      <div>
        <p className={`${styles.header}`}>Case No#</p>
        <p className={`${styles.headerDet}`}>2022 AD 000420</p>
      </div>
      <div>
        <p className={`${styles.header}`}>Auctn Date</p>
        <p className={`${styles.headerDet}`}>10 am 31 Oct, 2023</p>
      </div>
      <div>
        <p className={`${styles.header}`}>Case No#</p>
        <p className={`${styles.headerDet}`}>2022 AD 000420</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="main-container">
        <div className="main">
          <div className="fc-container">
            <div className={`header-box-text ${styles.backBut}`}>
              <div>
                <Button
                  icon="pi pi-arrow-left"
                  rounded
                  text
                  raised
                  severity="secondary"
                  onClick={() => Navigation("/foreclosure")}
                />
              </div>
              <div>
                <h2>Foreclosure</h2>
                <p>Here's what happening with your track today</p>
              </div>
            </div>

            <div>
              <Panel header={header}>
                <div className={`${styles.headerValue}`}>
                  <div>
                    <p>Status</p>
                    <Button label="Open" outlined />
                  </div>
                  <div>
                    <p>Activity</p>
                    <span className={`${styles.backBut}`}>
                      <Button label="All" severity="secondary" outlined />
                      <Button label="Comment" severity="secondary" outlined />
                      <Button label="History" severity="secondary" outlined />
                    </span>
                  </div>
                </div>

                <div
                  className={`card flex flex-wrap justify-content-center ${styles.inputCmnt}`}
                >
                  <p>Comment :</p>
                  <span className="p-input-icon-right">
                    <InputText
                      id="usercomment"
                      value={newCmnt}
                      onChange={(e) => setNewCmnt(e.target.value)}
                      placeholder="Add a new comment"
                    />
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.3393 9.32001L6.33927 2.32001C5.78676 2.04502 5.16289 1.94712 4.55271 2.03966C3.94252 2.1322 3.37573 2.41068 2.9296 2.83712C2.48347 3.26357 2.17972 3.81723 2.05976 4.42262C1.9398 5.02801 2.00947 5.65566 2.25927 6.22001L4.65927 11.59C4.71373 11.7198 4.74177 11.8592 4.74177 12C4.74177 12.1408 4.71373 12.2802 4.65927 12.41L2.25927 17.78C2.05597 18.2367 1.97003 18.737 2.00925 19.2354C2.04847 19.7337 2.21161 20.2144 2.48385 20.6337C2.75609 21.053 3.1288 21.3976 3.56809 21.6362C4.00739 21.8748 4.49935 21.9999 4.99927 22C5.4675 21.9953 5.92876 21.886 6.34927 21.68L20.3493 14.68C20.8459 14.4302 21.2633 14.0473 21.555 13.5741C21.8466 13.1009 22.0011 12.5559 22.0011 12C22.0011 11.4441 21.8466 10.8992 21.555 10.4259C21.2633 9.9527 20.8459 9.56982 20.3493 9.32001H20.3393ZM19.4493 12.89L5.44927 19.89C5.26543 19.9783 5.059 20.0082 4.85766 19.9759C4.65631 19.9435 4.46968 19.8503 4.32278 19.7089C4.17589 19.5674 4.07575 19.3844 4.0358 19.1844C3.99585 18.9845 4.018 18.777 4.09927 18.59L6.48927 13.22C6.52021 13.1483 6.54692 13.0748 6.56927 13H13.4593C13.7245 13 13.9788 12.8946 14.1664 12.7071C14.3539 12.5196 14.4593 12.2652 14.4593 12C14.4593 11.7348 14.3539 11.4804 14.1664 11.2929C13.9788 11.1054 13.7245 11 13.4593 11H6.56927C6.54692 10.9252 6.52021 10.8517 6.48927 10.78L4.09927 5.41001C4.018 5.22297 3.99585 5.01556 4.0358 4.81558C4.07575 4.6156 4.17589 4.43261 4.32278 4.29115C4.46968 4.1497 4.65631 4.05654 4.85766 4.02416C5.059 3.99178 5.26543 4.02174 5.44927 4.11001L19.4493 11.11C19.6131 11.1939 19.7505 11.3214 19.8465 11.4785C19.9425 11.6355 19.9933 11.816 19.9933 12C19.9933 12.1841 19.9425 12.3645 19.8465 12.5216C19.7505 12.6786 19.6131 12.8061 19.4493 12.89Z"
                        fill="#939393"
                      />
                    </svg>
                  </span>
                </div>

                {/* All comment */}
                <div
                  className="card flex justify-content-center"
                  style={{ marginTop: "30px"}}
                >
                  <ListBox
                    options={countries}
                    optionLabel="name"
                    itemTemplate={countryTemplate}
                    className="w-full md:w-14rem"
                    listStyle={{ maxHeight: "500px" }}
                  />
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CaseDetails;
