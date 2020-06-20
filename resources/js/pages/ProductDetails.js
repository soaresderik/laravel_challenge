import React, { useEffect, useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BsImages } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";

export default function ProductDetails({ match }) {
    const [product, setProduct] = useState(null);

    const updateProduct = e => {
        if (e.target.name === "category") {
            setProduct({
                ...product,
                category: product.category.includes(e.target.value)
                    ? product.category.filter(i => i !== e.target.value)
                    : [...product.category, e.target.value]
            });
        } else if (e.target.name === "is_active") {
            setProduct({
                ...product,
                is_active: !product.is_active
            });
        } else {
            setProduct({
                ...product,
                [e.target.name]: e.target.value
            });
        }
    };

    function handleDescription(data) {
        setProduct({
            ...product,
            description: data
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { data, status } = await axios.put(
            `/api/products/${product.id}`,
            { ...product },
            {
                validateStatus: () => true
            }
        );

        if (status === 400) {
            Object.values(data).forEach(i => {
                toast.error(i[0]);
            });
            return;
        }

        if (status === 500) {
            toast.error("Occurred an internal error");
            return;
        }

        toast.success("Update was succeed");
    }

    useEffect(() => {
        (async function() {
            const { data } = await axios.get(
                `/api/products/${match.params.id}`
            );
            setProduct({
                ...data,
                category: JSON.parse(data.category)
            });
        })();
    }, []);

    return (
        product && (
            <div className="container row">
                <div className="col-8">
                    <a href="#/products">Voltar</a>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Images</h4>
                            <div className="row mx-1">
                                <label
                                    className="mx-1 text-center d-flex justify-content-center align-items-center"
                                    style={{
                                        margin: 0,
                                        border: "1px dashed #ddd",
                                        width: 80,
                                        backgroundColor: "#c3c3c3",
                                        backgroundSize: "cover",
                                        cursor: "pointer"
                                    }}
                                    alt="Adicionar Imagem"
                                >
                                    {" "}
                                    <input
                                        style={{ display: "none", width: 100 }}
                                        type="file"
                                    />
                                    <BsImages style={{ fontSize: 20 }} />
                                </label>
                                {product.image &&
                                    JSON.parse(product.image).map((i, idx) => (
                                        <img
                                            key={idx}
                                            className="img-fluid mx-1"
                                            style={{ width: 80 }}
                                            src={i}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className="card my-3">
                        <div className="card-body">
                            <h4>Resume</h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Ea natus nemo doloremque quod,
                                explicabo exercitationem vitae aperiam culpa
                                praesentium!
                            </p>
                        </div>
                    </div>

                    <div className="card my-3">
                        <div className="card-body">
                            <h4>Description</h4>
                            <CKEditor
                                editor={ClassicEditor}
                                data={product.description}
                                onChange={(event, editor) => {
                                    handleDescription(editor.getData());
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-4 mt-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="form-group">
                                <label className="h4">Reference</label>
                                <input
                                    className="form-control"
                                    value={product.ref}
                                    name="ref"
                                    onChange={updateProduct}
                                />
                            </div>

                            <div className="form-group">
                                <label className="h4">Quantity</label>
                                <input
                                    className="form-control"
                                    value={product.quantity}
                                    name="quantity"
                                    onChange={updateProduct}
                                />
                            </div>

                            <div className="form-group">
                                <label className="h4">Price</label>
                                <div className="form-row">
                                    <div className="col">
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                aria-label="Amount (to the nearest dollar)"
                                                value={product.price_ht}
                                                name="price_ht"
                                                onChange={updateProduct}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    $
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={product.price_ttc}
                                                name="price_ttc"
                                                onChange={updateProduct}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    $
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card card-body">
                                <div className="form-group">
                                    <label className="h4">Category</label>
                                    {[
                                        "eshop",
                                        "shoes",
                                        "sweaters",
                                        "t-shirt",
                                        "tops",
                                        "bags"
                                    ].map((i, idx) => (
                                        <div key={idx} className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={i}
                                                name="category"
                                                onChange={updateProduct}
                                                id={`cat-option-${idx + 1}`}
                                                checked={product.category.includes(
                                                    i
                                                )}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={`cat-option-${idx +
                                                    1}`}
                                            >
                                                {i}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group mt-4">
                                <label className="h4">Is Active?</label>
                                <div className="custom-control custom-switch">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customSwitch1"
                                        name="is_active"
                                        value="1"
                                        onChange={updateProduct}
                                        checked={product.is_active}
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="customSwitch1"
                                    ></label>
                                </div>
                            </div>

                            <button
                                className="btn btn-block btn-success"
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
