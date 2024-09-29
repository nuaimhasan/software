import { useState } from "react";
import AddModal from "./AddModal";

export default function AddBtn() {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <button onClick={() => setModal(true)} className="primary_btn">
        Add New
      </button>

      <AddModal modal={modal} setModal={setModal} />
    </div>
  );
}
