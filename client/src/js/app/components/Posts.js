import React from 'react'
import ClassClick from './ClassClick';
import '../App.css';

const Posts = ({posts, loading, config}) => {
    if (loading) {
        return <h2>Loading..</h2>;
    }

    console.log("posts.num: " + posts.length);

    return (
        <table>
            <tr>
                <th>#</th>
                <th>User Id</th>
                <th>Type</th>
                <th>Tracking Type</th>
                <th>Details</th>
                <th>Timestamp</th>
            </tr>
            {posts.map(post => (
                <tr>
                    <td>{post['id']}</td>
                    <td>{post['user_id']}</td>
                    <td>{post['type']}</td>
                    <td>{post['tracking_type']}</td>
                    <td>{JSON.stringify(post['details'])}</td>
                    <td>{post['time_stamp']}</td>
                </tr>
            ))}
        </table>
    )
}

export default Posts