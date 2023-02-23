import React, { useState } from 'react'
import styled from 'styled-components'

const ArticleCont = styled.div`
 height: 7rem;
 background: #393053;
 display: flex;
 align-items: center;
 justify-content: space-between;
 margin-top: 2rem;
 
`
const Title = styled.h3`
 color: white;
 margin-left: 3rem;
 font-size: 1rem;
`
const Link = styled.div`
 margin: 0.2rem 0 0 0.5rem;
`

const Upvotes = styled.span`
 color: white;
 font-weight: 700;
 margin-right: 3rem;
`

const ArticleMeta = styled.div`
 display: flex;
`

const ArticleInfo = styled.div`
 display: flex;
 flex-direction: column;
`

const GMTDate = styled.span`
 color: white;
 margin-right: 3rem;
 font-weight: 700;
`
const URL = styled.span`
 color: white;
 margin-right: 3rem;
 font-weight: 700;
`

function Post(props) {
   
   let [epoch, setEpoch] = useState(props.post.data.created_utc * 1000)

   let date = new Date(epoch);
  let gmt5Time = date.toLocaleString("en-US", {
    timeZone: "Asia/Karachi",
  });

  

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
      <img src={props.post.data.url} width='100'/>
      </ArticleInfo>
    </ArticleCont>
  )
}

export default Post