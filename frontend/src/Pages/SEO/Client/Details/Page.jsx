import { useParams } from "react-router-dom";

export default function ClientDetails() {
  const { id } = useParams();
  console.log(id);

  return (
    <section className="rounded bg-base-100 p-4 shadow md:mx-20">
      <div className="text-center">
        <h3>20-05-2024</h3>
        <h2 className="text-lg font-medium">Nuaim Hasan nasim</h2>
        <p>eManager</p>
        <p>01706260994</p>
        <p>address, dhaka</p>
      </div>

      <div className="relative mt-5 overflow-x-auto">
        <table className="border_table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Plan 1</td>
              <td>15500</td>
              <td>00</td>
              <td>15500/=</td>
            </tr>
            <tr>
              <td>Website</td>
              <td>55500</td>
              <td>500</td>
              <td>55000/=</td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <th colSpan="3">
                <p className="text-end">Total</p>
              </th>
              <th className="text-end">70000/=</th>
            </tr>
            <tr>
              <th colSpan="3">
                <p className="text-end">Payment - 20-02-2024</p>
              </th>
              <th className="text-end">5000/=</th>
            </tr>
            <tr>
              <th colSpan="3">
                <p className="text-end">Payment - 20-03-2024</p>
              </th>
              <th className="text-end">15000/=</th>
            </tr>
            <tr>
              <th colSpan="3">
                <p className="text-end">Due</p>
              </th>
              <th className="text-end">35000/=</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-5 text-sm text-neutral">
        <p>On Board by Sajjad</p>
        <p>Priority: Low</p>
        <p>Remark:</p>
      </div>
    </section>
  );
}
