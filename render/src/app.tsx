import { App } from "electron";
import React from "react";

import {Button, DatePicker} from 'antd';

export default function App() {
    return (
        <div id="app">
            <DatePicker/>

            <Button type="default" disabled={true}>hello world!</Button>
        </div>
    );
}
