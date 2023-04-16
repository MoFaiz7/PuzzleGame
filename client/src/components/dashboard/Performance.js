import React, { useEffect, useState } from 'react'
import "./Performance.css";
import axios from 'axios'

const Performance = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetch = async () => {

            try {
                let res = await axios({
                    method: 'get',
                    url: '/api/admin/getAllData'
                });

                let data = res.data;
                setData(data);
                // console.log(data);

            } catch (error) {
                console.log(error.response); // this is the main part. Use the response property from the error object

                return error.response;
            }
        }
        fetch();
    }, [])

    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>_ID</th>
                            <th>USERNAME</th>
                            <th>LEVEL</th>
                            <th>TOTAL TIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(function(item, i){
                            // console.log(item);
                        return (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>{item.levelsDone}</td>
                                <td>{item.time}</td>
                            </tr>
                        );
})}
                        
                    </tbody>
                </table>

                {/* <blockquote> Responsive Table </blockquote> */}
            </div>
        </div>
    )
}

export default Performance