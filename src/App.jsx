import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { Roast } from './pages/Roast'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route index element ={<Home/>}/>
            <Route path='/roast' element={<Roast/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
