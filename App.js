import './App.css';
import {useState, useEffect} from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

//import withReactContent from 'sweetalert2-react-content';

//const noti = withReactContent(Swal);

function App() {

  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState(0);
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [anios,setAnios] = useState(0);
  const [id,setId] = useState();

  const [editar,setEditar] = useState(false);

  //const [primeravez,setPrimeravez] = useState(true);

  const [empleadosList,setEmpleados] = useState([]);

  //const cargaInicio=false;

  const add = ()=>{
    //FUNCION agregar nuevo empelado
    //alert(nombre);
    //edad=null;
    //alert(edad);
    //if(edad.value==undefined)edad=0;
    //if(anios==undefined)anios=0;
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      //alert("empleado registrado");
      limpiarCampos();
      Swal.fire({
        title: "<strong>Exitoso!</strong>",
        html: "<i>El Empleado <strong> "+nombre+" </strong>fue registrado con exito!</i>",
        icon: 'success',
        //timer: 5000
      })
    });
  }

  const update = ()=>{
    //FUNCION agregar nuevo empelado
    //alert(nombre);
    //edad=null;
    //alert(edad);
    //if(edad.value==undefined)edad=0;
    //if(anios==undefined)anios=0;
    Axios.put("http://localhost:3001/update",{
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      //alert("empleado Actualizado");
      limpiarCampos();
      Swal.fire({
        title: "<strong>Exitoso!</strong>",
        html: "<i>El Empleado <strong> "+nombre+" </strong>fue Actualizado con exito!</i>",
        icon: 'success',
        //timer: 5000
      })
    });
  }

  const deleteEmple = (val)=>{
    //``    
      Swal.fire({
        title: "<strong>Seguro quiere Eliminar?</strong>",
        html: "Desea Eliminar a <strong>"+val.nombre+"</strong> Definitivamente?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarlo'         
        //timer: 5000
      }).then((result) =>{ 

        if(result.isConfirmed)
        {
          Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>
          {            
            Swal.fire(
              'Eliminado',
              "Empleado <strong>"+val.nombre+"</strong> Se Eliminó exitosamente",
              'success' 
              //timer: 5000,         
              );
              getEmpleados();            
              limpiarCampos();
          }).catch(function(error){
            Swal.fire({
              icon: 'error',
              title: 'Oops..',
              text: 'Nose pudo Borrar el empleado',
              footer: JSON.parse(JSON.stringify(error)).message==="Network Error"? "Intente Mas Tarde": JSON.parse(JSON.stringify(error)).message        
            });
              getEmpleados();            
              limpiarCampos();

             })
        }
      });    
  }

  const limpiarCampos = () =>{
    setAnios("");
    setNombre("");
    setEdad("");
    setCargo("");
    setPais("");
    setId("");
    setEditar(false);
  }

  const editarEmpleado = (val) =>{
      setEditar(true);

      setNombre(val.nombre);
      setEdad(val.edad);
      setPais(val.pais);
      setCargo(val.cargo);
      setAnios(val.anios);
      setId(val.id);
  }

  const getEmpleados = ()=>{
    //alert(nombre);
    Axios.get("http://localhost:3001/empleados").then((response)=>{
      //alert("mostrar empleados");
      setEmpleados(response.data);
    });
  }
// useEffect se ejecuta después de cada renderizado
useEffect(() => {
  // Este efecto se ejecuta solo cuando el componente se monta por primera vez
  // ya que no hay ninguna dependencia en el array vacío
  ///console.log('Componente montado');
  // Simulamos una petición a una API (reemplaza con tu lógica real)
  const fetchData = async () => {
    Axios.get("http://localhost:3001/empleados").then((response)=>{
      //alert("mostrar empleados");
      setEmpleados(response.data);
    });
  };
  fetchData();
  // Función de limpieza (se ejecuta antes de que el componente se desmonte o antes de que el efecto se vuelva a ejecutar)  
}, []); // El array vacío indica que el efecto se ejecuta solo una vez

    
  //getEmpleados();  //deberia ir en un onLoad={}
  //IniciaEmpleados();
  return (
    <div className="container" >
    
    <div className="card text-center">
      <div className="card-header">
          GESTION DE EMPLEADOS
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text" value={nombre}
            onChange={(event)=>{
              setNombre(event.target.value);}}            
              className="form-control" placeholder="Ingrese un Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
            
        </div> 
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="number" value={edad}
            onChange={(event)=>{
              setEdad(event.target.value);}}            
              className="form-control" placeholder="Ingrese la edad" aria-label="Username" aria-describedby="basic-addon1"/>            
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais:</span>
            <input type="text" value={pais}
            onChange={(event)=>{
              setPais(event.target.value);}}            
              className="form-control" placeholder="Ingrese un Pais" aria-label="Username" aria-describedby="basic-addon1"/>       
        </div> 
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input type="text" value={cargo}
            onChange={(event)=>{
              setCargo(event.target.value);}}            
              className="form-control" placeholder="Ingrese un Cargo" aria-label="Username" aria-describedby="basic-addon1"/>       
        </div>    
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años de experiencia:</span>
            <input type="number"  value={anios}
            onChange={(event)=>{
              setAnios(event.target.value);}}            
              className="form-control" placeholder="Ingrese los Años" aria-label="Username" aria-describedby="basic-addon1"/>            
        </div>   
       </div>
      <div className="card-footer text-body-secondary">
        {
          editar===true?
          <div>
          <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
          <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
          </div>
          :<button className='btn btn-success' onClick={add}>Registrar</button>
        }        
      </div>
     </div>
     <table className="table table-striped">
     <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">NOMBRE</th>
      <th scope="col">EDAD</th>
      <th scope="col">PAIS</th>
      <th scope="col">CARGO</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>  
      {
        empleadosList.map((val,key)=>{        
          return <tr key={val.id}>
                  <th scope="row">{val.id}</th> 
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.anios}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button"
                       onClick={()=>{
                          editarEmpleado(val);  
                        }
                      }
                      className="btn btn-info">Editar</button>

                      <button type="button" onClick={ ()=>{
                        deleteEmple(val);
                      } } className="btn btn-danger">Eliminar</button>
                     
                    </div>
                  </td>
                </tr>                               
         })
      } 

  </tbody>  
      </table>
    </div>
  );
}
export default App;
