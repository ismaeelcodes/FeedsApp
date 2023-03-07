import React, { useState } from 'react'
import styled from 'styled-components'
import { UilArrowUp } from '@iconscout/react-unicons'
import { UilCalender } from '@iconscout/react-unicons'

const ArticleCont = styled.div`
 border-radius: 5px;
 background: #393053;
 display: flex;
 flex-direction: column;
 align-items: center;
 padding: 10px;
 margin-top: 2rem;
 width: 640px;
 height: 616px;
 box-shadow: 10px 10px 30px;`
const Title = styled.h3`
 color: white;
 font-size: 1.5rem;
`
const Link = styled.div`
 margin: 0.2rem 0 0 0.5rem;
`

const Upvotes = styled.span`
 color: white;
 font-weight: 700;
 margin-top: 0.5rem;
 position: relative;
 top: 25px;
 left: 250px;
`

const ArticleMeta = styled.div`
 display: flex;
 align-items: center;
 margin-top: 1rem;
 flex-direction: column;
 
`

const ArticleInfo = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 margin-top: 2rem;
 background: #271f3d;
 width: 100%;
 height: 100%;
 border-radius: 10px;
 overflow: hidden;
`
const IMG = styled.img`
 margin-right: 0rem;
 height: 100%;
 max-width: 400px;
 
`

const GMTDate = styled.span`
 color: white;
 font-weight: 700;
 position: relative;
 right: 200px;
`

function Post(props) {
  let postData = props.post.data
   let [epoch, setEpoch] = useState(postData.created * 1000)
   
   let date = new Date(epoch);
  let gmt5Time = date.toLocaleString()
 
  

    return (

    <ArticleCont>
     <ArticleMeta>
      <Title>{postData.title} </Title>
     <Link>
      <a href={'https://www.reddit.com' + postData.permalink} target="_blank">Link to the post!</a>
      </Link>
      <Upvotes><UilArrowUp style={{position: 'relative', top: '5px'}}/> {postData.ups}</Upvotes>
      <GMTDate><UilCalender style={{position: 'relative', top: '5px'}}/> {gmt5Time}</GMTDate>
      </ArticleMeta> 
      <ArticleInfo>
      
      {postData.preview ? postData.preview.images ? postData.is_video ? <video>
        <source src={postData.secure_media.reddit_video.scrubber_media_url} type="video/mp4" />
        Video
      </video> : <IMG src={postData.url}/> : '' : ''}
      </ArticleInfo>
    </ArticleCont>
  )
}

export default Post