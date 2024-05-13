import './App.css';
import Navbar from './components/Navbar';
import { filterData, apiUrl} from './data';
import Filter from './components/Filter';
import Cards from './components/Cards';
import { useState } from 'react';
import { useEffect } from 'react';
import {toast} from 'react-toastify';
import Spinner from './components/Spinner';

function App() {

  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData(){
    setLoading(true);
    try {
      let response = await fetch(apiUrl);
      let output = await response.json();
      setCourses(output.data);
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar/>
      </div>
      <div className="bg-bgDark2">
        <div>
          <Filter category={category} setCategory={setCategory} data={filterData}/>
        </div>
        <div className="w-11/12 max-w-[1200px] 
          mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
          {loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)}
        </div>
      </div>
    </div>
  );
}

export default App;
