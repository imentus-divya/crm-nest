import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import {
  DataTableRowEditCompleteEvent,
  DataTableSelectionMultipleChangeEvent,
} from "primereact/datatable";
import "../styledashb.css";
import axios from "axios";
import { Paginator } from "primereact/paginator";

const LPcasesTable = (props: any) => {
  const { isManageCol, county, dt } = props;
  const urll = process.env.REACT_APP_BACKEND_API_URL;

  const columns = [
    { field: "casefile_date", header: "Case file Date" },
    { field: "case_type", header: "Case Type" },
    { field: "case_number", header: "Case No#" },
    { field: "address", header: "Address" },
    { field: "defendants", header: "Defendants" },
    { field: "plaintiffs", header: "plainTiff" },
    { field: "estimated_claim", header: "Judgement" },
    { field: "case_status", header: "Case status" },
  ];
  interface Product {
    casefile_date: string;
    case_type: string;
    case_number: string;
    address: string;
    defendants: Array<string>;
    plaintiffs: Array<string>;
    estimated_claim: number;
    case_status: string;
    county_name: string;
  }
  // const displayname=localStorage.getItem("display_name")
  const [products, setProducts] = useState<Product[] | null>(null);
  const [curPage, setCurPage] = useState(1);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [totlaRecords, setTotalRecords] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [rowClick, setRowClick] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState(columns);

  // const dt = useRef(null);
  // const cities = [
  //   { name: "Orange", code: "NY" },
  //   { name: "Hillsborough", code: "RM" },
  //   { name: "London", code: "LDN" },
  //   { name: "Istanbul", code: "IST" },
  //   { name: "Paris", code: "PRS" },
  // ];

  async function getData() {
    const token = localStorage.getItem("jwtToken");
    await axios
      .get(`${urll}/LPcases`, {
        headers: { Authorization: token },
        params: {
          role: "1",
          page: curPage,
          limit: rows,
          county: county,
        },
      })
      .then((response) => {
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
    </div>
  );

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
            style={{ fontSize: "smaller" }}
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default LPcasesTable;
