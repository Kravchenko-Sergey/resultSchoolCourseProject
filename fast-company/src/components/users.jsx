import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css"
import api from "../api"
import declOfNum from "../declOfNum";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers(prevState=>prevState.filter(user => user !== userId))
    }
    const renderPhrase = () => {
        return <div className="badge bg-primary fs-4">
            {`${users.length} ${declOfNum(users.length, [
                "человек тусанет",
                "человека тусанут",
                "человек тусанет",
            ])} с тобой сегодня`
        }
        </div>
    }
    
    return users.length !== 0 ? (
        <>  
            <div className="badge bg-primary">
                {renderPhrase()}
            </div>        
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key = {user._id}>
                            <td>{user.name}</td>
                            <td>
                                {user.qualities.map((qualities) => (
                                    <span
                                        key = {qualities._id}
                                        className = {`badge bg-${qualities.color} m-1`}
                                    >
                                        {qualities.name}
                                    </span>
                                ))}
                            </td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate} / 5</td>
                            <td>
                                <button
                                    className = "btn btn-danger"
                                    onClick = {() => handleDelete(user)}
                                >
                                    delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    ) : <div className="badge bg-danger fs-4">
            Никто с тобой не тусанет
        </div>   
}

export default Users