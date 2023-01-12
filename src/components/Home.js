import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios"

const Home = () => {
    const [data, setData] = useState([]);

    const [pageData, setPageData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const getdata = async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setData(response.data)
    }

    useEffect(() => {
        getdata();

        if (page) {
            const pagecount = Math.ceil(data.length / 4);
            setPageCount(pagecount);

            const LIMIT = 5

            const skip = LIMIT * page
            const dataskip = data.slice(page === 1 ? 0 : skip - LIMIT, skip);

            setPageData(dataskip)
        }

    }, [data])

    // handle next
    const handleNext = () => {
        if (page === pageCount) return page;
        setPage(page + 1)
    }

    // handle previous
    const handlePrevious = () => {
        if (page === 1) return page;
        setPage(page - 1)
    }

    return (
        <>
            <div className='container'>
                <h1>User Data</h1>

                <div className='table_div'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>title</th>
                                <th>body</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pageData.length > 0 ?
                                    pageData.map((element, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{element.id}</td>
                                                    <td>{element.title}</td>
                                                    <td>{element.body}</td>

                                                </tr>
                                            </>
                                        )
                                    })
                                    : <div className='d-flex justify-content-center mt-4'>
                                        Loading... &nbsp;&nbsp;&nbsp; <Spinner animation="border" variant="danger" />
                                    </div>
                            }
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.Prev onClick={handlePrevious} />
                        {
                            Array(pageCount).fill(null).map((el, index) => {
                                return (
                                    <>
                                        <Pagination.Item active={page === index + 1 ? true : false} onClick={() => setPage(index + 1)}>{index + 1}</Pagination.Item>
                                    </>
                                )
                            })
                        }
                        <Pagination.Next onClick={handleNext} />
                    </Pagination>
                </div>
            </div>
        </>
    )
}

export default Home