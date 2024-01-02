import { useState, useEffect, useRef } from "react";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import {
  DataTableRowEditCompleteEvent,
  DataTableSelectionMultipleChangeEvent,
} from "primereact/datatable";
import "../styledashb.css";
import axios from "axios";
import { Paginator } from "primereact/paginator";
import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace";

const ForeClosureTab = (props: any) => {
  const { isManageCol, county } = props;
  const urll = process.env.REACT_APP_BACKEND_API_URL;

  const columns = [
    { field: "auction_date", header: "Auctn Date" },
    { field: "case_number", header: "Case No#" },
    { field: "address", header: "Address" },
    { field: "defendants", header: "Defendants" },
    { field: "plaintiffs", header: "plainTiff" },
    { field: "judgement", header: "Judgement" },
    { field: "status", header: "Status" },
  ];
  interface Product {
    auction_date: string;
    case_number: string;
    address: string;
    defendants: Array<string>;
    plaintiffs: Array<string>;
    judgement: number;
    status: string;
    county_name: string;
    user_comments: Array<string>;
  }
  // const displayname=localStorage.getItem("display_name")
  const [products, setProducts] = useState<Product[] | null>(null);
  const [curPage, setCurPage] = useState(1);
  const [first, setFirst] = useState(0);
  const [newCmnt, setNewCmnt] = useState("");
  const [comment, setcomment] = useState<String[]>([]);
  const [rows, setRows] = useState(5);
  const [totlaRecords, setTotalRecords] = useState(0);
  const [selectedCity, setSelectedCity] = useState(null);
  const [showComnts, setShowComnts] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [rowClick, setRowClick] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [csvData, setCsvData] = useState([]);

  const dt = useRef(null);
  const cities = [
    { name: "Orange", code: "NY" },
    { name: "Hillsborough", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  async function getData() {
    const token = localStorage.getItem("jwtToken");
    await axios
      .get(`${urll}/foreclosure`, {
        headers: { Authorization: token },
        params: {
          role: "1",
          page: curPage,
          limit: rows,
          county: county,
        },
      })
      .then((response) => {
        console.log(
          "🚀 ~ file: ForeclosureTable.tsx:86 ~ .then ~ response.data.items:",
          response.data.items
        );
        if (products) {
          setProducts(products.concat(response.data.items));
        } else {
          setProducts(response.data.items);
        }
        setTotalRecords(response.data.meta.totalItems);
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: Navbar.tsx:80 ~ constforeclosure_btn= ~ error:",
          error
        );
      });
  }

  useEffect(() => {
    getData();
  }, [curPage]);

  useEffect(() => {
    if (products) {
      products!.length = 0;
    }
    getData();
  }, [county]);

  const onColumnToggle = (event: MultiSelectChangeEvent) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol: any) => sCol.field === col.field)
    );

    setVisibleColumns(orderedSelectedColumns);
  };
  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
    if (products === null) {
      return;
    }
    let _products = [...products];
    let { newData, index } = e;
    let updatedProduct: Product = newData as Product;

    _products[index] = updatedProduct;
    setProducts(_products);
  };

  const textEditor = (options: any) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const getProducts = () => {
    let res = products!.slice(
      first,
      first + rows > products!.length ? products!.length : first + rows
    );
    return res;
  };

  const header = (
    <div
      className="headerdata"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="row-click">
        <label htmlFor="input-rowclick">Row Click</label>
        <InputSwitch
          inputId="input-rowclick"
          checked={rowClick}
          onChange={(e) => setRowClick(e.value)}
          style={{ marginLeft: "2px" }}
        />
      </div>

      <MultiSelect
        value={visibleColumns}
        options={columns}
        optionLabel="header"
        onChange={onColumnToggle}
        className="w-full sm:w-20rem coltoggle"
        display="chip"
      />

      <Tooltip target=".export-buttons>button" position="bottom" />

      <div className=" save flex align-items-center justify-content-center ">
        <Button
          type="button"
          icon="pi pi-file"
          rounded
          onClick={() => exportCSV(false)}
          data-pr-tooltip="CSV"
        />
      </div>
    </div>
  );
  interface CSVExportOptions {
    filename: string;
    // properties needed for configuring the CSV export
  }

  interface TypeExportCSV {
    exportCSV: (options: CSVExportOptions) => void;
    // Add other properties or methods if available
  }
  const exportCSV = (selectionOnly: boolean) => {
    // dt.current.exportCSV({ selectionOnly });
    if (dt.current !== null && dt.current !== undefined) {
      const dtCurrent = dt.current as TypeExportCSV;
      const options: CSVExportOptions = {
        filename: "exported_data.csv", // Example filename
        // Add other necessary properties based on the requirements
      };
      dtCurrent.exportCSV(options);
    } else {
      console.error("dt.current is null or undefined.");
    }
  };

  const UpdateComments = (rowData: Product) => {
    const paragraphs: JSX.Element[] = [];

    for (
      let i = rowData.user_comments.length - 1;
      i >= 0 && i > rowData.user_comments.length - 4;
      i--
    ) {
      const item = rowData.user_comments[i];
      paragraphs.push(<p key={i}>{item}</p>);
    }
    return (
      <>
        <div>{paragraphs}</div>
        <Button
          label="View All"
          onClick={() => handleButtonClick(rowData.user_comments)}
        />
      </>
    );
  };

  const handleButtonClick = (comment: Array<string>) => {
    setcomment(comment);
    setShowComnts(true);
  };

  const commentHandler = (
    <div>
      <Button
        label="Cancel"
        onClick={() => setShowComnts(false)}
        className="p-button-text"
      />
      <Button label="Confirm" onClick={() => handleAddComment()} autoFocus />
    </div>
  );

  const handleAddComment = () => {
    setShowComnts(false);
  };

  return (
    <div className="parent">
      {products !== null ? (
        <div className="def">
          <DataTable
            // value={products.slice(first, first + rows)}
            value={getProducts()}
            first={first}
            ref={dt}
            showGridlines
            rows={rows}
            rowsPerPageOptions={[5, 10, 25, 50]}
            removableSort
            selectionMode={rowClick ? null : "checkbox"}
            selection={selectedProducts}
            onSelectionChange={(
              e: DataTableSelectionMultipleChangeEvent<Product[]>
            ) => setSelectedProducts(e.value)}
            // columnResizeMode="expand"
            // resizableColumns
            tableStyle={{ minWidth: "30rem" }}
            onRowEditComplete={onRowEditComplete}
            editMode="row"
            scrollable
            scrollHeight="400px"
            header={isManageCol && header}
          >
            {isManageCol && (
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "3rem" }}
              ></Column>
            )}
            {visibleColumns.map((col) => (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                editor={(options) => textEditor(options)}
                style={{ width: "20%" }}
              />
            ))}
            <Column
              body={UpdateComments}
              headerStyle={{ width: "10%", minWidth: "8rem" }}
              header={"Comments"}
              bodyStyle={{ textAlign: "center", minWidth: "12rem" }}
            ></Column>
          </DataTable>

          <Paginator
            first={first}
            rows={rows}
            totalRecords={totlaRecords}
            rowsPerPageOptions={[5, 10, 25, 50]}
            onPageChange={(e) => {
              if (
                products.length < e.rows * (e.page + 1) &&
                products.length < totlaRecords
              ) {
                setCurPage(e.page + 1);
              }
              setFirst(e.first);
              setRows(e.rows);
            }}
          />
          <Dialog
            header="Comments"
            visible={showComnts}
            style={{ width: "50vw" }}
            onHide={() => setShowComnts(false)}
            footer={commentHandler}
          >
            <span
              className="p-float-label"
              style={{ borderBottom: "1px", padding: "5px" }}
            >
              <InputText
                id="usercomment"
                value={newCmnt}
                onChange={(e) => setNewCmnt(e.target.value)}
              />
              <label htmlFor="usercomment">Add a comment</label>
            </span>
            <div>
              {comment
                .slice()
                .reverse()
                .map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
            </div>
          </Dialog>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default ForeClosureTab;
