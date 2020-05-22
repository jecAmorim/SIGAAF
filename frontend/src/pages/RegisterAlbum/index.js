import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';


import api from '../../services/api';
import './styles.css';


export default function RegisterAlbum(){
    const [titulo,setTitulo]=useState([]);
    const [descricao,setDescricao]=useState([]);
    const [dataAquisicao,setDataAquisicao]=useState([]);
    const [estadoConservacao,setEstadoConservacao]=useState([]);
    const [libraries,setLibraries]=useState([])
    const [librarySelected,setLibrarySelected]=useState(0);

    async function pegarCargos(){
        await api.get('libraries')
        .then(response=>{

            setLibraries(response.data);
            console.log(response.data);
            setLibrarySelected(response.data[0].id);
        });
    }

    useEffect(()=>{
        pegarCargos();
    },[]);
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data={
            album_titulo: titulo,
            album_descricao: descricao,
            library_id: librarySelected,
            album_data_aquisicao: dataAquisicao,
            album_estado_conservacao: estadoConservacao
        }
        try{    
            const response=await api.post('registeralbum',data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/albums');
        }catch(err){
            alert('Falha no cadastro, tente novamente'+err);
        }
    }

    function handleLibrarySelected(id){
        setLibrarySelected(id)
    }

    return(
        <div className="container">
        <Menu></Menu>
        <div className= 'dash'>
            <h1>Dados do Album</h1>
            <div className='register'>
            <form>
                    </form>
                    <div>
                        <form onSubmit={handleRegister}>
                            <ul className="flex-outer">
                                <li>
                                <label for="name">Titulo: <span>*</span></label>
                                <input 
                                placeholder='Informe o titulo'
                                value={titulo} 
                                onChange={e => setTitulo(e.target.value)}
                                />
                                </li>
                                <li>
                                <label for="email">Descrição: <span>*</span></label>
                                <textarea                                  
                                placeholder='Informe a descrição'
                                value={descricao} 
                                onChange={e => setDescricao(e.target.value)}
                                />
                                </li>
                                <li>
                                <label for="funcao">Biblioteca: <span>*</span></label>
                                <select  value={librarySelected} onChange={e =>handleLibrarySelected(e.target.value)}>
                                {libraries.map(library=>(<option key={library.id} value={library.id}>{library.library_name}</option>))}
                                </select>                            
                                </li>
                                <li>
                                <label for="phone">Data de Aquisição: <span>*</span></label>
                                <input 
                                    type='date'                                     
                                    value={dataAquisicao} 
                                    onChange={e => setDataAquisicao(e.target.value)}
                                />
                                </li>  
                                <li>
                                <label for="name">Estado de Conservação: <span>*</span></label>
                                <input 
                                placeholder='Informe o estado de conservação'
                                value={estadoConservacao} 
                                onChange={e => setEstadoConservacao(e.target.value)}
                                />
                                </li>                             
                                <li>
                                 <button className='button' type='submit'>Salvar</button>
                                 <button className='button cancel' type='button'>Cancelar</button>
                                </li>
                            </ul>
                        </form>
                    </div>
            </div>
        </div>
        <Footer></Footer>
        </div>
    );
}