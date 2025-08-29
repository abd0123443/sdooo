import React, { useEffect, useState } from "react";
import AdminLayout from "../layout";
import axios from "axios";
import { usePage } from "@inertiajs/react";
import {
    XMarkIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";

export default function AboutIndex() {
    const { app_url } = usePage().props;

    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [aboutes, setAboutes] = useState([]);
    const [selectedAboute, setSelectedAboute] = useState({
        id: null,
        description: "",
        image: "",
    });
    const [newAboute, setNewAboute] = useState({
        description: "",
        image: null,
    });
    const [errors, setErrors] = useState({});

    // Fetch About
    const fetchAboutes = async () => {
        try {
            const res = await axios.get(`${app_url}/api/abouts`);
            setAboutes(res.data.aboutes);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAboutes();
    }, []);

    // Open modals
    const handleAddAboute = () => setAddModal(true);
    const handleEditAboute = (aboute) => {
        setSelectedAboute(aboute);
        setEditModal(true);
    };
    const handleDeleteAboute = (aboute) => {
        setSelectedAboute(aboute);
        setDeleteModal(true);
    };
    const closeModal = () => {
        setAddModal(false);
        setEditModal(false);
        setDeleteModal(false);
        setErrors({});
        setNewAboute({ description: "", image: null });
        setSelectedAboute({ id: null, description: "", image: "" });
    };

    // Add About
    const handleSendAddAboute = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("description", newAboute.description);
        if (newAboute.image) formData.append("image", newAboute.image);

        try {
            await axios.post(`${app_url}/api/abouts`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            closeModal();
            fetchAboutes();
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

    // Edit About
    const handleSendEditAboute = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("description", selectedAboute.description);
        if (selectedAboute.image instanceof File) formData.append("image", selectedAboute.image);

        try {
            await axios.post(`${app_url}/api/abouts/${selectedAboute.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            closeModal();
            fetchAboutes();
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

    // Delete About
    const handleSendDeleteAboute = async () => {
        try {
            await axios.delete(`${app_url}/api/abouts/${selectedAboute.id}`);
            closeModal();
            fetchAboutes();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AdminLayout>
            <div className="mx-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in-up border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                        <DocumentTextIcon className="h-6 w-6 text-blue-500" />
                        About
                    </h3>
                    {aboutes.length === 0 && (
                        <button
                            onClick={handleAddAboute}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <PlusIcon className="h-4 w-4 mr-1.5" />
                            Add About
                        </button>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-xl overflow-hidden">
                        <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Description</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Image</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {aboutes.map((item, idx) => (
                                <tr
                                    key={item.id}
                                    className={`transition-colors duration-200 ${idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"} hover:bg-blue-50 dark:hover:bg-blue-900`}
                                >
                                    <td className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{idx + 1}</td>
                                    <td className="px-4 py-4 text-xs font-semibold text-gray-600 dark:text-gray-300 tracking-wider">{item.description}</td>
                                    <td className="px-4 py-3 text-right">
                                        {item.image && (
                                            <img src={`${app_url}/storage/${item.image}`} alt="about" className="h-8 w-10 object-cover object-center rounded" />
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleEditAboute(item)} className="p-2 text-blue-500 hover:bg-yellow-50 dark:hover:bg-yellow-900 rounded-lg transition-colors">
                                                <PencilIcon className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleDeleteAboute(item)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors">
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
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Add About</h3>
                            <button onClick={closeModal}><XMarkIcon className="h-6 w-6 text-gray-500" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            {errors.description && <p className="text-red-600 text-sm">{errors.description[0]}</p>}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                                <textarea
                                    value={newAboute.description}
                                    onChange={(e) => setNewAboute({ ...newAboute, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image</label>
                                <input type="file" onChange={(e) => setNewAboute({ ...newAboute, image: e.target.files[0] })} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white  dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"  />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button onClick={closeModal} className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">Cancel</button>
                                <button onClick={handleSendAddAboute} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Edit About</h3>
                            <button onClick={closeModal}><XMarkIcon className="h-6 w-6 text-gray-500" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                                <textarea
                                    value={selectedAboute.description}
                                    onChange={(e) => setSelectedAboute({ ...selectedAboute, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image</label>
                                <input type="file" onChange={(e) => setSelectedAboute({ ...selectedAboute, image: e.target.files[0] })} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"  />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button onClick={closeModal} className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">Cancel</button>
                                <button onClick={handleSendEditAboute} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Delete About</h3>
                            <button onClick={closeModal}><XMarkIcon className="h-6 w-6 text-gray-500" /></button>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-800 dark:text-gray-200">Are you sure you want to delete this About?</p>
                            <div className="flex gap-3 pt-4">
                                <button onClick={closeModal} className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">Cancel</button>
                                <button onClick={handleSendDeleteAboute} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
