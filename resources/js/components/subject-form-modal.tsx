import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

interface Post {
  id?: number;
  name: string;
}

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  post?: Post | null;
}

export default function SubjectFormModal({ isOpen, closeModal, post }: Props) {
  const [formData, setFormData] = useState<Post>({
    name: "",
  });

  useEffect(() => {
    if (post) {
      setFormData({
        name: post.name,
      });
    } else {
      setFormData({ name: "" });
    }
  }, [post]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);

    if (post?.id) {
      data.append("_method", "PUT");
      router.post(`/subjects/${post.id}`, data, {
        onSuccess: () => {
          closeModal();
          router.reload();
        },
        onError: (errors) => {
          console.error(errors.message || "Failed to submit subject.");
        },
      });
    } else {
      router.post("/subjects", data, {
        onSuccess: () => {
          closeModal();
          router.reload();
        },
        onError: (errors) => {
          console.error(errors.message || "Failed to submit subject.");
        },
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-lg font-semibold mb-4">
          {post ? "Edit Subject" : "Add Subject"}
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {post ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
