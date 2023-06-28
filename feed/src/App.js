import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Post from './components/Post';
import ScrollToTop from "react-scroll-to-top";


const Cont = styled.div`
  width: 100vw;
  height: 100%;
  background-color: #0d0a1a;
`

const Header = styled.nav`
 background-color: #443C68;
 height: 5rem;
 box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
 display: flex;
 justify-content: center;
 align-items: center;

`

const Span = styled.span`
  color: white;
  font-size: 2rem;
  margin-right: 0.5rem;
  font-weight: 700;
`

const SubredditInfo = styled.input`
 background: #635985;
 padding: 1rem;
 font-size: 2rem;
 color: white;
 border: none;
 outline: none;
 font-weight: 700;
 border-radius: 5px;
`

const Feed = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
`

const Loadbutton = styled.button`
 margin-top: 2rem;
 padding: 10px 200px;
 margin-bottom: 2rem;
`





function App() {
  const [posts, setPosts] = useState([])
  const [input, setInput] = useState('memes')
  const [postCount, setPostCount] = useState(20)

  useEffect(function(){
    fetch(`https://feeds-app.vercel.app/api/redditProxy?subreddit=${input}&limit=${postCount}`).then(res => {
      if (res.status !== 200){
        
        return
      }

      res.json().then(data => {
        if(data != null){
          setPosts(data.data.children)
          console.log(data.data.children)
        }
      })
    })
  }, [input, postCount])

  function increaseCount(){
    setPostCount(prevCount => prevCount + 20)
  }

  return (
    <Cont>
      <Header> 
        <Span>r/</Span>
        <SubredditInfo value={input} onChange={e => setInput(e.target.value)}/>
      </Header>
      <Feed>
      {
          posts != null ? posts.map((post, index) => <Post key={index} post={post}/>) : ''
        }
        <Loadbutton onClick={() => increaseCount()}>Load More</Loadbutton>
        </Feed>
        
        <ScrollToTop smooth/>
    </Cont>
  );
}

export default App;
