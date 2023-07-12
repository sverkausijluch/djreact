import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { Link } from "react-router-dom"
import CommentForm from "./CommentForm"

function Article() {
	const {article_id} = useParams()
	const [article, setArticle] = useState({comment:[]})
	const useMountEffect = () => {
		useEffect(() => {
			let get_article = axios.get(window.location.origin + '/api/article-retrieve/' + article_id).catch(function (error) {
				setArticle(0)
			})
			get_article.then(res => {
				let article = res.data
				setArticle(article)
			})
		}, [])
	}
	useMountEffect()
	return (
		<>
			{(() => {
				if (article == 0) {
					return (
						<>
							<h2>Статья не найдена</h2>
							<Link to="../">назад</Link>
						</>
					)
				} else {
					return (
						<article>
							<Link to="../">{"<-"}</Link>
							<h1>{article.title}</h1>
							<small>{article.created_at}</small>
							{article.cover?(<img src={article.cover} className="article-cover" />):''}
							<p className="article-text">{article.text}</p>
							<h3>Комментарии</h3>
							{article.comment.length==0?'комментариев пока что нет':''}
							{article.comment.map((c, i) => {
								return (
									<div className="comment" key={i}>
										<p>
											<h3>{c.author_name}:</h3> {c.text}
										</p>
										<small>{c.created_at}</small>
									</div>
								)
							})}
							<CommentForm article_id={article.id} />
						</article>
					)
				}
			})()}
		</>
	)
}

export default Article
