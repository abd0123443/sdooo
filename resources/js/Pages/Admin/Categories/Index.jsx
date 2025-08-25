import React, { useEffect, useState } from "react";
import AdminLayout from "../layout";
import axios from "axios";
import { usePage } from "@inertiajs/react";
import {
    AcademicCapIcon,
    UserGroupIcon,
    BookOpenIcon,
    ClipboardDocumentListIcon,
    XMarkIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    TagIcon,
} from "@heroicons/react/24/outline";

export default function CategoriesIndex() {
    const { app_url } = usePage().props;

    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({
        id: null,
        name: "",
        description: "",
        image: "",
        pdf_file: null,
    });
    const [newCategory, setNewCategory] = useState({
        name: "",
        image: "",
        description: "",
        pdf_file: null,
    });
    const [errors, setErrors] = useState({});

    const showAllCategories = async () => {
        try {
            const response = await axios.get(`${app_url}/api/categories/list`);
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        showAllCategories();
    }, []);

    // Open modals
    const handleDeleteCategory = (category) => {
        setDeleteModal(true);
        setSelectedCategory(category);
    };
    const handleAddCategory = () => setAddModal(true);
    const handleEditCategory = (category) => {
        setEditModal(true);
        setSelectedCategory(category);
    };
    const closeModal = () => {
        setAddModal(false);
        setEditModal(false);
        setDeleteModal(false);
    };

    // Create category
    const handleSendAddCategory = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", newCategory.name);
        formData.append("description", newCategory.description);
        formData.append("image", newCategory.image);
        if (newCategory.pdf_file) formData.append("pdf_file", newCategory.pdf_file);
        closeModal();
        try {
            await axios.post(`${app_url}/api/categories/store`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            showAllCategories();
            setNewCategory({ name: "", image: "", description: "", pdf_file: null });
        } catch (error) {
            setErrors(error.response.data.errors);
            console.log(error);
        }
    };

    // Edit category
    const handleSendEditCategory = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", selectedCategory.name);
        formData.append("description", selectedCategory.description);
        if (selectedCategory.image instanceof File) {
            formData.append("image", selectedCategory.image);
        }
        if (selectedCategory.pdf_file instanceof File) {
            formData.append("pdf_file", selectedCategory.pdf_file);
        }
        closeModal();
        try {
            await axios.post(
                `${app_url}/api/categories/update/${selectedCategory.id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            showAllCategories();
            setSelectedCategory({ id: null, name: "", description: "", image: "", pdf_file: null });
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.errors);
        }
    };

    // Delete category
    const handleSendDeleteCategory = async (e) => {
        e.preventDefault();
        closeModal();
        try {
            await axios.delete(`${app_url}/api/categories/${selectedCategory.id}`);
            showAllCategories();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AdminLayout>
            <div className="mx-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in-up border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                        <TagIcon className="h-6 w-6 text-green-500" />
                        Categories
                    </h3>
                    <button
                        onClick={handleAddCategory}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <PlusIcon className="h-4 w-4 mr-1.5" />
                        Add New Category
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-xl overflow-hidden">
                        <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Image</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">PDF</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {categories.map((category, idx) => (
                                <tr
                                    key={category.id}
                                    className={`transition-colors duration-200 ${idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"} hover:bg-green-50 dark:hover:bg-green-900`}
                                >
                                    <td className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{idx + 1}</td>
                                    <td className="px-4 py-4 text-xs flex items-center font-semibold text-gray-600 dark:text-gray-300 tracking-wider">
                                        <TagIcon className="h-5 w-5 mr-2 text-green-400" />
                                        {category.name}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <img src={`${app_url}/storage/${category.image}`} alt="image category" className="h-8 w-10 object-cover object-center rounded" />
                                    </td>
                                    <td className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300">
                                        {category.pdf_file ? (
                                            <a href={`${app_url}/storage/${category.pdf_file}`} target="_blank" className="text-blue-600 underline">PDF</a>
                                        ) : (
                                            "No PDF"
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300">
                                        <div className="flex items-center">
                                            <button onClick={() => handleEditCategory(category)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors">
                                                <PencilIcon className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleDeleteCategory(category)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors">
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

            {/* Add Category Modal */}
            {addModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Add New Category</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white transition-colors">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            {errors && Object.entries(errors).map(([field, messages], index) => (
                                <div key={index} className="bg-red-100 text-red-700 p-2 rounded mb-1 text-sm">
                                    {messages.map((msg, i) => <p key={i}>{msg}</p>)}
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category Name</label>
                                <input type="text" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Enter category name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category Description</label>
                                <input type="text" value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Enter category description" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category Image</label>
                                <input type="file" accept="image/*" onChange={(e) => setNewCategory({ ...newCategory, image: e.target.files[0] })} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category PDF</label>
                                <input type="file" accept="application/pdf" onChange={(e) => setNewCategory({ ...newCategory, pdf_file: e.target.files[0] })} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button onClick={closeModal} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors">Cancel</button>
                                <button onClick={handleSendAddCategory} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Category Modal */}
            {editModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Edit Category</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white transition-colors">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category Name</label>
                                <input type="text" value={selectedCategory.name} onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Enter category name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category Description</label>
                                <input type="text" value={selectedCategory.description} onChange={(e) => setSelectedCategory({ ...selectedCategory, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Enter category description" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category Image</label>
                                <input type="file" accept="image/*" onChange={(e) => setSelectedCategory({ ...selectedCategory, image: e.target.files[0] })} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category PDF</label>
                                <input type="file" accept="application/pdf" onChange={(e) => setSelectedCategory({ ...selectedCategory, pdf_file: e.target.files[0] })} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                                {selectedCategory.pdf_file && typeof selectedCategory.pdf_file === "string" && (
                                    <a href={`${app_url}/storage/${selectedCategory.pdf_file}`} target="_blank" className="text-blue-600 underline mt-1 block">View Current PDF</a>
                                )}
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button onClick={closeModal} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors">Cancel</button>
                                <button onClick={handleSendEditCategory} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Category Modal */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Delete Category</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white transition-colors">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h2 className="text-sm text-gray-800 dark:text-gray-200">Are you sure you want to delete <strong>{selectedCategory.name}</strong>?</h2>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button onClick={closeModal} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors">Cancel</button>
                                <button onClick={handleSendDeleteCategory} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
