"use client";
import { useState } from "react";
import { BiSolidPencil } from "react-icons/bi";
import EditModal from "./EditModal";

export default function EditBtn({ id }) {
  const [modal, setModal] = useState(false);
  const [developer, setDeveloepr] = useState({});

  const handleEdit = async (id) => {
    setModal(true);

    try {
      const res = await fetch(`/api/developer/developer/${id}`);
      const data = await res?.json();

      if (data?.success) {
        setDeveloepr(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={() => handleEdit(id)}
        className="hover:text-green-700 duration-200"
      >
        <BiSolidPencil />
      </button>

      <EditModal developer={developer} modal={modal} setModal={setModal} />
    </>
  );
}
