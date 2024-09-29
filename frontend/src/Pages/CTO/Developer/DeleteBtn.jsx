"use client";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeleteBtn(id) {
  const router = useRouter();

  const handleDelete = async (id) => {
    const isConfirm = confirm(
      "Are you sure you want to delete this developer?"
    );

    if (isConfirm) {
      const res = await fetch(`/api/developer/developer/delete?id=${id?.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);

      if (data?.success) {
        toast.promise(
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(data?.message);
              router.refresh();
            }, 1000);
          }),
          {
            loading: "Deleting developer...",
            success: data?.message,
            error: "Failed to delete developer",
          }
        );
      } else {
        toast.error(data?.message);
        console.log(data);
      }
    }
  };

  return (
    <button
      onClick={() => handleDelete(id)}
      className="hover:text-red-600 duration-200 text-lg"
    >
      <MdDeleteOutline />
    </button>
  );
}
