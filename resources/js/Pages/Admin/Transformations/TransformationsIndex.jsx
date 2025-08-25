import React, { useEffect, useState } from "react";
import AdminLayout from "../layout";
import axios from "axios";
import {
    BookOpenIcon,
    XMarkIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { usePage } from "@inertiajs/react";
export default function TransformationIndex() {
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [transformations, setTransformations] = useState([]);
    const [selectedTransformation, setSelectedTransformation] = useState(null);
    const [newTransformation, setNewTransformation] = useState({
        title: "",
        image: "",
        description: "",
        location: "",
        tag: "",
    });
    const { app_url } = usePage().props;
    const [errors, setErrors] = useState({});

    const showAllTransformations = async () => {
        try {
            const response = await axios.get(
                `${app_url}/api/transformations`
            );
            setTransformations(response.data.transformations);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        showAllTransformations();
    }, []);

    const handleDeleteTransformation = (transformation) => {
        setDeleteModal(true);
        setSelectedTransformation(transformation);
    };
    const handleAddTransformation = () => setAddModal(true);
    const handleEditTransformation = (transformation) => {
        setEditModal(true);
        setSelectedTransformation(transformation);
    };
    const closeModal = () => {
        setAddModal(false);
        setEditModal(false);
        setDeleteModal(false);
    };

    const handleSendAddTransformation = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(newTransformation).forEach(([key, value]) =>
            formData.append(key, value)
        );
        try {
            await axios.post(
                `${app_url}/api/transformations`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setNewTransformation({
                title: "",
                image: "",
                description: "",
                location: "",
                tag: "",
            });
            showAllTransformations();
            closeModal();
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    };

    const handleSendEditTransformation = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(selectedTransformation).forEach(([key, value]) =>
            formData.append(key, value)
        );
        try {
            await axios.post(
                `${app_url}/api/transformations/${selectedTransformation.id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            showAllTransformations();
            setSelectedTransformation(null);
            closeModal();
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    };

    const handleSendDeleteTransformation = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(
                `${app_url}/api/transformations/${selectedTransformation.id}`
            );
            showAllTransformations();
            setSelectedTransformation(null);
            closeModal();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AdminLayout>
            <div className="mx-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                        <ClipboardDocumentListIcon className="h-6 w-6 text-green-500" />
                        Transformations
                    </h3>
                    <button
                        onClick={handleAddTransformation}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                    >
                        <PlusIcon className="h-4 w-4 mr-1.5" />
                        Add New Transformation
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-xl overflow-hidden">
                        <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    #
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Tag
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    {" "}
                                    Image
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {transformations.map((t, idx) => (
                                <tr
                                    key={t.id}
                                    className={`transition-colors duration-200 ${
                                        idx % 2 === 0
                                            ? "bg-white dark:bg-gray-800"
                                            : "bg-gray-50 dark:bg-gray-700"
                                    } hover:bg-green-50 dark:hover:bg-green-900`}
                                >
                                    <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">
                                        {idx + 1}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">
                                        {t.title}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">
                                        {t.description}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">
                                        {t.location}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">
                                        {t.tag}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">
                                        <img
                                            src={`${app_url}/storage/${t.image}`}
                                            alt="transformation"
                                            className="h-8 w-10 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300">
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() =>
                                                    handleEditTransformation(t)
                                                }
                                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteTransformation(
                                                        t
                                                    )
                                                }
                                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Modal */}
            {addModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                Add New Transformation
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 dark:text-gray-300"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        {errors &&
                            Object.entries(errors).map(([field, msgs], i) => (
                                <div key={i} className="text-red-600">
                                    {msgs.join(", ")}
                                </div>
                            ))}
                        {["title", "description", "location", "tag"].map(
                            (field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {field}
                                    </label>
                                    <input
                                        type="text"
                                        value={newTransformation[field]}
                                        onChange={(e) =>
                                            setNewTransformation({
                                                ...newTransformation,
                                                [field]: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                            )
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                onChange={(e) =>
                                    setNewTransformation({
                                        ...newTransformation,
                                        image: e.target.files[0],
                                    })
                                }
                            />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button
                                className="flex-1 px-4 py-2 bg-gray-100 rounded-lg"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg"
                                onClick={handleSendAddTransformation}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModal && selectedTransformation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                Edit Transformation
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 dark:text-gray-300"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        {errors &&
                            Object.entries(errors).map(([field, msgs], i) => (
                                <div key={i} className="text-red-600">
                                    {msgs.join(", ")}
                                </div>
                            ))}

                        {["title", "description", "location", "tag"].map(
                            (field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {field}
                                    </label>
                                    <input
                                        type="text"
                                        value={selectedTransformation[field]}
                                        onChange={(e) =>
                                            setSelectedTransformation({
                                                ...selectedTransformation,
                                                [field]: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            )
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) =>
                                    setSelectedTransformation({
                                        ...selectedTransformation,
                                        image: e.target.files[0],
                                    })
                                }
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                className="flex-1 px-4 py-2 bg-gray-100 rounded-lg"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg"
                                onClick={handleSendEditTransformation}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Delete Modal */}
            {deleteModal && selectedTransformation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                Delete Transformation
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 dark:text-gray-300"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">
                                {selectedTransformation.title}
                            </span>
                            ?
                        </p>

                        <div className="flex gap-3 pt-4">
                            <button
                                className="flex-1 px-4 py-2 bg-gray-100 rounded-lg"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg"
                                onClick={handleSendDeleteTransformation}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
