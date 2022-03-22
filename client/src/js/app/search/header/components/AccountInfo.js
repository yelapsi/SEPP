import './SearchHeader.pcss';
import React from 'react';
import Helpers from "../../../../utils/Helpers";
import {Button} from "react-bootstrap";
import { Link } from 'react-router-dom';

const AccountInfo = function({userId, groupId, isManager}) {
    return (
        <div className="AccountInfo">
            
            <p className="userId">User id: {userId}
                {isManager
                    ?<Button variant="light" className="resetGroupButton" bssize="xs" href={process.env.REACT_APP_PUBLIC_URL + "/loguiData/!#"}>LogUI</Button>
                    :""
                }
            </p>
            
        </div>
    )
};

export default AccountInfo;
