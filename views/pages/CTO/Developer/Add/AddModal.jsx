import { useState } from "react";
import { IoClose } from "react-icons/io5";
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";

export default function AddModal({ modal, setModal }) {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
          <h2 className="text-neutral">Add Developer</h2>

          <button
            onClick={() => setModal(false)}
            className="absolute top-4 right-2 text-neutral-content"
          >
            <IoClose />
          </button>
        </div>

        <form>
          <div className="form_group mt-2">
            <p className="text-neutral-content text-sm">Developer Image</p>
            <ImageUploader onFileAdded={(img) => setImage(img)} />
          </div>

          <div className="form_group mt-2">
            <p className="text-neutral-content text-sm">Developer Name</p>
            <input type="text" name="name" required />
          </div>

          <div className="form_group mt-2">
            <p className="text-neutral-content text-sm">
              Developer Designation
            </p>
            <input type="text" name="designation" required />
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
