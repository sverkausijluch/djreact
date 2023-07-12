import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom"

class Main extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			articles: [],
			cats: [],
		}
		this.selectCat = this.selectCat.bind(this)
		this.getArticles = this.getArticles.bind(this)
	}

	componentDidMount() {
		this.getArticles(0)
		axios.get(window.location.origin + '/api/get-cats').then(res => {
			let cats = res.data
			this.setState({
				cats: cats
			})
		})
	}

	selectCat = (e) => {
		document.querySelectorAll('.active').forEach(el=>el.classList.remove('active'))
		e.target.classList.add('active')
		let cat_id = e.target.getAttribute('data-id')
		this.getArticles(cat_id)
	}

	getArticles = (cat_id) => {
		axios.get(window.location.origin + '/api/article-list/'+cat_id).then(res => {
			let articles = res.data
			this.setState({
				articles: articles
			})
		})
	}
	render() {
		return (
			<>
				<ul className="cats">
					<li onClick={this.selectCat} data-id="0">Все</li>
				{this.state.cats.map((cat, index) => {
					return (
						<li onClick={this.selectCat} data-id={cat.id} key={cat.id}>{cat.name}</li>
					)
				})}
				</ul>
				{this.state.articles.map((article, index) => {
					return (
						<div className="article-block" key={index}>
							{article.cover ? (<img src={article.cover} className="article-cover"/>) : ''}
							<Link to={"/" + article.id}><h2>{article.title}</h2></Link>
							<p>{article.description}</p>
						</div>
					)
				})}
			</>
		)
	}
}

export default Main
