import React, {StrictMode} from "react";
import {
    createRoot
} from "react-dom/client";
import App from "./src/app";

// 全局样式
import './App.scss'

// antd 样式 及 主题
import './App.less'
import './Theme.less'

// 国际化
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from "antd";

// 初始化
const app =  document.getElementById("app")
const root = createRoot(app!)

root.render(
    <StrictMode>
        <ConfigProvider locale={zhCN}>
            <App />
        </ConfigProvider>
    </StrictMode>
)
