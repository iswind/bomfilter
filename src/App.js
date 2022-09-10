import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as XLSX from "xlsx";

function App() {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        var data3 = []
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname1 = wb.SheetNames[0];
        const ws1 = wb.Sheets[wsname1];
        const data1 = XLSX.utils.sheet_to_json(ws1);
        // resolve(data1);
        const wsname2 = wb.SheetNames[1];
        const ws2 = wb.Sheets[wsname2];
        const data2 = XLSX.utils.sheet_to_json(ws2);
        // resolve(data2);

        for (var r1 of data1) {
          let find = 0;
          for (let r2 of data2) {
            if (r1.客戶料號 === r2.客戶料號) {
              find++;
              if (r1.品名 === r2.品名) {
                if (r1.數量 === r2.數量) {
                  if (r1.零件位置 === r2.零件位置) {
                    // data3.push({
                    //   type: {
                    //     delete: false,
                    //     add: false,
                    //     name: false,
                    //     amount: false,
                    //     locaton: false
                    //   },
                    //   data: r2
                    // });
                  } else {
                    data3.push({
                      type: {
                        delete: false,
                        add: false,
                        name: false,
                        amount: false,
                        locaton: true
                      },
                      data: r2
                    });
                  }
                } else {
                  if (r1.零件位置 === r2.零件位置) {
                    data3.push({
                      type: {
                        delete: false,
                        add: false,
                        name: false,
                        amount: true,
                        locaton: false
                      },
                      data: r2
                    });
                  } else {
                    data3.push({
                      type: {
                        delete: false,
                        add: false,
                        name: false,
                        amount: true,
                        locaton: true
                      },
                      data: r2
                    });
                  }
                }
              } else {
                if (r1.數量 === r2.數量) {
                  if (r1.零件位置 === r2.零件位置) {
                    data3.push({
                      type: {
                        delete: false,
                        add: false,
                        name: true,
                        amount: false,
                        locaton: false
                      },
                      data: r2
                    });
                  } else {
                    data3.push({
                      type: {
                        delete: false,
                        add: false,
                        name: true,
                        amount: false,
                        locaton: true
                      },
                      data: r2
                    });
                  }
                } else {
                  if (r1.零件位置 === r2.零件位置) {
                    data3.push({
                      type: {
                        delete: false,
                        add: false,
                        name: true,
                        amount: true,
                        locaton: false
                      },
                      data: r2
                    });
                  } else {
                    data3.push({
                      type: {
                        delete: false,
                        add: false,
                        name: true,
                        amount: true,
                        locaton: true
                      },
                      data: r2
                    });
                  }
                }
              }
            }
          }
          if (find === 0) {
            data3.push({
              type: {
                delete: true,
                add: false,
                name: false,
                amount: false,
                locaton: false
              },
              data: r1
            });
          }
        }
        for (var r2 of data2) {
          let find = 0;
          for (let r1 of data1) {
            if (r1.客戶料號 === r2.客戶料號) {
              find++;
            }
          }
          if (find === 0) {
            data3.push({
              type: {
                delete: false,
                add: true,
                name: false,
                amount: false,
                locaton: false
              },
              data: r2
            });
            break;
          }
        }
        resolve(data3);

      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  useEffect(() => {
    // console.log(items);
  }, [items])
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <table class="table container">
        <thead>
          <tr>
            <th scope="col">項次</th>
            <th scope="col">客戶料號</th>
            <th scope="col">品名</th>
            <th scope="col">數量</th>
            <th scope="col">零件位置</th>
            <th scope="col">備註</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d, i) => (
            <tr key={d.data.客戶料號 + (i++)} style={{ backgroundColor: d.type.delete ? "#FF2400" : d.type.add ? "#FFFF00" : "#ffffff" }}>
              <th>{d.data.項次}</th>
              <td>{d.data.客戶料號}</td>
              <td style={{width:"10%", backgroundColor: d.type.delete ? "#FF2400" : d.type.add ? "#FFFF00" : d.type.name ? "#F87217" : "#ffffff" }} >{d.data.品名}</td>
              <td style={{ backgroundColor: d.type.delete ? "#FF2400" : d.type.add ? "#FFFF00" : d.type.amount ? "#728FCE" : "#ffffff" }}>{d.data.數量}</td>
              <td style={{ backgroundColor: d.type.delete ? "#FF2400" : d.type.add ? "#FFFF00" : d.type.locaton ? "#AB784E" : "#ffffff" }}>{d.data.零件位置}</td>
              {/* <td style={{backgroundColor:d.type.name?"F87217":"#ffffff"}}>{d.data.品名}</td>
              <td style={{backgroundColor:d.type.amount?"BCB88A":"#ffffff"}}>{d.data.數量}</td>
              <td style={{backgroundColor:d.type.locaton?"AB784E":"#ffffff"}}>{d.data.零件位置}</td> */}
              <td>{d.data.備註}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
