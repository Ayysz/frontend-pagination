import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimits] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeywords] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");

    // use effect for render react app
    useEffect(() => {
        getUsers();
    },[page, keyword]);

    // hit api with axios
    const getUsers = async() => {
        const response = await axios.get(`http://localhost:3030/users?search=${keyword}&page=${page}&limit=${limit}`);
        setUsers(response.data.datas);
        setPage(response.data.page);
        setPages(response.data.totalPages);
        setRows(response.data.totalRows);
        // console.log(response.data.datas);
    };

    const changePage = ({ selected }) => {
        setPage(selected);
        selected === 9 ? 
            setMsg("Jika data yang dicari tidak ditemukan, silahkan cari dengan kata kunci spesifik!") : 
            setMsg("") ;
    };

    const searchData = (e) => {
        e.preventDefault();
        setPage(0);
        setKeywords(query);
    };

  return (
    <div className="container mt-5">
        <div className="columns">
            <div className="column is-centered"> {/* column centered start */}
                <form onSubmit={searchData}>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input type="text" className="input" placeholder="Find Something here" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <div className="control">
                            <button type="submit" className="button is-info">Search</button>
                        </div>
                    </div>
                </form>
            <table className="table is-striped is-bordered is-fullwidth mt-2"> {/* table start */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Total Rows :{rows} Page :{rows ? page + 1 : 0} of {pages}</p>
            <p className='has-text-centered has-text-danger mb-2'>{msg}</p>
            <nav className="pagination is-centered" 
                 role="navigation"
                 aria-label="pagination"
                 key={rows}
                 >
                    <ReactPaginate
                        previousLabel={"< Prev"}
                        nextLabel={"Next >"}
                        pageCount={Math.min(10, pages)}
                        onPageChange={changePage}
                        containerClassName={"pagination-list"}
                        pageLinkClassName={"pagination-link"}
                        previousLinkClassName={"pagination-previous"}
                        nextLinkClassName={"pagination-next"}
                        activeLinkClassName={"pagination-link is-current"}
                        disabledLinkClassName={"pagination-link is-disabled"}
                    />
            </nav>
            </div> {/* column centered end */}
        </div>
    </div>
  )
}

export default UserList