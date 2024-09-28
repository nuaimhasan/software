import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import ImageUploader from "react-image-upload";

export default function EditModal({ modal, setModal, developer }) {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const name = e.target.name.value;
    const designation = e.target.designation.value;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("designation", designation);

    if (image) {
      formData.append("image", image?.file);
    }

    try {
      const res = await fetch(
        `/api/developer/developer/edit/${developer?._id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await res?.json();

      if (data?.success) {
        toast.promise(
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(data?.message);
              router.refresh();
              setImage(null);
            }, 1000);
          }),
          {
            loading: "Editing developer...",
            success: data?.message,
            error: "Failed to edit developer",
          }
        );
        e.target.reset();
        setImage(null);
        setModal(false);
      } else {
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={() => setModal(false)}
        className={`modal_overlay ${
          modal && "modal_overlay_show cursor-pointer"
        }`}
      ></div>
      <div className={`modal w-[500px] ${modal && "modal_show"}`}>
        <div className="p-3 text-center relative">
          <h2 className="text-neutral text-base">Edit {developer?.name}</h2>

          <button
            onClick={() => setModal(false)}
            className="absolute top-4 right-2 text-neutral-content"
          >
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleEdit}>
          <div className="form_group mt-2">
            <p className="text-neutral-content text-sm">Developer Image</p>
            <ImageUploader onFileAdded={(img) => setImage(img)} />
          </div>

          <div className="form_group mt-2">
            <p className="text-neutral-content text-sm">Developer Name</p>
            <input
              type="text"
              name="name"
              required
              defaultValue={developer?.name}
            />
          </div>

          <div className="form_group mt-2">
            <p className="text-neutral-content text-sm">
              Developer Designation
            </p>
            <input
              type="text"
              name="designation"
              required
              defaultValue={developer?.designation}
            />
          </div>

          <div className="mt-4">
            <button className="primary_btn">
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
