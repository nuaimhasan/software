import { useRef, useState } from "react";
import DatePicker from "react-multi-date-picker";
import { useAllClientsQuery } from "../../../../Redux/client/clientApi";
import moment from "moment";

const dailyWorkName = [
  "Post Upload",
  "Ads Run",
  "Website Setup",
  "Pixel Setup",
];

export default function AddTodayWork() {
  const textRef = useRef();

  const [date, setDate] = useState(new Date());
  const [works, setWorks] = useState([]);

  const [work, setWork] = useState({});

  let query = {};
  query["role"] = "seo";
  query["status"] = "active";
  const { data } = useAllClientsQuery({ ...query });
  const clients = data?.data;

  const handleCheck = (company, work) => {
    setWorks((prevState) => {
      const existingClient = prevState.find((c) => c.client === company);

      if (existingClient) {
        // If client already exists in the state
        const updatedWorks = existingClient.works.includes(work)
          ? existingClient.works.filter((w) => w !== work) // Remove work if it's unchecked
          : [...existingClient.works, work]; // Add work if it's checked

        // Update the state for the existing client
        return prevState.map((c) =>
          c.client === company ? { ...c, works: updatedWorks } : c,
        );
      } else {
        // If client doesn't exist, add them with the selected work
        return [...prevState, { client: company, works: [work] }];
      }
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const data = {
      date,
      works,
    };

    // Initialize an empty result object
    const transformedData = {
      date: data?.date,
      works: [],
    };

    const workMap = {};

    data.works.forEach((clientWork) => {
      clientWork.works.forEach((work) => {
        if (!workMap[work]) {
          workMap[work] = [];
        }

        workMap[work].push(clientWork.client);
      });
    });

    Object.keys(workMap).forEach((work) => {
      transformedData.works.push({
        work,
        company: workMap[work],
      });
    });

    setWork(transformedData);
  };

  const copyToClipboard = () => {
    // Select the text content from the ref
    const textToCopy = textRef.current.innerText;

    // Create a temporary textarea to hold the text
    const tempInput = document.createElement("textarea");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);

    // Select the text in the textarea and copy it
    tempInput.select();
    document.execCommand("copy");

    // Clean up by removing the temporary textarea
    document.body.removeChild(tempInput);

    // Alert or notify the user
    alert("Text copied to clipboard!");
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-3">
        <h2>Add New Client</h2>
      </div>

      <form onSubmit={handleAdd} className="p-3">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label htmlFor="date">On-Board Date *</label>
            <div className="date_ranger">
              <DatePicker
                value={date}
                onChange={(date) => setDate(date)}
                rangeHover
                highlightToday
                shadow={false}
                multiple={false}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 border">
          {clients?.map((client) => (
            <div key={client.id} className="flex items-center gap-3 border-b">
              <p className="min-w-48 border-r p-3">{client?.company}</p>

              {dailyWorkName.map((work) => (
                <div
                  key={work}
                  className="flex items-center gap-3 border-r p-3"
                >
                  <input
                    type="checkbox"
                    className="-mt-1 w-max"
                    onChange={() => handleCheck(client?.company, work)}
                    checked={works?.find(
                      (c) => c.client === client.name && c.works.includes(work),
                    )}
                  />
                  <label className="whitespace-nowrap">{work}</label>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button className="primary_btn">Submit</button>
        </div>
      </form>

      <div
        ref={textRef}
        className="copy-text p-10"
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <p>Today&apos;s Update - {moment(work?.date).format("DD-MM-YYYY")} :</p>

        <div className="mt-3 flex flex-col gap-4">
          {work?.works?.map((work, i) => (
            <div key={i}>
              <h3>* {work?.work}</h3>

              <ul className="pl-5">
                {work?.company?.map((company, i) => (
                  <li key={i}>
                    {i + 1}. {company}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <button
        className="copy-btn"
        onClick={copyToClipboard}
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Copy Text
      </button>
    </section>
  );
}
