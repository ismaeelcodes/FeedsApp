import React, { useState } from 'react'
import styled from 'styled-components'

const ArticleCont = styled.div`
 border-radius: 5px;
 background: #393053;
 display: flex;
 flex-direction: column;
 align-items: center;
 padding: 10px;
 margin-top: 2rem;
 box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`
const Title = styled.h3`
 color: white;
 font-size: 1rem;
`
const Link = styled.div`
 margin: 0.2rem 0 0 0.5rem;
`

const Upvotes = styled.span`
 color: white;
 font-weight: 700;

`

const ArticleMeta = styled.div`
 display: flex;
 align-items: center;
 margin-top: 1rem;
`

const ArticleInfo = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 margin-top: 1rem;
`
const IMG = styled.img`
 margin-right: 0rem;
 height: 250px;
 width: 250px;
 margin-top: 1rem;
`

const GMTDate = styled.span`
 color: white;
 font-weight: 700;
`
const URL = styled.span`
 color: white;
 margin-right: 3rem;
 font-weight: 700;
`

function Post(props) {
   
   let [epoch, setEpoch] = useState(props.post.data.created * 1000)

   let date = new Date(epoch);
  let gmt5Time = date.toLocaleString()
  

    return (

    <ArticleCont>
     <ArticleMeta>
      <Title>{props.post.data.title} || </Title>
     <Link>
      <a href={'https://www.reddit.com' + props.post.data.permalink} target="_blank">Link to the post!</a>
      </Link>
      </ArticleMeta> 
      <ArticleInfo>
      <Upvotes>Upvotes : {props.post.data.ups}</Upvotes>
      <GMTDate>Date : {gmt5Time}</GMTDate>
      <IMG src={props.post.data.url}/>
      </ArticleInfo>
    </ArticleCont>
  )
}

export default Post