import React, { Component } from 'react'
import { render } from "react-dom"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from "./components/Main"
import Article from "./components/Article"
import './App.css'


class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.StrictMode>
                <BrowserRouter>
                    <Routes>
                        <Route path="" element={<Main/>}/>
                        <Route path=":article_id" element={<Article/>}/>
                    </Routes>
                </BrowserRouter>
            </React.StrictMode>
        )
    }
}

export default App;

const container = document.getElementById("app");
render(<App />, container)