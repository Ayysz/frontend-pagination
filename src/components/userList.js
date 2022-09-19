import React, {useState, useEffect} from 'react'
import axios from 'axios'

const userList = () => {
  return (
    <div className="container mt-5">
        <div className="columns">
            <div className="column is-centered"> {/* column centered start */}
                <form>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input type="text" className="input" placeholder="Find Something here" />
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
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            </div> {/* column centered end */}
        </div>
    </div>
  )
}

export default userList