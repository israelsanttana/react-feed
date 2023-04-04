import './global.css'
import styles from './App.module.css'
import { Ssidebar } from './components/sidebar/Sidebar'
import { Header } from './components/header/Header'
import { Post } from './components/post/Post'

export function App() {

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Ssidebar />
        <main>
          <Post />
          <Post />
        </main>
      </div>
    </div>
  )
}


