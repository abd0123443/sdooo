import React, { useState, useEffect } from "react";
import AdminLayout from "../layout";
import axios from "axios";
import { usePage } from "@inertiajs/react";
import {
    XMarkIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

export default function ProductsIndex() {
    const { app_url } = usePage().props;
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({
        title: "",
        description: "",
        image: "",
        category_id: "",
    });

    const showAllCategories = async () => {
        try {
            const response = await axios.get(
                `${app_url}/api/categories/list`
            );
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    // get all products
    const showAllProducts = async () => {
        try {
            const response = await axios.get(
                `${app_url}/api/products`
            );
            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        showAllProducts();
        showAllCategories();
    }, []);

    // Open modals
    const handleAddProduct = () => {
        setAddModal(true);
        showAllCategories();
    };
    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setEditModal(true);
    };
    const handleDeleteProduct = (product) => {
        setSelectedProduct(product);
        setDeleteModal(true);
    };
    const closeModal = () => {
        setAddModal(false);
        setEditModal(false);
        setDeleteModal(false);
        setErrors({});
    };

    // Add Product
    const handleSaveAddProduct = async () => {
        const formData = new FormData();
        Object.keys(newProduct).forEach((key) =>
            formData.append(key, newProduct[key])
        );
        try {
            await axios.post(`${app_url}/api/products`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            closeModal();
            showAllProducts();
            setNewProduct({
                title: "",
                description: "",
                image: "",
                category_id: "",
            });
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

    // Edit Product
    const handleSaveEditProduct = async () => {
        const formData = new FormData();
        Object.keys(selectedProduct).forEach((key) =>
            formData.append(key, selectedProduct[key])
        );
        try {
            await axios.post(
                `${app_url}/api/products/${selectedProduct.id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            closeModal();
            showAllProducts();
            setSelectedProduct(null);
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
        }
    };

    // Delete Product
    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(
                `${app_url}/api/products/${selectedProduct.id}`
            );
            closeModal();
            showAllProducts();
            setSelectedProduct(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="mx-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Products
                    </h3>
                    <button
                        onClick={handleAddProduct}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <PlusIcon className="h-4 w-4 mr-1.5" />
                        Add Product
                    </button>
                </div>

<div className="overflow-x-auto">
    <table className="min-w-full table-fixed">
        <colgroup>
            <col className="w-16" />
            <col className="w-1/5" />
            <col className="w-2/5" />
            <col className="w-1/5" />
            <col className="w-32" />
            <col className="w-32" />
        </colgroup>
        <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
            <tr>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">category</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Image</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">action</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {products.map((product, idx) => (
                <tr
                    key={product.id}
                    className={`transition-colors duration-200 ${
                        idx % 2 === 0
                            ? "bg-white dark:bg-gray-800"
                            : "bg-gray-50 dark:bg-gray-700"
                    } hover:bg-green-50 dark:hover:bg-green-900`}
                >
                    <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">
                        {idx + 1}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">
                        {product.title}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">
                        {product.description}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">
                        {product.category.name}
                    </td>
                    <td className="px-4 py-3 text-right">
                        <img
                            src={`${app_url}/storage/${product.image}`}
                            alt="Product"
                            className="h-8 w-10 object-cover rounded mx-auto"
                        />
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 text-center">
                        <div className="flex justify-center space-x-2">
                            <button
                                onClick={() => handleEditProduct(product)}
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                            >
                                <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => handleDeleteProduct(product)}
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

                {/* Add Product Modal */}
                {addModal && (
                    <ProductModal
                        title="Add Product"
                        product={newProduct}
                        setProduct={setNewProduct}
                        handleSave={handleSaveAddProduct}
                        closeModal={closeModal}
                        errors={errors}
                        categories={categories}
                    />
                )}

                {/* Edit Product Modal */}
                {editModal && (
                    <ProductModal
                        title="Edit Product"
                        product={selectedProduct}
                        setProduct={setSelectedProduct}
                        handleSave={handleSaveEditProduct}
                        closeModal={closeModal}
                        errors={errors}
                        categories={categories}
                    />
                )}

                {/* Delete Product Modal */}
                {deleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                    Are you sure you want to delete this
                                    product?
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 dark:text-gray-300"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="p-6 flex gap-3">
                                <button
                                    onClick={closeModal}
                                    className="flex-1 px-4 py-2 bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

// Modal Component
function ProductModal({
    title,
    categories,
    product,
    setProduct,
    handleSave,
    closeModal,
    errors,
}) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 overflow-y-auto max-h-[90vh] rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {title}
                    </h3>
                    <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-600 dark:text-gray-300"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {[
                    "title",
                    "description",
                ].map((field, i) => (
                    <div key={i}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {field.replace("_", " ")}
                        </label>
                        <input
                            type="text"
                            value={product[field]}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    [field]: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                ))}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        category
                    </label>
                    <select
                        name="category_id"
                        id="category_id"
                        value={product.category_id}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                category_id: e.target.value,
                            })
                        }
                        className="w-full pr-10 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none text-right"
                    >
                        <option disabled value="">
                            chosse category
                        </option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setProduct({ ...product, image: e.target.files[0] })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                {errors &&
                    Object.entries(errors).map(([field, msgs], i) => (
                        <div
                            key={i}
                            className="bg-red-100 text-red-700 p-2 rounded mb-1 text-sm"
                        >
                            {msgs.map((msg, j) => (
                                <p key={j}>{msg}</p>
                            ))}
                        </div>
                    ))}
                <div className="flex gap-3 pt-4">
                    <button
                        onClick={closeModal}
                        className="flex-1 px-4 py-2 bg-gray-100 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
