import React, { useState } from 'react'
import styled from 'styled-components'
import { UilArrowUp } from '@iconscout/react-unicons'
import { UilCalender } from '@iconscout/react-unicons'
import Thumbnail from '../Untitled.png'

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
 height: 432px;
 width: 432px;
 
`

const ThumbnailIMG = styled.img`
 margin-right: 0rem;
 height: 432px;
 width: 432px;
 
 &:hover{
  
  box-shadow: 0px 0px 10px white;
 }
`

const GMTDate = styled.span`
 color: white;
 font-weight: 700;
 position: relative;
 right: 200px;
`

const Span = styled.span`
 fontSize: 1rem; 
 color: white;
 textWrap: wrap;
 width: 500px;
 height: 100%;
 margin-top: 1rem;
`

function Post(props) {
  let postData = props.post.data
   let [epoch, setEpoch] = useState(postData.created * 1000)
   let [showVideo, setShowVideo] = useState(false)
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
      
      
{postData.preview && postData.preview.images && postData.is_video ? (
  showVideo ? (
    <video controls width="432px" height="432px">
      <source src={postData.media.reddit_video.fallback_url} type="video/mp4" />
      Video
    </video>
  ) : (
    <ThumbnailIMG
      src={Thumbnail}
      alt="Video Thumbnail"
      onClick={() => setShowVideo(true)}
      style={{ cursor: 'pointer' }}
    />
  )
) : postData.url ? (
  <IMG src={postData.url} alt="Embed Image" />
) : (
  postData.selftext ? (
    <Span>
      {postData.selftext.length < 1000
        ? postData.selftext
        : postData.selftext.substring(0, 1000) + '...'}
    </Span>
  ) : (
    <span style={{ color: 'white', fontWeight: '700' }}>No Description</span>
  ))}

      
      </ArticleInfo>
    </ArticleCont>
  )
}

export default Post