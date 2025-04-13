import { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
// import PostFormModal from "@/components/PostFormModal";
import AppLayout from "@/layouts/app-layout";
import RoomFormModal from "@/components/room-form-modal";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Users",
    href: "/users",
  },
];
export default function Users({ users }: { users: any }) {
  const { posts } = usePage<{
    posts: { id: number; title: string; content: string; picture?: string }[];
  }>().props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post = null) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    router.delete(`/classrooms/${id}`, {
      onSuccess: () => {
        router.reload();
      },
      onError: () => {
        console.error("Failed to delete post.");
      },
    });
  };

  console.log("users: ", users);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Classrooms" />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl">
        <div className="flex justify-end">
          <button
            onClick={() => openModal()}
            className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition"
          >
            Add Classroom
          </button>
        </div>

        <table className="w-full border-collapse bg-white text-black shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-800 border-b">
              {["Name", "Email", "Role", "Actions"].map((header) => (
                <th key={header} className="border p-3 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              users.map((user: any) => (
                <tr key={user.id} className="border-b">
                  {/* <td className="p-3">
                    {post.picture ? <img src={post.picture} alt="Post" className="w-16 h-16 object-cover rounded-full" /> : "No Picture"}
                  </td> */}
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  {/* <td className="p-3">{post.content}</td> */}
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => openModal(user)}
                      className="bg-blue-500 text-sm text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-sm text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-600">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <RoomFormModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        post={selectedPost}
      />
    </AppLayout>
  );
}
