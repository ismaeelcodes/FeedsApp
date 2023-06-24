import React, { useState } from 'react';
import styled from 'styled-components';
import { UilArrowUp } from '@iconscout/react-unicons';
import { UilCalender } from '@iconscout/react-unicons';
import Thumbnail from '../VidThumbnail.png';
import GifThumbnail from '../GifThumbnail.png'


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
  box-shadow: 10px 10px 30px;
`;

const Title = styled.h3`
  color: white;
  font-size: 1.5rem;
`;

const Link = styled.div`
  margin: 0.2rem 0 0 0.5rem;
`;

const Upvotes = styled.span`
  color: white;
  font-weight: 700;
  margin-top: 0.5rem;
  position: relative;
  top: 25px;
  left: 250px;
`;

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  flex-direction: column;
`;

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
`;

const IMG = styled.img`
  margin-right: 0rem;
  height: 432px;
  width: 432px;
 
  
`;

const GIF = styled.img`
margin-right: 0rem;
height: 432px;
width: 432px;


&:hover {
  box-shadow: 0px 0px 10px white;
}
`

const ThumbnailIMG = styled.img`
  margin-right: 0rem;
  height: 432px;
  width: 432px;
  
  &:hover {
    box-shadow: 0px 0px 10px white;
  }
`;

const GMTDate = styled.span`
  color: white;
  font-weight: 700;
  position: relative;
  right: 200px;
`;

const Span = styled.span`
  font-size: 1rem;
  color: white;
  text-wrap: wrap;
  width: 500px;
  height: 100%;
  margin-top: 1rem;
`;

const Video = styled.video`
margin-right: 0rem;
height: 432px;
width: 432px;

&:hover {
  box-shadow: 0px 0px 10px white;
}
`

function Post(props) {
  const postData = props.post.data;
  const [epoch, setEpoch] = useState(postData.created * 1000);
  const [showVideo, setShowVideo] = useState(false);
  const date = new Date(epoch);
  const gmt5Time = date.toLocaleString();

  const handleThumbnailClick = () => {
    setShowVideo(previousValue => !previousValue);
  };

  let mediaContent = null;

  if (
    postData.preview &&
    postData.preview.images &&
    postData.is_video &&
    showVideo
  ) {
    mediaContent = (
      <Video controls >
        <source
          src={postData.media.reddit_video.fallback_url}
          type="video/mp4"
        />
        Video
      </Video>
    );
  } else if (
    postData.preview &&
    postData.preview.images &&
    postData.is_video &&
    !showVideo
  ) {
    mediaContent = (
      <ThumbnailIMG
        src={Thumbnail}
        alt="Video Thumbnail"
        onClick={handleThumbnailClick}
        style={{ cursor: 'pointer' }}
      />
     
    );
  }  else if (postData.url && postData.url.match(/\.(gif|gifv|webp|webm)$/) && showVideo) 
    {
    mediaContent = (

      <GIF src={postData.url} alt='gif' onClick={handleThumbnailClick} />

    );
  } else if(postData.url && postData.url.match(/\.(gif|gifv|webp|webm)$/) && !showVideo){
    mediaContent = (
      <>
      <ThumbnailIMG
        src={GifThumbnail}
        alt="Gif Thumbnail"
        onClick={handleThumbnailClick}
        style={{ cursor: 'pointer' }}
      />
      </>
    );
  } else if (postData.url) {
    mediaContent = <IMG src={postData.url} alt={postData.title} />;
  } else if (postData.selftext) {
    mediaContent = (
      <Span>
        {postData.selftext.length < 1000
          ? postData.selftext
          : postData.selftext.substring(0, 1000) + '...'}
      </Span>
    );
  } else {
    mediaContent = <span style={{ color: 'white', fontWeight: '700' }}>No Description</span>;
  }

  return (
    <ArticleCont>
      <ArticleMeta>
        <Title>{postData.title}</Title>
        <Link>
          <a href={'https://www.reddit.com' + postData.permalink} target="_blank">
            Link to the post!
          </a>
        </Link>
        <Upvotes>
          <UilArrowUp style={{ position: 'relative', top: '5px' }} /> {postData.ups}
        </Upvotes>
        <GMTDate>
          <UilCalender style={{ position: 'relative', top: '5px' }} /> {gmt5Time}
        </GMTDate>
      </ArticleMeta>
      <ArticleInfo>
        {mediaContent}
      </ArticleInfo>
    </ArticleCont>
  );
}

export default Post;
