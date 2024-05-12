import "./Card.css"
import { citaty } from "../data"
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { useState } from "react";
import { useEffect } from "react";


const Card = (props) =>{
    //pomoci useState budu menit indexy pole s kartami, promenna indexPole bude reprezentovat aktualni kartu
    const [indexPole, setIndexPole] = useState(0)


    const filtrovanePoleCitatu = citaty.filter((citat)=>{
        return citat.category == props.category
    })

    //pri prvnim vyrenderovani se pouze jednou (prazdne zavroky jako 2. parametr) spusti procisteni localstrage - tzn pri kazdem refreshi stranky se toto spusti
    useEffect(()=>{
         localStorage.clear()
    }, [])

    //pri zmene hodnoty premenne indexPole se ulozi hodnota do localStorage s klicem aktualni kategorie
    useEffect(()=>{
        localStorage.setItem(props.category, Number(indexPole))
    }, [indexPole])

    //pokud se zmeni props - kategorie, tak se bude hondota indexu nacte z localstorage, pokud existuje nebo se index nastavi na 0
    useEffect(()=>{
        const aktualniKategorie = Number(localStorage.getItem(props.category))
        if (aktualniKategorie !== null){
            setIndexPole(aktualniKategorie);
        }else{
            setIndexPole(0)
        }
    },[props.category])


    const nextSlide = () =>{
        if(indexPole == ( filtrovanePoleCitatu.length - 1)){
            setIndexPole(0)
        }else if ( indexPole < ( filtrovanePoleCitatu.length - 1) ){
            setIndexPole( indexPole + 1)
        }
    }

    const previousSlide = () =>{
        if (indexPole > 0){
            setIndexPole( indexPole - 1)
        } else{
            setIndexPole( filtrovanePoleCitatu.length - 1)
        }
      
    }

    return(<div className="slider" key={"slider"}>
                <div className="btn-wrapper"><IoMdArrowDropleftCircle className="btn previous-btn" onClick={previousSlide}/></div>
                <section className="all-cards">
                {

                    filtrovanePoleCitatu.map((citat, index)=>{
                    const {id, text} = citat                

                    let cssTrida = "next-card"
                    //jakmile se index v poli s kartami bude rovnat aktualne nastavenemu indexu pomoci useState tak mu dam tridu aktovni karty
                    if (indexPole === index){
                        cssTrida = "active-card"
                        // indexPole reprezentuje aktualni kartu, karta s indexem o jednu mensi nez ma aktualni karta je karta ktera dostane tridu previous card
                        // 2. cast podimnky => aby previous tridu mohla dostat i karta, ktera je pred kartou s indexem 0 - tzn. pokud je aktualni karta na nultem indexu, tak previous karta by mela byt posledni. Jakmile kliknu na previous btn a jsem na nultem indexu, tak se mi zmeni indexPole na citaty.length - 1 - tudiz index se presmeruje na posledni index v poli a tento index dostane tridu aktualni karty, v tento moment ja chci dat previous tridu karte, ktera ma index === 0 -> jakmile tedy dojde k pripadu, ze jsem na konci pole, tak previous karta je ta s nultym indexem. 
                    }else if(indexPole === index - 1 || (indexPole ===  filtrovanePoleCitatu.length-1  &&  index === 0)){
                        cssTrida = "previous-card"
                    }else if(indexPole === index + 1){
                        cssTrida = "next-card"
                    }
                    return(<>
                        <article className={`card ${cssTrida}`} key={index}>
                            <p>{text}</p>
                        </article>
                        <div className={`pagination ${cssTrida === "active-card" ? cssTrida : "hidden"}`}><div className="pagination-content"></div>{indexPole + 1} - { filtrovanePoleCitatu.length}</div>
                        </>
                    )
                })
                }
                </section>
                <div className="btn-wrapper"><IoMdArrowDroprightCircle className="btn next-btn" onClick={nextSlide} /></div>
            </div>
    )
}

export default Card