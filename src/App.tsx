import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { PostcardProvider } from './context/PostcardContext'
import { Create } from './pages/Create'
import { Home } from './pages/Home'
import { Viewer } from './pages/Viewer'

export default function App() {
  return (
    <PostcardProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/postcard/:payload" element={<Viewer />} />
            <Route path="/postcard" element={<Viewer />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PostcardProvider>
  )
}
