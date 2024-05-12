import './App.css'
import { useState } from 'react'
import { Category } from "./Category"
import Card from "./components/Card"

function App() {
  const [vybranaKategorie, setVybranaKategorie] = useState("Malý princ")
  const vyberKategorii = (kategorie) =>{
      setVybranaKategorie(kategorie)
  }
  return (
    <div className="App" key={"citaty-aplikace"}>
       <nav>
        {
           Category.map((element)=>{
                return(
                    <button className={`category-btn ${element.name === vybranaKategorie ? "active-btn" : ""} `} onClick={()=>vyberKategorii(element.name)}>{element.name}</button>
                )
            })
        }
        </nav>
      <Card category={vybranaKategorie} key={"all-cards"} />
    </div>
  );
}
export default App;
