import React, {useState} from 'react'
import './Admindash.css'
import Pushlvl from './Pushlvl'
import Performance from './Performance'


const Admindash = ({ user }) => {

    const [pageinfo, setPageinfo] = useState({
        push:false,
        info: false,
    })

    const pushlevel = () => {
        setPageinfo({
            push:true,
            info: false,
        })
    }

    const showData = () => {
        setPageinfo({
            push:false,
            info: true,
        })
    }

    return (
        <div className='marginl'>
            {(pageinfo.push===false && pageinfo.info===false) ? <><div><span className='admin_text'><span style={{ color: "#0099ff" }}>hello, </span> admin welcome to the PuZzLe Game Database Panel.</span></div>
            <i className="material-icons">code</i>
            <span className='admin_text2'> You <span style={{ color: "#0099ff" }}>can </span>perform following operations on the database.</span>
            <div className="">

                <button
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    onClick={pushlevel}
                    className="btn btn-large waves-effect waves-light hoverable red accent-3"
                >
                    Push_Level
                </button>
                <br />
                <button
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    onClick={showData}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                    Leaderboard
                </button>
                <br />
                <button
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable red accent-3"
                >
                    Get_User
                </button>

            </div></>:""}
            {pageinfo.push===true && pageinfo.info===false ? <Pushlvl /> : ""}
            {pageinfo.push===false && pageinfo.info===true ? <Performance /> : ""}
        </div>
    )
}

export default Admindash