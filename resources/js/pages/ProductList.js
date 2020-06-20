import React, { useState, useCallback, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import Table from "../components/Table";
import axios from "axios";

export default function ProductList(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = React.useState(false);
    const [pageCount, setPageCount] = React.useState(0);
    const fetchIdRef = React.useRef(0);

    async function getProducts({ count, page, term }) {
        const { data } = await axios.get(
            `/api/products?count=${count}&page=${page}&term=${term || ""}`
        );

        return {
            ...data,
            data: data.data.map(i => ({
                ...i,
                image: (
                    <img style={{ width: 40 }} src={JSON.parse(i.image)[0]} />
                ),
                category: JSON.parse(i.category)[0],
                is_active: i.is_active ? (
                    <span className="badge badge-success">yes</span>
                ) : (
                    <span className="badge badge-danger">no</span>
                ),
                actions: (
                    <BsSearch
                        style={{ cursor: "pointer" }}
                        onClick={() => props.history.push(`/products/${i.id}`)}
                    />
                )
            }))
        };
    }

    const fetchData = useCallback(({ pageSize, pageIndex, searchTerm }) => {
        const fetchId = ++fetchIdRef.current;

        setLoading(true);

        (async () => {
            const products = await getProducts({
                count: pageSize,
                page: pageIndex + 1,
                term: searchTerm
            });

            setData(products.data);
            setPageCount(products.total);
        })();

        setLoading(false);
    }, []);

    useEffect(() => {
        (async () => {
            const res = await getProducts({ count: 10, page: 1 });
            setData(res.data);
        })();
    }, []);

    return (
        data && (
            <div className="container">
                <div>
                    <h3>Product List</h3>
                    <button className="btn btn-success">Add Product</button>
                </div>
                <Table
                    TheadComponent={_ => null}
                    data={data}
                    fetchData={fetchData}
                    loading={loading}
                    pageCount={pageCount}
                    columns={[
                        {
                            Header: "ID",
                            accessor: "id"
                        },
                        {
                            Header: "Image",
                            accessor: "image"
                        },
                        {
                            Header: "Ref",
                            accessor: "ref"
                        },
                        {
                            Header: "Name",
                            accessor: "name"
                        },
                        {
                            Header: "Category",
                            accessor: "category"
                        },
                        {
                            Header: "Price HT",
                            accessor: "price_ht"
                        },
                        {
                            Header: "Quantity",
                            accessor: "quantity"
                        },
                        {
                            Header: "Active",
                            accessor: "is_active"
                        },
                        {
                            Header: "Actions",
                            accessor: "actions"
                        }
                    ]}
                />
            </div>
        )
    );
}
