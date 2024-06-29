import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Post from './components/Post';
import ScrollToTop from "react-scroll-to-top";


const Cont = styled.div`
  width: 100vw;
  height: 100%;
  background-color: #0d0a1a;
`

const mySortTop = styled.button`
 margin-top: 2rem;
 padding: 10px 200px;
 margin-bottom: 2rem;
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
  const [top, setTop] = useState(false)

  useEffect(() => {
    // Declare a timer variable to hold the timeout ID
    let timer;
  
    // Function to fetch posts
    const fetchPosts = async () => {
      const url = `http://pnode3.danbot.host:2520/api/posts/${input}/${postCount}${top ? '/top' : ''}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle error state or retry logic if needed
      }
    };
  
    // Start a timer to delay fetching posts after input changes
    timer = setTimeout(() => {
      fetchPosts();
    }, 1500); // 3000 milliseconds = 3 seconds
  
    // Cleanup function to clear the timer if input changes before the timeout completes
    return () => clearTimeout(timer);
  
  }, [input, postCount, top]); // Depend on input, postCount, and top

  function increaseCount(){
    setPostCount(prevCount => prevCount + 20)
  }

  function decreaseCount(){
    setPostCount(prevCount => prevCount > 20 ? prevCount - 20 : prevCount)
  }

  function toggleTop(){
    setTop(prev => !prev)
 
  }

  return (
    <Cont>
      <Header> 
        <Span>r/</Span>
        <SubredditInfo value={input} onChange={e => setInput(e.target.value)}/>
      </Header>
      <Feed>
      <button onClick={event => {
        toggleTop()
        decreaseCount()
        }}>{top ? 'Sort by hot' : 'Sort by Weekly Top'}</button>
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
